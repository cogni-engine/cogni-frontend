'use client';

import { useState, useCallback, useRef } from 'react';
import type { AIMessage } from '@/features/cogno/domain/chat';
import type { ThreadId } from '../contexts/ThreadContext';
import { createThread } from '../api/threadsApi';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';

export interface SendMessageOptions {
  content: string;
  files?: UploadedFile[];
  mentionedMemberIds?: number[];
  mentionedNoteIds?: number[];
  notificationId?: number;
  timerCompleted?: boolean;
}

export interface UseSendMessageOptions {
  threadId: ThreadId;
  messages: AIMessage[];
  apiBaseUrl?: string;
  onMessageUpdate?: (messages: AIMessage[]) => void;
  onComplete?: () => void;
  onThreadCreated?: (threadId: number) => void;
}

export function useSendMessage({
  threadId,
  messages,
  apiBaseUrl = '/api',
  onMessageUpdate,
  onComplete,
  onThreadCreated,
}: UseSendMessageOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async ({
      content,
      files,
      mentionedMemberIds,
      mentionedNoteIds,
      notificationId,
      timerCompleted,
    }: SendMessageOptions) => {
      // Determine the actual thread ID to use
      let actualThreadId: number | null = null;
      let isNewlyCreatedThread = false;

      if (threadId === 'new') {
        // Create a new thread first
        const workspaceId = getPersonalWorkspaceId();
        if (!workspaceId) {
          console.error('Cannot create thread: No workspace found');
          return;
        }

        try {
          // Use first 20 characters of the message as the thread title
          const title = content.trim().slice(0, 20) || 'New Thread';

          const newThread = await createThread(workspaceId, title);
          actualThreadId = newThread.id;
          isNewlyCreatedThread = true;
          // Don't call onThreadCreated here - wait until streaming completes
          // to avoid useMessages refetching and wiping optimistic messages
        } catch (err) {
          console.error('Failed to create thread:', err);
          return;
        }
      } else if (typeof threadId === 'number') {
        actualThreadId = threadId;
      }

      if (!actualThreadId) {
        console.error('Cannot send message: No threadId');
        return;
      }

      // Abort existing stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoading(true);
      setError(null);

      // Create temporary user message (negative IDs for temp messages)
      const tempUserMsgId = -Date.now();
      let tempUserMsg: AIMessage | null = null;
      if (content.trim() || (files && files.length > 0)) {
        tempUserMsg = {
          id: tempUserMsgId,
          content,
          role: 'user',
          thread_id: actualThreadId,
          created_at: new Date().toISOString(),
          files: files?.map(f => ({
            id: f.id,
            original_filename: f.original_filename,
            file_path: f.file_path,
            mime_type: f.mime_type,
            file_size: f.file_size,
          })),
        };
      }

      // Create temporary AI message
      const tempAIMsgId = tempUserMsgId - 1;
      const tempAIMsg: AIMessage = {
        id: tempAIMsgId,
        content: '',
        role: 'assistant',
        thread_id: actualThreadId,
        created_at: new Date().toISOString(),
      };

      // Update messages
      let updatedMessages: AIMessage[] = [];
      let newMessages: AIMessage[] = [];

      if (tempUserMsg) {
        updatedMessages = [...messages, tempUserMsg];
        newMessages = [...messages, tempUserMsg, tempAIMsg];
      } else {
        updatedMessages = [...messages];
        newMessages = [...messages, tempAIMsg];
      }

      onMessageUpdate?.(newMessages);

      try {
        const url = `${apiBaseUrl}/cogno/conversations/stream`;
        const requestBody = {
          thread_id: actualThreadId,
          messages: updatedMessages,
          ...(mentionedMemberIds &&
            mentionedMemberIds.length > 0 && {
              mentioned_member_ids: mentionedMemberIds,
            }),
          ...(mentionedNoteIds &&
            mentionedNoteIds.length > 0 && {
              mentioned_note_ids: mentionedNoteIds,
            }),
          ...(notificationId && { notification_id: notificationId }),
          ...(timerCompleted && { timer_completed: true }),
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to send message:', response.status, errorText);
          throw new Error(`Failed to send message: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error('Response body is null');

        let accumulatedContent = '';
        let buffer = '';
        let lastUpdateTime = 0;
        const UPDATE_THROTTLE = 50;

        while (true) {
          if (abortController.signal.aborted) break;

          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              const parsedData = JSON.parse(data);
              accumulatedContent += parsedData.data;

              const now = Date.now();
              if (now - lastUpdateTime >= UPDATE_THROTTLE) {
                onMessageUpdate?.(
                  newMessages.map(msg =>
                    msg.id === tempAIMsg.id
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  )
                );
                lastUpdateTime = now;
              }
            }
          }
        }

        // Final update
        onMessageUpdate?.(
          newMessages.map(msg =>
            msg.id === tempAIMsg.id
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );

        if (abortController.signal.aborted) {
          return;
        }

        // Notify about newly created thread after streaming completes
        // This prevents useMessages from refetching and wiping optimistic messages
        if (isNewlyCreatedThread && actualThreadId) {
          onThreadCreated?.(actualThreadId);
        }

        onComplete?.();
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error in sendMessage:', err);

        // Remove temporary messages on error
        onMessageUpdate?.(
          messages.filter(
            msg => msg.id !== tempUserMsg?.id && msg.id !== tempAIMsg.id
          )
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [
      threadId,
      messages,
      apiBaseUrl,
      onMessageUpdate,
      onComplete,
      onThreadCreated,
    ]
  );

  return {
    sendMessage,
    stopStream,
    isLoading,
    error,
  };
}
