import { Router } from 'expo-router';
import type { NotificationData } from './notifications';

/**
 * Handle notification response by navigating to the appropriate screen
 */
export function handleNotificationResponse(
  data: NotificationData,
  router: Router
): void {
  if (!data || !data.type) {
    return;
  }

  switch (data.type) {
    case 'workspace_message':
      if (data.workspaceId && data.messageId) {
        router.push({
          pathname: '/(tabs)',
          params: {
            workspaceId: data.workspaceId.toString(),
            messageId: data.messageId.toString(),
            action: 'navigate_to_message',
          },
        });
      }
      break;

    case 'mention':
      if (data.workspaceId && data.messageId) {
        router.push({
          pathname: '/(tabs)',
          params: {
            workspaceId: data.workspaceId.toString(),
            messageId: data.messageId.toString(),
            action: 'navigate_to_message',
          },
        });
      }
      break;

    case 'ai_notification':
      // Navigate to home page with notificationId to trigger notification action
      if (data.notificationId) {
        console.log('📍 Navigating to home with notificationId', data.notificationId);
        router.push({
          pathname: '/(tabs)',
          params: {
            notificationId: data.notificationId.toString(),
            action: 'trigger_notification',
          },
        });
      } else {
        // Fallback: just navigate to home if no notificationId
        router.push('/(tabs)');
      }
      break;

    default:
      console.log('Unknown notification type:', data.type);
      // Just open the app to home screen
      router.push('/(tabs)');
      break;
  }
}

/**
 * Build WebView URL with notification data as query parameters
 */
export function buildWebViewUrlWithNotification(
  baseUrl: string,
  data: NotificationData
): string {
  const url = new URL(baseUrl);

  if (data.type === 'workspace_message' || data.type === 'mention') {
    if (data.workspaceId && data.messageId) {
      // Add query parameters that the web app will read
      url.searchParams.set('workspaceId', data.workspaceId.toString());
      url.searchParams.set('messageId', data.messageId.toString());
      url.searchParams.set('action', 'navigate_to_message');
    }
  } else if (data.type === 'ai_notification') {
    // Navigate to workspace with notification drawer open
    url.pathname = '/workspace';
    url.searchParams.set('notification', 'open');
    if (data.notificationId) {
      url.searchParams.set('notificationId', data.notificationId.toString());
    }
  }

  return url.toString();
}

/**
 * Generate postMessage script to navigate WebView to specific content
 */
export function generateNavigationScript(data: NotificationData): string {
  if (data.type === 'workspace_message' || data.type === 'mention') {
    if (data.workspaceId && data.messageId) {
      return `
        (function() {
          window.postMessage({
            type: 'NAVIGATE_TO_MESSAGE',
            workspaceId: ${data.workspaceId},
            messageId: ${data.messageId}
          }, '*');
        })();
        true; // Required for iOS
      `;
    }
  }

  if (data.type === 'ai_notification') {
    if (data.notificationId) {
      return `
        (function() {
          window.postMessage({
            type: 'TRIGGER_NOTIFICATION',
            notificationId: ${data.notificationId}
          }, '*');
        })();
        true; // Required for iOS
      `;
    }
  }

  return '';
}

