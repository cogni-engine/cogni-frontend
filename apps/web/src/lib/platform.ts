/**
 * Platform detection utilities for web app
 */

export type PlatformType = 'web' | 'mobile';
export type OSType = 'ios' | 'android' | 'web' | 'unknown';

export interface PlatformInfo {
  platform: PlatformType;
  os: OSType;
  isInWebView: boolean;
  userAgent: string;
}

/**
 * Check if running inside mobile webview
 */
export function isInMobileWebView(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as any).ReactNativeWebView;
}

/**
 * Detect OS from user agent
 */
export function detectOS(): OSType {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Check for iOS
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }

  // Check for Android
  if (/android/.test(userAgent)) {
    return 'android';
  }

  // Check for iOS in webview (additional check)
  if ((window as any).webkit?.messageHandlers) {
    return 'ios';
  }

  return 'web';
}

/**
 * Get comprehensive platform information
 */
export function getPlatformInfo(): PlatformInfo {
  const isInWebView = isInMobileWebView();
  const os = detectOS();
  const platform: PlatformType = isInWebView ? 'mobile' : 'web';
  const userAgent =
    typeof window !== 'undefined' ? window.navigator.userAgent : '';

  return {
    platform,
    os,
    isInWebView,
    userAgent,
  };
}
