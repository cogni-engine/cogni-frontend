'use client';

import { useRef, useCallback, useMemo, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import AiChatInput from '@/components/chat-input/AiChatInput';
import NotificationPanel from '@/features/notifications/components/NotificationPanel';
import { useChat } from './hooks/useChat';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import { useAIChatMentions } from './hooks/useAIChatMentions';
import { useMessageAutoScroll } from './hooks/useMessageAutoScroll';
import { useThreadContext } from '@/contexts/ThreadContext';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';

interface HomeCognoChatProps {
  isInitialMount: React.RefObject<boolean>;
}

export default function HomeCognoChat({ isInitialMount }: HomeCognoChatProps) {
  const { selectedThreadId, setSelectedThreadId, refetchThreads } =
    useThreadContext();

  const { messages, messagesLoading, sendMessage, isSending, stopStream } =
    useChat({
      selectedThreadId,
      onThreadCreated: (newThreadId: number) => {
        setSelectedThreadId(newThreadId);
        // Refresh the threads list in the sidebar
        refetchThreads();
      },
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
      files?: UploadedFile[],
      mentionedMemberIds?: number[],
      mentionedNoteIds?: number[],
      notificationId?: number,
      timerCompleted?: boolean
    ) => {
      return sendMessage({
        content,
        files,
        mentionedMemberIds,
        mentionedNoteIds,
        notificationId,
        timerCompleted,
      });
    },
    [sendMessage]
  );

  // Auto-scroll when new messages arrive
  useMessageAutoScroll({
    messages: messages,
    scrollContainerRef,
    streamingContainerRef,
    isInitialMount: isInitialMount.current,
  });

  // Listen for TRIGGER_NOTIFICATION postMessage from mobile app
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      // Validate origin for security (in production, check specific origins)
      // For mobile WebView, origin might be 'file://' or similar

      try {
        const data = event.data;

        if (data.type === 'TRIGGER_NOTIFICATION') {
          const notificationId = data.notificationId;

          if (notificationId && typeof notificationId === 'number') {
            console.log('📬 Received TRIGGER_NOTIFICATION postMessage:', {
              notificationId,
            });

            // Trigger the same action as clicking a notification in the dropdown
            // This calls sendMessage with empty content and notificationId
            // which activates the main chat with the notification context
            void handleSendMessage(
              '',
              undefined,
              undefined,
              undefined,
              notificationId
            );
          } else {
            console.warn(
              'Invalid notificationId in TRIGGER_NOTIFICATION:',
              notificationId
            );
          }
        }
      } catch (error) {
        // Ignore errors from unrelated postMessage events
        console.debug(
          'Error processing TRIGGER_NOTIFICATION postMessage:',
          error
        );
      }
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, [handleSendMessage]);

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <ChatContainer
        ref={scrollContainerRef}
        messages={messages}
        isLoading={messagesLoading}
        sendMessage={handleSendMessage}
        streamingContainerRef={streamingContainerRef}
        workspaceMembers={memoizedMembers}
        workspaceNotes={memoizedNotes}
        isInitialMount={isInitialMount}
      />

      {/* Absolutely positioned ChatInput */}
      <div
        className={`fixed left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0 md:bottom-[60px]' : 'bottom-[60px]'
        }`}
      >
        <AiChatInput
          onSend={(
            content: string,
            files?: UploadedFile[],
            mentionedMemberIds?: number[],
            mentionedNoteIds?: number[]
          ) => {
            isInitialMount.current = false; // Crucial for separate behaviour between intial mount and message sends
            void sendMessage({
              content,
              files,
              mentionedMemberIds,
              mentionedNoteIds,
            });
          }}
          onStop={stopStream}
          isLoading={isSending}
          workspaceMembers={memoizedMembers}
          workspaceNotes={memoizedNotes}
        />
      </div>

      {/* NotificationPanel */}
      <NotificationPanel
        sendMessage={(content: string, notificationId?: number) =>
          sendMessage({ content, notificationId })
        }
      />
    </div>
  );
}
