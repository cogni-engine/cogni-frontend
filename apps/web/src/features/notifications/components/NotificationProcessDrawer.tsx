'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronsRight, Check, FileText, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import {
  type AINotification,
  completeNotification,
  postponeNotification,
} from '@/features/notifications/api/aiNotificationsApi';
import TextInputDrawer from './TextInputDrawer';
import { AIMessageView } from '@/features/cogno/components/AIMessageView';
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
  const [showTextInputDrawer, setShowTextInputDrawer] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFullScreenResult, setShowFullScreenResult] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleComplete = useCallback(async () => {
    if (!currentNotification || isProcessing) return;

    setIsProcessing(true);
    try {
      // Use new backend endpoint that handles completion and resolves previous notifications
      await completeNotification(currentNotification.id);

      // 通知を再取得（配列が更新される）
      onNotificationProcessed?.();

      // インデックスは進めない（配列が更新されたら自動的に次の通知が表示される）
      // 最後の通知の場合は閉じる
      if (notifications.length === 1) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Failed to complete notification:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentNotification,
    notifications.length,
    isProcessing,
    onOpenChange,
    onNotificationProcessed,
  ]);

  const handleSkip = useCallback(() => {
    setShowTextInputDrawer(true);
  }, []);

  const handleTextInputSubmit = useCallback(
    async (text: string) => {
      if (!currentNotification || isProcessing) return;

      setIsProcessing(true);
      try {
        // Use new backend endpoint that handles postponement and resolves previous notifications
        await postponeNotification(currentNotification.id, text || '');

        setShowTextInputDrawer(false);

        // 通知を再取得（配列が更新される）
        onNotificationProcessed?.();

        // インデックスは進めない（配列が更新されたら自動的に次の通知が表示される）
        // 最後の通知の場合は閉じる
        if (notifications.length === 1) {
          onOpenChange(false);
        }
      } catch (error) {
        console.error('Failed to postpone notification:', error);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      currentNotification,
      notifications.length,
      isProcessing,
      onOpenChange,
      onNotificationProcessed,
    ]
  );

  const handleTextInputClose = useCallback(() => {
    setShowTextInputDrawer(false);
  }, []);

  // Reset state when drawer closes
  const handleDrawerClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setCurrentIndex(0);
        setShowTextInputDrawer(false);
      }
      onOpenChange(open);
    },
    [onOpenChange]
  );

  return (
    <>
      <Drawer open={open} onOpenChange={handleDrawerClose}>
        <DrawerContent zIndex={200} maxHeight='85vh'>
          <DrawerHandle />

          {/* Fixed Header - Title Section */}
          {currentNotification && (
            <div className='px-6 p-2 border-b border-white/10'>
              <h2 className='font-semibold text-lg text-white'>
                {currentNotification.title}
              </h2>
            </div>
          )}

          {/* Scrollable Body */}
          <DrawerBody>
            {notifications.length === 0 ? (
              <div className='flex items-center justify-center py-12'>
                <p className='text-white/60 text-center'>No notifications</p>
              </div>
            ) : currentNotification ? (
              <div className='space-y-4'>
                {/* Task Result - File Card Style */}
                {taskResult && (
                  <GlassCard
                    className={cn(
                      'relative group overflow-hidden cursor-pointer',
                      'flex items-center gap-3',
                      'backdrop-blur-xl border border-black rounded-3xl',
                      'px-6 py-3',
                      'hover:bg-white/2 transition-all'
                    )}
                    onClick={() => setShowFullScreenResult(true)}
                  >
                    <FileText className='w-5 h-5' />
                    <div className='flex-1 min-w-0 overflow-hidden'>
                      <p className='text-sm text-white font-medium truncate'>
                        Task Result
                      </p>
                      <p className='text-xs text-white/40 truncate'>
                        Tap to view details
                      </p>
                    </div>
                  </GlassCard>
                )}

                {/* Original Notification Body (if no task result) */}
                {currentNotification.body && (
                  <p className='text-base text-white/80'>
                    {currentNotification.body}
                  </p>
                )}
              </div>
            ) : null}
          </DrawerBody>

          {notifications.length > 0 && (
            <DrawerFooter className='flex-col'>
              {/* Progress indicator */}
              <div className='text-xs text-white/40 text-center'>
                {notifications.length - currentIndex - 1 > 0
                  ? `${notifications.length - currentIndex - 1} Left`
                  : 'Last one'}
              </div>
              <div className='flex gap-3 w-full'>
                <GlassButton
                  onClick={handleSkip}
                  size='icon'
                  className='size-12'
                  disabled={isProcessing}
                >
                  <ChevronsRight className='w-5 h-5' />
                </GlassButton>

                <GlassButton
                  onClick={handleComplete}
                  className='flex-1 h-12 flex items-center justify-center gap-2'
                  disabled={isProcessing}
                >
                  <Check className='w-5 h-5' />
                  <span>Complete</span>
                </GlassButton>
              </div>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>

      {/* Text Input Drawer (appears on top when Skip is pressed) */}
      <TextInputDrawer
        open={showTextInputDrawer}
        onOpenChange={handleTextInputClose}
        onSubmit={handleTextInputSubmit}
        isSubmitting={isProcessing}
      />

      {/* Full Screen Task Result Modal */}
      {mounted &&
        showFullScreenResult &&
        taskResult &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-10000 flex flex-col bg-black/95 backdrop-blur-sm',
              'transition-all duration-300 ease-out',
              isAnimatingIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            )}
          >
            {/* Header with Close Button */}
            <div
              className={cn(
                'flex items-center justify-between p-4 border-b border-white/10',
                'transition-all duration-200 ease-out delay-100',
                isAnimatingIn
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4'
              )}
            >
              <div className='space-y-1'>
                <div className='text-xs text-white/40 uppercase tracking-wide'>
                  Task Result
                </div>
                <h2 className='font-semibold text-lg text-white'>
                  {taskResult.result_title}
                </h2>
              </div>
              <button
                onClick={() => setShowFullScreenResult(false)}
                className='p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className={cn(
                'flex-1 overflow-y-auto p-6',
                'transition-all duration-500'
              )}
            >
              <div className='max-w-3xl mx-auto'>
                <AIMessageView content={taskResult.result_text} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
