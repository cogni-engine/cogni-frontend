'use client';

import { useEffect, useRef } from 'react';
import ChatContainer from '@/features/cogno/components/ChatContainer';
import AiChatInput from '@/components/chat-input/AiChatInput';
import NotificationPanel from '@/features/notifications/components/NotificationPanel';
import { useCogno } from '@/hooks/useCogno';
import { useThreadContext } from '@/contexts/ThreadContext';
import { useThreads } from '@/hooks/useThreads';
import { useCopilotReadable } from '@copilotkit/react-core';
import { useGlobalUI } from '@/contexts/GlobalUIContext';

export default function HomePage() {
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const { threads, loading: threadsLoading, createThread } = useThreads();
  const { messages, sendMessage, isLoading, stopStream } =
    useCogno(selectedThreadId);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamingContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);
  const hasInitialized = useRef(false);
  const { isInputActive } = useGlobalUI();

  useCopilotReadable({
    description: 'cogni chat history',
    value: messages
      .slice(-5)
      .map(message => message.content)
      .join('\n'),
    categories: ['cogni_chat'],
  });

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
  }, [
    threads,
    threadsLoading,
    selectedThreadId,
    setSelectedThreadId,
    createThread,
  ]);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    const currentCount = messages.length;

    if (
      currentCount > prevMessageCountRef.current &&
      currentCount > 0 &&
      scrollContainerRef.current
    ) {
      setTimeout(() => {
        if (!scrollContainerRef.current) return;

        // If streaming container exists, scroll to align its top with viewport top
        if (streamingContainerRef.current) {
          const scrollContainer = scrollContainerRef.current;
          const streamingContainer = streamingContainerRef.current;

          // Calculate offset (accounting for padding)
          const offsetTop = streamingContainer.offsetTop;

          scrollContainer.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        } else {
          // No streaming messages, scroll to bottom normally
          const container = scrollContainerRef.current;
          const targetScroll = container.scrollHeight - container.clientHeight;

          container.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
        }
      }, 100);
    }

    prevMessageCountRef.current = currentCount;
  }, [messages]);

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <ChatContainer
        ref={scrollContainerRef}
        messages={messages}
        sendMessage={sendMessage}
        streamingContainerRef={streamingContainerRef}
      />

      {/* Absolutely positioned ChatInput - no longer needs bottom offset as main area has padding */}
      <div
        className={`fixed left-0 right-0 z-110 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[72px]' : 'bottom-[72px]'
        }`}
      >
        <AiChatInput
          onSend={(content: string, fileIds?: number[]) => {
            // Wrapper to match updated signature with file support
            void sendMessage(content, fileIds);
          }}
          onStop={stopStream}
          isLoading={isLoading}
          threadId={selectedThreadId}
        />
      </div>

      {/* NotificationPanelにsendMessageを渡す */}
      <NotificationPanel sendMessage={sendMessage} />
    </div>
  );
}
