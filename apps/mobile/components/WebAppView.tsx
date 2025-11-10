import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface WebAppViewProps {
  url?: string;
}

export default function WebAppView({ url = 'https://cogno.studio' }: WebAppViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    webViewRef.current?.reload();
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
        onLoadEnd={() => setLoading(false)}
        onError={handleError}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error:', nativeEvent.statusCode, nativeEvent.description);
        }}
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

