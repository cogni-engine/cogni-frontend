'use client';

import { useRef, useCallback, useMemo } from 'react';
import ChatContainer from './components/ChatContainer';
import AiChatInput from '@/components/chat-input/AiChatInput';
import NotificationPanel from '@/features/notifications/components/NotificationPanel';
import { useChat } from '@cogni/api';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import { useAIChatMentions } from './hooks/useAIChatMentions';
import { useMessageAutoScroll } from './hooks/useMessageAutoScroll';
import { useThreadContext } from '@/contexts/ThreadContext';

interface HomeCognoChatProps {
  isInitialMount: React.RefObject<boolean>;
}

export default function HomeCognoChat({ isInitialMount }: HomeCognoChatProps) {
  const workspaceId = getPersonalWorkspaceId();
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();

  // Pass thread selection state to useChat (single source of truth)
  const chat = useChat({
    workspaceId,
    selectedThreadId,
    onThreadSelect: setSelectedThreadId,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamingContainerRef = useRef<HTMLDivElement>(null);
  const { isInputActive } = useGlobalUI();
  const { members, notes } = useAIChatMentions();

  // Memoize arrays to prevent unnecessary re-renders
  const memoizedMembers = useMemo(() => members, [members]);
  const memoizedNotes = useMemo(() => notes, [notes]);

  // Memoize sendMessage function to prevent ChatContainer re-renders
  const handleSendMessage = useCallback(
    (
      content: string,
      fileIds?: number[],
      mentionedMemberIds?: number[],
      mentionedNoteIds?: number[],
      notificationId?: number,
      timerCompleted?: boolean
    ) => {
      return chat.sendMessage({
        content,
        fileIds,
        mentionedMemberIds,
        mentionedNoteIds,
        notificationId,
        timerCompleted,
      });
    },
    [chat]
  );

  // Auto-scroll when new messages arrive
  useMessageAutoScroll({
    messages: chat.messages,
    scrollContainerRef,
    streamingContainerRef,
    isInitialMount: isInitialMount.current,
  });

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <ChatContainer
        ref={scrollContainerRef}
        messages={chat.messages}
        sendMessage={handleSendMessage}
        streamingContainerRef={streamingContainerRef}
        workspaceMembers={memoizedMembers}
        workspaceNotes={memoizedNotes}
        isInitialMount={isInitialMount}
      />

      {/* Absolutely positioned ChatInput */}
      <div
        className={`fixed left-0 right-0 z-110 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[60px]' : 'bottom-[60px]'
        }`}
      >
        <AiChatInput
          onSend={(
            content: string,
            fileIds?: number[],
            mentionedMemberIds?: number[],
            mentionedNoteIds?: number[]
          ) => {
            isInitialMount.current = false; // Crucial for separate behaviour between intial mount and message sends
            void chat.sendMessage({
              content,
              fileIds,
              mentionedMemberIds,
              mentionedNoteIds,
            });
          }}
          onStop={chat.stopStream}
          isLoading={chat.isSending}
          threadId={selectedThreadId}
          workspaceMembers={memoizedMembers}
          workspaceNotes={memoizedNotes}
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
