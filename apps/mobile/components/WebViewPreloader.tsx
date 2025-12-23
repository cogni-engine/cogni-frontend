import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Config } from '@/constants/config';

/**
 * Preloads the WebView in the background during auth loading.
 * This warms up the cache so the main WebView loads faster.
 * 
 * - If session exists: loads the auth URL to pre-authenticate
 * - If no session: loads base URL to cache static assets (JS, CSS, images)
 */
export function WebViewPreloader() {
  const { session, isLoading } = useAuthContext();
  const hasPreloaded = useRef(false);

  // Only preload once, and only while auth is still loading
  // Once auth resolves, the real WebView will mount
  if (!isLoading || hasPreloaded.current) {
    return null;
  }

  // Build URL - with auth tokens if available, otherwise base URL for caching
  const getPreloadUrl = () => {
    const baseUrl = Config.webAppUrl;
    
    if (session?.access_token && session?.refresh_token) {
      // Preload with auth to establish session
      const params = new URLSearchParams({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      return `${baseUrl}/mobile-auth?${params.toString()}`;
    }
    
    // No session yet - just preload base URL to cache static assets
    return baseUrl;
  };

  const preloadUrl = getPreloadUrl();

  return (
    <View style={styles.hidden} pointerEvents="none">
      <WebView
        source={{ uri: preloadUrl }}
        onLoadEnd={() => {
          hasPreloaded.current = true;
        }}
        // Caching enabled
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        incognito={false}
        // Minimal config for preloading
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // Don't show any UI
        startInLoadingState={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
  },
});



