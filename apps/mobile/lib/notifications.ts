import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure notification behavior when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationData {
  type?: string;
  workspaceId?: number;
  messageId?: number;
  [key: string]: any;
}

/**
 * Register for push notifications and store token in Supabase
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (!Device.isDevice) {
    console.log('Push notifications only work on physical devices');
    return null;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permissions if not granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push notification permissions');
    return null;
  }

  // Get Expo push token
  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: 'eca7ce65-e179-43c8-8e0a-74460673cc32', // From app.json
    });
    token = tokenData.data;
    console.log('Expo push token:', token);
  } catch (error) {
    console.error('Error getting Expo push token:', error);
    return null;
  }

  // Configure Android notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
      enableVibrate: true,
      showBadge: true,
    });
  }

  // Store token in Supabase
  if (token) {
    await storePushToken(token);
  }

  return token;
}

/**
 * Store or update push token in Supabase
 */
async function storePushToken(expoPushToken: string): Promise<void> {
  try {
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('No authenticated user to store push token');
      return;
    }

    const deviceId = Device.modelName || 'unknown';
    const platform = Platform.OS;

    // Upsert token (insert or update if exists)
    const { error } = await supabase
      .from('push_tokens')
      .upsert(
        {
          user_id: user.id,
          expo_push_token: expoPushToken,
          device_id: deviceId,
          platform: platform,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'expo_push_token',
        }
      );

    if (error) {
      console.error('Error storing push token:', error);
    } else {
      console.log('Push token stored successfully');
    }
  } catch (error) {
    console.error('Error in storePushToken:', error);
  }
}

/**
 * Remove push token from Supabase (e.g., on logout)
 */
export async function removePushToken(): Promise<void> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Get the current token
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: 'eca7ce65-e179-43c8-8e0a-74460673cc32',
    });

    if (tokenData?.data) {
      const { error } = await supabase
        .from('push_tokens')
        .delete()
        .eq('expo_push_token', tokenData.data);

      if (error) {
        console.error('Error removing push token:', error);
      } else {
        console.log('Push token removed successfully');
      }
    }
  } catch (error) {
    console.error('Error in removePushToken:', error);
  }
}

/**
 * Set up notification listeners
 */
export function setupNotificationListeners(
  onNotificationReceived?: (notification: Notifications.Notification) => void,
  onNotificationResponse?: (response: Notifications.NotificationResponse) => void
) {
  // Listen for notifications received while app is foregrounded
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('Notification received:', notification);
      onNotificationReceived?.(notification);
    }
  );

  // Listen for user interactions with notifications
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
      onNotificationResponse?.(response);
    });

  // Return cleanup function
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

/**
 * Get notification badge count
 */
export async function getBadgeCount(): Promise<number> {
  return await Notifications.getBadgeCountAsync();
}

/**
 * Set notification badge count
 */
export async function setBadgeCount(count: number): Promise<void> {
  await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear all notifications
 */
export async function clearAllNotifications(): Promise<void> {
  await Notifications.dismissAllNotificationsAsync();
}

