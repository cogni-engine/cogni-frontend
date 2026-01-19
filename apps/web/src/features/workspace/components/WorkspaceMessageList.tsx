import { memo } from 'react';
import type { WorkspaceMessage, WorkspaceMember } from '@/types/workspace';
import WorkspaceMessageItem from '@/features/workspace/components/WorkspaceMessageItem';
import type { Note } from '@/types/note';

type Props = {
  messages: WorkspaceMessage[];
  currentUserId: string;
  onReply?: (messageId: number) => void;
  onJumpToMessage?: (messageId: number) => void;
  highlightedMessageId?: number | null;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

function WorkspaceMessageList({
  messages,
  currentUserId,
  onReply,
  onJumpToMessage,
  highlightedMessageId,
  workspaceMembers = [],
  workspaceNotes = [],
}: Props) {
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
    <div className='flex flex-col gap-3 mx-2'>
      {messages
        .filter(message => message != null)
        .map(message => (
          <WorkspaceMessageItem
            key={message.id}
            message={message}
            isOwnMessage={currentUserId === message.workspace_member?.user_id}
            onReply={onReply}
            onJumpToMessage={onJumpToMessage}
            isHighlighted={highlightedMessageId === message.id}
            workspaceMembers={workspaceMembers}
            workspaceNotes={workspaceNotes}
          />
        ))}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(WorkspaceMessageList);
