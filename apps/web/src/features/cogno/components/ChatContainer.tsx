import { Message, AIMessage } from '@/types/chat';
import { forwardRef, useMemo } from 'react';
import MessageItem from './MessageItem';
import EmptyState from './EmptyState';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import ScrollableView from '@/components/layout/ScrollableView';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

// Helper to format date for sticky headers
function formatDateHeader(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MM/dd EEE');
}

// Helper to get date key for grouping (YYYY-MM-DD)
function getDateKey(dateString: string): string {
  return format(parseISO(dateString), 'yyyy-MM-dd');
}

// Helper to get minute key for grouping (YYYY-MM-DD-HH-mm)
function getMinuteKey(dateString: string): string {
  return format(parseISO(dateString), 'yyyy-MM-dd-HH-mm');
}

// Group messages by date and determine which ones should show timestamps
type MessageWithMeta = {
  message: Message | AIMessage;
  showTimestamp: boolean;
  index: number;
};

type DateGroup = {
  dateKey: string;
  dateLabel: string;
  messages: MessageWithMeta[];
};

function processMessages(
  messages: (Message | AIMessage)[],
  startIndex: number = 0
): DateGroup[] {
  const groups: DateGroup[] = [];
  let currentGroup: DateGroup | null = null;

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const hasCreatedAt = 'created_at' in message && message.created_at;

    // For messages without created_at (streaming), add to a "streaming" group
    if (!hasCreatedAt) {
      if (!currentGroup || currentGroup.dateKey !== 'streaming') {
        currentGroup = {
          dateKey: 'streaming',
          dateLabel: '',
          messages: [],
        };
        groups.push(currentGroup);
      }
      currentGroup.messages.push({
        message,
        showTimestamp: false,
        index: startIndex + i,
      });
      continue;
    }

    const dateKey = getDateKey(message.created_at);
    const minuteKey = getMinuteKey(message.created_at);
    const role = message.role;

    // Check if next message is in the same minute AND from the same role
    const nextMessage = messages[i + 1];
    const nextHasCreatedAt =
      nextMessage && 'created_at' in nextMessage && nextMessage.created_at;
    const nextMinuteKey = nextHasCreatedAt
      ? getMinuteKey(nextMessage.created_at)
      : null;
    const nextRole = nextMessage?.role;

    // Show timestamp if this is the last message in the minute+role group
    const isSameMinuteAndRole =
      minuteKey === nextMinuteKey && role === nextRole;
    const showTimestamp = !isSameMinuteAndRole;

    // Start a new group if dateKey changed
    if (!currentGroup || currentGroup.dateKey !== dateKey) {
      currentGroup = {
        dateKey,
        dateLabel: formatDateHeader(message.created_at),
        messages: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.messages.push({
      message,
      showTimestamp,
      index: startIndex + i,
    });
  }

  return groups;
}

// Get the last dateKey from processed groups
function getLastDateKey(groups: DateGroup[]): string {
  if (groups.length === 0) return '';
  const lastGroup = groups[groups.length - 1];
  return lastGroup.dateKey;
}

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

    // Process messages for grouping by minute and date
    const groupsBeforeRecent = useMemo(
      () => processMessages(messagesBeforeRecent, 0),
      [messagesBeforeRecent]
    );

    const groupsContainer = useMemo(
      () => processMessages(containerMessages, messagesBeforeRecent.length),
      [containerMessages, messagesBeforeRecent.length]
    );

    // Get the last date key from before recent to check if container groups should show header
    const lastDateKeyBeforeRecent = getLastDateKey(groupsBeforeRecent);

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
            className={`transition-opacity duration-100 mx-2 ${
              messages.length === 0
                ? 'opacity-0 pointer-events-none absolute inset-0'
                : 'opacity-100 pointer-events-auto relative'
            }`}
          >
            {/* Messages before the recent/streaming section - grouped by date */}
            {groupsBeforeRecent.map(group => (
              <div key={group.dateKey} className='relative'>
                {/* Sticky date indicator - stays pinned for all messages in this date group */}
                {group.dateKey !== 'streaming' && group.dateLabel && (
                  <div className='sticky top-16 z-20 flex justify-center py-3'>
                    <div className='px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg'>
                      <span className='text-xs font-medium text-white/60'>
                        {group.dateLabel}
                      </span>
                    </div>
                  </div>
                )}

                {/* Messages for this date */}
                {group.messages.map(({ message, showTimestamp, index }) => {
                  const messageId =
                    'id' in message && typeof message.id === 'number'
                      ? message.id
                      : `committed-${index}`;
                  const key = `${messageId}-${index}`;

                  return (
                    <div
                      key={key}
                      data-message-index={index}
                      className={showTimestamp ? 'mb-3' : 'mb-1'}
                    >
                      <MessageItem
                        message={message}
                        sendMessage={sendMessage}
                        workspaceMembers={workspaceMembers}
                        workspaceNotes={workspaceNotes}
                        showTimestamp={showTimestamp}
                      />
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Small spacing when no container to show */}
            {!shouldShowContainer && <div className='h-16'></div>}

            {/* Streaming/Recent messages container with min-height of container minus header */}
            {shouldShowContainer && (
              <div
                ref={streamingContainerRef}
                className={`flex flex-col pb-32`}
                style={{ minHeight: 'calc(100vh)' }}
              >
                {groupsContainer.map((group, groupIndex) => {
                  // Check if this group's date is same as the last date before recent
                  const shouldShowDateHeader =
                    group.dateKey !== 'streaming' &&
                    group.dateLabel &&
                    (groupIndex > 0 ||
                      group.dateKey !== lastDateKeyBeforeRecent);

                  return (
                    <div key={group.dateKey} className='relative'>
                      {/* Sticky date indicator */}
                      {shouldShowDateHeader && (
                        <div className='sticky top-16 z-20 flex justify-center py-3'>
                          <div className='px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg'>
                            <span className='text-xs font-medium text-white/60'>
                              {group.dateLabel}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Messages for this date */}
                      {group.messages.map(
                        ({ message, showTimestamp, index }) => {
                          const messageId = hasStreamingMessages
                            ? `streaming-${message.id}-${index}`
                            : `recent-${message.id}-${index}`;

                          return (
                            <div
                              key={messageId}
                              data-message-index={index}
                              className={showTimestamp ? 'mb-3' : 'mb-1'}
                            >
                              <MessageItem
                                message={message}
                                sendMessage={sendMessage}
                                workspaceMembers={workspaceMembers}
                                workspaceNotes={workspaceNotes}
                                showTimestamp={showTimestamp}
                              />
                            </div>
                          );
                        }
                      )}
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
