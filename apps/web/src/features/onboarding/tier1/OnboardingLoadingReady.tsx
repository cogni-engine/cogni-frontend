'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Check } from 'lucide-react';
import { NextStepButton } from '../components/NextStepButton';

interface OnboardingLoadingReadyProps {
  userName?: string;
  workspaceReady: boolean;
  error: string | null;
  handleContinue: () => void;
}

export function OnboardingLoadingReady({
  userName,
  workspaceReady,
  error,
  handleContinue,
}: OnboardingLoadingReadyProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const workspaceReadyRef = useRef(workspaceReady);
  const hasCompletedRef = useRef(false);

  // Keep refs up to date
  useEffect(() => {
    workspaceReadyRef.current = workspaceReady;
  }, [workspaceReady]);

  // Generate random increment with natural variation (slower)
  const getRandomIncrement = useCallback((currentProgress: number) => {
    // Slower progression overall
    if (currentProgress < 20) {
      return Math.random() * 2 + 0.5; // 0.5-2.5%
    } else if (currentProgress < 40) {
      return Math.random() * 3 + 1; // 1-4%
    } else if (currentProgress < 60) {
      return Math.random() * 2.5 + 0.5; // 0.5-3%
    } else if (currentProgress < 75) {
      return Math.random() * 2 + 0.5; // 0.5-2.5%
    } else {
      return Math.random() * 1.5 + 0.3; // 0.3-1.8%
    }
  }, []);

  // Generate random delay with natural variation (longer delays)
  const getRandomDelay = useCallback((currentProgress: number) => {
    // Slower updates overall
    if (currentProgress < 30) {
      return Math.random() * 400 + 250; // 250-650ms
    } else if (currentProgress < 60) {
      return Math.random() * 500 + 300; // 300-800ms
    } else {
      return Math.random() * 600 + 400; // 400-1000ms
    }
  }, []);

  // Get loading message based on progress
  const getLoadingMessage = useCallback((currentProgress: number) => {
    if (currentProgress < 60) {
      return 'Calculating...';
    } else {
      return 'Personalizing your experience';
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const minDuration = 4000; // Minimum 4 seconds before allowing completion
    const startTime = Date.now();

    const updateProgress = () => {
      if (hasCompletedRef.current) return;

      setProgress(currentProgress => {
        const elapsed = Date.now() - startTime;
        const isProcessingComplete = workspaceReadyRef.current;
        const minDurationMet = elapsed >= minDuration;

        // If processing is complete and minimum duration met, go to 100%
        if (isProcessingComplete && minDurationMet && currentProgress >= 70) {
          hasCompletedRef.current = true;
          // Mark as complete after a small delay
          setTimeout(() => {
            setIsComplete(true);
          }, 300);
          return 100;
        }

        // Cap at 80% until processing is complete
        const maxProgress = isProcessingComplete ? 95 : 80;

        if (currentProgress >= maxProgress) {
          // Keep polling if we're waiting for completion
          if (!isProcessingComplete || !minDurationMet) {
            timeoutId = setTimeout(updateProgress, 500);
          }
          return currentProgress;
        }

        // Calculate next progress with random increment
        const increment = getRandomIncrement(currentProgress);
        const nextProgress = Math.min(currentProgress + increment, maxProgress);

        // Schedule next update with random delay
        const delay = getRandomDelay(currentProgress);
        timeoutId = setTimeout(updateProgress, delay);

        return nextProgress;
      });
    };

    // Start the animation
    timeoutId = setTimeout(updateProgress, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [getRandomIncrement, getRandomDelay]);

  // Calculate the circle properties for the progress ring
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Ensure progress shows 100% when complete
  const displayProgress = isComplete ? 100 : progress;
  const strokeDashoffset =
    circumference - (displayProgress / 100) * circumference;

  return (
    <div className='flex flex-col h-full items-center justify-between animate-in fade-in duration-500'>
      <div className='flex-1 flex flex-col items-center justify-center'>
        {/* Circular Progress Bar */}
        <div className='relative' style={{ width: size, height: size }}>
          {/* Background circle */}
          <svg
            className='transform -rotate-90'
            width={size}
            height={size}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke='rgba(255, 255, 255, 0.1)'
              strokeWidth={strokeWidth}
              fill='none'
            />
          </svg>

          {/* Progress circle */}
          <svg
            className='transform -rotate-90'
            width={size}
            height={size}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke='url(#gradient)'
              strokeWidth={strokeWidth}
              fill='none'
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap='round'
              style={{
                transition: 'stroke-dashoffset 0.3s ease-out',
              }}
            />
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='rgba(255, 255, 255, 0.8)' />
                <stop offset='100%' stopColor='rgba(255, 255, 255, 0.6)' />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content - Checkmark when complete */}
          {isComplete && (
            <div className='absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300'>
              <Check
                className='w-16 h-16'
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                strokeWidth={2.5}
              />
            </div>
          )}
        </div>

        {/* Loading Text */}
        <div className='text-center space-y-3 mt-12 animate-in fade-in duration-700 delay-200'>
          {isComplete ? (
            <>
              <h2 className='text-2xl md:text-3xl font-semibold text-white'>
                Your workspace is ready!
              </h2>
              {userName && (
                <p className='text-lg text-gray-400'>
                  Let&apos;s get started, {userName}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className='text-2xl md:text-3xl font-semibold text-white'>
                Setting up your workspace...
              </h2>
              <p className='text-lg text-gray-400'>
                {getLoadingMessage(progress)}
              </p>
            </>
          )}
        </div>

        {/* Decorative pulsing dots - only show when loading */}
        {!isComplete && (
          <div className='mt-12 flex gap-2'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='w-2 h-2 rounded-full bg-white/20'
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className='mt-8 bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm max-w-md text-center'>
            <p className='text-red-300 text-sm mb-3'>
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='text-sm text-white/70 hover:text-white underline'
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Continue Button - only show when complete */}
      {isComplete && (
        <div className='w-full max-w-md mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <NextStepButton
            type='button'
            onClick={handleContinue}
            text='Continue'
          />
        </div>
      )}
    </div>
  );
}
