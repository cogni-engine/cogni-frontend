'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronsRight, Check } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import type { Notification } from '@/types/notification';
import {
  updateNotificationReaction,
  getTaskResult,
} from '@/lib/api/notificationsApi';
import TextInputDrawer from './TextInputDrawer';

interface NotificationProcessDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onNotificationProcessed?: () => void;
}

export default function NotificationProcessDrawer({
  open,
  onOpenChange,
  notifications,
  onNotificationProcessed,
}: NotificationProcessDrawerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTextInputDrawer, setShowTextInputDrawer] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskResult, setTaskResult] = useState<{
    result_title: string;
    result_text: string;
  } | null>(null);
  const [loadingTaskResult, setLoadingTaskResult] = useState(false);

  const currentNotification = notifications[currentIndex];

  // task_result_idがある場合、task_resultを取得
  useEffect(() => {
    if (currentNotification?.task_result_id) {
      setLoadingTaskResult(true);
      getTaskResult(currentNotification.task_result_id)
        .then(result => {
          setTaskResult(result);
        })
        .catch(error => {
          console.error('Failed to fetch task result:', error);
          setTaskResult(null);
        })
        .finally(() => {
          setLoadingTaskResult(false);
        });
    } else {
      setTaskResult(null);
    }
  }, [currentNotification?.task_result_id]);

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
      await updateNotificationReaction(
        currentNotification.id,
        'completed',
        null
      );

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
        await updateNotificationReaction(
          currentNotification.id,
          'postponed',
          text || null
        );

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
        <DrawerContent zIndex={200} maxHeight='80vh'>
          <DrawerHandle />

          <DrawerBody>
            {notifications.length === 0 ? (
              <div className='flex items-center justify-center py-12'>
                <p className='text-white/60 text-center'>No notifications</p>
              </div>
            ) : currentNotification ? (
              <div className='px-4 py-6 space-y-4'>
                {/* Title */}
                <h2 className='font-semibold text-lg text-white'>
                  {loadingTaskResult
                    ? '読み込み中...'
                    : taskResult
                      ? taskResult.result_title
                      : currentNotification.title}
                </h2>

                {/* Body / Result Text */}
                {loadingTaskResult ? (
                  <p className='text-base text-white/60'>読み込み中...</p>
                ) : taskResult ? (
                  <p className='text-base text-white/80 whitespace-pre-wrap'>
                    {taskResult.result_text}
                  </p>
                ) : (
                  currentNotification.body && (
                    <p className='text-base text-white/80'>
                      {currentNotification.body}
                    </p>
                  )
                )}

                {/* Progress indicator */}
                <div className='pt-4 text-xs text-white/40 text-center'>
                  {notifications.length - currentIndex - 1 > 0
                    ? `${notifications.length - currentIndex - 1} Left`
                    : 'Last one'}
                </div>
              </div>
            ) : null}
          </DrawerBody>

          {notifications.length > 0 && (
            <DrawerFooter className='flex gap-3 p-4'>
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
    </>
  );
}
