import { useAuthContext } from '@/hooks/use-auth-context';
import { SplashScreen, useSegments } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading, isLoggedIn } = useAuthContext();
  const segments = useSegments();

  useEffect(() => {
    // Don't hide splash while loading
    if (isLoading) {
      return;
    }

    // Wait for navigation to settle before hiding splash
    // This prevents the flash of login screen
    const hideSplash = async () => {
      // Check if we're on a valid route
      const inAuthGroup = segments[0] === 'auth';
      const inTabsGroup = segments[0] === '(tabs)';
      
      if (!inAuthGroup && !inTabsGroup) {
        // Not on a valid route yet, wait a bit more
        return;
      }
      
      // If we're on tabs (logged in), wait longer for WebView to load
      // If we're on auth (login screen), shorter delay is fine
      const delay = inTabsGroup ? 500 : 150;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Double-check we're still on a valid route before hiding
      const currentInAuthGroup = segments[0] === 'auth';
      const currentInTabsGroup = segments[0] === '(tabs)';
      
      if (currentInAuthGroup || currentInTabsGroup) {
        SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [isLoading, isLoggedIn, segments]);

  return null;
}

