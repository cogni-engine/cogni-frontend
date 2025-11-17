import { Image } from 'expo-image';
import { StyleSheet, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import SignOutButton from '@/components/auth/sign-out-button';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useEffect } from 'react';

export default function HomeScreen() {
  const { profile, isLoading, isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login' as any);
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Username</ThemedText>
        <ThemedText>{profile?.username || 'Not set'}</ThemedText>
        <ThemedText type="subtitle">Full name</ThemedText>
        <ThemedText>{profile?.full_name || 'Not set'}</ThemedText>
        <ThemedText type="subtitle">Email</ThemedText>
        <ThemedText>{profile?.email || 'Not set'}</ThemedText>
      </ThemedView>
      <SignOutButton />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
