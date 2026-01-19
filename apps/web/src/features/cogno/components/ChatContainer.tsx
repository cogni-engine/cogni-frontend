import { Message, AIMessage } from '@/types/chat';
import { forwardRef } from 'react';
import MessageItem from './MessageItem';
import EmptyState from './EmptyState';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import ScrollableView from '@/components/layout/ScrollableView';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  isLoading?: boolean;
  sendMessage: (
    content: string,
    files?: UploadedFile[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[],
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  streamingContainerRef?: React.RefObject<HTMLDivElement | null>;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  isInitialMount?: React.RefObject<boolean>;
};

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  (
    {
      messages,
      isLoading = false,
      sendMessage,
      streamingContainerRef,
      workspaceMembers = [],
      workspaceNotes = [],
      isInitialMount,
    },
    ref
  ) => {
    // Separate committed (saved to DB) messages from streaming (temporary) messages
    // Temporary messages have string IDs from Date.now().toString()
    const committedMessages: (Message | AIMessage)[] = [];
    const streamingMessages: (Message | AIMessage)[] = [];

    messages.forEach(message => {
      const isTemporary = 'id' in message && typeof message.id === 'string';
      if (isTemporary) {
        streamingMessages.push(message);
      } else {
        committedMessages.push(message);
      }
    });

    const { isInputActive } = useGlobalUI();

    const hasStreamingMessages = streamingMessages.length > 0;

    // If no streaming messages, find recent messages after the last user message
    let recentMessages: (Message | AIMessage)[] = [];
    let messagesBeforeRecent: (Message | AIMessage)[] = committedMessages;

    if (!hasStreamingMessages && committedMessages.length > 0) {
      // Find the index of the most recent user message
      let lastUserMessageIndex = -1;
      for (let i = committedMessages.length - 1; i >= 0; i--) {
        if (committedMessages[i].role === 'user') {
          lastUserMessageIndex = i;
          break;
        }
      }

      // If we found a user message, split the messages
      if (lastUserMessageIndex !== -1 && !isInitialMount?.current) {
        messagesBeforeRecent = committedMessages.slice(0, lastUserMessageIndex);
        recentMessages = committedMessages.slice(lastUserMessageIndex);
      }
    }

    // Determine what to show in the streaming/recent container
    const containerMessages = hasStreamingMessages
      ? streamingMessages
      : recentMessages;
    // Don't show container on initial mount
    const shouldShowContainer =
      !isInitialMount?.current && containerMessages.length > 0;

    return (
      <div className='flex flex-col flex-1 bg-linear-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden'>
        {/* メッセージエリア - GPU最適化 */}
        <ScrollableView
          ref={ref}
          className={`pt-20 md:px-8 ${
            isInputActive ? 'pb-6' : 'pb-20'
          } space-y-6`}
        >
          {/* Empty State - shown when not loading and no messages */}
          <div
            className={`transition-opacity duration-100 ${
              !isLoading && messages.length === 0
                ? 'opacity-100 pointer-events-auto absolute inset-0 flex items-center justify-center'
                : 'opacity-0 pointer-events-none absolute inset-0'
            }`}
          >
            <EmptyState />
          </div>

          {/* Messages Content - shown when messages exist */}
          <div
            className={`transition-opacity duration-100 ${
              messages.length === 0
                ? 'opacity-0 pointer-events-none absolute inset-0'
                : 'opacity-100 pointer-events-auto relative'
            }`}
          >
            {/* Messages before the recent/streaming section */}
            {messagesBeforeRecent.map((message, i) => {
              const messageId =
                'id' in message && typeof message.id === 'number'
                  ? message.id
                  : `committed-${i}`;
              const key = `${messageId}-${i}`;

              return (
                <div key={key} data-message-index={i}>
                  <MessageItem
                    message={message}
                    sendMessage={sendMessage}
                    workspaceMembers={workspaceMembers}
                    workspaceNotes={workspaceNotes}
                  />
                </div>
              );
            })}

            {/* Small spacing when no container to show */}
            {!shouldShowContainer && <div className='h-16'></div>}

            {/* Streaming/Recent messages container with min-height of container minus header */}
            {shouldShowContainer && (
              <div
                ref={streamingContainerRef}
                className={`flex flex-col pb-32`}
                style={{ minHeight: 'calc(100vh)' }}
              >
                {containerMessages.map((message, i) => {
                  const messageId = hasStreamingMessages
                    ? `streaming-${message.id}-${i}`
                    : `recent-${message.id}-${i}`;
                  const key = messageId;

                  return (
                    <div
                      key={key}
                      data-message-index={messagesBeforeRecent.length + i}
                    >
                      <MessageItem
                        message={message}
                        sendMessage={sendMessage}
                        workspaceMembers={workspaceMembers}
                        workspaceNotes={workspaceNotes}
                      />
                    </div>
                  );
                })}
                {/* Extra space to ensure content can grow */}
                <div className='grow'></div>
              </div>
            )}
          </div>
        </ScrollableView>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
