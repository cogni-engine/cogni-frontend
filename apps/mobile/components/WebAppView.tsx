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

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError(`Error loading page: ${nativeEvent.description || 'Unknown error'}`);
    console.error('WebView error:', nativeEvent);
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
            // Reload to apply the cookies
            window.location.href = '${url}/home';
          } else {
            console.error('Mobile authentication failed:', data.error);
            window.ReactNativeWebView.postMessage(JSON.stringify({ 
              type: 'AUTH_ERROR', 
              error: data.error || 'Authentication failed' 
            }));
          }
        } catch (e) {
          console.error('Mobile auth exception:', e);
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'AUTH_ERROR', 
            error: e.message || 'Network error' 
          }));
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
        console.log('Authentication successful in WebView');
        setAuthInitialized(true);
      } else if (message.type === 'AUTH_ERROR') {
        console.error('Authentication error:', message.error);
        setError(`Authentication failed: ${message.error}`);
        setLoading(false);
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
        onLoadEnd={() => {
          setLoading(false);
          // If we have a session but haven't initialized auth yet, inject the auth script
          if (session && !authInitialized) {
            const script = getInjectedJavaScript();
            if (script) {
              webViewRef.current?.injectJavaScript(script);
            }
          }
        }}
        onError={handleError}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
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

