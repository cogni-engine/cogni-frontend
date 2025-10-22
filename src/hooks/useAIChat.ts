"use client";

import { useState, useCallback } from 'react';
import { AIMessage } from '@/types/chat';
import { getAIMessages, sendAIMessage } from '@/lib/api/aiChatApi';

export function useAIChat(threadId: number | null) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // メッセージ一覧取得
  const fetchMessages = useCallback(async (tid: number) => {
    try {
      setError(null);
      const data = await getAIMessages(tid);
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      console.error('Error fetching messages:', err);
    }
  }, []);

  // メッセージ送信（ストリーミング）
  const sendMessage = useCallback(async (content: string) => {
    if (!threadId || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    // 楽観的UI: 仮のユーザーメッセージとAIメッセージを追加
    const tempUserMsg: AIMessage = {
      id: Date.now(),
      content,
      thread_id: threadId,
      role: 'user',
      created_at: new Date().toISOString(),
    };
    
    const tempAIMsg: AIMessage = {
      id: Date.now() + 1,
      content: '',
      thread_id: threadId,
      role: 'assistant',
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, tempUserMsg, tempAIMsg]);

    try {
      const response = await sendAIMessage(threadId, content);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('Response body is null');

      let accumulatedContent = '';
      let buffer = '';

      while (true) {
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

            try {
              accumulatedContent += data;
            } catch {
              accumulatedContent += data;
            }

            // ストリーム中の仮AIメッセージを更新
            setMessages(prev =>
              prev.map(msg =>
                msg.id === tempAIMsg.id
                  ? { ...msg, content: accumulatedContent }
                  : msg
              )
            );
          }
        }
      }

      // ストリーム完了後、確定したメッセージを再取得
      await fetchMessages(threadId);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error in sendMessage:', err);
      
      // エラー時は仮メッセージを削除
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMsg.id && msg.id !== tempAIMsg.id));
    } finally {
      setIsLoading(false);
    }
  }, [threadId, fetchMessages]);

  return {
    messages,
    sendMessage,
    fetchMessages,
    isLoading,
    error,
  };
}

