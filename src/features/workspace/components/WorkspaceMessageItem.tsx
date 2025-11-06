import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User, Reply } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import MessageContextMenu from './MessageContextMenu';
import MessageFiles from './MessageFiles';

type Props = {
  message: WorkspaceMessage;
  isOwnMessage: boolean;
  onReply?: (messageId: number) => void;
  onJumpToMessage?: (messageId: number) => void;
  isHighlighted?: boolean;
};

function ReadStatus({ readCount }: { readCount: number }) {
  if (readCount <= 0) return null;

  return <p className='text-xs text-gray-500 mt-1'>Read {readCount}</p>;
}

export default function WorkspaceMessageItem({
  message,
  isOwnMessage,
  onReply,
  onJumpToMessage,
  isHighlighted = false,
}: Props) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const messageContentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const touchStartTarget = useRef<HTMLElement | null>(null);
  const isSwiping = useRef(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const hasMoved = useRef(false);

  // Close context menu on scroll
  useEffect(() => {
    const handleScroll = () => setContextMenu(null);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  // Cleanup long press timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  // Handle right-click (desktop)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleReply = useCallback(() => {
    if (onReply) {
      onReply(message.id);
    }
    setContextMenu(null);
  }, [onReply, message.id]);

  // Unified touch handler - differentiates between tap and swipe
  const handleTouchStart = useCallback((e: TouchEvent | React.TouchEvent) => {
    const touchEvent = e as TouchEvent;
    const target = touchEvent.target as HTMLElement;
    const isRepliedPreview = target?.closest('[data-replied-preview]') !== null;

    // Store initial touch info
    touchStartX.current = touchEvent.touches[0].clientX;
    touchStartY.current = touchEvent.touches[0].clientY;
    touchStartTime.current = Date.now();
    touchStartTarget.current = target;
    isSwiping.current = false;
    hasMoved.current = false;
    setSwipeOffset(0);
    setShowSwipeIndicator(false);

    // If touching replied preview, don't prevent default (allow click)
    if (!isRepliedPreview) {
      touchEvent.preventDefault();
    }

    // Start long press timer (500ms) - only for non-replied-preview areas
    if (!isRepliedPreview) {
      longPressTimer.current = setTimeout(() => {
        if (!hasMoved.current && !isSwiping.current) {
          const rect = messageRef.current?.getBoundingClientRect();
          if (rect) {
            setContextMenu({
              x: Math.min(rect.right - 150, window.innerWidth - 200),
              y: rect.top,
            });
          }
        }
      }, 500);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent | React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEvent = e as TouchEvent;
    const target = touchEvent.target as HTMLElement;
    const isRepliedPreview = target?.closest('[data-replied-preview]') !== null;
    const startedOnRepliedPreview =
      touchStartTarget.current?.closest('[data-replied-preview]') !== null;

    const currentX = touchEvent.touches[0].clientX;
    const currentY = touchEvent.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = Math.abs(currentY - touchStartY.current);
    const absDeltaX = Math.abs(deltaX);

    // If started on replied preview and moved significantly, it's a swipe (not a tap)
    if (startedOnRepliedPreview && (absDeltaX > 10 || deltaY > 10)) {
      // User is swiping, treat as swipe gesture
      hasMoved.current = true;

      // Check if it's a horizontal swipe
      if (absDeltaX > deltaY && absDeltaX > 10) {
        isSwiping.current = true;

        // Only allow left swipe (negative deltaX)
        if (deltaX < 0) {
          const swipeDistance = Math.min(Math.abs(deltaX), 120);
          setSwipeOffset(-swipeDistance);
          setShowSwipeIndicator(swipeDistance > 20);
        } else {
          // Reset if swiping right
          setSwipeOffset(0);
          setShowSwipeIndicator(false);
          isSwiping.current = false;
        }

        // Prevent scrolling when swiping horizontally
        touchEvent.preventDefault();
      } else {
        // Vertical movement - don't treat as swipe, but still mark as moved
        isSwiping.current = false;
        setSwipeOffset(0);
        setShowSwipeIndicator(false);
      }
      return;
    }

    // For non-replied-preview areas, handle normally
    if (!isRepliedPreview && !startedOnRepliedPreview) {
      // If moved more than 10px, cancel long press and mark as moved
      if (absDeltaX > 10 || deltaY > 10) {
        hasMoved.current = true;
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
      }

      // If horizontal movement is greater than vertical, it's likely a swipe
      if (absDeltaX > deltaY && absDeltaX > 10) {
        isSwiping.current = true;

        // Only allow left swipe (negative deltaX)
        if (deltaX < 0) {
          const swipeDistance = Math.min(Math.abs(deltaX), 120);
          setSwipeOffset(-swipeDistance);
          setShowSwipeIndicator(swipeDistance > 20);
        } else {
          // Reset if swiping right
          setSwipeOffset(0);
          setShowSwipeIndicator(false);
        }

        // Prevent scrolling when swiping horizontally
        touchEvent.preventDefault();
      }
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent | React.TouchEvent) => {
      if (
        touchStartX.current === null ||
        touchStartY.current === null ||
        touchStartTime.current === null
      ) {
        return;
      }

      const touchEvent = e as TouchEvent;
      const startedOnRepliedPreview =
        touchStartTarget.current?.closest('[data-replied-preview]') !== null;

      const touchEndX = touchEvent.changedTouches[0].clientX;
      const touchEndY = touchEvent.changedTouches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = Math.abs(touchStartY.current - touchEndY);
      const absDeltaX = Math.abs(deltaX);
      const deltaTime = Date.now() - touchStartTime.current;

      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      // Handle tap on replied preview (jump to message)
      // Only if it's a clear tap (no significant movement, quick, and not a swipe)
      if (
        startedOnRepliedPreview &&
        absDeltaX < 10 &&
        deltaY < 10 &&
        deltaTime < 300 &&
        !isSwiping.current &&
        !hasMoved.current &&
        onJumpToMessage
      ) {
        // It's a tap on replied preview - jump to message
        const repliedMessage = message.replied_message;
        if (repliedMessage?.id) {
          onJumpToMessage(repliedMessage.id);
        }
        // Reset and return early
        touchStartX.current = null;
        touchStartY.current = null;
        touchStartTime.current = null;
        touchStartTarget.current = null;
        isSwiping.current = false;
        hasMoved.current = false;
        setSwipeOffset(0);
        setShowSwipeIndicator(false);
        return;
      }

      // Prevent text selection for non-tap interactions
      if (!startedOnRepliedPreview || hasMoved.current || isSwiping.current) {
        touchEvent.preventDefault();
      }

      // Swipe left detection: directly reply without showing menu
      // - Must be horizontal swipe (deltaX > deltaY)
      // - Must swipe left at least 60px
      // - Must be more horizontal than vertical (deltaX > deltaY * 1.5)
      // Works regardless of where swipe started (replied preview or message content)
      if (
        deltaX > 60 &&
        deltaX > deltaY * 1.5 &&
        isSwiping.current &&
        onReply
      ) {
        // Directly trigger reply without showing menu
        handleReply();
      }

      // Reset swipe visual state with animation
      setSwipeOffset(0);
      setShowSwipeIndicator(false);

      // Reset touch tracking
      touchStartX.current = null;
      touchStartY.current = null;
      touchStartTime.current = null;
      touchStartTarget.current = null;
      isSwiping.current = false;
      hasMoved.current = false;
    },
    [message, onJumpToMessage, onReply, handleReply]
  );

  const handleTouchCancel = () => {
    // Clear long press timer on touch cancel
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // Reset swipe visual state
    setSwipeOffset(0);
    setShowSwipeIndicator(false);
    // Reset touch tracking
    touchStartX.current = null;
    touchStartY.current = null;
    touchStartTime.current = null;
    touchStartTarget.current = null;
    isSwiping.current = false;
    hasMoved.current = false;
  };

  // Add non-passive touch listeners to enable preventDefault
  useEffect(() => {
    const messageElement = messageRef.current;
    if (!messageElement) return;

    const touchStartHandler = (e: TouchEvent) => {
      handleTouchStart(e);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      handleTouchMove(e);
    };

    const touchEndHandler = (e: TouchEvent) => {
      handleTouchEnd(e);
    };

    const touchCancelHandler = () => {
      handleTouchCancel();
    };

    // Add listeners with { passive: false } to allow preventDefault
    messageElement.addEventListener('touchstart', touchStartHandler, {
      passive: false,
    });
    messageElement.addEventListener('touchmove', touchMoveHandler, {
      passive: false,
    });
    messageElement.addEventListener('touchend', touchEndHandler, {
      passive: false,
    });
    messageElement.addEventListener('touchcancel', touchCancelHandler, {
      passive: false,
    });

    return () => {
      messageElement.removeEventListener('touchstart', touchStartHandler);
      messageElement.removeEventListener('touchmove', touchMoveHandler);
      messageElement.removeEventListener('touchend', touchEndHandler);
      messageElement.removeEventListener('touchcancel', touchCancelHandler);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!message) return null;

  const profile = message.workspace_member?.user_profile ?? null;
  const name = profile?.name ?? 'Unknown';
  const avatarUrl = profile?.avatar_url ?? '';
  const readCount = message.read_count ?? message.reads?.length ?? 0;

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

    // Desktop click handler
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onJumpToMessage && repliedMessage.id) {
        onJumpToMessage(repliedMessage.id);
      }
    };

    return (
      <div
        data-replied-preview
        className='mb-2 pl-3 border-l-2 border-white/20 cursor-pointer hover:bg-white/5 rounded transition-colors'
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
      >
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
          data-message-id={message.id}
          className={`flex justify-end items-end w-full relative transition-transform duration-300 ${
            isHighlighted ? 'animate-bounce-x-right' : ''
          }`}
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          {/* Reply icon indicator on the right side */}
          {showSwipeIndicator && (
            <div
              className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center transition-opacity duration-200 z-10'
              style={{
                opacity: showSwipeIndicator ? 1 : 0,
              }}
            >
              <Reply className='w-5 h-5 text-white/60' />
            </div>
          )}
          <div
            className='flex gap-2 items-end justify-end min-w-0 max-w-full relative transition-transform duration-75'
            style={{
              transform: `translateX(${swipeOffset}px)`,
            }}
          >
            <div className='flex flex-col justify-end flex-shrink-0'>
              <div className='text-right'>
                <ReadStatus readCount={readCount} />
              </div>
              <p className='text-xs text-gray-500 text-right'>
                {format(new Date(message.created_at), 'HH:mm')}
              </p>
            </div>
            <div className='flex flex-col gap-2 items-end'>
              {(message.text || message.replied_message) && (
                <div
                  ref={messageContentRef}
                  className='inline-block bg-white/13 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'
                >
                  {message.replied_message && (
                    <RepliedMessagePreview
                      repliedMessage={message.replied_message}
                    />
                  )}
                  {message.text && (
                    <p className='text-sm text-white whitespace-pre-wrap break-words'>
                      {message.text}
                    </p>
                  )}
                </div>
              )}
              {message.files && message.files.length > 0 && (
                <MessageFiles files={message.files} />
              )}
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
        data-message-id={message.id}
        className={`flex gap-2 relative transition-transform duration-300 ${
          isHighlighted ? 'animate-bounce-x-left' : ''
        }`}
        onContextMenu={handleContextMenu}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Reply icon indicator on the right side */}
        {showSwipeIndicator && (
          <div
            className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center transition-opacity duration-200 z-10'
            style={{
              opacity: showSwipeIndicator ? 1 : 0,
            }}
          >
            <Reply className='w-5 h-5 text-white/60' />
          </div>
        )}
        <div
          className='flex gap-2 flex-shrink-0 transition-transform duration-75'
          style={{
            transform: `translateX(${swipeOffset}px)`,
          }}
        >
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
        <div
          className='flex flex-col gap-1 min-w-0 relative flex-1 transition-transform duration-75'
          style={{
            transform: `translateX(${swipeOffset}px)`,
          }}
        >
          <p className='text-xs text-gray-400 mb-1'>{name}</p>
          <div className='flex gap-2 items-end'>
            <div className='flex flex-col gap-2 min-w-0'>
              {(message.text || message.replied_message) && (
                <div
                  ref={messageContentRef}
                  className='inline-block bg-white/8 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'
                >
                  {message.replied_message && (
                    <RepliedMessagePreview
                      repliedMessage={message.replied_message}
                    />
                  )}
                  {message.text && (
                    <p className='text-sm text-white whitespace-pre-wrap break-words'>
                      {message.text}
                    </p>
                  )}
                </div>
              )}
              {message.files && message.files.length > 0 && (
                <MessageFiles files={message.files} />
              )}
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
