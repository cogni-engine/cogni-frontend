import { router } from 'expo-router';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useEffect } from 'react';
import WebAppView from '@/components/WebAppView';
import { Config } from '@/constants/config';

export default function HomeScreen() {
  const { session, isLoading, isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/auth/login');
    }
  }, [isLoading, isLoggedIn]);

  // Don't show loading screen here - splash screen handles initial loading
  // and WebAppView handles its own loading state
  if (!isLoggedIn || isLoading) {
    return null; // Return null while loading/not logged in - splash screen is visible
  }

  return <WebAppView url={Config.webAppUrl} session={session} />;
}
