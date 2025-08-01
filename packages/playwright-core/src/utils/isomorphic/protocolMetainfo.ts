/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

// This file is generated by generate_channels.js, do not edit manually.

export const methodMetainfo = new Map<string, { internal?: boolean, title?: string, slowMo?: boolean, snapshot?: boolean, pausesBeforeInput?: boolean }>([
  ['APIRequestContext.fetch', { title: '{method} "{url}"', }],
  ['APIRequestContext.fetchResponseBody', { internal: true, }],
  ['APIRequestContext.fetchLog', { internal: true, }],
  ['APIRequestContext.storageState', { internal: true, }],
  ['APIRequestContext.disposeAPIResponse', { internal: true, }],
  ['APIRequestContext.dispose', { internal: true, }],
  ['LocalUtils.zip', { internal: true, }],
  ['LocalUtils.harOpen', { internal: true, }],
  ['LocalUtils.harLookup', { internal: true, }],
  ['LocalUtils.harClose', { internal: true, }],
  ['LocalUtils.harUnzip', { internal: true, }],
  ['LocalUtils.connect', { internal: true, }],
  ['LocalUtils.tracingStarted', { internal: true, }],
  ['LocalUtils.addStackToTracingNoReply', { internal: true, }],
  ['LocalUtils.traceDiscarded', { internal: true, }],
  ['Root.initialize', { internal: true, }],
  ['Playwright.newRequest', { title: 'Create request context', }],
  ['DebugController.initialize', { internal: true, }],
  ['DebugController.setReportStateChanged', { internal: true, }],
  ['DebugController.setRecorderMode', { internal: true, }],
  ['DebugController.highlight', { internal: true, }],
  ['DebugController.hideHighlight', { internal: true, }],
  ['DebugController.resume', { internal: true, }],
  ['DebugController.kill', { internal: true, }],
  ['SocksSupport.socksConnected', { internal: true, }],
  ['SocksSupport.socksFailed', { internal: true, }],
  ['SocksSupport.socksData', { internal: true, }],
  ['SocksSupport.socksError', { internal: true, }],
  ['SocksSupport.socksEnd', { internal: true, }],
  ['BrowserType.launch', { title: 'Launch browser', }],
  ['BrowserType.launchPersistentContext', { title: 'Launch persistent context', }],
  ['BrowserType.connectOverCDP', { title: 'Connect over CDP', }],
  ['Browser.close', { title: 'Close browser', }],
  ['Browser.killForTests', { internal: true, }],
  ['Browser.defaultUserAgentForTest', { internal: true, }],
  ['Browser.newContext', { title: 'Create context', }],
  ['Browser.newContextForReuse', { internal: true, }],
  ['Browser.disconnectFromReusedContext', { internal: true, }],
  ['Browser.newBrowserCDPSession', { internal: true, title: 'Create CDP session', }],
  ['Browser.startTracing', { internal: true, }],
  ['Browser.stopTracing', { internal: true, }],
  ['EventTarget.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['BrowserContext.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['Page.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['WebSocket.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['ElectronApplication.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['AndroidDevice.waitForEventInfo', { title: 'Wait for event "{info.event}"', snapshot: true, }],
  ['BrowserContext.addCookies', { title: 'Add cookies', }],
  ['BrowserContext.addInitScript', { title: 'Add init script', }],
  ['BrowserContext.clearCookies', { title: 'Clear cookies', }],
  ['BrowserContext.clearPermissions', { title: 'Clear permissions', }],
  ['BrowserContext.close', { title: 'Close context', }],
  ['BrowserContext.cookies', { title: 'Get cookies', }],
  ['BrowserContext.exposeBinding', { title: 'Expose binding', }],
  ['BrowserContext.grantPermissions', { title: 'Grant permissions', }],
  ['BrowserContext.newPage', { title: 'Create page', }],
  ['BrowserContext.registerSelectorEngine', { internal: true, }],
  ['BrowserContext.setTestIdAttributeName', { internal: true, }],
  ['BrowserContext.setExtraHTTPHeaders', { title: 'Set extra HTTP headers', }],
  ['BrowserContext.setGeolocation', { title: 'Set geolocation', }],
  ['BrowserContext.setHTTPCredentials', { title: 'Set HTTP credentials', }],
  ['BrowserContext.setNetworkInterceptionPatterns', { internal: true, }],
  ['BrowserContext.setWebSocketInterceptionPatterns', { internal: true, }],
  ['BrowserContext.setOffline', { title: 'Set offline mode', }],
  ['BrowserContext.storageState', { title: 'Get storage state', }],
  ['BrowserContext.pause', { title: 'Pause', }],
  ['BrowserContext.enableRecorder', { internal: true, }],
  ['BrowserContext.disableRecorder', { internal: true, }],
  ['BrowserContext.newCDPSession', { internal: true, }],
  ['BrowserContext.harStart', { internal: true, }],
  ['BrowserContext.harExport', { internal: true, }],
  ['BrowserContext.createTempFiles', { internal: true, }],
  ['BrowserContext.updateSubscription', { internal: true, }],
  ['BrowserContext.clockFastForward', { title: 'Fast forward clock "{ticksNumber}{ticksString}"', }],
  ['BrowserContext.clockInstall', { title: 'Install clock "{timeNumber}{timeString}"', }],
  ['BrowserContext.clockPauseAt', { title: 'Pause clock "{timeNumber}{timeString}"', }],
  ['BrowserContext.clockResume', { title: 'Resume clock', }],
  ['BrowserContext.clockRunFor', { title: 'Run clock "{ticksNumber}{ticksString}"', }],
  ['BrowserContext.clockSetFixedTime', { title: 'Set fixed time "{timeNumber}{timeString}"', }],
  ['BrowserContext.clockSetSystemTime', { title: 'Set system time "{timeNumber}{timeString}"', }],
  ['BrowserContext.clockUninstall', { title: 'Uninstall clock', }],
  ['Page.addInitScript', { }],
  ['Page.close', { title: 'Close page', }],
  ['Page.emulateMedia', { title: 'Emulate media', snapshot: true, }],
  ['Page.exposeBinding', { title: 'Expose binding', }],
  ['Page.goBack', { title: 'Go back', slowMo: true, snapshot: true, }],
  ['Page.goForward', { title: 'Go forward', slowMo: true, snapshot: true, }],
  ['Page.requestGC', { title: 'Request garbage collection', }],
  ['Page.registerLocatorHandler', { title: 'Register locator handler', }],
  ['Page.resolveLocatorHandlerNoReply', { internal: true, }],
  ['Page.unregisterLocatorHandler', { title: 'Unregister locator handler', }],
  ['Page.reload', { title: 'Reload', slowMo: true, snapshot: true, }],
  ['Page.expectScreenshot', { title: 'Expect screenshot', snapshot: true, }],
  ['Page.screenshot', { title: 'Screenshot', snapshot: true, }],
  ['Page.setExtraHTTPHeaders', { title: 'Set extra HTTP headers', }],
  ['Page.setNetworkInterceptionPatterns', { internal: true, }],
  ['Page.setWebSocketInterceptionPatterns', { internal: true, }],
  ['Page.setViewportSize', { title: 'Set viewport size', snapshot: true, }],
  ['Page.keyboardDown', { title: 'Key down "{key}"', slowMo: true, snapshot: true, }],
  ['Page.keyboardUp', { title: 'Key up "{key}"', slowMo: true, snapshot: true, }],
  ['Page.keyboardInsertText', { title: 'Insert "{text}"', slowMo: true, snapshot: true, }],
  ['Page.keyboardType', { title: 'Type "{text}"', slowMo: true, snapshot: true, }],
  ['Page.keyboardPress', { title: 'Press "{key}"', slowMo: true, snapshot: true, }],
  ['Page.mouseMove', { title: 'Mouse move', slowMo: true, snapshot: true, }],
  ['Page.mouseDown', { title: 'Mouse down', slowMo: true, snapshot: true, }],
  ['Page.mouseUp', { title: 'Mouse up', slowMo: true, snapshot: true, }],
  ['Page.mouseClick', { title: 'Click', slowMo: true, snapshot: true, }],
  ['Page.mouseWheel', { title: 'Mouse wheel', slowMo: true, snapshot: true, }],
  ['Page.touchscreenTap', { title: 'Tap', slowMo: true, snapshot: true, }],
  ['Page.accessibilitySnapshot', { internal: true, snapshot: true, }],
  ['Page.pdf', { title: 'PDF', }],
  ['Page.snapshotForAI', { internal: true, snapshot: true, }],
  ['Page.startJSCoverage', { internal: true, }],
  ['Page.stopJSCoverage', { internal: true, }],
  ['Page.startCSSCoverage', { internal: true, }],
  ['Page.stopCSSCoverage', { internal: true, }],
  ['Page.bringToFront', { title: 'Bring to front', }],
  ['Page.updateSubscription', { internal: true, }],
  ['Frame.evalOnSelector', { title: 'Evaluate', snapshot: true, }],
  ['Frame.evalOnSelectorAll', { title: 'Evaluate', snapshot: true, }],
  ['Frame.addScriptTag', { title: 'Add script tag', snapshot: true, }],
  ['Frame.addStyleTag', { title: 'Add style tag', snapshot: true, }],
  ['Frame.ariaSnapshot', { title: 'Aria snapshot', snapshot: true, }],
  ['Frame.blur', { title: 'Blur', slowMo: true, snapshot: true, }],
  ['Frame.check', { title: 'Check', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.click', { title: 'Click', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.content', { title: 'Get content', snapshot: true, }],
  ['Frame.dragAndDrop', { title: 'Drag and drop', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.dblclick', { title: 'Double click', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.dispatchEvent', { title: 'Dispatch "{type}"', slowMo: true, snapshot: true, }],
  ['Frame.evaluateExpression', { title: 'Evaluate', snapshot: true, }],
  ['Frame.evaluateExpressionHandle', { title: 'Evaluate', snapshot: true, }],
  ['Frame.fill', { title: 'Fill "{value}"', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.focus', { title: 'Focus', slowMo: true, snapshot: true, }],
  ['Frame.frameElement', { internal: true, }],
  ['Frame.resolveSelector', { internal: true, }],
  ['Frame.highlight', { internal: true, }],
  ['Frame.getAttribute', { internal: true, snapshot: true, }],
  ['Frame.goto', { title: 'Navigate to "{url}"', slowMo: true, snapshot: true, }],
  ['Frame.hover', { title: 'Hover', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.innerHTML', { title: 'Get HTML', snapshot: true, }],
  ['Frame.innerText', { title: 'Get inner text', snapshot: true, }],
  ['Frame.inputValue', { title: 'Get input value', snapshot: true, }],
  ['Frame.isChecked', { title: 'Is checked', snapshot: true, }],
  ['Frame.isDisabled', { title: 'Is disabled', snapshot: true, }],
  ['Frame.isEnabled', { title: 'Is enabled', snapshot: true, }],
  ['Frame.isHidden', { title: 'Is hidden', snapshot: true, }],
  ['Frame.isVisible', { title: 'Is visible', snapshot: true, }],
  ['Frame.isEditable', { title: 'Is editable', snapshot: true, }],
  ['Frame.press', { title: 'Press "{key}"', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.querySelector', { title: 'Query selector', snapshot: true, }],
  ['Frame.querySelectorAll', { title: 'Query selector all', snapshot: true, }],
  ['Frame.queryCount', { title: 'Query count', snapshot: true, }],
  ['Frame.selectOption', { title: 'Select option', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.setContent', { title: 'Set content', snapshot: true, }],
  ['Frame.setInputFiles', { title: 'Set input files', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.tap', { title: 'Tap', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.textContent', { title: 'Get text content', snapshot: true, }],
  ['Frame.title', { internal: true, }],
  ['Frame.type', { title: 'Type', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.uncheck', { title: 'Uncheck', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['Frame.waitForTimeout', { title: 'Wait for timeout', snapshot: true, }],
  ['Frame.waitForFunction', { title: 'Wait for function', snapshot: true, }],
  ['Frame.waitForSelector', { title: 'Wait for selector', snapshot: true, }],
  ['Frame.expect', { title: 'Expect "{expression}"', snapshot: true, }],
  ['Worker.evaluateExpression', { title: 'Evaluate', }],
  ['Worker.evaluateExpressionHandle', { title: 'Evaluate', }],
  ['JSHandle.dispose', { }],
  ['ElementHandle.dispose', { }],
  ['JSHandle.evaluateExpression', { title: 'Evaluate', snapshot: true, }],
  ['ElementHandle.evaluateExpression', { title: 'Evaluate', snapshot: true, }],
  ['JSHandle.evaluateExpressionHandle', { title: 'Evaluate', snapshot: true, }],
  ['ElementHandle.evaluateExpressionHandle', { title: 'Evaluate', snapshot: true, }],
  ['JSHandle.getPropertyList', { internal: true, }],
  ['ElementHandle.getPropertyList', { internal: true, }],
  ['JSHandle.getProperty', { internal: true, }],
  ['ElementHandle.getProperty', { internal: true, }],
  ['JSHandle.jsonValue', { internal: true, }],
  ['ElementHandle.jsonValue', { internal: true, }],
  ['ElementHandle.evalOnSelector', { title: 'Evaluate', snapshot: true, }],
  ['ElementHandle.evalOnSelectorAll', { title: 'Evaluate', snapshot: true, }],
  ['ElementHandle.boundingBox', { title: 'Get bounding box', snapshot: true, }],
  ['ElementHandle.check', { title: 'Check', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.click', { title: 'Click', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.contentFrame', { internal: true, snapshot: true, }],
  ['ElementHandle.dblclick', { title: 'Double click', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.dispatchEvent', { title: 'Dispatch event', slowMo: true, snapshot: true, }],
  ['ElementHandle.fill', { title: 'Fill "{value}"', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.focus', { title: 'Focus', slowMo: true, snapshot: true, }],
  ['ElementHandle.getAttribute', { internal: true, }],
  ['ElementHandle.hover', { title: 'Hover', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.innerHTML', { title: 'Get HTML', snapshot: true, }],
  ['ElementHandle.innerText', { title: 'Get inner text', snapshot: true, }],
  ['ElementHandle.inputValue', { title: 'Get input value', snapshot: true, }],
  ['ElementHandle.isChecked', { title: 'Is checked', snapshot: true, }],
  ['ElementHandle.isDisabled', { title: 'Is disabled', snapshot: true, }],
  ['ElementHandle.isEditable', { title: 'Is editable', snapshot: true, }],
  ['ElementHandle.isEnabled', { title: 'Is enabled', snapshot: true, }],
  ['ElementHandle.isHidden', { title: 'Is hidden', snapshot: true, }],
  ['ElementHandle.isVisible', { title: 'Is visible', snapshot: true, }],
  ['ElementHandle.ownerFrame', { title: 'Get owner frame', }],
  ['ElementHandle.press', { title: 'Press "{key}"', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.querySelector', { title: 'Query selector', snapshot: true, }],
  ['ElementHandle.querySelectorAll', { title: 'Query selector all', snapshot: true, }],
  ['ElementHandle.screenshot', { title: 'Screenshot', snapshot: true, }],
  ['ElementHandle.scrollIntoViewIfNeeded', { title: 'Scroll into view', slowMo: true, snapshot: true, }],
  ['ElementHandle.selectOption', { title: 'Select option', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.selectText', { title: 'Select text', slowMo: true, snapshot: true, }],
  ['ElementHandle.setInputFiles', { title: 'Set input files', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.tap', { title: 'Tap', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.textContent', { title: 'Get text content', snapshot: true, }],
  ['ElementHandle.type', { title: 'Type', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.uncheck', { title: 'Uncheck', slowMo: true, snapshot: true, pausesBeforeInput: true, }],
  ['ElementHandle.waitForElementState', { title: 'Wait for state', snapshot: true, }],
  ['ElementHandle.waitForSelector', { title: 'Wait for selector', snapshot: true, }],
  ['Request.response', { internal: true, }],
  ['Request.rawRequestHeaders', { internal: true, }],
  ['Route.redirectNavigationRequest', { internal: true, }],
  ['Route.abort', { }],
  ['Route.continue', { internal: true, }],
  ['Route.fulfill', { internal: true, }],
  ['WebSocketRoute.connect', { internal: true, }],
  ['WebSocketRoute.ensureOpened', { internal: true, }],
  ['WebSocketRoute.sendToPage', { internal: true, }],
  ['WebSocketRoute.sendToServer', { internal: true, }],
  ['WebSocketRoute.closePage', { internal: true, }],
  ['WebSocketRoute.closeServer', { internal: true, }],
  ['Response.body', { internal: true, }],
  ['Response.securityDetails', { internal: true, }],
  ['Response.serverAddr', { internal: true, }],
  ['Response.rawResponseHeaders', { internal: true, }],
  ['Response.sizes', { internal: true, }],
  ['BindingCall.reject', { internal: true, }],
  ['BindingCall.resolve', { internal: true, }],
  ['Dialog.accept', { title: 'Accept dialog', }],
  ['Dialog.dismiss', { title: 'Dismiss dialog', }],
  ['Tracing.tracingStart', { internal: true, }],
  ['Tracing.tracingStartChunk', { internal: true, }],
  ['Tracing.tracingGroup', { title: 'Trace "{name}"', }],
  ['Tracing.tracingGroupEnd', { title: 'Group end', }],
  ['Tracing.tracingStopChunk', { internal: true, }],
  ['Tracing.tracingStop', { internal: true, }],
  ['Artifact.pathAfterFinished', { internal: true, }],
  ['Artifact.saveAs', { internal: true, }],
  ['Artifact.saveAsStream', { internal: true, }],
  ['Artifact.failure', { internal: true, }],
  ['Artifact.stream', { internal: true, }],
  ['Artifact.cancel', { internal: true, }],
  ['Artifact.delete', { internal: true, }],
  ['Stream.read', { internal: true, }],
  ['Stream.close', { internal: true, }],
  ['WritableStream.write', { internal: true, }],
  ['WritableStream.close', { internal: true, }],
  ['CDPSession.send', { internal: true, }],
  ['CDPSession.detach', { internal: true, }],
  ['Electron.launch', { title: 'Launch electron', }],
  ['ElectronApplication.browserWindow', { internal: true, }],
  ['ElectronApplication.evaluateExpression', { title: 'Evaluate', }],
  ['ElectronApplication.evaluateExpressionHandle', { title: 'Evaluate', }],
  ['ElectronApplication.updateSubscription', { internal: true, }],
  ['Android.devices', { internal: true, }],
  ['AndroidSocket.write', { internal: true, }],
  ['AndroidSocket.close', { internal: true, }],
  ['AndroidDevice.wait', { }],
  ['AndroidDevice.fill', { title: 'Fill "{text}"', }],
  ['AndroidDevice.tap', { title: 'Tap', }],
  ['AndroidDevice.drag', { title: 'Drag', }],
  ['AndroidDevice.fling', { title: 'Fling', }],
  ['AndroidDevice.longTap', { title: 'Long tap', }],
  ['AndroidDevice.pinchClose', { title: 'Pinch close', }],
  ['AndroidDevice.pinchOpen', { title: 'Pinch open', }],
  ['AndroidDevice.scroll', { title: 'Scroll', }],
  ['AndroidDevice.swipe', { title: 'Swipe', }],
  ['AndroidDevice.info', { internal: true, }],
  ['AndroidDevice.screenshot', { title: 'Screenshot', }],
  ['AndroidDevice.inputType', { title: 'Type', }],
  ['AndroidDevice.inputPress', { title: 'Press', }],
  ['AndroidDevice.inputTap', { title: 'Tap', }],
  ['AndroidDevice.inputSwipe', { title: 'Swipe', }],
  ['AndroidDevice.inputDrag', { title: 'Drag', }],
  ['AndroidDevice.launchBrowser', { title: 'Launch browser', }],
  ['AndroidDevice.open', { title: 'Open app', }],
  ['AndroidDevice.shell', { internal: true, }],
  ['AndroidDevice.installApk', { title: 'Install apk', }],
  ['AndroidDevice.push', { title: 'Push', }],
  ['AndroidDevice.connectToWebView', { internal: true, }],
  ['AndroidDevice.close', { internal: true, }],
  ['JsonPipe.send', { internal: true, }],
  ['JsonPipe.close', { internal: true, }]
]);
