import { StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useEffect } from 'react';
import WebAppView from '@/components/WebAppView';
import { Config } from '@/constants/config';

export default function HomeScreen() {
  const { session, isLoading, isLoggedIn } = useAuthContext();

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

  return <WebAppView url={Config.webAppUrl} session={session} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
