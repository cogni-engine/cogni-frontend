/**
 * Platform detection store using Zustand
 *
 * Provides global platform information without requiring a Provider component.
 * Optimized for performance with fine-grained subscriptions.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getPlatformInfo, type PlatformInfo } from '@/lib/platform';

interface PlatformState extends PlatformInfo {
  isMobile: boolean; // screen size based (for responsive design)
  isNativeMobile: boolean; // true if in mobile webview

  // Actions
  initialize: () => void;
  setIsMobile: (isMobile: boolean) => void;
  updatePlatformInfo: (info: Partial<PlatformInfo>) => void;
}

export const usePlatformStore = create<PlatformState>()(
  devtools(
    set => ({
      // Initial state
      platform: 'web',
      os: 'unknown',
      isInWebView: false,
      userAgent: '',
      isMobile: false,
      isNativeMobile: false,

      // Actions
      initialize: () => {
        if (typeof window === 'undefined') return;

        const info = getPlatformInfo();
        const isMobile = window.innerWidth < 768;

        set({
          ...info,
          isMobile,
          isNativeMobile: info.isInWebView,
        });

        // Listen for resize events
        const handleResize = () => {
          set({ isMobile: window.innerWidth < 768 });
        };

        window.addEventListener('resize', handleResize);

        // Note: cleanup would need to be handled externally
        // or using a store middleware
      },

      setIsMobile: isMobile => set({ isMobile }),

      updatePlatformInfo: info => set(state => ({ ...state, ...info })),
    }),
    { name: 'PlatformStore' }
  )
);

// Auto-initialize on import (client-side only)
if (typeof window !== 'undefined') {
  usePlatformStore.getState().initialize();
}

/**
 * Hook to get platform information
 *
 * Usage:
 * ```typescript
 * // Select specific values (optimal performance)
 * const platform = usePlatformStore(state => state.platform);
 * const os = usePlatformStore(state => state.os);
 *
 * // Or select multiple values
 * const { platform, os, isNativeMobile } = usePlatformStore(
 *   state => ({
 *     platform: state.platform,
 *     os: state.os,
 *     isNativeMobile: state.isNativeMobile,
 *   })
 * );
 * ```
 */

// Export convenience hooks for common use cases
export const usePlatform = () => usePlatformStore(state => state.platform);
export const useOS = () => usePlatformStore(state => state.os);
export const useIsNativeMobile = () =>
  usePlatformStore(state => state.isNativeMobile);
export const useIsMobileScreen = () =>
  usePlatformStore(state => state.isMobile);

// Export full platform info (use sparingly as it subscribes to all changes)
// Note: Returns the entire state object to avoid re-creating objects
export const useFullPlatformInfo = () => {
  const platform = usePlatformStore(state => state.platform);
  const os = usePlatformStore(state => state.os);
  const isInWebView = usePlatformStore(state => state.isInWebView);
  const userAgent = usePlatformStore(state => state.userAgent);
  const isMobile = usePlatformStore(state => state.isMobile);
  const isNativeMobile = usePlatformStore(state => state.isNativeMobile);
  
  return {
    platform,
    os,
    isInWebView,
    userAgent,
    isMobile,
    isNativeMobile,
  };
};
