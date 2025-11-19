import { useState, useCallback, useRef } from 'react';
import type { Message } from '@cogni/types';

// Use native fetch - works on both web and React Native (Expo 50+)
// React Native Hermes engine now supports fetch natively
const platformFetch = typeof global !== 'undefined' && global.fetch ? global.fetch : fetch;

export interface SendMessageOptions {
  content: string;
  fileIds?: number[];
  mentionedMemberIds?: number[];
  mentionedNoteIds?: number[];
  notificationId?: number;
  timerCompleted?: boolean;
}

export interface UseSendMessageOptions {
  threadId: number | null;
  messages: Message[];
  apiBaseUrl?: string;
  headers?: HeadersInit;
  onMessageUpdate?: (messages: Message[]) => void;
  onComplete?: () => void;
}

export function useSendMessage({
  threadId,
  messages,
  apiBaseUrl = '/api',
  headers,
  onMessageUpdate,
  onComplete,
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
      fileIds,
      mentionedMemberIds,
      mentionedNoteIds,
      notificationId,
      timerCompleted,
    }: SendMessageOptions) => {
      if (!threadId) {
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

      // Create temporary user message
      let tempUserMsg: Message | null = null;
      if (content.trim()) {
        tempUserMsg = {
          id: Date.now().toString(),
          content,
          role: 'user',
          file_ids: fileIds,
        };
      }

      // Create temporary AI message
      const tempAIMsg: Message = {
        id: (Date.now() + (tempUserMsg ? 1 : 0)).toString(),
        content: '',
        role: 'assistant',
      };

      // Update messages
      let updatedMessages: Message[] = [];
      let newMessages: Message[] = [];

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
          thread_id: threadId,
          messages: updatedMessages,
          ...(mentionedMemberIds && mentionedMemberIds.length > 0 && {
            mentioned_member_ids: mentionedMemberIds,
          }),
          ...(mentionedNoteIds && mentionedNoteIds.length > 0 && {
            mentioned_note_ids: mentionedNoteIds,
          }),
          ...(notificationId && { notification_id: notificationId }),
          ...(timerCompleted && { timer_completed: true }),
        };

        const response = await platformFetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(requestBody),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to send message:', response.status, errorText);
          throw new Error(`Failed to send message: ${response.status}`);
        }

        // Debug: Check critical response properties
        const contentType = response.headers.get("content-type");
        const bodyIsNull = response.body === null;
        
        console.log('🔍 Response Check:');
        console.log('  content-type:', contentType);
        console.log('  response.body === null:', bodyIsNull);
        console.log('  response.body:', response.body);
        console.log('  typeof response.body:', typeof response.body);

        // React Native (Expo) supports ReadableStream natively!
        const reader = response.body?.getReader();
        if (!reader) {
          console.error('❌ Response body is not readable.');
          console.error('  This might be due to:');
          console.error('  1. Backend not sending streaming response');
          console.error('  2. Proxy/CDN buffering the response');
          console.error('  3. Missing Content-Type: text/event-stream header');
          throw new Error('Response body is not readable - streaming not supported');
        }

        const decoder = new TextDecoder("utf-8");
        let accumulatedContent = '';
        let buffer = '';
        let lastUpdateTime = 0;
        const UPDATE_THROTTLE = 50; // Throttle UI updates to 50ms

        while (true) {
          if (abortController.signal.aborted) break;

          const { value, done } = await reader.read();
          if (done) break;

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process complete lines (SSE format)
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              
              try {
                const parsedData = JSON.parse(data);
                // Support both .data and .content fields
                const content = parsedData.data || parsedData.content || '';
                accumulatedContent += content;

                // Throttle UI updates for performance
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
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError, 'Line:', line);
              }
            }
          }
        }

        // Final update
        onMessageUpdate?.(
          newMessages.map(msg =>
            msg.id === tempAIMsg.id ? { ...msg, content: accumulatedContent } : msg
          )
        );

        if (abortController.signal.aborted) {
          return;
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
    [threadId, messages, apiBaseUrl, onMessageUpdate, onComplete]
  );

  return {
    sendMessage,
    stopStream,
    isLoading,
    error,
  };
}

