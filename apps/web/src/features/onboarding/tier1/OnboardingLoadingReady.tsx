'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading with smooth progress
    const duration = 3000; // 3 seconds total
    const intervalTime = 30; // Update every 30ms
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          // Show content after loading completes
          setTimeout(() => {
            setShowContent(true);
          }, 500);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Calculate the circle properties for the progress ring
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const isComplete = progress >= 100;

  return (
    <div className='flex flex-col h-full items-center justify-center animate-in fade-in duration-500'>
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
          className='transform -rotate-90 transition-all duration-300'
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
              <stop offset='0%' stopColor='#3b82f6' />
              <stop offset='100%' stopColor='#6366f1' />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content - Progress percentage or Checkmark */}
        <div
          className='absolute inset-0 flex items-center justify-center'
          style={{
            transition: 'all 0.4s ease-in-out',
          }}
        >
          {isComplete && workspaceReady ? (
            <div className='animate-in zoom-in duration-300'>
              <div className='relative'>
                {/* Checkmark with glow effect */}
                <div className='absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 scale-150' />
                <div className='relative bg-linear-to-br from-green-400 to-green-600 rounded-full p-6'>
                  <Check className='size-12 text-white stroke-3' />
                </div>
              </div>
            </div>
          ) : isComplete && !workspaceReady ? (
            <div className='animate-pulse'>
              <Loader2 className='w-16 h-16 text-blue-400 animate-spin' />
            </div>
          ) : (
            <div className='text-center'>
              <div className='text-4xl font-bold text-white'>
                {Math.round(progress)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading/Ready Text */}
      <div className='text-center space-y-3 mt-12 animate-in fade-in duration-700 delay-200'>
        <h2 className='text-2xl md:text-3xl font-semibold text-white'>
          {isComplete && workspaceReady
            ? "You're all set!"
            : isComplete && !workspaceReady
              ? 'Creating your workspace...'
              : 'Analyzing your preferences'}
        </h2>
        {userName && !isComplete && (
          <p className='text-lg text-gray-400'>
            Personalizing your experience, {userName}
          </p>
        )}
        {isComplete && workspaceReady && (
          <p className='text-lg text-green-400 animate-in fade-in duration-300'>
            Your tutorial workspace is ready!
          </p>
        )}
        {isComplete && !workspaceReady && (
          <p className='text-lg text-gray-400'>
            Setting up your personalized workspace...
          </p>
        )}
      </div>

      {/* Decorative pulsing dots (only during initial loading) */}
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

      {/* What happens next - Show after loading completes */}
      {showContent && (
        <div className='mt-12 w-full max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
          {error && (
            <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm'>
              <p className='text-red-300 text-sm'>{error}</p>
            </div>
          )}

          {/* Action Button */}
          <div className='flex justify-center'>
            {workspaceReady ? (
              <NextStepButton
                type='button'
                onClick={handleContinue}
                loading={false}
                variant='glass'
                text='Start Tutorial →'
                loadingText='Loading...'
              />
            ) : (
              <div className='flex items-center gap-2 text-gray-400'>
                <Loader2 className='w-4 h-4 animate-spin' />
                <span className='text-sm'>Preparing your workspace...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
