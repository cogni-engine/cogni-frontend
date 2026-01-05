import { supabase } from '@/lib/supabase';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function AppleSignInButton() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check if Apple Authentication is available
    AppleAuthentication.isAvailableAsync().then(setIsAvailable);
  }, []);

  function extractParamsFromUrl(url: string) {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash.substring(1); // Remove the leading '#'
    const params = new URLSearchParams(hash);

    return {
      access_token: params.get('access_token'),
      expires_in: parseInt(params.get('expires_in') || '0'),
      refresh_token: params.get('refresh_token'),
      token_type: params.get('token_type'),
      provider_token: params.get('provider_token'),
      code: params.get('code'),
    };
  }

  async function onSignInButtonPress() {
    console.debug('onSignInButtonPress - Apple - start');

    // On iOS, use native Apple Sign In
    if (Platform.OS === 'ios' && isAvailable) {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        console.debug('onSignInButtonPress - Apple - credential received', {
          user: credential.user,
          email: credential.email,
          fullName: credential.fullName,
        });

        if (!credential.identityToken) {
          console.error('onSignInButtonPress - Apple - no identity token');
          return;
        }

        // Sign in with Supabase using the identity token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });

        if (error) {
          console.error('onSignInButtonPress - Apple - signInWithIdToken error', error);
          return;
        }

        console.debug('onSignInButtonPress - Apple - signInWithIdToken success', data);
      } catch (error: any) {
        if (error.code === 'ERR_REQUEST_CANCELED') {
          // User canceled the sign-in
          console.debug('onSignInButtonPress - Apple - user canceled');
          return;
        }
        console.error('onSignInButtonPress - Apple - error', error);
      }
    } else {
      // Fallback to web-based OAuth for Android/web
      console.debug('onSignInButtonPress - Apple - using web OAuth fallback');

      const redirectUrl = 'cogni://auth/callback';

      const res = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      const appleOAuthUrl = res.data.url;

      if (!appleOAuthUrl) {
        console.error('onSignInButtonPress - Apple - no oauth url found!');
        return;
      }

      const result = await WebBrowser.openAuthSessionAsync(
        appleOAuthUrl,
        redirectUrl,
        { showInRecents: true }
      ).catch((err) => {
        console.error('onSignInButtonPress - Apple - openAuthSessionAsync - error', { err });
        console.log(err);
      });

      console.debug('onSignInButtonPress - Apple - openAuthSessionAsync - result', { result });

      if (result && result.type === 'success') {
        console.debug('onSignInButtonPress - Apple - openAuthSessionAsync - success');
        const params = extractParamsFromUrl(result.url);
        console.debug('onSignInButtonPress - Apple - openAuthSessionAsync - success', { params });

        if (params.access_token && params.refresh_token) {
          console.debug('onSignInButtonPress - Apple - setSession');
          const { data, error } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          });

          console.debug('onSignInButtonPress - Apple - setSession - success', { data, error });
          return;
        } else {
          console.error('onSignInButtonPress - Apple - setSession - failed');
        }
      } else {
        console.error('onSignInButtonPress - Apple - openAuthSessionAsync - failed');
      }
    }
  }

  // Don't render on iOS if Apple Authentication is not available
  if (Platform.OS === 'ios' && !isAvailable) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onSignInButtonPress}
      style={styles.button}
      activeOpacity={0.8}
    >
      <AntDesign name="apple" size={20} color="#fff" style={styles.icon} />
      <Text style={styles.text}>Continue with Apple</Text>
    </TouchableOpacity>
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
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 2,
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

