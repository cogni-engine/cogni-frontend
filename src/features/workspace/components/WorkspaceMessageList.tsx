import type { WorkspaceMessage } from '@/types/workspace';
import WorkspaceMessageItem from '@/features/workspace/components/WorkspaceMessageItem';

type Props = {
  messages: WorkspaceMessage[];
  currentUserId: string | null;
};

export default function WorkspaceMessageList({
  messages,
  currentUserId,
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
    <div className='flex flex-col gap-3'>
      {messages
        .filter(message => message != null)
        .map(message => (
          <WorkspaceMessageItem
            key={message.id}
            message={message}
            isOwnMessage={currentUserId === message.workspace_member?.user_id}
          />
        ))}
    </div>
  );
}
