import { memo, useMemo } from 'react';
import type { WorkspaceMessage, WorkspaceMember } from '@/types/workspace';
import WorkspaceMessageItem from '@/features/workspace/components/WorkspaceMessageItem';
import type { Note } from '@/types/note';
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
  message: WorkspaceMessage;
  showTimestamp: boolean;
  showAvatar: boolean;
};

type DateGroup = {
  dateKey: string;
  dateLabel: string;
  messages: MessageWithMeta[];
};

function processMessages(messages: WorkspaceMessage[]): DateGroup[] {
  const groups: DateGroup[] = [];
  let currentGroup: DateGroup | null = null;

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (!message) continue;

    const dateKey = getDateKey(message.created_at);
    const minuteKey = getMinuteKey(message.created_at);
    const userId = message.workspace_member?.user_id;

    // Check if previous message is in the same minute AND from the same user
    const prevMessage = messages[i - 1];
    const prevMinuteKey = prevMessage
      ? getMinuteKey(prevMessage.created_at)
      : null;
    const prevUserId = prevMessage?.workspace_member?.user_id;

    // Show avatar if this is the first message in the minute+user group
    const isSameMinuteAndUserAsPrev =
      minuteKey === prevMinuteKey && userId === prevUserId;
    const showAvatar = !isSameMinuteAndUserAsPrev;

    // Check if next message is in the same minute AND from the same user
    const nextMessage = messages[i + 1];
    const nextMinuteKey = nextMessage
      ? getMinuteKey(nextMessage.created_at)
      : null;
    const nextUserId = nextMessage?.workspace_member?.user_id;

    // Show timestamp if this is the last message in the minute+user group
    const isSameMinuteAndUserAsNext =
      minuteKey === nextMinuteKey && userId === nextUserId;
    const showTimestamp = !isSameMinuteAndUserAsNext;

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
      showAvatar,
    });
  }

  return groups;
}

type Props = {
  messages: WorkspaceMessage[];
  currentUserId: string;
  onReply?: (messageId: number) => void;
  onJumpToMessage?: (messageId: number) => void;
  highlightedMessageId?: number | null;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  onDismissFailedMessage?: (optimisticId: number) => void;
  currentMemberId?: number | null;
  onAddReaction?: (messageId: number, emoji: string) => void;
  onRemoveReaction?: (messageId: number) => void;
};

function WorkspaceMessageList({
  messages,
  currentUserId,
  onReply,
  onJumpToMessage,
  highlightedMessageId,
  workspaceMembers = [],
  workspaceNotes = [],
  onDismissFailedMessage,
  currentMemberId = null,
  onAddReaction,
  onRemoveReaction,
}: Props) {
  // Process messages for grouping by minute and date
  const dateGroups = useMemo(
    () => processMessages(messages.filter(m => m != null)),
    [messages]
  );

  if (messages.length === 0) {
    return (
      <div className='flex-1 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-400'>
            No messages yet. Start the conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-2'>
      {dateGroups.map(group => (
        <div key={group.dateKey} className='relative'>
          {/* Sticky date indicator - stays pinned for all messages in this date group */}
          <div className='sticky top-0 z-20 flex justify-center pb-2'>
            <div className='px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg'>
              <span className='text-xs font-medium text-white/60'>
                {group.dateLabel}
              </span>
            </div>
          </div>

          {/* Messages for this date */}
          <div className='flex flex-col'>
            {group.messages.map(({ message, showTimestamp, showAvatar }) => (
              <div key={message.id} className='mb-1.5'>
                <WorkspaceMessageItem
                  message={message}
                  isOwnMessage={
                    currentUserId === message.workspace_member?.user_id
                  }
                  onReply={onReply}
                  onJumpToMessage={onJumpToMessage}
                  isHighlighted={highlightedMessageId === message.id}
                  workspaceMembers={workspaceMembers}
                  workspaceNotes={workspaceNotes}
                  showTimestamp={showTimestamp}
                  showAvatar={showAvatar}
                  onDismissFailedMessage={onDismissFailedMessage}
                  currentMemberId={currentMemberId}
                  onAddReaction={onAddReaction}
                  onRemoveReaction={onRemoveReaction}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(WorkspaceMessageList);
