'use client';

import { useRef } from 'react';
import ChatContainer from '@/features/cogno/components/ChatContainer';
import AiChatInput from '@/components/chat-input/AiChatInput';
import NotificationPanel from '@/features/notifications/components/NotificationPanel';
import { useChat } from '@cogni/api';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import { useAIChatMentions } from '@/hooks/useAIChatMentions';
import { useMessageAutoScroll } from '@/hooks/useMessageAutoScroll';
import { useThreadContext } from '@/contexts/ThreadContext';

export default function HomePage() {
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

  // Auto-scroll when new messages arrive
  useMessageAutoScroll({
    messages: chat.messages,
    scrollContainerRef,
    streamingContainerRef,
  });

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
          threadId={selectedThreadId}
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
