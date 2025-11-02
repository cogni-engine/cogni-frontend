import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User } from 'lucide-react';

type Props = {
  message: WorkspaceMessage;
  isOwnMessage: boolean;
};

function ReadStatus({ readCount }: { readCount: number }) {
  if (readCount <= 0) return null;

  return <p className='text-xs text-gray-500 mt-1'>Read {readCount}</p>;
}

export default function WorkspaceMessageItem({ message, isOwnMessage }: Props) {
  if (!message) return null;

  const profile = message.workspace_member?.user_profile ?? null;
  const name = profile?.name ?? 'Unknown';
  const avatarUrl = profile?.avatar_url ?? '';
  const readCount = message.read_count ?? message.reads?.length ?? 0;

  if (isOwnMessage) {
    // Own messages on the right (ChatGPT style)
    return (
      <div className='flex justify-end items-end w-full'>
        <div className='flex gap-2 items-end justify-end min-w-0 max-w-full'>
          <div className='flex flex-col justify-end flex-shrink-0'>
            <div className='text-right'>
              <ReadStatus readCount={readCount} />
            </div>
            <p className='text-xs text-gray-500 text-right'>
              {format(new Date(message.created_at), 'HH:mm')}
            </p>
          </div>
          <div className='bg-white/13 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
            <p className='text-sm text-white whitespace-pre-wrap break-words'>
              {message.text}
            </p>
          </div>
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
      <div className='flex flex-col gap-1 min-w-0'>
        <p className='text-xs text-gray-400 mb-1'>{name}</p>
        <div className='flex gap-2 items-end'>
          <div className='bg-white/8 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
            <p className='text-sm text-white whitespace-pre-wrap break-words'>
              {message.text}
            </p>
          </div>
          <p className='text-xs text-gray-500 mt-1'>
            {format(new Date(message.created_at), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}
