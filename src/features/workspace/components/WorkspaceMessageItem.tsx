import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User } from 'lucide-react';

type Props = {
  message: WorkspaceMessage;
  isOwnMessage: boolean;
};

export default function WorkspaceMessageItem({ message, isOwnMessage }: Props) {
  if (!message) return null;

  const profile = message.workspace_member?.user_profile ?? null;
  const name = profile?.name ?? 'Unknown';
  const avatarUrl = profile?.avatar_url ?? '';

  if (isOwnMessage) {
    // Own messages on the right (ChatGPT style)
    return (
      <div className='flex justify-end'>
        <div className='max-w-[70%]'>
          <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 shadow-lg'>
            <p className='text-sm text-white whitespace-pre-wrap break-words'>
              {message.text}
            </p>
          </div>
          <p className='text-xs text-gray-500 mt-1 text-right'>
            {format(new Date(message.created_at), 'HH:mm')}
          </p>
        </div>
      </div>
    );
  }

  // Other messages on the left
  return (
    <div className='flex gap-2'>
      <div className='flex-shrink-0'>
        <Avatar className='h-8 w-8 border border-white/15 bg-white/10 text-xs font-medium'>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>
              <User className='h-4 w-4' />
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-gray-400 mb-1'>{name}</p>
        <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2'>
          <p className='text-sm text-white whitespace-pre-wrap break-words'>
            {message.text}
          </p>
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          {format(new Date(message.created_at), 'HH:mm')}
        </p>
      </div>
    </div>
  );
}
