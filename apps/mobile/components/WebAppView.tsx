import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedView } from './themed-view';
import { Session } from '@supabase/supabase-js';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { generateNavigationScript } from '@/lib/deep-linking';
import type { NotificationData } from '@/lib/notifications';

interface WebAppViewProps {
  url?: string;
  session?: Session | null;
}

export default function WebAppView({ url = 'https://cogno.studio', session }: WebAppViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webViewReady, setWebViewReady] = useState(false);
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start off-screen (below)
  const params = useLocalSearchParams();
  const pendingNavigationRef = useRef<NotificationData | null>(null);

  // Build auth URL with tokens for initial login
  const getAuthUrl = () => {
    if (!session?.access_token || !session?.refresh_token) {
      return url; // No session, load base URL
    }

    // Encode tokens for URL
    const params = new URLSearchParams({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    return `${url}/mobile-auth?${params.toString()}`;
  };

  const authUrl = getAuthUrl();

  // Check if we have notification data in params
  useEffect(() => {
    if (params.action === 'navigate_to_message' && params.workspaceId && params.messageId) {
      const notificationData: NotificationData = {
        type: 'workspace_message',
        workspaceId: parseInt(params.workspaceId as string, 10),
        messageId: parseInt(params.messageId as string, 10),
      };
      pendingNavigationRef.current = notificationData;
    }
  }, [params]);

  // Handle pending navigation after WebView loads
  useEffect(() => {
    if (webViewReady && pendingNavigationRef.current && webViewRef.current) {
      const script = generateNavigationScript(pendingNavigationRef.current);
      if (script) {
        console.log('Injecting navigation script for notification');
        webViewRef.current.injectJavaScript(script);
        pendingNavigationRef.current = null; // Clear after use
      }
    }
  }, [webViewReady]);

  // Animate slide-in when loading completes
  useEffect(() => {
    if (!loading && !error) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }).start();
    } else {
      // Reset to off-screen position when loading starts
      slideAnim.setValue(1000);
    }
  }, [loading, error, slideAnim]);

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError(`Error loading page: ${nativeEvent.description || 'Unknown error'}`);
    console.error('WebView error:', nativeEvent);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    webViewRef.current?.reload();
  };

  // Handle messages from the WebView
  const handleMessage = async (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      
      console.log('Received message from WebView:', message);
      
      switch (message.type) {
        case 'AUTH_REQUIRED':
          // Session expired or invalid - go back to native login
          console.log('Auth required, redirecting to login');
          router.replace('/auth/login');
          break;
          
        case 'LOGOUT':
          // User logged out from web - clear native session and go to login
          console.log('User logged out from web');
          
          // Clear native Supabase session
          try {
            await supabase.auth.signOut();
            console.log('Native session cleared');
          } catch (error) {
            console.error('Error clearing native session:', error);
          }
          
          // Clear WebView by reloading to base URL (no auth)
          // This clears cookies and forces fresh login
          webViewRef.current?.reload();
          
          // Navigate to login
          router.replace('/auth/login');
          break;
          
        case 'NAVIGATION':
          // Handle specific navigation requests from web
          console.log('Navigation request:', message.path);
          // Could handle special routes here if needed
          break;
          
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch {
      // Non-JSON message, ignore
      console.log('Non-JSON message from WebView:', event.nativeEvent.data);
    }
  };

  // Intercept navigation requests (iOS)
  const handleShouldStartLoadWithRequest = (request: any) => {
    const { url: requestUrl } = request;
    
    console.log('Navigation request:', requestUrl);
    
    // Block navigation to web login/register pages
    if (requestUrl.includes('/login') || 
        requestUrl.includes('/register') ||
        requestUrl.includes('/mobile-auth-required')) {
      console.log('Blocking web auth page, redirecting to native login');
      
      // Redirect to native login
      router.replace('/auth/login');
      return false; // Block the navigation
    }
    
    // Allow all other navigation
    return true;
  };

  // Handle navigation state changes (Android)
  const handleNavigationStateChange = (navState: any) => {
    if (Platform.OS === 'android') {
      const { url: navUrl } = navState;
      
      if (navUrl && (navUrl.includes('/login') || 
          navUrl.includes('/register') ||
          navUrl.includes('/mobile-auth-required'))) {
        console.log('Android: Blocking web auth page, redirecting to native login');
        router.replace('/auth/login');
        webViewRef.current?.stopLoading();
      }
    }
  };

  return (
      <ThemedView style={[styles.container, { 
        paddingTop: Math.max(insets.top - 10, 0), // Reduce top inset by 10px
        paddingBottom: Math.max(insets.bottom - 10, 0), // Reduce bottom inset by 10px
      }]}>
        {/* WebView - visually hidden until loaded */}
        <WebView
        ref={webViewRef}
        source={{ 
          uri: authUrl,
          // Add custom headers to identify mobile app
          headers: {
            'X-Mobile-App': 'true',
            'User-Agent': `${Platform.OS === 'ios' ? 'iOS' : 'Android'} Cogni-Mobile/1.0`,
          }
        }}
        style={[styles.webview, { opacity: loading || error ? 0 : 1 }]}
        onLoadStart={() => {
          setLoading(true);
          setError(null);
        }}
        onLoadEnd={() => {
          setLoading(false);
          setWebViewReady(true);
        }}
        onError={handleError}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error:', nativeEvent.statusCode, nativeEvent.description);
        }}
        onMessage={handleMessage}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest} // iOS navigation interception
        onNavigationStateChange={handleNavigationStateChange} // Android navigation handling
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

        {/* Loading Screen - shown until page loads */}
        {loading && !error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size="large" 
              color="#fff"
            />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        
        {/* Error Screen */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Connection Error</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorDetails}>URL: {url}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    zIndex: 2,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

