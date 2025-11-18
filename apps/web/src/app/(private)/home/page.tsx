'use client';

import { useEffect, useRef } from 'react';
import ChatContainer from '@/features/cogno/components/ChatContainer';
import AiChatInput from '@/components/chat-input/AiChatInput';
import NotificationPanel from '@/features/notifications/components/NotificationPanel';
import { useChat } from '@cogni/api';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useCopilotReadable } from '@copilotkit/react-core';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import { useAIChatMentions } from '@/hooks/useAIChatMentions';
import { useMessageAutoScroll } from '@/hooks/useMessageAutoScroll';
import { useThreadContext } from '@/contexts/ThreadContext';

export default function HomePage() {
  const workspaceId = getPersonalWorkspaceId();
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const chat = useChat({ workspaceId });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamingContainerRef = useRef<HTMLDivElement>(null);
  const { isInputActive } = useGlobalUI();
  const { members, notes } = useAIChatMentions();

  // Auto-select first thread when threads load (if no thread is selected)
  useEffect(() => {
    if (
      !chat.threadsLoading &&
      chat.threads.length > 0 &&
      selectedThreadId === null
    ) {
      console.log('🎯 Auto-selecting first thread:', chat.threads[0].id);
      setSelectedThreadId(chat.threads[0].id);
    }
  }, [
    chat.threadsLoading,
    chat.threads,
    selectedThreadId,
    setSelectedThreadId,
  ]);

  // Sync ThreadContext selectedThreadId to useChat hook (one-way sync)
  useEffect(() => {
    if (selectedThreadId !== chat.selectedThreadId) {
      console.log('🔄 Syncing ThreadContext → useChat:', selectedThreadId);
      chat.setSelectedThreadId(selectedThreadId);
    }
  }, [selectedThreadId, chat.selectedThreadId, chat.setSelectedThreadId]);

  // Debug logging
  useEffect(() => {
    console.log('🏠 Home Page Debug:', {
      workspaceId,
      threadsCount: chat.threads.length,
      messagesCount: chat.messages.length,
      contextSelectedThreadId: selectedThreadId,
      chatSelectedThreadId: chat.selectedThreadId,
      threadsLoading: chat.threadsLoading,
      messagesLoading: chat.messagesLoading,
      threadsError: chat.threadsError,
      messagesError: chat.messagesError,
    });
  }, [
    workspaceId,
    chat.threads.length,
    chat.messages.length,
    selectedThreadId,
    chat.selectedThreadId,
    chat.threadsLoading,
    chat.messagesLoading,
    chat.threadsError,
    chat.messagesError,
  ]);

  // CopilotKit integration for AI context
  useCopilotReadable({
    description: 'cogni chat history',
    value: chat.messages
      .slice(-5)
      .map(message => message.content)
      .join('\n'),
    categories: ['cogni_chat'],
  });

  // Auto-scroll when new messages arrive
  useMessageAutoScroll({
    messages: chat.messages,
    scrollContainerRef,
    streamingContainerRef,
  });

  // Initialize chat on mount
  useEffect(() => {
    console.log('🚀 Initializing chat with workspaceId:', workspaceId);
    chat.initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <ChatContainer
        ref={scrollContainerRef}
        messages={chat.messages as any}
        sendMessage={(
          content,
          fileIds,
          mentionedMemberIds,
          mentionedNoteIds,
          notificationId,
          timerCompleted
        ) =>
          chat.sendMessage({
            content,
            fileIds,
            mentionedMemberIds,
            mentionedNoteIds,
            notificationId,
            timerCompleted,
          })
        }
        streamingContainerRef={streamingContainerRef}
        workspaceMembers={members}
        workspaceNotes={notes}
      />

      {/* Absolutely positioned ChatInput */}
      <div
        className={`fixed left-0 right-0 z-110 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[72px]' : 'bottom-[72px]'
        }`}
      >
        <AiChatInput
          onSend={(
            content: string,
            fileIds?: number[],
            mentionedMemberIds?: number[],
            mentionedNoteIds?: number[]
          ) => {
            void chat.sendMessage({
              content,
              fileIds,
              mentionedMemberIds,
              mentionedNoteIds,
            });
          }}
          onStop={chat.stopStream}
          isLoading={chat.isSending}
          threadId={chat.selectedThreadId}
          workspaceMembers={members}
          workspaceNotes={notes}
        />
      </div>

      {/* NotificationPanel */}
      <NotificationPanel
        sendMessage={(content: string, notificationId?: number) =>
          chat.sendMessage({ content, notificationId })
        }
      />
    </div>
  );
}
