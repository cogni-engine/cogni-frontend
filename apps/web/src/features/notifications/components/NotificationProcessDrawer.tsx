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
  MessageSquare,
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
  isLoading?: boolean;
}

export default function NotificationProcessDrawer({
  open,
  onOpenChange,
  notifications,
  onNotificationProcessed,
  initialNotificationId,
  isLoading = false,
}: NotificationProcessDrawerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerMode, setDrawerMode] = useState<
    'notification' | 'choices' | 'custom-input'
  >('notification');
  const [noteText, setNoteText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFullScreenResult, setShowFullScreenResult] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteInputExtraHeight, setNoteInputExtraHeight] = useState(0);
  const [isSlideOut, setIsSlideOut] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialTextareaHeightRef = useRef<number | null>(null);

  const baseDrawerHeight = 300;
  const FADE_ANIMATION_DURATION = 150;

  const currentNotification = notifications[currentIndex];
  const hasReactionChoices =
    currentNotification?.reaction_choices &&
    currentNotification.reaction_choices.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showFullScreenResult) {
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    } else {
      setIsAnimatingIn(false);
    }
  }, [showFullScreenResult]);

  const taskResult = currentNotification?.task_result
    ? {
        result_title: currentNotification.task_result.result_title,
        result_text: currentNotification.task_result.result_text,
      }
    : null;

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

  useEffect(() => {
    if (notifications.length === 0) {
      setCurrentIndex(0);
      onOpenChange(false);
    } else if (currentIndex >= notifications.length) {
      setCurrentIndex(notifications.length - 1);
    }
  }, [notifications.length, currentIndex, onOpenChange]);

  useEffect(() => {
    setExpandedNoteId(null);
    setNoteContent(null);
    setSelectedChoice(null);
  }, [currentIndex]);

  const processNotificationWithFade = useCallback(
    async (action: () => Promise<void>) => {
      setIsSlideOut(true);
      await new Promise(resolve =>
        setTimeout(resolve, FADE_ANIMATION_DURATION)
      );
      try {
        await action();
        await onNotificationProcessed?.();
      } catch (error) {
        console.error('Failed to process notification:', error);
      } finally {
        setIsProcessing(false);
        setIsSlideOut(false);
      }
    },
    [onNotificationProcessed]
  );

  const handleComplete = useCallback(async () => {
    if (!currentNotification || isProcessing) return;
    setIsProcessing(true);
    await processNotificationWithFade(async () => {
      await completeNotification(currentNotification.id);
    });
  }, [currentNotification, isProcessing, processNotificationWithFade]);

  const handleReactWithChoice = useCallback(
    async (choice: string) => {
      if (!currentNotification || isProcessing) return;
      setIsProcessing(true);
      setSelectedChoice(choice);
      await processNotificationWithFade(async () => {
        await postponeNotification(currentNotification.id, choice);
      });
      setSelectedChoice(null);
    },
    [currentNotification, isProcessing, processNotificationWithFade]
  );

  const handleShowCustomInput = useCallback(() => {
    setDrawerMode('custom-input');
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 350);
  }, []);

  const handleSkip = useCallback(() => {
    if (hasReactionChoices) {
      setDrawerMode('choices');
    } else {
      setDrawerMode('custom-input');
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 350);
    }
  }, [hasReactionChoices]);

  const maxRows = 10;
  const adjustTextareaHeight = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
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

    setIsSlideOut(true);
    await new Promise(resolve => setTimeout(resolve, FADE_ANIMATION_DURATION));

    try {
      await postponeNotification(currentNotification.id, noteText || '');
      setNoteText('');
      resetTextareaHeight();
      setDrawerMode('notification');
      await onNotificationProcessed?.();
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
    if (hasReactionChoices) {
      setDrawerMode('choices');
    } else {
      setDrawerMode('notification');
    }
    setNoteText('');
    resetTextareaHeight();
  }, [resetTextareaHeight, hasReactionChoices]);

  const handleBackToNotification = useCallback(() => {
    setDrawerMode('notification');
    setNoteText('');
    resetTextareaHeight();
  }, [resetTextareaHeight]);

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
        const textToCopy = `${taskResult.result_title}\n\n${taskResult.result_text}`;
        await navigator.clipboard.writeText(textToCopy);
      }
    } else {
      const textToCopy = `${taskResult.result_title}\n\n${taskResult.result_text}`;
      await navigator.clipboard.writeText(textToCopy);
    }
  }, [taskResult]);

  const handleToggleNote = useCallback(
    async (noteId: number) => {
      if (expandedNoteId === noteId) {
        setExpandedNoteId(null);
        setNoteContent(null);
      } else {
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

  const handleDrawerClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setCurrentIndex(0);
        setDrawerMode('notification');
        setNoteText('');
        setExpandedNoteId(null);
        setNoteContent(null);
        setIsSlideOut(false);
        setSelectedChoice(null);
        resetTextareaHeight();
      }
      onOpenChange(open);
    },
    [onOpenChange, resetTextareaHeight]
  );

  // Determine which slide to show (3 panels: notification, choices, custom-input)
  const slideIndex =
    drawerMode === 'notification' ? 0 : drawerMode === 'choices' ? 1 : 2;

  return (
    <>
      <Drawer open={open} onOpenChange={handleDrawerClose}>
        <DrawerContent
          zIndex={200}
          data-shepherd-target='notification-panel'
          {...(drawerMode === 'custom-input'
            ? { height: `${baseDrawerHeight + noteInputExtraHeight}px` }
            : { maxHeight: '85vh' })}
        >
          <DrawerHandle />

          {/* Fixed Header - Title Section */}
          {currentNotification && (
            <div className='px-6 py-3 border-b border-border-default flex items-center justify-between'>
              <h2 className='font-semibold text-lg text-text-primary truncate flex-1'>
                {currentNotification.title}
              </h2>
              {notifications.length > 0 && (
                <span className='text-sm text-text-muted ml-4 shrink-0'>
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
              className='flex transition-transform duration-200 ease-out'
              style={{
                width: '300%',
                transform: `translateX(-${(slideIndex * 100) / 3}%)`,
              }}
            >
              {/* Panel 1: Notification Content */}
              <div
                className={cn(
                  'w-1/3 flex-shrink-0 px-6 py-4 transition-opacity duration-150',
                  isSlideOut && 'opacity-0'
                )}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center py-12'>
                    <Loader2 className='w-8 h-8 text-text-muted animate-spin' />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className='flex items-center justify-center py-12'>
                    <p className='text-text-secondary text-center'>
                      No notifications
                    </p>
                  </div>
                ) : currentNotification ? (
                  <div className='space-y-4'>
                    {/* Task Result Card */}
                    {taskResult && (
                      <button
                        onClick={() => setShowFullScreenResult(true)}
                        className={cn(
                          'w-full flex items-center gap-4',
                          'px-5 py-4 rounded-2xl',
                          'border border-border-default bg-surface-primary',
                          'hover:bg-surface-secondary hover:border-border-default',
                          'transition-all duration-200',
                          'text-left group'
                        )}
                      >
                        <div className='w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center shrink-0'>
                          <FileText className='w-5 h-5 text-text-secondary' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-base text-text-primary font-medium truncate'>
                            {taskResult.result_title}
                          </p>
                          <p className='text-xs text-text-muted mt-0.5'>
                            Tap to view
                          </p>
                        </div>
                        <SquareArrowOutUpRight className='w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors shrink-0' />
                      </button>
                    )}

                    {/* Notification Body */}
                    {currentNotification.body && (
                      <p className='text-base text-text-secondary'>
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
                                'w-4 h-4 text-text-muted shrink-0 transition-transform duration-200',
                                expandedNoteId ===
                                  currentNotification.note.id && 'rotate-90'
                              )}
                            />
                            <span className='text-sm text-text-primary truncate'>
                              {currentNotification.note.title ||
                                'Untitled Note'}
                            </span>
                          </div>
                        </button>

                        {expandedNoteId === currentNotification.note.id && (
                          <div className='mt-4 max-h-[40vh] overflow-y-auto'>
                            {isLoadingNote ? (
                              <div className='flex items-center justify-center py-4'>
                                <Loader2 className='w-5 h-5 text-text-muted animate-spin' />
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

              {/* Panel 2: Reaction Choices */}
              <div
                className={cn(
                  'w-1/3 flex-shrink-0 px-6 py-4 transition-opacity duration-150',
                  isSlideOut && 'opacity-0'
                )}
              >
                {hasReactionChoices && (
                  <div className='space-y-3'>
                    <p className='text-sm text-text-muted mb-4'>
                      How would you like to respond?
                    </p>
                    {currentNotification.reaction_choices!.map(
                      (choice, index) => (
                        <button
                          key={index}
                          onClick={() => handleReactWithChoice(choice)}
                          disabled={isProcessing}
                          className={cn(
                            'w-full px-5 py-3.5 rounded-2xl text-left',
                            'border border-border-default bg-surface-primary',
                            'hover:bg-surface-secondary hover:border-border-default',
                            'active:scale-[0.98]',
                            'transition-all duration-200',
                            'text-sm text-text-primary',
                            selectedChoice === choice &&
                              'bg-interactive-hover border-border-default',
                            isProcessing && 'opacity-50 pointer-events-none'
                          )}
                        >
                          {isProcessing && selectedChoice === choice ? (
                            <span className='flex items-center gap-2'>
                              <Loader2 className='w-4 h-4 animate-spin' />
                              {choice}
                            </span>
                          ) : (
                            choice
                          )}
                        </button>
                      )
                    )}

                    {/* Custom input option */}
                    <button
                      onClick={handleShowCustomInput}
                      disabled={isProcessing}
                      className={cn(
                        'w-full px-5 py-3.5 rounded-2xl text-left',
                        'border border-dashed border-border-default bg-transparent',
                        'hover:bg-surface-primary hover:border-border-default',
                        'active:scale-[0.98]',
                        'transition-all duration-200',
                        'text-sm text-text-muted',
                        'flex items-center gap-2',
                        isProcessing && 'opacity-50 pointer-events-none'
                      )}
                    >
                      <MessageSquare className='w-4 h-4' />
                      <span>Write your own response...</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Panel 3: Custom Text Input */}
              <div
                className={cn(
                  'w-1/3 flex-shrink-0 px-6 py-4 transition-opacity duration-150',
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
                    'bg-surface-primary rounded-2xl',
                    'border border-border-subtle',
                    'text-text-primary placeholder-text-muted',
                    'focus:outline-none focus:border-border-default',
                    'resize-none transition-all duration-200',
                    'overflow-hidden'
                  )}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </DrawerBody>

          {notifications.length > 0 && (
            <DrawerFooter className='sticky bottom-0 bg-dialog-overlay dark:backdrop-blur-md z-10'>
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
              ) : drawerMode === 'choices' ? (
                <div className='flex gap-3 w-full'>
                  <GlassButton
                    onClick={handleBackToNotification}
                    size='icon'
                    className='size-12'
                    disabled={isProcessing}
                  >
                    <X className='w-5 h-5' />
                  </GlassButton>

                  <GlassButton
                    onClick={handleComplete}
                    className='flex-1 h-12 flex items-center justify-center gap-2'
                    disabled={isProcessing}
                  >
                    {isProcessing && !selectedChoice ? (
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
                        <span>Submit</span>
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
              'bg-dialog-overlay dark:backdrop-blur-xl',
              'transition-all duration-300 ease-out',
              isAnimatingIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            )}
          >
            <div className='absolute inset-0 overflow-y-auto'>
              <div className='pt-24 px-6 pb-8'>
                <div className='max-w-3xl mx-auto'>
                  <AIMessageView content={taskResult.result_text} />
                </div>
              </div>
            </div>

            <div className='absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background via-background/50 to-transparent pointer-events-none z-10' />

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
              <GlassButton
                onClick={() => setShowFullScreenResult(false)}
                size='icon'
                className='size-12'
              >
                <X className='w-5 h-5' />
              </GlassButton>

              <h2 className='font-semibold text-lg text-text-primary truncate flex-1 text-center mx-4'>
                {taskResult.result_title}
              </h2>

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
