import { useState, useEffect } from 'react';

interface MobileKeyboardState {
  isMobile: boolean;
  isKeyboardVisible: boolean;
  keyboardHeight: number;
}

/**
 * Hook to detect mobile device and keyboard visibility
 * Uses visualViewport API to detect when mobile keyboard opens/closes
 */
export function useMobileKeyboard(): MobileKeyboardState {
  const [state, setState] = useState<MobileKeyboardState>({
    isMobile: false,
    isKeyboardVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Check if we're on mobile (screen width < 768px)
    const checkMobile = () => window.innerWidth < 768;

    // Initial mobile check
    const isMobile = checkMobile();
    setState((prev) => ({ ...prev, isMobile }));

    if (!isMobile || !window.visualViewport) return;

    // Handle keyboard visibility using visualViewport API
    const handleViewportChange = () => {
      if (!window.visualViewport) return;

      const viewport = window.visualViewport;
      const windowHeight = window.innerHeight;
      const viewportHeight = viewport.height;

      // If viewport height is significantly smaller than window height,
      // keyboard is likely open
      const keyboardHeight = windowHeight - viewportHeight;
      const isKeyboardVisible = keyboardHeight > 150; // threshold to avoid false positives

      setState((prev) => ({
        ...prev,
        isKeyboardVisible,
        keyboardHeight: isKeyboardVisible ? keyboardHeight : 0,
      }));
    };

    // Handle resize to update mobile state
    const handleResize = () => {
      const isMobile = checkMobile();
      setState((prev) => ({ ...prev, isMobile }));
      handleViewportChange();
    };

    // Add event listeners
    window.visualViewport?.addEventListener('resize', handleViewportChange);
    window.visualViewport?.addEventListener('scroll', handleViewportChange);
    window.addEventListener('resize', handleResize);

    // Initial check
    handleViewportChange();

    // Cleanup
    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
      window.visualViewport?.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
}

