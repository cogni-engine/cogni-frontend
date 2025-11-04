import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import MessageContextMenu from './MessageContextMenu';

type Props = {
  message: WorkspaceMessage;
  isOwnMessage: boolean;
  onReply?: (messageId: number) => void;
};

function ReadStatus({ readCount }: { readCount: number }) {
  if (readCount <= 0) return null;

  return <p className='text-xs text-gray-500 mt-1'>Read {readCount}</p>;
}

export default function WorkspaceMessageItem({
  message,
  isOwnMessage,
  onReply,
}: Props) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  // Close context menu on scroll
  useEffect(() => {
    const handleScroll = () => setContextMenu(null);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  if (!message) return null;

  const profile = message.workspace_member?.user_profile ?? null;
  const name = profile?.name ?? 'Unknown';
  const avatarUrl = profile?.avatar_url ?? '';
  const readCount = message.read_count ?? message.reads?.length ?? 0;

  // Handle right-click (desktop)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Handle swipe left (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartTime.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndTime = Date.now();
    const deltaX = touchStartX.current - touchEndX;
    const deltaTime = touchEndTime - touchStartTime.current;

    // Swipe left: deltaX > 50px and completed in < 300ms
    if (deltaX > 50 && deltaTime < 300 && onReply) {
      const rect = messageRef.current?.getBoundingClientRect();
      if (rect) {
        setContextMenu({
          x: rect.right - 150,
          y: rect.top,
        });
      }
    }

    touchStartX.current = null;
    touchStartTime.current = null;
  };

  const handleReply = () => {
    if (onReply) {
      onReply(message.id);
    }
    setContextMenu(null);
  };

  const RepliedMessagePreview = ({
    repliedMessage,
  }: {
    repliedMessage: WorkspaceMessage;
  }) => {
    const repliedProfile = repliedMessage.workspace_member?.user_profile;
    const repliedName = repliedProfile?.name ?? 'Unknown';
    const repliedText =
      repliedMessage.text.slice(0, 100) +
      (repliedMessage.text.length > 100 ? '...' : '');

    return (
      <div className='mb-2 pl-3 border-l-2 border-white/20'>
        <p className='text-xs text-white/50 mb-1'>{repliedName}</p>
        <p className='text-xs text-white/40 whitespace-pre-wrap break-words'>
          {repliedText}
        </p>
      </div>
    );
  };

  if (isOwnMessage) {
    // Own messages on the right (ChatGPT style)
    return (
      <>
        <div
          ref={messageRef}
          className='flex justify-end items-end w-full'
          onContextMenu={handleContextMenu}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
              {message.replied_message && (
                <RepliedMessagePreview
                  repliedMessage={message.replied_message}
                />
              )}
              <p className='text-sm text-white whitespace-pre-wrap break-words'>
                {message.text}
              </p>
            </div>
          </div>
        </div>
        {contextMenu && (
          <MessageContextMenu
            messageText={message.text}
            onReply={handleReply}
            onClose={() => setContextMenu(null)}
            position={contextMenu}
          />
        )}
      </>
    );
  }

  // Other messages on the left
  return (
    <>
      <div
        ref={messageRef}
        className='flex gap-2'
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
              {message.replied_message && (
                <RepliedMessagePreview
                  repliedMessage={message.replied_message}
                />
              )}
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
      {contextMenu && (
        <MessageContextMenu
          messageText={message.text}
          onReply={handleReply}
          onClose={() => setContextMenu(null)}
          position={contextMenu}
        />
      )}
    </>
  );
}
