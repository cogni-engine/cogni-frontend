import { Message, AIMessage } from '@/types/chat';
import { forwardRef } from 'react';
import MessageItem from './MessageItem';
import EmptyState from './EmptyState';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  sendMessage: (
    content: string,
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  streamingContainerRef?: React.RefObject<HTMLDivElement | null>;
};

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ messages, sendMessage, streamingContainerRef }, ref) => {
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

    const hasStreamingMessages = streamingMessages.length > 0;

    return (
      <div className='flex-1 bg-linear-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden'>
        {/* メッセージエリア - GPU最適化 */}
        <div
          ref={ref}
          className='h-full overflow-y-auto relative z-10 px-4 md:px-8 py-20 md:pb-40 space-y-6 scroll-smooth'
          style={{
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
            WebkitOverflowScrolling: 'touch',
          }}
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
                    <MessageItem message={message} sendMessage={sendMessage} />
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

                    return (
                      <div
                        key={key}
                        data-message-index={committedMessages.length + i}
                      >
                        <MessageItem
                          message={message}
                          sendMessage={sendMessage}
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
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
