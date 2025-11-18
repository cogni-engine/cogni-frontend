import { Message, AIMessage } from '@/types/chat';
import { forwardRef } from 'react';
import MessageItem from './MessageItem';
import EmptyState from './EmptyState';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import ScrollableView from '@/components/layout/ScrollableView';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  sendMessage: (
    content: string,
    fileIds?: number[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[],
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  streamingContainerRef?: React.RefObject<HTMLDivElement | null>;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  (
    {
      messages,
      sendMessage,
      streamingContainerRef,
      workspaceMembers = [],
      workspaceNotes = [],
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

    return (
      <div className='flex flex-col flex-1 bg-linear-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden'>
        {/* メッセージエリア - GPU最適化 */}
        <ScrollableView
          ref={ref}
          className={`pt-20 md:px-8 ${
            isInputActive ? 'pb-6' : 'pb-20'
          } space-y-6 scroll-smooth`}
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Committed messages with small bottom spacing */}
              {committedMessages.map((message, i) => {
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

              {/* Small spacing after committed messages when not streaming */}
              {!hasStreamingMessages && <div className='h-16'></div>}

              {/* Streaming messages in a separate container with min-height of screen */}
              {hasStreamingMessages && (
                <div
                  ref={streamingContainerRef}
                  className='min-h-screen flex flex-col'
                >
                  {streamingMessages.map((message, i) => {
                    const messageId = `streaming-${message.id}-${i}`;
                    const key = messageId;
                    console.log('🎨 Streaming message:', message.content);

                    return (
                      <div
                        key={key}
                        data-message-index={committedMessages.length + i}
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
            </>
          )}
        </ScrollableView>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
