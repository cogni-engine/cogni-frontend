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
    console.log('No notification data or type provided');
    return;
  }

  console.log('Handling notification response:', data);

  switch (data.type) {
    case 'workspace_message':
      if (data.workspaceId && data.messageId) {
        // Navigate to workspace chat with message ID
        // The WebView will handle scrolling to the specific message
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
      // Navigate to AI notifications/tasks
      router.push('/(tabs)');
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

  return '';
}

