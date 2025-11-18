import { supabase } from '@/lib/supabase';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

function GoogleSignInButtonComponent() {
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Google sign in successful:', codeResponse);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error('Error signing in with Google:', error);
      }

      if (data) {
        console.log('Google sign in successful:', data);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  return (
    <TouchableOpacity
      onPress={() => login()}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
        style={styles.icon}
      />
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

export default function GoogleSignInButton() {
  const clientId = process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID ?? '';

  if (!clientId) {
    console.error('EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID is not set');
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleSignInButtonComponent />
    </GoogleOAuthProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
});

