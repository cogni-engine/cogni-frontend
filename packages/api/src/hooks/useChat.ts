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
    console.log('📋 initializeChat called', {
      loading: threadsHook.loading,
      workspaceId,
      threadsCount: threadsHook.threads.length,
      selectedThreadId,
    });

    if (threadsHook.loading) {
      console.log('⏳ Still loading threads, skipping initialization');
      return;
    }

    if (!workspaceId) {
      console.error('❌ No workspaceId available for chat initialization');
      return;
    }

    if (threadsHook.threads.length === 0) {
      console.log('📝 No threads found, creating initial thread');
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

      try {
        const newThread = await threadsHook.createThread(dateTimeTitle);
        console.log('✅ Created new thread:', newThread);
        setSelectedThreadId(newThread.id);
      } catch (error) {
        console.error('❌ Failed to create thread:', error);
      }
    } else if (selectedThreadId === null) {
      // Select the first thread
      console.log('✅ Selecting first thread:', threadsHook.threads[0]);
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

