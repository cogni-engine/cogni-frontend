import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { syncBadgeCount } from '@/lib/notifications';

/**
 * Hook to manage the native app icon badge count
 * Syncs the badge with unread message count from Supabase
 */
export function useNotificationBadge() {
  useEffect(() => {
    // Sync badge count when app becomes active
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App came to foreground - sync badge with unread messages
        await syncBadgeCount();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Sync badge count on initial load
    syncBadgeCount().catch((error) => {
      console.error('Error syncing initial badge count:', error);
    });

    // Poll for badge updates every 30 seconds when app is active
    const pollInterval = setInterval(() => {
      if (AppState.currentState === 'active') {
        syncBadgeCount().catch((error) => {
          console.error('Error polling badge count:', error);
        });
      }
    }, 30000);

    return () => {
      appStateSubscription.remove();
      clearInterval(pollInterval);
    };
  }, []);

  // Note: Notification listeners are set up in app/_layout.tsx
  // We sync badge count through polling and app state changes instead
  // to avoid conflicts with the main notification listener setup
}

