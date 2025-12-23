import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';

import { useAuthContext } from '@/hooks/use-auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useNotificationBadge } from '@/hooks/use-notification-badge';
import AuthProvider from '@/providers/auth-provider';
import {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
  syncBadgeCount,
  type NotificationData,
} from '@/lib/notifications';
import { handleNotificationResponse } from '@/lib/deep-linking';
import { WebViewPreloader } from '@/components/WebViewPreloader';

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();
  const notificationListener = useRef<(() => void) | null>(null);
  
  // Manage app icon badge count
  useNotificationBadge();

  // Handle authentication redirects
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to login if not logged in
      router.replace('/auth/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to home if logged in
      router.replace('/(tabs)');
    }
  }, [isLoggedIn, isLoading, segments, router]);

  // Register for push notifications when user is logged in
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      registerForPushNotificationsAsync().catch((error) => {
        console.error('Error registering for push notifications:', error);
      });
    }
  }, [isLoggedIn, isLoading]);

  // Set up notification listeners
  useEffect(() => {
    // Clean up any existing listeners
    if (notificationListener.current) {
      notificationListener.current();
    }

    // Set up new listeners
    const cleanup = setupNotificationListeners(
      // On notification received (foreground)
      async (notification) => {
        console.log('📬 Notification received in foreground');
        // Sync badge count when notification is received
        await syncBadgeCount();
      },
      // On notification tapped (user interaction)
      async (response) => {
        const data = response.notification.request.content.data as NotificationData;
        console.log('🔔 Notification tapped:', data);
        handleNotificationResponse(data, router);
        // Sync badge count after a short delay to allow message to be marked as read
        setTimeout(async () => {
          await syncBadgeCount();
        }, 1000);
      }
    );

    notificationListener.current = cleanup;

    // Also handle notification that opened the app
    Notifications.getLastNotificationResponseAsync().then(
      async (response: Notifications.NotificationResponse | null) => {
        if (response && isLoggedIn) {
          const data = response.notification.request.content
            .data as NotificationData;
          handleNotificationResponse(data, router);
          // Sync badge when app opens from notification
          await syncBadgeCount();
        } else if (isLoggedIn) {
          // Even if no notification opened the app, sync badge on app start
          await syncBadgeCount();
        }
      }
    );

    return () => {
      if (notificationListener.current) {
        notificationListener.current();
      }
    };
  }, [router, isLoggedIn]);

  return (
    <Stack
      screenOptions={{
        animation: 'none', // Disable slide animations for smoother transitions
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <WebViewPreloader />
        <RootNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
