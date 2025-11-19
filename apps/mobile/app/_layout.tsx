// Note: Polyfills removed due to compatibility issues
// React Native fetch doesn't support streaming responses natively

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SplashScreenController } from '@/components/splash-screen-controller';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AuthProvider from '@/providers/auth-provider';
import { ThreadProvider } from '@/contexts/thread-context';
import { supabase } from '@/lib/supabase';

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

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

  return (
    <Stack>
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

  // Initialize the shared API package with mobile's Supabase client
  useEffect(() => {
    const { setClient } = require('@cogni/api');
    setClient(supabase);
    console.log('📱 Mobile Supabase client initialized for @cogni/api');
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <ThreadProvider>
          <SplashScreenController />
          <RootNavigator />
          <StatusBar style="auto" />
        </ThreadProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
