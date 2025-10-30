'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Message } from '@/types/chat';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

export function useCogno(threadId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // メッセージ一覧取得（初回読み込み用）
  const fetchMessages = useCallback(async (tid: number) => {
    try {
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/api/cogno/threads/${tid}/messages`
      );
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      console.error('Error fetching messages:', err);
    }
  }, []);

  // threadIdが変更されたら自動的にメッセージを取得
  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId);
    } else {
      // threadIdがnullの場合はメッセージをクリア
      setMessages([]);
    }
  }, [threadId, fetchMessages]);

  // ストリーム停止関数
  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  // 統合されたメッセージ送信関数（通常メッセージと通知メッセージの両方を処理）
  const sendMessage = useCallback(
    async (
      content: string,
      notificationId?: number,
      timerCompleted?: boolean
    ) => {
      if (!threadId) return;

      // 既存のストリームがあれば中断
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 新しいAbortControllerを作成
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoading(true);
      setError(null);

      // ユーザーメッセージを追加（通知の場合はスキップ）
      let tempUserMsg: Message | null = null;
      if (content.trim()) {
        tempUserMsg = {
          id: Date.now().toString(),
          content,
          role: 'user',
        };
      }

      // AIメッセージを追加
      const tempAIMsg: Message = {
        id: (Date.now() + (tempUserMsg ? 1 : 0)).toString(),
        content: '',
        role: 'assistant',
      };

      // メッセージを追加
      if (tempUserMsg) {
        setMessages(prev => [...prev, tempUserMsg!, tempAIMsg]);
      } else {
        setMessages(prev => [...prev, tempAIMsg]);
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/cogno/conversations/stream`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              thread_id: threadId,
              message: content,
              ...(notificationId && { notification_id: notificationId }),
              ...(timerCompleted && { timer_completed: true }),
            }),
            signal: abortController.signal,
          }
        );

        if (!response.ok) throw new Error('Failed to send message');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error('Response body is null');

        let accumulatedContent = '';
        let buffer = '';

        while (true) {
          // 中断された場合はループを抜ける
          if (abortController.signal.aborted) {
            break;
          }

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

        // 中断された場合は仮メッセージを削除せず、そのまま残す
        if (abortController.signal.aborted) {
          console.log('Stream aborted by user');
          return;
        }

        // ★重要: Stream完了後、DB保存済みの確定メッセージを取得
        // これでmeta.timer付きの確定メッセージに置き換わる
        await fetchMessages(threadId);
        console.log(
          'Stream completed. Fetched saved messages with meta.timer.'
        );
      } catch (err) {
        // AbortErrorの場合はユーザーが中断したのでエラーとして扱わない
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Stream aborted by user');
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error in sendMessage:', err);

        // エラー時は仮メッセージを削除
        setMessages(prev =>
          prev.filter(
            msg => msg.id !== tempUserMsg?.id && msg.id !== tempAIMsg.id
          )
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [threadId, fetchMessages]
  );

  // タイマー開始（手動開始用 - 通常は使われない）
  const startTimer = useCallback(
    async (durationMinutes: number) => {
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
        console.log(
          'Timer started manually. Polling will detect the timer message.'
        );
      } catch (err) {
        console.error('Error starting timer:', err);
        setError(err instanceof Error ? err.message : 'Failed to start timer');
      }
    },
    [threadId]
  );

  return {
    messages,
    sendMessage,
    fetchMessages,
    isLoading,
    error,
    startTimer,
    stopStream,
  };
}
