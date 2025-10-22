"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { AIMessage } from '@/types/chat';

const API_BASE_URL = 'http://0.0.0.0:8000';

export function useCogno(threadId: number | null) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // メッセージ一覧取得（初回読み込み用）
  const fetchMessages = useCallback(async (tid: number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/cogno/messages/${tid}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      console.error('Error fetching messages:', err);
    }
  }, []);

  // 新規メッセージをポーリング（増分取得）
  const pollNewMessages = useCallback(async (tid: number) => {
    try {
      const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : 0;
      
      const response = await fetch(
        `${API_BASE_URL}/api/cogno/messages/${tid}?since=${lastMessageId}`
      );
      
      if (!response.ok) return;
      const data = await response.json();
      const newMessages: AIMessage[] = data.messages || [];
      
      if (newMessages.length === 0) return;
      
      // 重複チェック: 既存メッセージと重複しないもののみ追加
      const existingIds = new Set(messages.map(msg => msg.id));
      const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
      
      if (uniqueNewMessages.length === 0) return;
      
      console.log(`Polling: Found ${uniqueNewMessages.length} new unique messages (${newMessages.length} total, ${newMessages.length - uniqueNewMessages.length} duplicates filtered)`);
      
      // 新規メッセージを追加（さらに重複チェック）
      setMessages(prev => {
        const existingIds = new Set(prev.map(msg => msg.id));
        const trulyUniqueMessages = uniqueNewMessages.filter(msg => !existingIds.has(msg.id));
        
        if (trulyUniqueMessages.length === 0) {
          console.log('No truly unique messages after final check');
          return prev;
        }
        
        console.log(`Adding ${trulyUniqueMessages.length} truly unique messages`);
        return [...prev, ...trulyUniqueMessages];
      });
      // Timer処理は不要 - MessageItemが担当
    } catch (err) {
      console.error('Error polling new messages:', err);
    }
  }, [messages]);

  // 統一Polling: 1秒ごとに新規メッセージをチェック
  useEffect(() => {
    if (!threadId) {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      return;
    }

    // 初回ポーリング
    pollNewMessages(threadId);

    // 1秒ごとにポーリング
    pollingIntervalRef.current = setInterval(() => {
      pollNewMessages(threadId);
    }, 1000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [threadId, pollNewMessages]);

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
      const response = await fetch(`${API_BASE_URL}/api/cogno/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thread_id: threadId,
          message: content,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

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

            accumulatedContent += data;

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

      // ★重要: Stream完了後、DB保存済みの確定メッセージを取得
      // これでmeta.timer付きの確定メッセージに置き換わる
      await fetchMessages(threadId);
      console.log('Stream completed. Fetched saved messages with meta.timer.');

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

  // タイマー開始（手動開始用 - 通常は使われない）
  const startTimer = useCallback(async (durationMinutes: number) => {
    if (!threadId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cogno/timers/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thread_id: threadId,
          duration_minutes: durationMinutes,
        }),
      });

      if (!response.ok) throw new Error('Failed to start timer');

      // Pollingが自動的にタイマーメッセージを検出
      console.log('Timer started manually. Polling will detect the timer message.');
    } catch (err) {
      console.error('Error starting timer:', err);
      setError(err instanceof Error ? err.message : 'Failed to start timer');
    }
  }, [threadId]);

  return {
    messages,
    sendMessage,
    fetchMessages,
    isLoading,
    error,
    startTimer,
  };
}
