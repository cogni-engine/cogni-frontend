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

export default function HomePage() {
  const workspaceId = getPersonalWorkspaceId();
  const chat = useChat({ workspaceId });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamingContainerRef = useRef<HTMLDivElement>(null);
  const { isInputActive } = useGlobalUI();
  const { members, notes } = useAIChatMentions();

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
    chat.initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <ChatContainer
        ref={scrollContainerRef}
        messages={chat.messages}
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
