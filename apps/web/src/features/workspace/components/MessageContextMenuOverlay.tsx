'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reply, Copy, Check, Pencil, Plus } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import { REACTION_EMOJIS } from '@/types/workspace';
import { getInitialEmojis, pushRecent } from '../utils/reactionUtils';
import ReactionDisplay from './ReactionDisplay';
import type { WorkspaceMember, MessageReaction } from '@/types/workspace';
import type { Note } from '@/types/note';

type MessageContextMenuOverlayProps = {
  messageText: string;
  messageRect: DOMRect;
  isOwnMessage: boolean;
  onReply: () => void;
  onEdit?: () => void;
  onAddReaction: (emoji: string) => void;
  onClose: () => void;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  reactions?: MessageReaction[];
  currentMemberId?: number | null;
};

export default function MessageContextMenuOverlay({
  messageText,
  messageRect,
  isOwnMessage,
  onReply,
  onEdit,
  onAddReaction,
  onClose,
  workspaceMembers = [],
  workspaceNotes = [],
  reactions = [],
  currentMemberId = null,
}: MessageContextMenuOverlayProps) {
  const [copied, setCopied] = useState(false);
  const [showAllEmojis, setShowAllEmojis] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const quickEmojis = useMemo(() => getInitialEmojis().slice(0, 6), []);

  const handleClose = useCallback(() => {
    if (!isVisible) return;
    setIsVisible(false);
    setTimeout(onClose, 350);
  }, [isVisible, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showAllEmojis) {
          setShowAllEmojis(false);
        } else {
          handleClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, showAllEmojis]);

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      pushRecent(emoji);
      onAddReaction(emoji);
      handleClose();
    },
    [onAddReaction, handleClose]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => {
        handleClose();
      }, 600);
    } catch {
      handleClose();
    }
  }, [messageText, handleClose]);

  const handleReply = useCallback(() => {
    onReply();
    handleClose();
  }, [onReply, handleClose]);

  const handleEdit = useCallback(() => {
    onEdit?.();
    handleClose();
  }, [onEdit, handleClose]);

  // Compute position for the message bubble clone
  // Keep original Y position; only shift if not enough space for reaction bar / action menu
  const bubbleWidth = Math.min(messageRect.width, window.innerWidth * 0.85);
  const cloneLeft = isOwnMessage ? window.innerWidth - bubbleWidth - 16 : 16;

  const reactionBarSpace = 56; // height of reaction bar + gap
  const actionMenuSpace = 200; // estimated action menu height
  const edgePadding = 8;

  let cloneTop = messageRect.top;
  // If not enough space above for the reaction bar, push down
  if (cloneTop - reactionBarSpace < edgePadding) {
    cloneTop = edgePadding + reactionBarSpace;
  }
  // If not enough space below for the action menu, push up
  if (
    cloneTop + messageRect.height + 12 + actionMenuSpace >
    window.innerHeight - edgePadding
  ) {
    cloneTop =
      window.innerHeight -
      edgePadding -
      actionMenuSpace -
      12 -
      messageRect.height;
  }
  // Final clamp so the message itself stays on screen
  cloneTop = Math.max(cloneTop, edgePadding + reactionBarSpace);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key='overlay'
          className='fixed inset-0 z-100'
          role='dialog'
          aria-modal='true'
        >
          {/* Backdrop */}
          <motion.div
            className='absolute inset-0 bg-black/40 backdrop-blur-md'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, exit: { delay: 0.1, duration: 0.2 } }}
            onClick={handleClose}
          />

          {/* Content container */}
          <div className='absolute inset-0 pointer-events-none flex flex-col items-center'>
            {/* Reaction bar — expands in-place when "+" is tapped */}
            <motion.div
              className='pointer-events-auto'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.1,
                duration: 0.2,
                exit: { delay: 0, duration: 0.15 },
              }}
              style={{
                position: 'absolute',
                bottom: window.innerHeight - cloneTop + 8,
                left: isOwnMessage ? undefined : cloneLeft,
                right: isOwnMessage ? 16 : undefined,
              }}
            >
              <motion.div
                layout
                transition={{
                  layout: { type: 'spring', damping: 28, stiffness: 500 },
                }}
                className='overflow-hidden'
                style={{ borderRadius: showAllEmojis ? 16 : 9999 }}
              >
                <GlassCard
                  className={`shadow-lg ${
                    showAllEmojis ? 'px-2 py-2' : 'px-2 py-1.5'
                  }`}
                  style={{ borderRadius: 'inherit' }}
                >
                  <AnimatePresence mode='popLayout' initial={false}>
                    {showAllEmojis ? (
                      <motion.div
                        key='expanded'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className='overflow-y-auto'
                        style={{
                          maxHeight: Math.max(
                            cloneTop - 8 - edgePadding - 16,
                            120
                          ),
                        }}
                      >
                        <div className='grid grid-cols-7 gap-0.5'>
                          {REACTION_EMOJIS.map((emoji, i) => (
                            <motion.button
                              key={emoji}
                              type='button'
                              onClick={() => handleEmojiSelect(emoji)}
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.015 * i,
                                duration: 0.15,
                                ease: 'easeOut',
                              }}
                              className='w-9 h-9 flex items-center justify-center text-xl rounded-lg transition-transform duration-150 ease-in-out hover:scale-[1.35] active:scale-90'
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key='collapsed'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className='flex items-center gap-0.5'
                      >
                        {quickEmojis.map(emoji => (
                          <button
                            key={emoji}
                            type='button'
                            onClick={() => handleEmojiSelect(emoji)}
                            className='w-9 h-9 flex items-center justify-center text-xl rounded-full transition-transform duration-150 ease-in-out hover:scale-[1.3] active:scale-90'
                          >
                            {emoji}
                          </button>
                        ))}
                        <button
                          type='button'
                          onClick={() => setShowAllEmojis(true)}
                          className='w-9 h-9 flex items-center justify-center rounded-full active:scale-90 transition-transform'
                        >
                          <Plus className='w-4 h-4 text-text-secondary' />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Message bubble clone */}
            <motion.div
              className='pointer-events-none'
              initial={{
                position: 'absolute',
                left: messageRect.left,
                top: messageRect.top,
                width: messageRect.width,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                left: cloneLeft,
                top: cloneTop,
                width: bubbleWidth,
                scale: 1.02,
                opacity: 1,
              }}
              exit={{
                left: messageRect.left,
                top: messageRect.top,
                width: messageRect.width,
                scale: 1,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 300,
                exit: { duration: 0.15, ease: 'easeIn' },
              }}
            >
              <div className='relative'>
                <div
                  className={`inline-block w-full bg-surface-secondary dark:backdrop-blur-xl border border-border-default rounded-3xl px-4 py-2.5 shadow-card`}
                >
                  {messageText && (
                    <div className='text-sm text-text-primary'>
                      <TiptapRenderer
                        content={messageText}
                        contentType='markdown'
                        enableMemberMentions
                        enableNoteMentions
                        workspaceMembers={workspaceMembers}
                        workspaceNotes={workspaceNotes}
                        className='tiptap-message-content'
                      />
                    </div>
                  )}
                </div>
                {reactions.length > 0 && currentMemberId != null && (
                  <div
                    className={`absolute -bottom-3 ${isOwnMessage ? 'right-2' : 'right-2'}`}
                  >
                    <ReactionDisplay
                      reactions={reactions}
                      currentMemberId={currentMemberId}
                      onReactionClick={() => {}}
                      interactive={false}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Action menu */}
            <motion.div
              className='pointer-events-auto'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                delay: 0.15,
                duration: 0.2,
                exit: { delay: 0, duration: 0.15 },
              }}
              style={{
                position: 'absolute',
                top: Math.min(
                  cloneTop + messageRect.height + 12,
                  window.innerHeight - 200
                ),
                left: isOwnMessage ? undefined : cloneLeft,
                right: isOwnMessage ? 16 : undefined,
              }}
            >
              <GlassCard className='rounded-2xl p-1 min-w-[160px] shadow-lg'>
                <button
                  onClick={handleReply}
                  className='w-full p-2.5 text-left text-sm text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors rounded-xl'
                >
                  <Reply className='w-4 h-4 text-text-secondary' />
                  <span>Reply</span>
                </button>

                <div className='mx-2 border-t border-border-default' />

                <button
                  onClick={handleCopy}
                  className='w-full p-2.5 text-left text-sm text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors rounded-xl'
                >
                  {copied ? (
                    <>
                      <Check className='w-4 h-4 text-text-secondary' />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className='w-4 h-4 text-text-secondary' />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {isOwnMessage && onEdit && (
                  <>
                    <div className='mx-2 border-t border-border-default' />
                    <button
                      onClick={handleEdit}
                      className='w-full p-2.5 text-left text-sm text-text-primary hover:bg-white/10 flex items-center gap-2.5 transition-colors rounded-xl'
                    >
                      <Pencil className='w-4 h-4 text-text-secondary' />
                      <span>Edit</span>
                    </button>
                  </>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
