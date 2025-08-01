/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EventEmitter } from 'events';
import http2 from 'http2';
import net from 'net';
import stream from 'stream';
import tls from 'tls';

import { SocksProxy } from './utils/socksProxy';
import { ManualPromise, escapeHTML, generateSelfSignedCertificate, rewriteErrorMessage } from '../utils';
import { verifyClientCertificates } from './browserContext';
import { createProxyAgent } from './utils/network';
import { debugLogger } from './utils/debugLogger';
import { createSocket, createTLSSocket } from './utils/happyEyeballs';
import { getProxyForUrl } from '../utilsBundle';

import type * as types from './types';
import type { SocksSocketClosedPayload, SocksSocketDataPayload, SocksSocketRequestedPayload } from './utils/socksProxy';
import type https from 'https';
import type { Progress } from '@protocol/progress';

let dummyServerTlsOptions: tls.TlsOptions | undefined = undefined;
function loadDummyServerCertsIfNeeded() {
  if (dummyServerTlsOptions)
    return;
  const { cert, key } = generateSelfSignedCertificate();
  dummyServerTlsOptions = { key, cert };
}

class ALPNCache {
  private _cache = new Map<string, ManualPromise<string>>();

  get(host: string, port: number, success: (protocol: string) => void) {
    const cacheKey = `${host}:${port}`;
    {
      const result = this._cache.get(cacheKey);
      if (result) {
        result.then(success);
        return;
      }
    }
    const result = new ManualPromise<string>();
    this._cache.set(cacheKey, result);
    result.then(success);
    createTLSSocket({
      host,
      port,
      servername: net.isIP(host) ? undefined : host,
      ALPNProtocols: ['h2', 'http/1.1'],
      rejectUnauthorized: false,
    }).then(socket => {
      // The server may not respond with ALPN, in which case we default to http/1.1.
      result.resolve(socket.alpnProtocol || 'http/1.1');
      socket.end();
    }).catch(error => {
      debugLogger.log('client-certificates', `ALPN error: ${error.message}`);
      result.resolve('http/1.1');
    });
  }
}

class SocksProxyConnection {
  private readonly socksProxy: ClientCertificatesProxy;
  private readonly uid: string;
  private readonly host: string;
  private readonly port: number;
  private _firstPackageReceived = false;
  private _target!: net.Socket;
  private _internal: stream.Duplex;
  private _internalTLS: tls.TLSSocket | undefined;
  private _targetCloseEventListener: () => void;
  private _dummyServer: tls.Server | undefined;
  private _closed = false;

  constructor(socksProxy: ClientCertificatesProxy, uid: string, host: string, port: number) {
    this.socksProxy = socksProxy;
    this.uid = uid;
    this.host = host;
    this.port = port;
    this._targetCloseEventListener = () => {
      // Close the other end and cleanup TLS resources.
      this.socksProxy._socksProxy.sendSocketEnd({ uid: this.uid });
      this._internalTLS?.destroy();
      this._dummyServer?.close();
    };
    this._internal = new stream.Duplex({
      read: () => { },
      write: (data, encoding, callback) => {
        this.socksProxy._socksProxy.sendSocketData({ uid: this.uid, data });
        callback();
      }
    });
  }

  async connect() {
    const proxyAgent = this.socksProxy.getProxyAgent(this.host, this.port);
    if (proxyAgent)
      this._target = await proxyAgent.callback(new EventEmitter() as any, { host: rewriteToLocalhostIfNeeded(this.host), port: this.port, secureEndpoint: false });
    else
      this._target = await createSocket(rewriteToLocalhostIfNeeded(this.host), this.port);

    this._target.once('close', this._targetCloseEventListener);
    this._target.once('error', error => this.socksProxy._socksProxy.sendSocketError({ uid: this.uid, error: error.message }));
    if (this._closed) {
      this._target.destroy();
      return;
    }
    this.socksProxy._socksProxy.socketConnected({
      uid: this.uid,
      host: this._target.localAddress!,
      port: this._target.localPort!,
    });
  }

  public onClose() {
    // Close the other end and cleanup TLS resources.
    this._target.destroy();
    this._internalTLS?.destroy();
    this._dummyServer?.close();
    this._closed = true;
  }

  public onData(data: Buffer) {
    // HTTP / TLS are client-hello based protocols. This allows us to detect
    // the protocol on the first package and attach appropriate listeners.
    if (!this._firstPackageReceived) {
      this._firstPackageReceived = true;
      // 0x16 is SSLv3/TLS "handshake" content type: https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_record
      if (data[0] === 0x16)
        this._establishTlsTunnel(this._internal, data);
      else
        this._establishPlaintextTunnel(this._internal);
    }

    this._internal.push(data);
  }


  private _establishPlaintextTunnel(internal: stream.Duplex) {
    internal.pipe(this._target);
    this._target.pipe(internal);
  }

  private _establishTlsTunnel(internal: stream, clientHello: Buffer) {
    this.socksProxy.alpnCache.get(rewriteToLocalhostIfNeeded(this.host), this.port, alpnProtocolChosenByServer => {
      debugLogger.log('client-certificates', `Proxy->Target ${this.host}:${this.port} chooses ALPN ${alpnProtocolChosenByServer}`);
      if (this._closed)
        return;
      this._dummyServer = tls.createServer({
        ...dummyServerTlsOptions,
        ALPNProtocols: alpnProtocolChosenByServer === 'h2' ? ['h2', 'http/1.1'] : ['http/1.1'],
      });
      this._dummyServer.emit('connection', this._internal);
      this._dummyServer.once('secureConnection', internalTLS => {
        this._internalTLS = internalTLS;
        debugLogger.log('client-certificates', `Browser->Proxy ${this.host}:${this.port} chooses ALPN ${internalTLS.alpnProtocol}`);

        let targetTLS: tls.TLSSocket | undefined = undefined;

        const handleError = (error: Error) => {
          debugLogger.log('client-certificates', `error when connecting to target: ${error.message.replaceAll('\n', ' ')}`);
          const responseBody = escapeHTML('Playwright client-certificate error: ' + error.message)
              .replaceAll('\n', ' <br>');
          if (internalTLS?.alpnProtocol === 'h2') {
            // This method is available only in Node.js 20+
            if ('performServerHandshake' in http2) {
              // In case of an 'error' event on the target connection, we still need to perform the http2 handshake on the browser side.
              // This is an async operation, so we need to remove the listener to prevent the socket from being closed too early.
              // This means we call this._targetCloseEventListener manually.
              this._target.removeListener('close', this._targetCloseEventListener);
              // @ts-expect-error
              const session: http2.ServerHttp2Session = http2.performServerHandshake(internalTLS);
              session.on('error', () => {
                this._target.destroy();
                this._targetCloseEventListener();
              });
              session.once('stream', (stream: http2.ServerHttp2Stream) => {
                stream.respond({
                  'content-type': 'text/html',
                  [http2.constants.HTTP2_HEADER_STATUS]: 503,
                });
                const cleanup = () => {
                  session.close();
                  this._target.destroy();
                  this._targetCloseEventListener();
                };
                stream.end(responseBody, cleanup);
                stream.once('error', cleanup);
              });
            } else {
              this._target.destroy();
            }
          } else {
            internalTLS.end([
              'HTTP/1.1 503 Internal Server Error',
              'Content-Type: text/html; charset=utf-8',
              'Content-Length: ' + Buffer.byteLength(responseBody),
              '',
              responseBody,
            ].join('\r\n'));
            this._target.destroy();
          }
        };

        if (this._closed) {
          internalTLS.destroy();
          return;
        }
        targetTLS = tls.connect({
          socket: this._target,
          host: this.host,
          port: this.port,
          rejectUnauthorized: !this.socksProxy.ignoreHTTPSErrors,
          ALPNProtocols: [internalTLS.alpnProtocol || 'http/1.1'],
          servername: !net.isIP(this.host) ? this.host : undefined,
          secureContext: this.socksProxy.secureContextMap.get(new URL(`https://${this.host}:${this.port}`).origin),
        });

        targetTLS.once('secureConnect', () => {
          internalTLS.pipe(targetTLS);
          targetTLS.pipe(internalTLS);
        });

        internalTLS.once('error', () => this._target.destroy());
        targetTLS.once('error', handleError);
      });
    });
  }
}

export class ClientCertificatesProxy {
  _socksProxy: SocksProxy;
  private _connections: Map<string, SocksProxyConnection> = new Map();
  ignoreHTTPSErrors: boolean | undefined;
  secureContextMap: Map<string, tls.SecureContext> = new Map();
  alpnCache: ALPNCache;
  private _proxy: types.ProxySettings | undefined;

  private constructor(
    contextOptions: Pick<types.BrowserContextOptions, 'clientCertificates' | 'ignoreHTTPSErrors' | 'proxy'>
  ) {
    verifyClientCertificates(contextOptions.clientCertificates);
    this.alpnCache = new ALPNCache();
    this.ignoreHTTPSErrors = contextOptions.ignoreHTTPSErrors;
    this._proxy = contextOptions.proxy;
    this._initSecureContexts(contextOptions.clientCertificates);
    this._socksProxy = new SocksProxy();
    this._socksProxy.setPattern('*');
    this._socksProxy.addListener(SocksProxy.Events.SocksRequested, async (payload: SocksSocketRequestedPayload) => {
      try {
        const connection = new SocksProxyConnection(this, payload.uid, payload.host, payload.port);
        await connection.connect();
        this._connections.set(payload.uid, connection);
      } catch (error) {
        debugLogger.log('client-certificates', `Failed to connect to ${payload.host}:${payload.port}: ${error.message}`);
        this._socksProxy.socketFailed({ uid: payload.uid, errorCode: error.code });
      }
    });
    this._socksProxy.addListener(SocksProxy.Events.SocksData, (payload: SocksSocketDataPayload) => {
      this._connections.get(payload.uid)?.onData(payload.data);
    });
    this._socksProxy.addListener(SocksProxy.Events.SocksClosed, (payload: SocksSocketClosedPayload) => {
      this._connections.get(payload.uid)?.onClose();
      this._connections.delete(payload.uid);
    });
    loadDummyServerCertsIfNeeded();
  }

  getProxyAgent(host: string, port: number) {
    const proxyFromOptions = createProxyAgent(this._proxy);
    if (proxyFromOptions)
      return proxyFromOptions;
    const proxyFromEnv = getProxyForUrl(`https://${host}:${port}`);
    if (proxyFromEnv)
      return createProxyAgent({ server: proxyFromEnv });
  }

  _initSecureContexts(clientCertificates: types.BrowserContextOptions['clientCertificates']) {
    // Step 1. Group certificates by origin.
    const origin2certs = new Map<string, types.BrowserContextOptions['clientCertificates']>();
    for (const cert of clientCertificates || []) {
      const origin = normalizeOrigin(cert.origin);
      const certs = origin2certs.get(origin) || [];
      certs.push(cert);
      origin2certs.set(origin, certs);
    }

    // Step 2. Create secure contexts for each origin.
    for (const [origin, certs] of origin2certs) {
      try {
        this.secureContextMap.set(origin, tls.createSecureContext(convertClientCertificatesToTLSOptions(certs)));
      } catch (error) {
        error = rewriteOpenSSLErrorIfNeeded(error);
        throw rewriteErrorMessage(error, `Failed to load client certificate: ${error.message}`);
      }
    }
  }

  public static async create(progress: Progress, contextOptions: Pick<types.BrowserContextOptions, 'clientCertificates' | 'ignoreHTTPSErrors' | 'proxy'>) {
    const proxy = new ClientCertificatesProxy(contextOptions);
    try {
      await progress.race(proxy._socksProxy.listen(0, '127.0.0.1'));
      return proxy;
    } catch (error) {
      await proxy.close();
      throw error;
    }
  }

  public proxySettings(): types.ProxySettings {
    return { server: `socks5://127.0.0.1:${this._socksProxy.port()}` };
  }

  public async close() {
    await this._socksProxy.close();
  }
}

function normalizeOrigin(origin: string): string {
  try {
    return new URL(origin).origin;
  } catch (error) {
    return origin;
  }
}

function convertClientCertificatesToTLSOptions(
  clientCertificates: types.BrowserContextOptions['clientCertificates']
): Pick<https.RequestOptions, 'pfx' | 'key' | 'cert'> | undefined {
  if (!clientCertificates || !clientCertificates.length)
    return;
  const tlsOptions = {
    pfx: [] as { buf: Buffer, passphrase?: string }[],
    key: [] as { pem: Buffer, passphrase?: string }[],
    cert: [] as Buffer[],
  };
  for (const cert of clientCertificates) {
    if (cert.cert)
      tlsOptions.cert.push(cert.cert);
    if (cert.key)
      tlsOptions.key.push({ pem: cert.key, passphrase: cert.passphrase });
    if (cert.pfx)
      tlsOptions.pfx.push({ buf: cert.pfx, passphrase: cert.passphrase });
  }
  return tlsOptions;
}

export function getMatchingTLSOptionsForOrigin(
  clientCertificates: types.BrowserContextOptions['clientCertificates'],
  origin: string
): Pick<https.RequestOptions, 'pfx' | 'key' | 'cert'> | undefined {
  const matchingCerts = clientCertificates?.filter(c =>
    normalizeOrigin(c.origin) === origin
  );
  return convertClientCertificatesToTLSOptions(matchingCerts);
}

function rewriteToLocalhostIfNeeded(host: string): string {
  return host === 'local.playwright' ? 'localhost' : host;
}

export function rewriteOpenSSLErrorIfNeeded(error: Error): Error {
  if (error.message !== 'unsupported' && (error as NodeJS.ErrnoException).code !== 'ERR_CRYPTO_UNSUPPORTED_OPERATION')
    return error;
  return rewriteErrorMessage(error, [
    'Unsupported TLS certificate.',
    'Most likely, the security algorithm of the given certificate was deprecated by OpenSSL.',
    'For more details, see https://github.com/openssl/openssl/blob/master/README-PROVIDERS.md#the-legacy-provider',
    'You could probably modernize the certificate by following the steps at https://github.com/nodejs/node/issues/40672#issuecomment-1243648223',
  ].join('\n'));
}
