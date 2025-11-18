import { useState, useCallback } from 'react';
import { useThreads } from './useThreads';
import { useMessages } from './useMessages';
import { useSendMessage } from './useSendMessage';
import type { Thread, Message } from '@cogni/types';

export interface UseChatOptions {
  workspaceId: number | null;
  apiBaseUrl?: string;
}

/**
 * Unified hook that combines thread management, messages, and sending
 * This hook provides a complete chat interface
 */
export function useChat({ workspaceId, apiBaseUrl }: UseChatOptions) {
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);

  // Thread management
  const threadsHook = useThreads({ workspaceId });

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

  // Auto-initialize: create or select first thread
  const initializeChat = useCallback(async () => {
    if (threadsHook.loading || !workspaceId) return;

    if (threadsHook.threads.length === 0) {
      // Create initial thread
      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const newThread = await threadsHook.createThread(dateTimeTitle);
      setSelectedThreadId(newThread.id);
    } else if (selectedThreadId === null) {
      // Select the first thread
      setSelectedThreadId(threadsHook.threads[0].id);
    }
  }, [
    threadsHook.loading,
    threadsHook.threads,
    threadsHook.createThread,
    workspaceId,
    selectedThreadId,
  ]);

  return {
    // Thread management
    threads: threadsHook.threads,
    threadsLoading: threadsHook.loading,
    threadsError: threadsHook.error,
    createThread: threadsHook.createThread,
    updateThread: threadsHook.updateThread,
    deleteThread: threadsHook.deleteThread,
    refetchThreads: threadsHook.refetch,

    // Thread selection
    selectedThreadId,
    setSelectedThreadId,

    // Message management
    messages: messagesHook.messages,
    messagesLoading: messagesHook.loading,
    messagesError: messagesHook.error,
    refetchMessages: messagesHook.refetch,

    // Message sending
    sendMessage: sendMessageHook.sendMessage,
    stopStream: sendMessageHook.stopStream,
    isSending: sendMessageHook.isLoading,
    sendError: sendMessageHook.error,

    // Utility
    initializeChat,
  };
}

