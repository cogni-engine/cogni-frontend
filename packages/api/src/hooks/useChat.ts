import { useEffect } from 'react';
import { useThreads } from './useThreads';
import { useMessages } from './useMessages';
import { useSendMessage } from './useSendMessage';

export interface UseChatOptions {
  workspaceId: number | null;
  apiBaseUrl?: string;
  selectedThreadId: number | null;
  onThreadSelect: (threadId: number | null) => void;
}

/**
 * Unified hook that combines thread management, messages, and sending
 * This hook provides a complete chat interface
 * Thread selection is managed externally (e.g., via ThreadContext)
 */
export function useChat({ 
  workspaceId, 
  apiBaseUrl,
  selectedThreadId,
  onThreadSelect 
}: UseChatOptions) {

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

  // Auto-initialize: create thread if needed when threads finish loading
  useEffect(() => {
    const initialize = async () => {
      if (threadsHook.loading || !workspaceId) {
        return;
      }

      // Create initial thread if none exist
      if (threadsHook.threads.length === 0) {
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
          onThreadSelect(newThread.id);
        } catch (error) {
          console.error('Failed to create thread:', error);
        }
      }
      // Auto-select first thread if none is selected
      else if (selectedThreadId === null && threadsHook.threads.length > 0) {
        onThreadSelect(threadsHook.threads[0].id);
      }
    };

    initialize();
  }, [
    threadsHook.loading,
    threadsHook.threads,
    threadsHook.createThread,
    workspaceId,
    selectedThreadId,
    onThreadSelect,
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

    // Thread selection (external state)
    selectedThreadId,
    setSelectedThreadId: onThreadSelect,

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
  };
}

