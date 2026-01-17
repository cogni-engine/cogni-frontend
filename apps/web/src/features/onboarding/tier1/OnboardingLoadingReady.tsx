'use client';

import { useEffect, useState } from 'react';

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
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Auto-transition to payment when workspace is ready
  useEffect(() => {
    if (workspaceReady) {
      handleContinue();
    }
  }, [workspaceReady, handleContinue]);

  // Calculate the circle properties for the progress ring
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
              <stop offset='0%' stopColor='rgba(255, 255, 255, 0.8)' />
              <stop offset='100%' stopColor='rgba(255, 255, 255, 0.6)' />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content - Empty (spinner removed) */}
      </div>

      {/* Loading Text */}
      <div className='text-center space-y-3 mt-12 animate-in fade-in duration-700 delay-200'>
        <h2 className='text-2xl md:text-3xl font-semibold text-white'>
          Setting up your workspace...
        </h2>
        {userName && (
          <p className='text-lg text-gray-400'>
            Personalizing your experience, {userName}
          </p>
        )}
      </div>

      {/* Decorative pulsing dots */}
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

      {/* Error Message */}
      {error && (
        <div className='mt-8 bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm max-w-md'>
          <p className='text-red-300 text-sm'>{error}</p>
        </div>
      )}
    </div>
  );
}
