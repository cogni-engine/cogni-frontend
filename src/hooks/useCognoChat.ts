'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';

export function useCognoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000'}/test/stream`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: userInput,
            system_message: 'You are a helpful assistant.',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is null');
      }

      let accumulatedContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Parse SSE format: "data: <content>\n\n"
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove "data: " prefix

            // Skip special SSE messages
            // if (data === '[DONE]') continue;

            try {
              // Try to parse as JSON if it's structured data
              const parsed = JSON.parse(data);
              // Extract content from parsed data (adjust based on your API response structure)
              const content =
                parsed.content || parsed.text || parsed.delta || data;
              accumulatedContent += content;
            } catch {
              // If not JSON, use the raw data
              accumulatedContent += data;
            }

            // Update the assistant message with accumulated content
            setMessages(prev =>
              prev.map(msg =>
                msg.id === assistantMessageId
                  ? { ...msg, content: accumulatedContent }
                  : msg
              )
            );
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error in sendMessage:', err);

      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
}
