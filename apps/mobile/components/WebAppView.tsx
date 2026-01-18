import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, Animated, Easing, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedView } from './themed-view';
import { Session } from '@supabase/supabase-js';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import type { NotificationData } from '@/lib/notifications';
import { generateNavigationScript } from '@/lib/deep-linking';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';

interface WebAppViewProps {
  url?: string;
  session?: Session | null;
}

interface ImagePickerOptions {
  mediaTypes?: ('images' | 'videos')[];
  allowsEditing?: boolean;
  quality?: number;
  multiple?: boolean;
}

interface FilePickerOptions {
  type?: string[]; // MIME types, e.g., ['application/pdf', 'text/*']
  multiple?: boolean;
  copyToCacheDirectory?: boolean;
}

export default function WebAppView({ url = 'https://app.cogno.studio', session }: WebAppViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webViewReady, setWebViewReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start off-screen (below)
  const loadingOpacity = useRef(new Animated.Value(1)).current; // Start fully visible
  const iconOpacity = useRef(new Animated.Value(0.4)).current; // For icon fade animation
  const params = useLocalSearchParams();
  const pendingNavigationRef = useRef<NotificationData | null>(null);
  const lastProcessedParamsRef = useRef<string>('');

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

  // Check if we have notification data in params and trigger navigation
  useEffect(() => {
    if (params.action === 'navigate_to_message' && params.workspaceId && params.messageId) {
      // Create a unique key for these params to prevent duplicate processing
      const paramsKey = `${params.workspaceId}-${params.messageId}`;

      // Skip if we've already processed these exact params
      if (lastProcessedParamsRef.current === paramsKey) {
        console.log('⏭️  Skipping duplicate navigation for:', paramsKey);
        return;
      }

      console.log('🆕 New notification navigation params:', {
        workspaceId: params.workspaceId,
        messageId: params.messageId,
      });

      const workspaceId = parseInt(params.workspaceId as string, 10);
      const messageId = parseInt(params.messageId as string, 10);

      // Mark as processed immediately to prevent duplicates
      lastProcessedParamsRef.current = paramsKey;

      // Only navigate if WebView is ready
      if (webViewReady && webViewRef.current) {
        console.log('🚀 WebView is ready, sending postMessage for workspace', workspaceId, 'message', messageId);

        // Use postMessage to notify web app (no page reload!)
        const notificationData: NotificationData = {
          type: 'workspace_message',
          workspaceId: workspaceId,
          messageId: messageId,
        };
        const navigationScript = generateNavigationScript(notificationData);

        if (navigationScript) {
          console.log('✅ Injecting postMessage script');
          webViewRef.current.injectJavaScript(navigationScript);
        }
      } else {
        // WebView not ready yet, store for later
        console.log('⏰ WebView not ready, storing for later');
        const notificationData: NotificationData = {
          type: 'workspace_message',
          workspaceId: workspaceId,
          messageId: messageId,
        };
        pendingNavigationRef.current = notificationData;
      }
    }
  }, [params.action, params.workspaceId, params.messageId, webViewReady, url]);

  // Check if we have ai_notification data in params and trigger notification
  useEffect(() => {
    if (params.action === 'trigger_notification' && params.notificationId) {
      // Create a unique key for these params to prevent duplicate processing
      const paramsKey = `notification-${params.notificationId}`;

      // Skip if we've already processed these exact params
      if (lastProcessedParamsRef.current === paramsKey) {
        console.log('⏭️  Skipping duplicate notification trigger for:', paramsKey);
        return;
      }

      console.log('🆕 New notification trigger params:', {
        notificationId: params.notificationId,
      });

      const notificationId = parseInt(params.notificationId as string, 10);

      // Mark as processed immediately to prevent duplicates
      lastProcessedParamsRef.current = paramsKey;

      // Only trigger if WebView is ready
      if (webViewReady && webViewRef.current) {
        console.log('🚀 WebView is ready, sending TRIGGER_NOTIFICATION postMessage for notificationId', notificationId);

        // Use postMessage to notify web app (no page reload!)
        const notificationData: NotificationData = {
          type: 'ai_notification',
          notificationId: notificationId,
        };
        const navigationScript = generateNavigationScript(notificationData);

        if (navigationScript) {
          console.log('✅ Injecting TRIGGER_NOTIFICATION postMessage script');
          webViewRef.current.injectJavaScript(navigationScript);
        }
      } else {
        // WebView not ready yet, store for later
        console.log('⏰ WebView not ready, storing notification trigger for later');
        const notificationData: NotificationData = {
          type: 'ai_notification',
          notificationId: notificationId,
        };
        pendingNavigationRef.current = notificationData;
      }
    }
  }, [params.action, params.notificationId, webViewReady, url]);

  // Handle pending navigation after WebView loads (for initial app launch)
  useEffect(() => {
    if (webViewReady && pendingNavigationRef.current && webViewRef.current) {
      const data = pendingNavigationRef.current;
      console.log('🎬 WebView just became ready, processing pending navigation:', data);

      if (data.workspaceId && data.messageId) {
        console.log('🚀 Sending postMessage for workspace', data.workspaceId, 'message', data.messageId);

        // Use postMessage to notify web app (no page reload!)
        const navigationScript = generateNavigationScript(data);

        if (navigationScript) {
          // Wait a bit for auth and page to be fully ready
          setTimeout(() => {
            if (webViewRef.current) {
              console.log('✅ Injecting postMessage script');
              webViewRef.current.injectJavaScript(navigationScript);
              pendingNavigationRef.current = null; // Clear after use
              console.log('🧹 Cleared pending navigation');
            }
          }, 1500);
        }
      } else if (data.type === 'ai_notification' && data.notificationId) {
        console.log('🚀 Sending TRIGGER_NOTIFICATION postMessage for notificationId', data.notificationId);

        // Use postMessage to notify web app (no page reload!)
        const navigationScript = generateNavigationScript(data);

        if (navigationScript) {
          // Wait a bit for auth and page to be fully ready
          setTimeout(() => {
            if (webViewRef.current) {
              console.log('✅ Injecting TRIGGER_NOTIFICATION postMessage script');
              webViewRef.current.injectJavaScript(navigationScript);
              pendingNavigationRef.current = null; // Clear after use
              console.log('🧹 Cleared pending notification trigger');
            }
          }, 1500);
        }
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

  // Fade out loading screen when loading completes
  useEffect(() => {
    if (!loading && !error) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Hide component after fade completes
        setShowLoading(false);
      });
    } else if (loading) {
      // Reset opacity and show when loading starts
      loadingOpacity.setValue(1);
      setShowLoading(true);
    }
  }, [loading, error, loadingOpacity]);

  // Fade in/out animation for loading icon
  // Fade in animation for loading icon
  useEffect(() => {
    if (showLoading && !error) {
      iconOpacity.setValue(0);
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [showLoading, error, iconOpacity]);

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

  // Handle native image picker from library
  const handleImagePick = async (requestId?: string, options?: ImagePickerOptions) => {
    try {
      // Request permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to upload images.');
        
        // Send error response
        if (requestId) {
          webViewRef.current?.postMessage(JSON.stringify({
            type: 'NATIVE_IMAGE_ERROR',
            requestId,
            error: 'Permission denied',
          }));
        }
        return;
      }

      // Launch image picker (library only, no camera)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: options?.mediaTypes || ['images'],
        allowsEditing: options?.allowsEditing ?? false,
        quality: options?.quality ?? 0.8,
        base64: true, // Get base64 data to send to web
        allowsMultipleSelection: options?.multiple ?? false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const assets = result.assets.map(asset => ({
          uri: asset.uri,
          base64: asset.base64,
          mimeType: asset.mimeType || 'image/jpeg',
          fileName: asset.fileName || `image_${Date.now()}.jpg`,
          width: asset.width,
          height: asset.height,
          fileSize: asset.fileSize,
        }));
        
        // Send image data to WebView
        const imageData = {
          type: 'NATIVE_IMAGE_SELECTED',
          requestId,
          data: options?.multiple ? assets : assets[0],
        };

        // Send to WebView via postMessage
        webViewRef.current?.postMessage(JSON.stringify(imageData));
        console.log(`${assets.length} image(s) selected and sent to WebView`);
      } else {
        // User canceled
        if (requestId) {
          webViewRef.current?.postMessage(JSON.stringify({
            type: 'NATIVE_IMAGE_CANCELED',
            requestId,
          }));
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      
      // Send error response
      if (requestId) {
        webViewRef.current?.postMessage(JSON.stringify({
          type: 'NATIVE_IMAGE_ERROR',
          requestId,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    }
  };

  // Handle native camera
  const handleCameraPick = async (requestId?: string, options?: ImagePickerOptions) => {
    try {
      // Request camera permissions
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your camera to take photos.');
        
        // Send error response
        if (requestId) {
          webViewRef.current?.postMessage(JSON.stringify({
            type: 'NATIVE_IMAGE_ERROR',
            requestId,
            error: 'Camera permission denied',
          }));
        }
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: options?.mediaTypes || ['images'],
        allowsEditing: options?.allowsEditing ?? false,
        quality: options?.quality ?? 0.8,
        base64: true, // Get base64 data to send to web
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        // Send image data to WebView
        const imageData = {
          type: 'NATIVE_IMAGE_SELECTED',
          requestId,
          data: {
            uri: asset.uri,
            base64: asset.base64,
            mimeType: asset.mimeType || 'image/jpeg',
            fileName: asset.fileName || `photo_${Date.now()}.jpg`,
            width: asset.width,
            height: asset.height,
            fileSize: asset.fileSize,
          },
        };

        // Send to WebView via postMessage
        webViewRef.current?.postMessage(JSON.stringify(imageData));
        console.log('Photo captured and sent to WebView');
      } else {
        // User canceled
        if (requestId) {
          webViewRef.current?.postMessage(JSON.stringify({
            type: 'NATIVE_IMAGE_CANCELED',
            requestId,
          }));
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      
      // Send error response
      if (requestId) {
        webViewRef.current?.postMessage(JSON.stringify({
          type: 'NATIVE_IMAGE_ERROR',
          requestId,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    }
  };

  // Handle native document picker
  const handleFilePick = async (requestId?: string, options?: FilePickerOptions) => {
    try {
      // Launch document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: options?.type || '*/*', // All file types by default
        multiple: options?.multiple ?? false,
        copyToCacheDirectory: options?.copyToCacheDirectory ?? true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Read files as base64 and prepare data
        const assets = await Promise.all(
          result.assets.map(async (asset) => {
            // Read file as base64
            const base64 = await FileSystem.readAsStringAsync(asset.uri, {
              encoding: 'base64',
            });

            return {
              uri: asset.uri,
              base64,
              mimeType: asset.mimeType || 'application/octet-stream',
              fileName: asset.name || `file_${Date.now()}`,
              fileSize: asset.size || 0,
            };
          })
        );

        // Send file data to WebView
        const fileData = {
          type: 'NATIVE_FILE_SELECTED',
          requestId,
          data: options?.multiple ? assets : assets[0],
        };

        webViewRef.current?.postMessage(JSON.stringify(fileData));
        console.log(`${assets.length} file(s) selected and sent to WebView`);
      } else {
        // User canceled
        if (requestId) {
          webViewRef.current?.postMessage(JSON.stringify({
            type: 'NATIVE_FILE_CANCELED',
            requestId,
          }));
        }
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'Failed to pick file. Please try again.');
      
      // Send error response
      if (requestId) {
        webViewRef.current?.postMessage(JSON.stringify({
          type: 'NATIVE_FILE_ERROR',
          requestId,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    }
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

        case 'PICK_IMAGE':
          // Web app requesting native image picker
          console.log('Image picker requested from web');
          await handleImagePick(message.requestId, message.options);
          break;

        case 'PICK_CAMERA':
          // Web app requesting native camera
          console.log('Camera requested from web');
          await handleCameraPick(message.requestId, message.options);
          break;

        case 'PICK_FILE':
          // Web app requesting native document picker
          console.log('Document picker requested from web');
          await handleFilePick(message.requestId, message.options);
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
    <>
      {/* Black background that extends beyond safe area */}
      <View style={styles.absoluteBackground} />
      
      <ThemedView style={[styles.container, {
        paddingTop: Math.max(insets.top - 10, 0), // Reduce top inset by 10px
        paddingBottom: 0, // Remove bottom padding to eliminate white edges
      }]}>
        {/* WebView - visually hidden until loaded */}
      <WebView
        ref={webViewRef}
        source={{
          uri: authUrl,
          // Add custom headers to identify mobile app and bypass ngrok warning
          headers: {
            'X-Mobile-App': 'true',
            'User-Agent': 'Cogni-Mobile-App/1.0', // Custom UA to bypass ngrok warning
            'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page for dev
          }
        }}
        style={[styles.webview, { opacity: loading || error ? 0 : 1, backgroundColor: '#000' }]}
        containerStyle={{ backgroundColor: '#000' }}
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
        mediaCapturePermissionGrantType="deny"
        // Enable third-party cookies for session management
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        // Keyboard management
        keyboardDisplayRequiresUserAction={false}
        hideKeyboardAccessoryView={true} // iOS only - hides the toolbar above keyboard
        autoManageStatusBarEnabled={false}
        // Caching - improves performance on repeat visits
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT" // Use cache when available, fetch if stale
        incognito={false} // Ensure cache is persisted
      />

      {/* Loading Screen - shown until page loads, fades out */}
      {showLoading && !error && (
        <Animated.View style={[styles.loadingContainer, { opacity: loadingOpacity }]}>
          <Animated.Image
            source={require('@/assets/images/cogno-icon.png')}
            style={[styles.loadingIcon, { opacity: iconOpacity }]}
            resizeMode="contain"
          />
        </Animated.View>
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
    </>
  );
}

const styles = StyleSheet.create({
  absoluteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  loadingIcon: {
    width: 250,
    height: 250,
  },
  loadingIndicatorContainer: {
    marginTop: 24,
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

