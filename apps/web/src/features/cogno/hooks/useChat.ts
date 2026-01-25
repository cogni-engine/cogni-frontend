'use client';

import { useRef, useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';
import { useMessages } from './useMessages';
import { useSendMessage } from './useSendMessage';
import type { ThreadId } from '../contexts/ThreadContext';
import type { AIMessage } from '@/features/cogno/domain/chat';

export interface UseChatOptions {
  selectedThreadId: ThreadId;
  onThreadCreated?: (threadId: number) => void;
}

/**
 * Unified hook that combines thread management, messages, and sending
 * This hook provides a complete chat interface
 * Thread selection is managed externally (e.g., via ThreadContext)
 */
export function useChat({ selectedThreadId, onThreadCreated }: UseChatOptions) {
  // Track the actual thread ID (may differ from selectedThreadId after creation)
  const actualThreadIdRef = useRef<number | null>(null);
  // Track if we're currently streaming a new thread
  const [isStreamingNewThread, setIsStreamingNewThread] = useState(false);
  // Track optimistic messages for new threads (before threadId switch)
  const [optimisticMessages, setOptimisticMessages] = useState<
    AIMessage[] | null
  >(null);
  const { mutate: globalMutate } = useSWRConfig();

  // Message management - use 'new' during streaming to avoid cache issues
  const effectiveThreadId = isStreamingNewThread ? 'new' : selectedThreadId;
  const messagesHook = useMessages({ threadId: effectiveThreadId });

  // Message sending
  const sendMessageHook = useSendMessage({
    threadId: selectedThreadId,
    messages: messagesHook.messages,
    onMessageUpdate: (newMessages: AIMessage[]) => {
      // For new threads, store optimistic messages and keep threadId as 'new'
      if (selectedThreadId === 'new' && actualThreadIdRef.current) {
        setOptimisticMessages(newMessages);
        setIsStreamingNewThread(true);
        // Pre-populate SWR cache for the actual threadId (for after switch)
        const swrKey = `ai-messages-${actualThreadIdRef.current}`;
        globalMutate(swrKey, newMessages, false);
      }
      // Update current messages
      messagesHook.setMessages(newMessages);
    },
    onThreadCreated: (newThreadId: number) => {
      // Store the threadId but don't switch selectedThreadId yet
      actualThreadIdRef.current = newThreadId;
    },
    onComplete: () => {
      // For new threads, switch threadId and refetch after streaming completes
      if (actualThreadIdRef.current && selectedThreadId === 'new') {
        // Switch threadId first (cache is already populated)
        onThreadCreated?.(actualThreadIdRef.current);
        // Small delay to let the threadId switch propagate, then refetch
        setTimeout(() => {
          messagesHook.refetch();
          setIsStreamingNewThread(false);
          actualThreadIdRef.current = null;
          setOptimisticMessages(null);
        }, 100);
      } else {
        // For existing threads, just refetch normally
        const threadIdToRefetch =
          typeof selectedThreadId === 'number' ? selectedThreadId : null;
        if (threadIdToRefetch) {
          messagesHook.refetch();
        }
        actualThreadIdRef.current = null;
        setOptimisticMessages(null);
        setIsStreamingNewThread(false);
      }
    },
  });

  // Merge optimistic messages with SWR data for seamless display
  const messages = useMemo(() => {
    // If we're streaming a new thread and have optimistic messages, use those
    if (isStreamingNewThread && optimisticMessages) {
      return optimisticMessages;
    }
    return messagesHook.messages;
  }, [messagesHook.messages, isStreamingNewThread, optimisticMessages]);

  return {
    messages,
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
