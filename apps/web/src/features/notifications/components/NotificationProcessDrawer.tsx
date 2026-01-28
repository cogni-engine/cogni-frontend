'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ChevronsRight,
  Check,
  X,
  Share2,
  SquareArrowOutUpRight,
  FileText,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { createPortal } from 'react-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import {
  type AINotification,
  completeNotification,
  postponeNotification,
} from '@/features/notifications/api/aiNotificationsApi';
import { AIMessageView } from '@/features/cogno/components/AIMessageView';
import { getNote } from '@/features/notes/api/notesApi';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import { cn } from '@/lib/utils';

interface NotificationProcessDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: AINotification[];
  onNotificationProcessed?: () => void;
  initialNotificationId?: number | null;
}

export default function NotificationProcessDrawer({
  open,
  onOpenChange,
  notifications,
  onNotificationProcessed,
  initialNotificationId,
}: NotificationProcessDrawerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerMode, setDrawerMode] = useState<'notification' | 'note-input'>(
    'notification'
  );
  const [noteText, setNoteText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFullScreenResult, setShowFullScreenResult] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteInputExtraHeight, setNoteInputExtraHeight] = useState(0);
  const [isSlideOut, setIsSlideOut] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialTextareaHeightRef = useRef<number | null>(null);

  const baseDrawerHeight = 300; // Base height for note-input mode
  const FADE_ANIMATION_DURATION = 150; // ms

  const currentNotification = notifications[currentIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle full screen animation
  useEffect(() => {
    if (showFullScreenResult) {
      // Start animation after a small delay to ensure the element is mounted
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    } else {
      setIsAnimatingIn(false);
    }
  }, [showFullScreenResult]);

  // Task result is now included in the notification response from the new endpoint
  const taskResult = currentNotification?.task_result
    ? {
        result_title: currentNotification.task_result.result_title,
        result_text: currentNotification.task_result.result_text,
      }
    : null;

  // Set initial index when notificationId is provided
  useEffect(() => {
    if (initialNotificationId && notifications.length > 0) {
      const index = notifications.findIndex(
        n => n.id === initialNotificationId
      );
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [initialNotificationId, notifications]);

  // 配列が更新された時のみインデックスを調整（最小限）
  useEffect(() => {
    if (notifications.length === 0) {
      setCurrentIndex(0);
      onOpenChange(false);
    } else if (currentIndex >= notifications.length) {
      setCurrentIndex(notifications.length - 1);
    }
  }, [notifications.length, currentIndex, onOpenChange]);

  // Reset note expansion state when switching notifications
  useEffect(() => {
    setExpandedNoteId(null);
    setNoteContent(null);
  }, [currentIndex]);

  const handleComplete = useCallback(async () => {
    if (!currentNotification || isProcessing) return;

    console.log('[NotificationDrawer] Complete pressed', {
      notificationId: currentNotification.id,
      hasTaskResult: !!currentNotification.task_result,
      totalNotifications: notifications.length,
    });

    setIsProcessing(true);

    // Start fade-out animation
    setIsSlideOut(true);

    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, FADE_ANIMATION_DURATION));

    try {
      // Use new backend endpoint that handles completion and resolves previous notifications
      const result = await completeNotification(currentNotification.id);
      console.log('[NotificationDrawer] Complete API response', result);

      // 通知を再取得（配列が更新される）- awaitで完了を待つ
      await onNotificationProcessed?.();
      console.log(
        '[NotificationDrawer] After refetch, notifications count:',
        notifications.length
      );

      // Note: drawer closing is handled by useEffect when notifications.length becomes 0
    } catch (error) {
      console.error('Failed to complete notification:', error);
    } finally {
      setIsProcessing(false);
      setIsSlideOut(false);
    }
  }, [
    currentNotification,
    isProcessing,
    onNotificationProcessed,
    notifications.length,
  ]);

  const handleSkip = useCallback(() => {
    setDrawerMode('note-input');
    // Focus textarea after transition
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 350);
  }, []);

  // Auto-resize textarea and update drawer height
  const maxRows = 10;
  const adjustTextareaHeight = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;

    // Store initial height on first call
    if (initialTextareaHeightRef.current === null) {
      initialTextareaHeightRef.current = el.offsetHeight;
    }

    el.style.height = 'auto';
    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight || '24');
    const minHeight = initialTextareaHeightRef.current;
    const maxHeight = lineHeight * maxRows;
    const nextHeight = Math.max(
      minHeight,
      Math.min(el.scrollHeight, maxHeight)
    );
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';

    // Update extra height for drawer (difference from initial height)
    const extraHeight = Math.max(
      0,
      nextHeight - initialTextareaHeightRef.current
    );
    setNoteInputExtraHeight(extraHeight);
  }, []);

  const handleNoteTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNoteText(e.target.value);
      requestAnimationFrame(() => {
        adjustTextareaHeight(textareaRef.current);
      });
    },
    [adjustTextareaHeight]
  );

  const resetTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.overflowY = 'hidden';
    }
    initialTextareaHeightRef.current = null;
    setNoteInputExtraHeight(0);
  }, []);

  const handleNoteSubmit = useCallback(async () => {
    if (!currentNotification || isProcessing) return;

    setIsProcessing(true);

    // Start fade-out animation (same as Complete)
    setIsSlideOut(true);
    await new Promise(resolve => setTimeout(resolve, FADE_ANIMATION_DURATION));

    try {
      // Use new backend endpoint that handles postponement and resolves previous notifications
      await postponeNotification(currentNotification.id, noteText || '');

      setNoteText('');
      resetTextareaHeight();
      setDrawerMode('notification');

      // 通知を再取得（配列が更新される）- awaitで完了を待つ
      await onNotificationProcessed?.();

      // Note: drawer closing is handled by useEffect when notifications.length becomes 0
    } catch (error) {
      console.error('Failed to postpone notification:', error);
    } finally {
      setIsProcessing(false);
      setIsSlideOut(false);
    }
  }, [
    currentNotification,
    isProcessing,
    noteText,
    onNotificationProcessed,
    resetTextareaHeight,
  ]);

  const handleNoteCancel = useCallback(() => {
    setDrawerMode('notification');
    setNoteText('');
    resetTextareaHeight();
  }, [resetTextareaHeight]);

  const handleCopy = useCallback(async () => {
    if (!taskResult) return;
    const textToCopy = `${taskResult.result_title}\n\n${taskResult.result_text}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [taskResult]);

  const handleShare = useCallback(async () => {
    if (!taskResult) return;
    const shareData = {
      title: taskResult.result_title,
      text: taskResult.result_text,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error, fallback to copy
        handleCopy();
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  }, [taskResult, handleCopy]);

  const handleToggleNote = useCallback(
    async (noteId: number) => {
      if (expandedNoteId === noteId) {
        // Collapse
        setExpandedNoteId(null);
        setNoteContent(null);
      } else {
        // Expand
        setExpandedNoteId(noteId);
        setIsLoadingNote(true);
        try {
          const note = await getNote(noteId);
          setNoteContent(note?.text || '');
        } catch (error) {
          console.error('Failed to fetch note:', error);
          setNoteContent('Failed to load note content');
        } finally {
          setIsLoadingNote(false);
        }
      }
    },
    [expandedNoteId]
  );

  // Reset state when drawer closes
  const handleDrawerClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setCurrentIndex(0);
        setDrawerMode('notification');
        setNoteText('');
        setExpandedNoteId(null);
        setNoteContent(null);
        setIsSlideOut(false);
        resetTextareaHeight();
      }
      onOpenChange(open);
    },
    [onOpenChange, resetTextareaHeight]
  );

  return (
    <>
      <Drawer open={open} onOpenChange={handleDrawerClose}>
        <DrawerContent
          zIndex={200}
          {...(drawerMode === 'note-input'
            ? { height: `${baseDrawerHeight + noteInputExtraHeight}px` }
            : { maxHeight: '85vh' })}
        >
          <DrawerHandle />

          {/* Fixed Header - Title Section */}
          {currentNotification && (
            <div className='px-6 py-3 border-b border-white/10 flex items-center justify-between'>
              <h2 className='font-semibold text-lg text-white truncate flex-1'>
                {currentNotification.title}
              </h2>
              {notifications.length > 0 && (
                <span className='text-sm text-white/40 ml-4 shrink-0'>
                  {notifications.length} left
                </span>
              )}
            </div>
          )}

          {/* Scrollable Body with Slide Transition */}
          <DrawerBody
            className='overflow-x-hidden p-0'
            style={{ flex: 'none' }}
          >
            <div
              className={cn(
                'flex transition-transform duration-200 ease-out',
                drawerMode === 'note-input' && '-translate-x-1/2'
              )}
              style={{ width: '200%' }}
            >
              {/* Notification Content (left side 50%) */}
              <div
                className={cn(
                  'w-1/2 flex-shrink-0 px-6 py-4 transition-opacity duration-150',
                  isSlideOut && 'opacity-0'
                )}
              >
                {notifications.length === 0 ? (
                  <div className='flex items-center justify-center py-12'>
                    <p className='text-white/60 text-center'>
                      No notifications
                    </p>
                  </div>
                ) : currentNotification ? (
                  <div className='space-y-4'>
                    {/* Task Result - Document Card Style (上に配置) */}
                    {taskResult && (
                      <button
                        onClick={() => setShowFullScreenResult(true)}
                        className={cn(
                          'w-full flex items-center gap-4',
                          'px-5 py-4 rounded-2xl',
                          'border border-white/10 bg-white/[0.03]',
                          'hover:bg-white/[0.06] hover:border-white/20',
                          'transition-all duration-200',
                          'text-left group'
                        )}
                      >
                        {/* Document Icon */}
                        <div className='w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0'>
                          <FileText className='w-5 h-5 text-white/60' />
                        </div>
                        {/* Title */}
                        <div className='flex-1 min-w-0'>
                          <p className='text-base text-white font-medium truncate'>
                            {taskResult.result_title}
                          </p>
                          <p className='text-xs text-white/40 mt-0.5'>
                            Tap to view
                          </p>
                        </div>
                        {/* Open Icon */}
                        <SquareArrowOutUpRight className='w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors shrink-0' />
                      </button>
                    )}

                    {/* Notification Body (下に配置) */}
                    {currentNotification.body && (
                      <p className='text-base text-white/80'>
                        {currentNotification.body}
                      </p>
                    )}

                    {/* Note Section - Collapsible */}
                    {currentNotification.note && (
                      <div>
                        <button
                          onClick={() =>
                            handleToggleNote(currentNotification.note!.id)
                          }
                          className='w-full flex items-center justify-between gap-3 text-left'
                        >
                          <div className='flex items-center gap-2 min-w-0'>
                            <ChevronRight
                              className={cn(
                                'w-4 h-4 text-white/50 shrink-0 transition-transform duration-200',
                                expandedNoteId ===
                                  currentNotification.note.id && 'rotate-90'
                              )}
                            />
                            <span className='text-sm text-white/90 truncate'>
                              {currentNotification.note.title ||
                                'Untitled Note'}
                            </span>
                          </div>
                        </button>

                        {/* Expanded Note Content */}
                        {expandedNoteId === currentNotification.note.id && (
                          <div className='mt-4 pl-6 max-h-[40vh] overflow-y-auto'>
                            {isLoadingNote ? (
                              <div className='flex items-center justify-center py-4'>
                                <Loader2 className='w-5 h-5 text-white/40 animate-spin' />
                              </div>
                            ) : (
                              <div className='prose prose-invert prose-sm max-w-none'>
                                <TiptapRenderer
                                  content={noteContent || ''}
                                  contentType='markdown'
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Note Input (right side 50%) */}
              <div
                className={cn(
                  'w-1/2 flex-shrink-0 px-6 py-4 transition-opacity duration-150',
                  isSlideOut && 'opacity-0'
                )}
              >
                <textarea
                  ref={textareaRef}
                  value={noteText}
                  onChange={handleNoteTextChange}
                  placeholder="What's your current situation?"
                  rows={4}
                  className={cn(
                    'w-full px-5 py-4',
                    'bg-white/[0.03] rounded-2xl',
                    'border border-white/5',
                    'text-white placeholder-white/25',
                    'focus:outline-none focus:border-white/10',
                    'resize-none transition-all duration-200',
                    'overflow-hidden'
                  )}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </DrawerBody>

          {notifications.length > 0 && (
            <DrawerFooter className='sticky bottom-0 bg-black/80 backdrop-blur-md z-10'>
              {drawerMode === 'notification' ? (
                <div className='flex gap-3 w-full'>
                  <GlassButton
                    onClick={handleSkip}
                    className='h-12 px-4 flex items-center justify-center gap-2'
                    disabled={isProcessing}
                  >
                    <ChevronsRight className='w-5 h-5' />
                    <span>Skip</span>
                  </GlassButton>

                  <GlassButton
                    onClick={handleComplete}
                    className='flex-1 h-12 flex items-center justify-center gap-2'
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      <>
                        <Check className='w-5 h-5' />
                        <span>Complete</span>
                      </>
                    )}
                  </GlassButton>
                </div>
              ) : (
                <div className='flex gap-3 w-full'>
                  <GlassButton
                    onClick={handleNoteCancel}
                    size='icon'
                    className='size-12'
                    disabled={isProcessing}
                  >
                    <X className='w-5 h-5' />
                  </GlassButton>

                  <GlassButton
                    onClick={handleNoteSubmit}
                    className='flex-1 h-12 flex items-center justify-center gap-2'
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      <>
                        <Check className='w-5 h-5' />
                        <span>Postpone</span>
                      </>
                    )}
                  </GlassButton>
                </div>
              )}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      {/* Full Screen Task Result Modal */}
      {mounted &&
        showFullScreenResult &&
        taskResult &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-10000',
              'bg-black/65 backdrop-blur-xl',
              'transition-all duration-300 ease-out',
              isAnimatingIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            )}
          >
            {/* Scrollable Content - full height, scrolls under header */}
            <div className='absolute inset-0 overflow-y-auto'>
              <div className='pt-24 px-6 pb-8'>
                <div className='max-w-3xl mx-auto'>
                  <AIMessageView content={taskResult.result_text} />
                </div>
              </div>
            </div>

            {/* Top gradient overlay - same as Cogno layout */}
            <div className='absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none z-10' />

            {/* Header - fixed at top, no background */}
            <header
              className={cn(
                'absolute top-0 left-0 right-0 z-20',
                'flex items-center justify-between px-4 py-4',
                'transition-all duration-200 ease-out delay-100',
                isAnimatingIn
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4'
              )}
            >
              {/* Left: Close Button */}
              <GlassButton
                onClick={() => setShowFullScreenResult(false)}
                size='icon'
                className='size-12'
              >
                <X className='w-5 h-5' />
              </GlassButton>

              {/* Center: Title */}
              <h2 className='font-semibold text-lg text-white truncate flex-1 text-center mx-4'>
                {taskResult.result_title}
              </h2>

              {/* Right: Share Button */}
              <GlassButton
                onClick={handleShare}
                size='icon'
                className='size-12'
              >
                <Share2 className='w-5 h-5' />
              </GlassButton>
            </header>
          </div>,
          document.body
        )}
    </>
  );
}
