import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import GoogleSignInButton from '@/components/auth/google-sign-in-button';

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Welcome to Cogni
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign in to continue
          </ThemedText>

          <View style={styles.buttonContainer}>
            <GoogleSignInButton />
          </View>

          <Link href="/" style={styles.link}>
            <ThemedText type="link">Go to home screen</ThemedText>
          </Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

