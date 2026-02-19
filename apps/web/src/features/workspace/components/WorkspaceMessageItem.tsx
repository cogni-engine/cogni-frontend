import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { WorkspaceMessage } from '@/types/workspace';
import { format } from 'date-fns';
import { User, Reply, AlertCircle, Check, X } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useDrag } from '@use-gesture/react';
import MessageContextMenuOverlay from './MessageContextMenuOverlay';
import MessageFiles from './MessageFiles';
import ReactionDisplay from './ReactionDisplay';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import { TextWithParsedMentions } from '@/components/TextWithParsedMentions';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';
import type { OptimisticMessage } from '@/features/workspace/api/useWorkspaceChat';

type Props = {
  message: WorkspaceMessage | OptimisticMessage;
  isOwnMessage: boolean;
  onReply?: (messageId: number) => void;
  onEdit?: (messageId: number, newText: string) => void;
  onJumpToMessage?: (messageId: number) => void;
  isHighlighted?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  showTimestamp?: boolean;
  showAvatar?: boolean;
  onDismissFailedMessage?: (optimisticId: number) => void;
  currentMemberId?: number | null;
  onAddReaction?: (messageId: number, emoji: string) => void;
  onRemoveReaction?: (messageId: number) => void;
};

function ReadStatus({ readCount }: { readCount: number }) {
  if (readCount <= 0) return null;

  return <p className='text-xs text-text-muted mt-1'>Read {readCount}</p>;
}

function WorkspaceMessageItem({
  message,
  isOwnMessage,
  onReply,
  onEdit,
  onJumpToMessage,
  isHighlighted = false,
  workspaceMembers = [],
  workspaceNotes = [],
  showTimestamp = true,
  showAvatar = true,
  onDismissFailedMessage,
  currentMemberId = null,
  onAddReaction,
  onRemoveReaction,
}: Props) {
  // Check if this is an optimistic message
  const optimisticMessage = message as OptimisticMessage;
  const isOptimistic = optimisticMessage._optimistic === true;
  const isFailed = optimisticMessage._failed === true;
  const optimisticId = optimisticMessage._optimisticId;
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);
  const openChatMessageDrawer = useGlobalUIStore(
    state => state.openChatMessageDrawer
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && editTextareaRef.current) {
      editTextareaRef.current.focus();
      const len = editTextareaRef.current.value.length;
      editTextareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const openUserProfileDrawer = useGlobalUIStore(
    state => state.openUserProfileDrawer
  );
  const [contextMenuRect, setContextMenuRect] = useState<DOMRect | null>(null);
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

  // collapsible message handler
  useEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;
    setIsOverflowing(el.scrollHeight > MAX_COLLAPSED_HEIGHT);
  }, [message.text]);

  // Close context menu on scroll
  useEffect(() => {
    const handleScroll = () => setContextMenuRect(null);
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

  // Handle right-click (desktop) — capture bubble DOMRect
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const bubble = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(
      '[data-message-bubble]'
    );
    if (bubble) {
      setContextMenuRect(bubble.getBoundingClientRect());
    }
  };

  const handleReply = useCallback(() => {
    if (onReply) {
      onReply(message.id);
    }
    setContextMenuRect(null);
  }, [onReply, message.id]);

  const handleStartEdit = useCallback(() => {
    setEditText(message.text);
    setIsEditing(true);
    setContextMenuRect(null);
    // Focus is handled by the useEffect watching isEditing
  }, [message.text]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText('');
  }, []);

  const handleConfirmEdit = useCallback(() => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== message.text && onEdit) {
      onEdit(message.id, trimmed);
    }
    setIsEditing(false);
    setEditText('');
  }, [editText, message.text, message.id, onEdit]);

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleConfirmEdit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancelEdit();
      }
    },
    [handleConfirmEdit, handleCancelEdit]
  );

  const handleReactionClick = useCallback(
    (emoji: string) => {
      if (!onAddReaction || !onRemoveReaction || currentMemberId == null)
        return;
      const hasThisEmoji = (message.reactions ?? []).some(
        r => r.workspace_member_id === currentMemberId && r.emoji === emoji
      );
      if (hasThisEmoji) {
        onRemoveReaction(message.id);
      } else {
        onAddReaction(message.id, emoji);
      }
    },
    [
      message.id,
      message.reactions,
      currentMemberId,
      onAddReaction,
      onRemoveReaction,
    ]
  );

  const handleOverlayAddReaction = useCallback(
    (emoji: string) => {
      onAddReaction?.(message.id, emoji);
    },
    [message.id, onAddReaction]
  );

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
      const bubble = messageRef.current?.querySelector<HTMLElement>(
        '[data-message-bubble]'
      );
      if (bubble) {
        setContextMenuRect(bubble.getBoundingClientRect());
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
        className='mb-2 border-border-default cursor-pointer rounded transition-colors'
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
      >
        <div className='flex items-start gap-2'>
          <Avatar className='h-6 w-6 border border-border-subtle bg-interactive-hover text-[10px] font-medium shrink-0'>
            {repliedProfile?.avatar_url ? (
              <AvatarImage src={repliedProfile.avatar_url} alt={repliedName} />
            ) : (
              <AvatarFallback>
                <User className='h-3.5 w-3.5' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='text-xs text-text-muted mb-1'>{repliedName}</p>
            <div className='text-xs text-text-muted'>
              <TextWithParsedMentions
                text={repliedMessage.text}
                maxLength={100}
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
              <Reply className='w-5 h-5 text-text-secondary' />
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
                {isFailed && (
                  <div className='flex items-center justify-end gap-1'>
                    <button
                      onClick={() =>
                        optimisticId && onDismissFailedMessage?.(optimisticId)
                      }
                      className='text-xs text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 flex items-center gap-1'
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
                    <p className='text-xs text-text-muted text-right'>
                      {format(new Date(message.created_at), 'HH:mm')}
                    </p>
                  </>
                )}
              </div>
            )}
            <div className='flex flex-col gap-2 items-end'>
              <div
                className={`relative ${!isOptimistic && message.reactions && message.reactions.length > 0 ? 'mb-2.5' : ''}`}
              >
                {(message.text || message.replied_message) && (
                  <div
                    data-message-bubble
                    className={`inline-block max-w-[75vw] dark:backdrop-blur-xl border rounded-3xl px-4 py-2.5 shadow-card ${
                      isFailed
                        ? 'bg-red-500/20 border-red-500/30'
                        : 'bg-surface-secondary border-border-default'
                    }`}
                  >
                    {message.replied_message && (
                      <RepliedMessagePreview
                        repliedMessage={message.replied_message}
                      />
                    )}
                    {message.text && (
                      <div className='text-sm text-text-primary'>
                        {isEditing ? (
                          <div className='flex flex-col gap-1'>
                            <textarea
                              ref={editTextareaRef}
                              value={editText}
                              onChange={e => setEditText(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              className='w-full min-h-[40px] bg-transparent border-b border-border-default rounded-none px-0 py-1 text-base text-text-primary resize-none focus:outline-none focus:border-text-secondary'
                              rows={Math.min(
                                editText.split('\n').length + 1,
                                6
                              )}
                            />
                            {(() => {
                              const trimmed = editText.trim();
                              const canSubmit =
                                !!trimmed && trimmed !== message.text;
                              return (
                                <div className='flex items-center gap-2 justify-end'>
                                  <button
                                    onClick={handleCancelEdit}
                                    className='p-1 rounded-lg hover:bg-surface-primary transition-colors'
                                    aria-label='Cancel edit'
                                  >
                                    <X className='w-4 h-4 text-text-muted' />
                                  </button>
                                  <button
                                    onClick={handleConfirmEdit}
                                    className='p-1 rounded-lg hover:bg-surface-primary transition-colors'
                                    aria-label='Confirm edit'
                                    disabled={!canSubmit}
                                  >
                                    <Check
                                      className={`w-4 h-4 ${
                                        canSubmit
                                          ? 'text-blue-500 dark:text-blue-400'
                                          : 'text-text-muted/50'
                                      }`}
                                    />
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <>
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
                                className='mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline'
                              >
                                See All
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {!isOptimistic &&
                  message.reactions &&
                  message.reactions.length > 0 &&
                  currentMemberId != null && (
                    <div className='absolute -bottom-3 right-2'>
                      <ReactionDisplay
                        reactions={message.reactions ?? []}
                        currentMemberId={currentMemberId}
                        onReactionClick={handleReactionClick}
                      />
                    </div>
                  )}
              </div>
              {message.files && message.files.length > 0 && (
                <MessageFiles files={message.files} />
              )}
            </div>
          </div>
        </div>
        {contextMenuRect && (
          <MessageContextMenuOverlay
            messageText={message.text}
            messageRect={contextMenuRect}
            isOwnMessage={isOwnMessage}
            onReply={handleReply}
            onEdit={onEdit ? handleStartEdit : undefined}
            onAddReaction={handleOverlayAddReaction}
            onClose={() => setContextMenuRect(null)}
            workspaceMembers={workspaceMembers}
            workspaceNotes={workspaceNotes}
            reactions={message.reactions}
            currentMemberId={currentMemberId}
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
            <Reply className='w-5 h-5 text-text-secondary' />
          </div>
        )}
        <div
          className='flex gap-2 shrink-0 transition-transform duration-75'
          style={{
            transform: `translateX(${swipeOffset}px)`,
          }}
        >
          {showAvatar ? (
            <Avatar
              className='h-8 w-8 border border-white/15 bg-white/10 text-xs font-medium cursor-pointer'
              onClick={e => {
                e.stopPropagation();
                const member = message.workspace_member;
                if (!member?.user_id || member.agent_id) return;
                const memberRole = workspaceMembers.find(
                  m => m.user_id === member.user_id
                )?.role;
                openUserProfileDrawer({
                  userId: member.user_id,
                  name: name,
                  avatarUrl: avatarUrl,
                  role: memberRole,
                });
              }}
            >
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
          {showAvatar && <p className='text-xs text-text-muted mb-1'>{name}</p>}
          <div className='flex items-end'>
            <div className='flex flex-col gap-2 min-w-0'>
              <div
                className={`relative inline-block ${(message.reactions?.length ?? 0) > 0 ? 'mb-2.5' : ''}`}
              >
                {(message.text || message.replied_message) && (
                  <div
                    data-message-bubble
                    className='inline-block max-w-[75vw] bg-surface-secondary dark:backdrop-blur-xl border border-border-default rounded-3xl px-4 py-2.5 shadow-card'
                  >
                    {message.replied_message && (
                      <RepliedMessagePreview
                        repliedMessage={message.replied_message}
                      />
                    )}
                    {message.text && (
                      <div className='text-sm text-text-primary'>
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
                            className='mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline'
                          >
                            See All
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {(message.reactions?.length ?? 0) > 0 &&
                  currentMemberId != null && (
                    <div className='absolute -bottom-3 right-2'>
                      <ReactionDisplay
                        reactions={message.reactions ?? []}
                        currentMemberId={currentMemberId}
                        onReactionClick={handleReactionClick}
                      />
                    </div>
                  )}
              </div>
              {message.files && message.files.length > 0 && (
                <MessageFiles files={message.files} align='left' />
              )}
            </div>
            {showTimestamp && (
              <p className='text-xs text-text-muted mt-1'>
                {format(new Date(message.created_at), 'HH:mm')}
              </p>
            )}
          </div>
        </div>
      </div>
      {contextMenuRect && (
        <MessageContextMenuOverlay
          messageText={message.text}
          messageRect={contextMenuRect}
          isOwnMessage={isOwnMessage}
          onReply={handleReply}
          onAddReaction={handleOverlayAddReaction}
          onClose={() => setContextMenuRect(null)}
          workspaceMembers={workspaceMembers}
          workspaceNotes={workspaceNotes}
          reactions={message.reactions}
          currentMemberId={currentMemberId}
        />
      )}
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(WorkspaceMessageItem);
