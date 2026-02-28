'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TimerState } from '@/features/cogno/domain/chat';

type TimerDisplayProps = {
  timer: TimerState;
  sendMessage: (
    content: string,
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  threadId: number;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timer,
  sendMessage,
  threadId: _threadId, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasCompleted = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // When paused, store the frozen remaining seconds so we can resume from there
  const pausedAtRef = useRef<number>(0);
  // When resumed, store the new "virtual" ends_at based on paused remaining
  const resumedEndsAtRef = useRef<Date | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Pause: freeze the countdown
  const handlePause = useCallback(() => {
    clearTimer();
    pausedAtRef.current = remainingSeconds;
    setIsPaused(true);
  }, [clearTimer, remainingSeconds]);

  // Resume: recalculate ends_at from the frozen remaining seconds
  const handleResume = useCallback(() => {
    const newEndsAt = new Date(Date.now() + pausedAtRef.current * 1000);
    resumedEndsAtRef.current = newEndsAt;
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const getEndsAt = () => {
      if (resumedEndsAtRef.current) return resumedEndsAtRef.current;
      return new Date(timer.ends_at);
    };

    const calculateRemaining = () => {
      const endsAt = getEndsAt();
      const now = new Date();
      return Math.max(
        0,
        Math.floor((endsAt.getTime() - now.getTime()) / 1000)
      );
    };

    // Set initial value
    const initialRemaining = calculateRemaining();
    setRemainingSeconds(initialRemaining);

    const EARLY_SEND_SECONDS = 1;

    intervalRef.current = setInterval(() => {
      const remaining = calculateRemaining();
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        clearTimer();
        return;
      }

      // Send timer_completed when 1 second remaining
      if (remaining === EARLY_SEND_SECONDS && !hasCompleted.current) {
        hasCompleted.current = true;
        sendMessage('', undefined, true).catch(err => {
          console.error('Error completing timer:', err);
        });
      }
    }, 1000);

    return () => clearTimer();
  }, [timer, sendMessage, isPaused, clearTimer]);

  // Completed or expired → hide
  if (
    !isPaused &&
    (remainingSeconds === 0 ||
      timer.status === 'completed' ||
      timer.status === 'cancelled')
  ) {
    return null;
  }

  // Format remaining time as MM:SS
  const displaySeconds = isPaused ? pausedAtRef.current : remainingSeconds;
  const minutes = Math.floor(displaySeconds / 60);
  const seconds = displaySeconds % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className='flex justify-start items-center my-6 px-2'>
      <div className='bg-surface-overlay dark:backdrop-blur-xl rounded-[20px] px-6 py-2 flex items-center justify-between min-w-[270px] border border-border-subtle shadow-card hover:shadow-card-hover transition-all duration-300'>
        {/* 左側: 時間表示 */}
        <div className='flex flex-col items-start'>
          <div
            className={`text-3xl font-light tracking-tight ${
              isPaused ? 'text-text-muted' : 'text-text-primary'
            }`}
          >
            {timeDisplay}
          </div>
          <div className='text-sm text-text-secondary font-normal mt-1 px-2'>
            {isPaused ? 'Paused' : 'Timer'}
          </div>
        </div>

        {/* 右側: 一時停止/再開ボタン */}
        <div className='relative'>
          {isPaused ? (
            /* 再開ボタン（▶） */
            <button
              onClick={handleResume}
              className='w-12 h-12 rounded-full border-2 border-green-400 bg-transparent flex items-center justify-center hover:bg-green-400/10 transition-colors'
              aria-label='Resume timer'
            >
              <div className='w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-green-400 ml-1'></div>
            </button>
          ) : (
            /* 一時停止ボタン（❚❚） */
            <button
              onClick={handlePause}
              className='w-12 h-12 rounded-full border-2 border-orange-400 bg-transparent flex items-center justify-center hover:bg-orange-400/10 transition-colors'
              aria-label='Pause timer'
            >
              <div className='flex space-x-1'>
                <div className='w-1 h-4 bg-orange-400 rounded-full'></div>
                <div className='w-1 h-4 bg-orange-400 rounded-full'></div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
