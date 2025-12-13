'use client';

import { useMessages } from './useMessages';
import { useSendMessage } from './useSendMessage';

export interface UseChatOptions {
  apiBaseUrl?: string;
  selectedThreadId: number | null;
}

/**
 * Unified hook that combines thread management, messages, and sending
 * This hook provides a complete chat interface
 * Thread selection is managed externally (e.g., via ThreadContext)
 */
export function useChat({ apiBaseUrl, selectedThreadId }: UseChatOptions) {
  // Message management
  const messagesHook = useMessages({ threadId: selectedThreadId, apiBaseUrl });

  // Message sending
  const sendMessageHook = useSendMessage({
    threadId: selectedThreadId,
    messages: messagesHook.messages,
    apiBaseUrl,
    onMessageUpdate: messagesHook.setMessages,
    onComplete: () => {
      if (selectedThreadId) {
        messagesHook.refetch(selectedThreadId);
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
