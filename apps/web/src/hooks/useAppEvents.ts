/**
 * Hook to emit global app events from components
 * Keeps components decoupled from any specific features
 */

import { getAppEventBus } from '@/lib/events/appEventBus';

export function useAppEvents() {
  const bus = getAppEventBus();

  return {
    emitMessageSent: (workspaceId: number, messageText?: string) => {
      bus.emit({
        type: 'WORKSPACE_MESSAGE_SENT',
        workspaceId,
        messageText,
      });
    },
  };
}
