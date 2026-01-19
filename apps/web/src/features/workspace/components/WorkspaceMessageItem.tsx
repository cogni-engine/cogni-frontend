import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User, Reply, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useDrag } from '@use-gesture/react';
import MessageContextMenu from './MessageContextMenu';
import MessageFiles from './MessageFiles';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import type { OptimisticMessage } from '@/hooks/useWorkspaceChat';

type Props = {
  message: WorkspaceMessage | OptimisticMessage;
  isOwnMessage: boolean;
  onReply?: (messageId: number) => void;
  onJumpToMessage?: (messageId: number) => void;
  isHighlighted?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  showTimestamp?: boolean;
  showAvatar?: boolean;
  onDismissFailedMessage?: (optimisticId: number) => void;
};

function ReadStatus({ readCount }: { readCount: number }) {
  if (readCount <= 0) return null;

  return <p className='text-xs text-gray-500 mt-1'>Read {readCount}</p>;
}

function WorkspaceMessageItem({
  message,
  isOwnMessage,
  onReply,
  onJumpToMessage,
  isHighlighted = false,
  workspaceMembers = [],
  workspaceNotes = [],
  showTimestamp = true,
  showAvatar = true,
  onDismissFailedMessage,
}: Props) {
  // Check if this is an optimistic message
  const optimisticMessage = message as OptimisticMessage;
  const isOptimistic = optimisticMessage._optimistic === true;
  const isFailed = optimisticMessage._failed === true;
  const optimisticId = optimisticMessage._optimisticId;
  const { openNoteDrawer } = useGlobalUI();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const dragTargetRef = useRef<HTMLElement | null>(null);
  const startedOnRepliedPreviewRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  // handlers for collapsible messages
  const MAX_COLLAPSED_HEIGHT = 200; // IN PX
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openChatMessageDrawer } = useGlobalUI();

  // collapsible message handler
  useEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;
    setIsOverflowing(el.scrollHeight > MAX_COLLAPSED_HEIGHT);
  }, [message.text]);

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

  const handleNoteMentionClick = useCallback(
    (noteId: number) => {
      openNoteDrawer(noteId);
    },
    [openNoteDrawer]
  );

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const scheduleLongPress = useCallback(() => {
    cancelLongPress();
    longPressTimer.current = setTimeout(() => {
      const rect = messageRef.current?.getBoundingClientRect();
      if (rect) {
        setContextMenu({
          x: Math.min(rect.right - 150, window.innerWidth - 200),
          y: rect.top,
        });
      }
    }, 500);
  }, [cancelLongPress]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      dragTargetRef.current = event.target as HTMLElement;
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      startedOnRepliedPreviewRef.current =
        dragTargetRef.current?.closest('[data-replied-preview]') !== null;

      if (!startedOnRepliedPreviewRef.current) {
        scheduleLongPress();
      }
    },
    [scheduleLongPress]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const start = pointerStartRef.current;
      if (!start) return;

      const deltaX = Math.abs(event.clientX - start.x);
      const deltaY = Math.abs(event.clientY - start.y);

      if (deltaX > 6 || deltaY > 6) {
        cancelLongPress();
      }
    },
    [cancelLongPress]
  );

  const resetPointerState = useCallback(() => {
    cancelLongPress();
    pointerStartRef.current = null;
    dragTargetRef.current = null;
    startedOnRepliedPreviewRef.current = false;
  }, [cancelLongPress]);

  const handlePointerUp = useCallback(() => {
    resetPointerState();
  }, [resetPointerState]);

  const handlePointerCancel = useCallback(() => {
    resetPointerState();
    setSwipeOffset(0);
    setShowSwipeIndicator(false);
  }, [resetPointerState]);

  type DragHandlerType = Parameters<typeof useDrag>[0];

  const dragHandler = useCallback<DragHandlerType>(
    state => {
      const { first, last, movement, tap, event } = state;
      const movementX = movement[0] ?? 0;

      if (first) {
        cancelLongPress();
      }

      const startedOnPreview = startedOnRepliedPreviewRef.current;

      if (last) {
        const clampedMovement = Math.min(movementX, 0);
        const swipeDistance = Math.abs(clampedMovement);

        setSwipeOffset(0);
        setShowSwipeIndicator(false);

        if (
          tap &&
          startedOnPreview &&
          onJumpToMessage &&
          message.replied_message?.id
        ) {
          const nativeEvent = event as Event;
          if (typeof nativeEvent.stopPropagation === 'function') {
            nativeEvent.stopPropagation();
          }
          onJumpToMessage(message.replied_message.id);
        } else if (swipeDistance >= 60 && onReply) {
          handleReply();
        }

        resetPointerState();
        return;
      }

      const clampedMovement = Math.min(movementX, 0);

      if (clampedMovement < 0) {
        const limitedMovement = Math.max(clampedMovement, -120);
        setSwipeOffset(limitedMovement);
        setShowSwipeIndicator(Math.abs(limitedMovement) > 20);
      } else {
        setSwipeOffset(0);
        setShowSwipeIndicator(false);
      }
    },
    [
      cancelLongPress,
      handleReply,
      message.replied_message?.id,
      onJumpToMessage,
      onReply,
      resetPointerState,
    ]
  );

  const bindDrag = useDrag(dragHandler, {
    axis: 'x',
    filterTaps: true,
    threshold: 10,
    preventScroll: false,
  });

  const dragBindings = bindDrag();

  const gestureBindings = useMemo(() => {
    return {
      ...dragBindings,
      onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
        handlePointerDown(event);
        dragBindings.onPointerDown?.(event);
      },
      onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
        handlePointerMove(event);
        dragBindings.onPointerMove?.(event);
      },
      onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => {
        handlePointerUp();
        dragBindings.onPointerUp?.(event);
      },
      onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => {
        handlePointerCancel();
        dragBindings.onPointerCancel?.(event);
      },
      onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => {
        handlePointerCancel();
        dragBindings.onPointerLeave?.(event);
      },
    };
  }, [
    dragBindings,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  ]);

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
        className='mb-2 border-white/20 cursor-pointer rounded transition-colors'
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
      >
        <div className='flex items-start gap-2'>
          <Avatar className='h-6 w-6 border border-white/15 bg-white/10 text-[10px] font-medium shrink-0'>
            {repliedProfile?.avatar_url ? (
              <AvatarImage src={repliedProfile.avatar_url} alt={repliedName} />
            ) : (
              <AvatarFallback>
                <User className='h-3.5 w-3.5' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='text-xs text-white/50 mb-1'>{repliedName}</p>
            <div className='text-xs text-white/40'>
              <TiptapRenderer
                content={repliedText}
                contentType='markdown'
                enableMemberMentions={true}
                enableNoteMentions={true}
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
                className='tiptap-reply-preview'
                onNoteMentionClick={handleNoteMentionClick}
              />
            </div>
          </div>
        </div>
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
          } ${isOptimistic && !isFailed ? 'opacity-70' : ''}`}
          onContextMenu={!isOptimistic ? handleContextMenu : undefined}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          {...(!isOptimistic ? gestureBindings : {})}
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
            {showTimestamp && (
              <div className='flex flex-col justify-end shrink-0'>
                {/* Show status for optimistic messages */}
                {isOptimistic && !isFailed && (
                  <div className='flex items-center justify-end gap-1 text-xs text-gray-500'>
                    <Loader2 className='w-3 h-3 animate-spin' />
                    <span>Sending...</span>
                  </div>
                )}
                {isFailed && (
                  <div className='flex items-center justify-end gap-1'>
                    <button
                      onClick={() =>
                        optimisticId && onDismissFailedMessage?.(optimisticId)
                      }
                      className='text-xs text-red-400 hover:text-red-300 flex items-center gap-1'
                    >
                      <AlertCircle className='w-3 h-3' />
                      <span>Failed - Tap to dismiss</span>
                    </button>
                  </div>
                )}
                {!isOptimistic && (
                  <>
                    <div className='text-right'>
                      <ReadStatus readCount={readCount} />
                    </div>
                    <p className='text-xs text-gray-500 text-right'>
                      {format(new Date(message.created_at), 'HH:mm')}
                    </p>
                  </>
                )}
              </div>
            )}
            <div className='flex flex-col gap-2 items-end'>
              {(message.text || message.replied_message) && (
                <div
                  className={`inline-block max-w-[75vw] backdrop-blur-xl border rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] ${
                    isFailed
                      ? 'bg-red-500/20 border-red-500/30'
                      : 'bg-white/13 border-black'
                  }`}
                >
                  {message.replied_message && (
                    <RepliedMessagePreview
                      repliedMessage={message.replied_message}
                    />
                  )}
                  {message.text && (
                    <div className='text-sm text-white'>
                      <div
                        ref={contentRef}
                        className={`relative transition-all ${
                          isOverflowing ? 'overflow-hidden' : ''
                        }`}
                        style={{
                          maxHeight: isOverflowing
                            ? MAX_COLLAPSED_HEIGHT
                            : 'none',
                        }}
                      >
                        <TiptapRenderer
                          content={message.text}
                          contentType='markdown'
                          enableMemberMentions
                          enableNoteMentions
                          workspaceMembers={workspaceMembers}
                          workspaceNotes={workspaceNotes}
                          className='tiptap-message-content'
                          onNoteMentionClick={handleNoteMentionClick}
                        />
                      </div>

                      {/* Toggle the thing  */}
                      {isOverflowing && !isOptimistic && (
                        <button
                          onClick={() => openChatMessageDrawer(message)}
                          className='mt-1 text-xs text-blue-400 hover:underline'
                        >
                          See All
                        </button>
                      )}
                    </div>
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
        className={`flex gap-1.5 relative transition-transform duration-300 ${
          isHighlighted ? 'animate-bounce-x-left' : ''
        }`}
        onContextMenu={handleContextMenu}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        {...gestureBindings}
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
          className='flex gap-2 shrink-0 transition-transform duration-75'
          style={{
            transform: `translateX(${swipeOffset}px)`,
          }}
        >
          {showAvatar ? (
            <Avatar className='h-8 w-8 border border-white/15 bg-white/10 text-xs font-medium'>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback>
                  <User className='h-4 w-4' />
                </AvatarFallback>
              )}
            </Avatar>
          ) : (
            /* Spacer to maintain alignment */
            <div className='w-8' />
          )}
        </div>
        <div
          className='flex flex-col min-w-0 relative flex-1 transition-transform duration-75'
          style={{
            transform: `translateX(${swipeOffset}px)`,
          }}
        >
          {showAvatar && <p className='text-xs text-gray-400 mb-1'>{name}</p>}
          <div className='flex items-end'>
            <div className='flex flex-col gap-2 min-w-0'>
              {(message.text || message.replied_message) && (
                <div className='inline-block max-w-[75vw] bg-white/8 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
                  {message.replied_message && (
                    <RepliedMessagePreview
                      repliedMessage={message.replied_message}
                    />
                  )}
                  {message.text && (
                    <div className='text-sm text-white'>
                      <div
                        ref={contentRef}
                        className={`relative transition-all ${
                          isOverflowing ? 'overflow-hidden' : ''
                        }`}
                        style={{
                          maxHeight: isOverflowing
                            ? MAX_COLLAPSED_HEIGHT
                            : 'none',
                        }}
                      >
                        <TiptapRenderer
                          content={message.text}
                          contentType='markdown'
                          enableMemberMentions
                          enableNoteMentions
                          workspaceMembers={workspaceMembers}
                          workspaceNotes={workspaceNotes}
                          className='tiptap-message-content'
                          onNoteMentionClick={handleNoteMentionClick}
                        />
                      </div>

                      {/* Toggle */}
                      {isOverflowing && (
                        <button
                          onClick={() => openChatMessageDrawer(message)}
                          className='mt-1 text-xs text-blue-400 hover:underline'
                        >
                          See All
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {message.files && message.files.length > 0 && (
                <MessageFiles files={message.files} align='left' />
              )}
            </div>
            {showTimestamp && (
              <p className='text-xs text-gray-500 mt-1'>
                {format(new Date(message.created_at), 'HH:mm')}
              </p>
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

// Memoize the component to prevent unnecessary re-renders
export default memo(WorkspaceMessageItem);
