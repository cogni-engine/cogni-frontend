/**
 * Hook to emit global app events from components
 * Keeps components decoupled from any specific features
 */

import { useMemo } from 'react';
import { getAppEventBus } from '@/lib/events/appEventBus';

export function useAppEvents() {
  const bus = useMemo(() => getAppEventBus(), []);

  return useMemo(
    () => ({
      emitMessageSent: (workspaceId: number, messageText?: string) => {
        bus.emit({
          type: 'WORKSPACE_MESSAGE_SENT',
          workspaceId,
          messageText,
        });
      },

      emitNoteOpened: (noteId: number, workspaceId: number) => {
        bus.emit({
          type: 'NOTE_OPENED',
          noteId,
          workspaceId,
        });
      },

      emitNoteAISuggestionRequested: (
        noteId: number,
        workspaceId: number,
        instruction: string
      ) => {
        bus.emit({
          type: 'NOTE_AI_SUGGESTION_REQUESTED',
          noteId,
          workspaceId,
          instruction,
        });
      },

      emitNoteAISuggestionAccepted: (
        noteId: number,
        workspaceId: number,
        suggestionId?: string
      ) => {
        bus.emit({
          type: 'NOTE_AI_SUGGESTION_ACCEPTED',
          noteId,
          workspaceId,
          suggestionId,
        });
      },
    }),
    [bus]
  );
}
