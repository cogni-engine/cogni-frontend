import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function AppleSignInButton() {
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
    console.debug('Apple sign in - start');

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
      console.error('no oauth url found!');
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(
      appleOAuthUrl,
      redirectUrl,
      { showInRecents: true }
    ).catch((err) => {
      console.error('Apple sign in - openAuthSessionAsync - error', { err });
      console.log(err);
    });

    console.debug('Apple sign in - openAuthSessionAsync - result', { result });

    if (result && result.type === 'success') {
      console.debug('Apple sign in - openAuthSessionAsync - success');
      const params = extractParamsFromUrl(result.url);
      console.debug('Apple sign in - extracted params', { params });

      if (params.access_token && params.refresh_token) {
        console.debug('Apple sign in - setSession');
        const { data, error } = await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });

        console.debug('Apple sign in - setSession - success', { data, error });
        return;
      } else {
        console.error('Apple sign in - setSession - failed');
        // sign in/up failed
      }
    } else {
      console.error('Apple sign in - openAuthSessionAsync - failed');
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
      activeOpacity={0.8}
    >
      <AntDesign name="apple1" size={20} color="#fff" style={styles.icon} />
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
