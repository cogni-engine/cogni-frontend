import { supabase } from '@/lib/supabase';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
      <AntDesign name="google" size={20} color="#fff" style={styles.icon} />
      <Text style={styles.text}>Continue with Google</Text>
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#52525b', // zinc-600
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    width: '100%',
    height: 48,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});


