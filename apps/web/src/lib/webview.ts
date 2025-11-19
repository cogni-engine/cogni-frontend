/**
 * Utility functions for mobile webview communication
 */

/**
 * Check if the app is running inside a mobile webview
 */
export function isInMobileWebView(): boolean {
  if (typeof window === 'undefined') return false;

  return !!(window as any).ReactNativeWebView;
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
