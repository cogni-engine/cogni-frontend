'use client';

import { useEffect, useRef } from 'react';
import ChatContainer from '@/components/cogno/ChatContainer';
import InputArea from '@/components/input/InputArea';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import { useCogno } from '@/hooks/useCogno';
import { useThreadContext } from '@/contexts/ThreadContext';
import { useThreads } from '@/hooks/useThreads';
import { useUI } from '@/contexts/UIContext';

export default function HomePage() {
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const { threads, loading: threadsLoading, createThread } = useThreads();
  const { messages, sendMessage, isLoading, error, stopStream } = useCogno(selectedThreadId);
  const { isThreadSidebarOpen } = useUI();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);
  const hasInitialized = useRef(false);

  // スレッドの自動選択と初回スレッド作成（1つのuseEffectに統合）
  useEffect(() => {
    if (threadsLoading || hasInitialized.current) return;

    // スレッドが0件の場合：初回スレッドを作成
    if (threads.length === 0) {
      hasInitialized.current = true;
      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      createThread(dateTimeTitle)
        .then(newThread => setSelectedThreadId(newThread.id))
        .catch(err => {
          console.error('Failed to create initial thread:', err);
          hasInitialized.current = false;
        });
      return;
    }

    // スレッドが存在し、選択されていない場合：最新のスレッドを選択
    if (threads.length > 0 && selectedThreadId === null) {
      hasInitialized.current = true;
      setSelectedThreadId(threads[0].id);
      return;
    }

    // 既に選択されている場合は初期化済みとする
    if (selectedThreadId !== null) {
      hasInitialized.current = true;
    }
  }, [threads, threadsLoading, selectedThreadId, setSelectedThreadId, createThread]);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    const currentCount = messages.length;

    if (
      currentCount > prevMessageCountRef.current &&
      currentCount > 0 &&
      scrollContainerRef.current
    ) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }

    prevMessageCountRef.current = currentCount;
  }, [messages]);

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${
        isThreadSidebarOpen ? 'ml-80' : 'ml-0'
      }`}
    >
      <ChatContainer ref={scrollContainerRef} messages={messages} sendMessage={sendMessage} />
      <InputArea
        messages={messages}
        onSend={sendMessage}
        onStop={stopStream}
        isLoading={isLoading}
      />
      {/* NotificationPanelにsendMessageを渡す */}
      <NotificationPanel sendMessage={sendMessage} />
      {error && <div className='text-red-500 text-center p-4'>{error}</div>}
    </div>
  );
}
