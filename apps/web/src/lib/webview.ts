/**
 * Utility functions for mobile webview communication
 */

import { isInMobileWebView as checkIsInMobileWebView } from './platform';

/**
 * Check if the app is running inside a mobile webview
 * @deprecated Use `usePlatform().isInWebView` from PlatformContext instead
 */
export function isInMobileWebView(): boolean {
  return checkIsInMobileWebView();
}

/**
 * Send message to native app (if in webview)
 */
export function sendToNativeApp(message: { type: string; [key: string]: any }) {
  if (isInMobileWebView()) {
    try {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
      console.log('Sent message to native app:', message);
    } catch (error) {
      console.error('Failed to send message to native app:', error);
    }
  }
}

/**
 * Request native authentication
 */
export function requestNativeAuth(reason?: string) {
  sendToNativeApp({
    type: 'AUTH_REQUIRED',
    reason: reason || 'Session expired',
  });
}

/**
 * Notify native app of logout
 */
export function notifyNativeLogout() {
  sendToNativeApp({
    type: 'LOGOUT',
  });
}

/**
 * Send navigation request to native app
 */
export function requestNativeNavigation(path: string) {
  sendToNativeApp({
    type: 'NAVIGATION',
    path,
  });
}
