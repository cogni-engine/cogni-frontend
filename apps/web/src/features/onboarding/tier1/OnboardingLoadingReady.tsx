'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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
  const [showCheckmark, setShowCheckmark] = useState(false);
  const workspaceReadyRef = useRef(workspaceReady);
  const hasCompletedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  // Keep refs up to date
  useEffect(() => {
    workspaceReadyRef.current = workspaceReady;
  }, [workspaceReady]);

  // Watch for workspaceReady to become true and trigger completion check
  useEffect(() => {
    console.log('[OnboardingLoadingReady] workspaceReady changed:', {
      workspaceReady,
      hasCompleted: hasCompletedRef.current,
      startTime: startTimeRef.current,
    });

    if (workspaceReady && !hasCompletedRef.current && startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const minDuration = 2500;
      const minDurationMet = elapsed >= minDuration;

      console.log('[OnboardingLoadingReady] Checking completion:', {
        elapsed,
        minDurationMet,
      });

      if (minDurationMet) {
        console.log('[OnboardingLoadingReady] Completing!');
        hasCompletedRef.current = true;
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            setShowCheckmark(true);
          }, 200);
        }, 100);
      }
    }
  }, [workspaceReady]);

  // Fallback: Complete after minimum duration even if workspaceReady never becomes true
  useEffect(() => {
    if (!hasCompletedRef.current && startTimeRef.current) {
      const timeout = setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setProgress(100);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              setShowCheckmark(true);
            }, 200);
          }, 100);
        }
      }, 3000); // 3 seconds fallback (slightly longer than minDuration)

      return () => clearTimeout(timeout);
    }
  }, []);

  // Generate random increment with natural variation
  const getRandomIncrement = useCallback((currentProgress: number) => {
    if (currentProgress < 20) {
      return Math.random() * 3 + 1; // 1-4%
    } else if (currentProgress < 40) {
      return Math.random() * 4 + 1.5; // 1.5-5.5%
    } else if (currentProgress < 60) {
      return Math.random() * 3.5 + 1; // 1-4.5%
    } else if (currentProgress < 80) {
      return Math.random() * 3 + 1; // 1-4%
    } else {
      return Math.random() * 2.5 + 0.5; // 0.5-3%
    }
  }, []);

  // Generate random delay with natural variation
  const getRandomDelay = useCallback((currentProgress: number) => {
    if (currentProgress < 30) {
      return Math.random() * 300 + 150; // 150-450ms
    } else if (currentProgress < 60) {
      return Math.random() * 350 + 200; // 200-550ms
    } else if (currentProgress < 90) {
      return Math.random() * 400 + 250; // 250-650ms
    } else {
      return Math.random() * 300 + 200; // 200-500ms
    }
  }, []);

  // Get loading message based on progress
  const getLoadingMessage = useCallback((currentProgress: number) => {
    if (currentProgress < 40) {
      return 'Setting up your workspace...';
    } else if (currentProgress < 80) {
      return 'Personalizing your experience...';
    } else {
      return 'Almost ready...';
    }
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    startTimeRef.current = startTime;

    let timeoutId: NodeJS.Timeout | null = null;
    const minDuration = 2500; // Minimum 2.5 seconds

    const updateProgress = () => {
      if (hasCompletedRef.current) return;

      setProgress(currentProgress => {
        const elapsed = Date.now() - startTime;
        const isProcessingComplete = workspaceReadyRef.current;
        const minDurationMet = elapsed >= minDuration;

        // If processing is complete and minimum duration met, go to 100%
        // Remove the progress >= 85 requirement - complete once both conditions are met
        if (isProcessingComplete && minDurationMet) {
          hasCompletedRef.current = true;

          // First complete the progress bar to 100%
          setTimeout(() => {
            setIsComplete(true);
            // Then show the animated checkmark after a brief moment
            setTimeout(() => {
              setShowCheckmark(true);
            }, 200);
          }, 100);

          return 100;
        }

        // Cap at 90% until processing is complete and minimum duration met
        const maxProgress = isProcessingComplete && minDurationMet ? 100 : 90;

        if (currentProgress >= maxProgress) {
          // Keep polling if we're waiting for completion
          if (!isProcessingComplete || !minDurationMet) {
            timeoutId = setTimeout(updateProgress, 300);
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
    timeoutId = setTimeout(updateProgress, 200);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [getRandomIncrement, getRandomDelay]);

  // Calculate the circle properties for the progress ring
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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

          {/* Animated Checkmark - drawn with SVG path animation */}
          {showCheckmark && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <svg
                width={80}
                height={80}
                viewBox='0 0 80 80'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20 42L32 54L60 26'
                  stroke='rgba(255, 255, 255, 0.9)'
                  strokeWidth='6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    animation: 'drawCheck 0.6s ease-out forwards',
                  }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Loading Text */}
        <div className='text-center space-y-3 mt-12 animate-in fade-in duration-700 delay-200'>
          {isComplete ? (
            <>
              <h2 className='text-2xl md:text-3xl font-semibold text-white'>
                You&apos;re all set!
              </h2>
              {userName && (
                <p className='text-lg text-gray-400'>Welcome, {userName}</p>
              )}
            </>
          ) : (
            <>
              <h2 className='text-2xl md:text-3xl font-semibold text-white'>
                {getLoadingMessage(progress)}
              </h2>
              <p className='text-lg text-gray-400'>
                This will only take a moment
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

      {/* CSS for checkmark animation */}
      <style jsx>{`
        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
