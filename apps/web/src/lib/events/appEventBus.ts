/**
 * Global App Event Bus
 * Decouples features from app components via event-driven architecture
 * Components emit generic app events, features subscribe to what they need
 */

export type AppEvent =
  | {
      type: 'WORKSPACE_MESSAGE_SENT';
      workspaceId: number;
      messageText?: string;
    }
  | { type: 'NOTE_OPENED'; noteId: number; workspaceId: number }
  | {
      type: 'NOTE_AI_SUGGESTION_REQUESTED';
      noteId: number;
      workspaceId: number;
      instruction: string;
    }
  | {
      type: 'NOTE_AI_SUGGESTION_ACCEPTED';
      noteId: number;
      workspaceId: number;
      suggestionId?: string;
    }
  | { type: 'NOTIFICATION_BELL_CLICKED' }
  | { type: 'NOTIFICATION_VIEWED'; notificationId: number }
  | {
      type: 'NOTIFICATION_REACTION_SELECTED';
      notificationId: number;
      reaction: 'completed' | 'postponed';
      reactionText?: string;
    }
  | { type: 'ACTIVITY_DRAWER_OPENED'; workspaceId: number }
  | { type: 'MEMBER_INVITE_CLICKED'; workspaceId: number }
  | { type: 'MEMBER_INVITE_SHARED'; workspaceId: number }
  | { type: 'MEMBER_INVITE_DRAWER_CLOSED'; workspaceId: number };

class AppEventBus {
  private listeners = new Set<(event: AppEvent) => void>();

  emit(event: AppEvent) {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('App event listener error:', error);
      }
    });
  }

  subscribe(listener: (event: AppEvent) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  clear() {
    this.listeners.clear();
  }

  getListenerCount() {
    return this.listeners.size;
  }
}

// Singleton instance
let appEventBusInstance: AppEventBus | null = null;

/**
 * Get the global app event bus singleton
 * Creates instance on first call
 */
export function getAppEventBus(): AppEventBus {
  if (typeof window === 'undefined') {
    // Server-side: create new instance per request (SSR safety)
    return new AppEventBus();
  }

  // Client-side: true singleton
  if (!appEventBusInstance) {
    appEventBusInstance = new AppEventBus();
  }
  return appEventBusInstance;
}

/**
 * Reset the event bus singleton (useful for testing)
 */
export function resetAppEventBus() {
  appEventBusInstance?.clear();
  appEventBusInstance = null;
}
