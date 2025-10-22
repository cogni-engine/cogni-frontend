"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { AIMessage, TimerState } from '@/types/chat';

const API_BASE_URL = 'http://0.0.0.0:8000';

export function useCogno(threadId: number | null) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTimer, setActiveTimer] = useState<TimerState | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // メッセージ一覧取得
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

  // タイマーポーリング
  const pollTimer = useCallback(async (tid: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cogno/timers/poll?thread_id=${tid}`);
      if (!response.ok) return;
      
      const data = await response.json();
      
      if (data.timer_ended) {
        // タイマー終了 - メッセージを再取得
        setActiveTimer(null);
        setRemainingSeconds(null);
        await fetchMessages(tid);
      } else if (data.timer) {
        // タイマーアクティブ
        setActiveTimer(data.timer);
        setRemainingSeconds(data.remaining_seconds || null);
      } else {
        // タイマーなし
        setActiveTimer(null);
        setRemainingSeconds(null);
      }
    } catch (err) {
      console.error('Error polling timer:', err);
    }
  }, [fetchMessages]);

  // タイマーポーリングの開始/停止
  useEffect(() => {
    if (!threadId) {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      return;
    }

    // 初回ポーリング
    pollTimer(threadId);

    // 3秒ごとにポーリング
    pollingIntervalRef.current = setInterval(() => {
      pollTimer(threadId);
    }, 3000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [threadId, pollTimer]);

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

  // タイマー開始
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

      const data = await response.json();
      if (data.success && data.timer) {
        setActiveTimer(data.timer);
      }

      // メッセージを再取得してタイマーメッセージを表示
      await fetchMessages(threadId);
    } catch (err) {
      console.error('Error starting timer:', err);
      setError(err instanceof Error ? err.message : 'Failed to start timer');
    }
  }, [threadId, fetchMessages]);

  return {
    messages,
    sendMessage,
    fetchMessages,
    isLoading,
    error,
    activeTimer,
    remainingSeconds,
    startTimer,
  };
}

