import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User } from 'lucide-react';

type Props = {
  message: WorkspaceMessage;
  isOwnMessage: boolean;
};

export default function WorkspaceMessageItem({ message, isOwnMessage }: Props) {
  if (!message) return null;

  const userName =
    message.workspace_member?.user_profile?.user_name || 'Unknown';
  const avatar = userName.charAt(0).toUpperCase();

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
        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
          {avatar ? (
            <span className='text-white text-sm font-medium'>{avatar}</span>
          ) : (
            <User className='w-4 h-4 text-white' />
          )}
        </div>
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-gray-400 mb-1'>{userName}</p>
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
