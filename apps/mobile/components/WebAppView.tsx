import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Session } from '@supabase/supabase-js';

interface WebAppViewProps {
  url?: string;
  session?: Session | null;
}

export default function WebAppView({ url = 'https://cogno.studio', session }: WebAppViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const colorScheme = useColorScheme();

  // Validate URL on mount
  React.useEffect(() => {
    console.log('WebAppView initialized with URL:', url);
    console.log('Session available:', !!session);
    if (!url || url === '') {
      console.error('Invalid URL provided to WebAppView');
      setError('Invalid URL configuration');
      setLoading(false);
    }
  }, [url, session]);

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    
    // Ignore errors after successful authentication (navigation errors are expected)
    if (authInitialized) {
      console.log('Ignoring error after successful auth (expected during navigation)');
      return;
    }
    
    setLoading(false);
    const errorMsg = `Error loading ${url}: ${nativeEvent.description || 'Unknown error'}`;
    setError(errorMsg);
    console.error('WebView error:', { url, ...nativeEvent });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setAuthInitialized(false);
    webViewRef.current?.reload();
  };

  // Generate the injected JavaScript to authenticate the session
  const getInjectedJavaScript = () => {
    if (!session?.access_token || !session?.refresh_token) {
      return '';
    }

    return `
      (async function() {
        try {
          console.log('Starting mobile authentication...');
          
          // Wait for DOM to be ready
          if (document.readyState === 'loading') {
            await new Promise(resolve => {
              document.addEventListener('DOMContentLoaded', resolve);
            });
          }
          
          // Show we're authenticating
          if (document.body) {
            document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;"><div style="text-align: center;"><div style="font-size: 18px; margin-bottom: 10px;">Authenticating...</div><div style="font-size: 14px; color: #666;">Setting up your session</div></div></div>';
          }
          
          const response = await fetch('${url}/api/mobile-auth', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              access_token: '${session.access_token}',
              refresh_token: '${session.refresh_token}'
            })
          });
          
          const data = await response.json();
          
          if (response.ok && data.success) {
            console.log('Mobile authentication successful');
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'AUTH_SUCCESS' }));
            // Small delay to ensure message is sent, then navigate
            setTimeout(() => {
              window.location.href = '${url}/home';
            }, 100);
          } else {
            console.error('Mobile authentication failed:', data.error);
            window.ReactNativeWebView.postMessage(JSON.stringify({ 
              type: 'AUTH_ERROR', 
              error: data.error || 'Authentication failed' 
            }));
            if (document.body) {
              document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;"><div style="text-align: center;"><div style="font-size: 18px; color: red; margin-bottom: 10px;">Authentication Failed</div><div style="font-size: 14px; color: #666;">' + (data.error || 'Unknown error') + '</div></div></div>';
            }
          }
        } catch (e) {
          console.error('Mobile auth exception:', e);
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'AUTH_ERROR', 
            error: e.message || 'Network error' 
          }));
          if (document.body) {
            document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;"><div style="text-align: center;"><div style="font-size: 18px; color: red; margin-bottom: 10px;">Connection Error</div><div style="font-size: 14px; color: #666;">' + e.message + '</div></div></div>';
          }
        }
      })();
      true;
    `;
  };

  // Handle messages from the WebView
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      
      if (message.type === 'AUTH_SUCCESS') {
        console.log('Authentication successful, marking as initialized');
        setAuthInitialized(true);
        setLoading(false);
        // Navigate using WebView navigation instead of window.location
        // This avoids the "Load failed" error
      } else if (message.type === 'AUTH_ERROR') {
        // Only show error if it's not related to navigation
        if (!message.error?.includes('Load failed') && !authInitialized) {
          console.error('Authentication error:', message.error);
          setError(`Authentication failed: ${message.error}`);
          setLoading(false);
        } else {
          console.log('Ignoring navigation-related error:', message.error);
        }
      }
    } catch {
      // Non-JSON message from WebView, ignore
      console.log('Non-JSON message from WebView:', event.nativeEvent.data);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={Colors[colorScheme ?? 'light'].tint} 
          />
          <ThemedText style={styles.loadingText}>Loading {url}...</ThemedText>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <ThemedText type="subtitle" style={styles.errorTitle}>
            Connection Error
          </ThemedText>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <ThemedText style={styles.errorDetails}>
            URL: {url}
          </ThemedText>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => {
          setLoading(true);
          setError(null);
        }}
        onLoadEnd={(event) => {
          const loadedUrl = event.nativeEvent.url;
          console.log('WebView loaded:', loadedUrl, 'auth initialized:', authInitialized);
          setLoading(false);
          
          // Only inject auth script if we're on the login page and not yet authenticated
          const isLoginPage = loadedUrl.includes('/login');
          
          if (session && !authInitialized && isLoginPage) {
            const script = getInjectedJavaScript();
            if (script) {
              console.log('Injecting authentication script on login page...');
              // Use a small timeout to ensure DOM is ready
              setTimeout(() => {
                webViewRef.current?.injectJavaScript(script);
              }, 100);
            }
          } else if (authInitialized && isLoginPage) {
            // If we're authenticated but back on login page, redirect to home
            console.log('Already authenticated, redirecting from login to home...');
            webViewRef.current?.injectJavaScript(`
              window.location.href = '${url}/home';
              true;
            `);
          }
        }}
        onError={handleError}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          // Ignore HTTP errors after successful auth (might be redirects)
          if (authInitialized) {
            console.log('HTTP status during navigation:', nativeEvent.statusCode);
            return;
          }
          console.warn('WebView HTTP error:', nativeEvent.statusCode, nativeEvent.description);
        }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        // Allow media playback
        mediaPlaybackRequiresUserAction={false}
        // Allow for better navigation
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
        // Security
        originWhitelist={['*']}
        // Performance
        androidLayerType="hardware"
        // Enable mixed content for Android
        mixedContentMode="always"
        // Allow file access
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        // Enable third-party cookies for session management
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        // Inject auth script as soon as possible
        injectedJavaScriptBeforeContentLoaded={
          session && !authInitialized ? getInjectedJavaScript() : undefined
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    opacity: 0.7,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

