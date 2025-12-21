'use client';

import { useRef } from 'react';
import { useMessages } from './useMessages';
import { useSendMessage } from './useSendMessage';
import type { ThreadId } from '@/contexts/ThreadContext';

export interface UseChatOptions {
  apiBaseUrl?: string;
  selectedThreadId: ThreadId;
  onThreadCreated?: (threadId: number) => void;
}

/**
 * Unified hook that combines thread management, messages, and sending
 * This hook provides a complete chat interface
 * Thread selection is managed externally (e.g., via ThreadContext)
 */
export function useChat({
  apiBaseUrl,
  selectedThreadId,
  onThreadCreated,
}: UseChatOptions) {
  // Track the actual thread ID (may differ from selectedThreadId after creation)
  const actualThreadIdRef = useRef<number | null>(null);

  // Message management
  const messagesHook = useMessages({ threadId: selectedThreadId });

  // Message sending
  const sendMessageHook = useSendMessage({
    threadId: selectedThreadId,
    messages: messagesHook.messages,
    apiBaseUrl,
    onMessageUpdate: messagesHook.setMessages,
    onThreadCreated: (newThreadId: number) => {
      actualThreadIdRef.current = newThreadId;
      onThreadCreated?.(newThreadId);
    },
    onComplete: () => {
      // Use the actual thread ID if a new thread was created
      const threadIdToRefetch =
        actualThreadIdRef.current ??
        (typeof selectedThreadId === 'number' ? selectedThreadId : null);
      if (threadIdToRefetch) {
        messagesHook.refetch();
        // Reset the ref after using it
        actualThreadIdRef.current = null;
      }
    },
  });

  return {
    messages: messagesHook.messages,
    messagesLoading: messagesHook.loading,
    messagesError: messagesHook.error,
    refetchMessages: messagesHook.refetch,

    // Message sending
    sendMessage: sendMessageHook.sendMessage,
    stopStream: sendMessageHook.stopStream,
    isSending: sendMessageHook.isLoading,
    sendError: sendMessageHook.error,
  };
}
