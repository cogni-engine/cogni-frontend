import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
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
    console.debug('onSignInButtonPress - start');

    const redirectUrl = 'cogni://auth/callback';

    const res = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: { prompt: 'consent' },
        skipBrowserRedirect: true,
      },
    });

    const googleOAuthUrl = res.data.url;

    if (!googleOAuthUrl) {
      console.error('no oauth url found!');
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(
      googleOAuthUrl,
      redirectUrl,
      { showInRecents: true }
    ).catch((err) => {
      console.error('onSignInButtonPress - openAuthSessionAsync - error', { err });
    });

    console.debug('onSignInButtonPress - openAuthSessionAsync - result', { result });

    if (result && result.type === 'success') {
      console.debug('onSignInButtonPress - openAuthSessionAsync - success');
      const params = extractParamsFromUrl(result.url);
      console.debug('onSignInButtonPress - openAuthSessionAsync - success', { params });

      if (params.access_token && params.refresh_token) {
        console.debug('onSignInButtonPress - setSession');
        const { data, error } = await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });

        console.debug('onSignInButtonPress - setSession - success', { data, error });
        return;
      } else {
        console.error('onSignInButtonPress - setSession - failed');
        // sign in/up failed
      }
    } else {
      console.error('onSignInButtonPress - openAuthSessionAsync - failed');
    }
  }

  // to warm up the browser
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onSignInButtonPress}
      style={styles.button}
      activeOpacity={0.9}
    >
      <View style={styles.iconContainer}>
        <AntDesign name="google" size={20} color="#000" />
      </View>
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    width: '100%',
    height: 44,
  },
  iconContainer: {
    position: 'absolute',
    left: 50,
  },
  text: {
    position: 'absolute',
    left: 90,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
