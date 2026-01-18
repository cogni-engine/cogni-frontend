'use client';

import { useState, useCallback } from 'react';
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
import { updateNotificationReaction } from '@/lib/api/notificationsApi';
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

  const currentNotification = notifications[currentIndex];

  const handleComplete = useCallback(async () => {
    if (!currentNotification || isProcessing) return;

    setIsProcessing(true);
    try {
      await updateNotificationReaction(
        currentNotification.id,
        'completed',
        null
      );

      // Move to next notification
      if (currentIndex < notifications.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // All done, close drawer
        setCurrentIndex(0);
        onOpenChange(false);
      }

      onNotificationProcessed?.();
    } catch (error) {
      console.error('Failed to complete notification:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    currentNotification,
    currentIndex,
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

        // Close text input drawer
        setShowTextInputDrawer(false);

        // Move to next notification
        if (currentIndex < notifications.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // All done, close drawer
          setCurrentIndex(0);
          onOpenChange(false);
        }

        onNotificationProcessed?.();
      } catch (error) {
        console.error('Failed to postpone notification:', error);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      currentNotification,
      currentIndex,
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
                  {currentNotification.title}
                </h2>

                {/* Body */}
                {currentNotification.body && (
                  <p className='text-base text-white/80'>
                    {currentNotification.body}
                  </p>
                )}

                {/* AI Context */}
                {currentNotification.ai_context && (
                  <p className='text-sm text-white/60'>
                    {currentNotification.ai_context}
                  </p>
                )}

                {/* Progress indicator */}
                <div className='pt-4 text-xs text-white/40 text-center'>
                  {currentIndex + 1} / {notifications.length}
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
