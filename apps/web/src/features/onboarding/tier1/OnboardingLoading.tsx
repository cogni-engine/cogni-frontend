'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface OnboardingLoadingProps {
  userName?: string;
  onComplete: () => void;
}

export function OnboardingLoading({
  userName,
  onComplete,
}: OnboardingLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
          // Show completed checkmark
          setIsComplete(true);
          // Wait a bit before calling onComplete
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

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
          {isComplete ? (
            <div className='animate-in zoom-in duration-300'>
              <div className='relative'>
                {/* Checkmark with glow effect */}
                <div className='absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 scale-150' />
                <div className='relative bg-linear-to-br from-green-400 to-green-600 rounded-full p-6'>
                  <Check className='size-12 text-text-primary stroke-3' />
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center'>
              <div className='text-4xl font-bold text-text-primary'>
                {Math.round(progress)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Text */}
      <div className='text-center space-y-3 mt-12 animate-in fade-in duration-700 delay-200'>
        <h2 className='text-2xl md:text-3xl font-semibold text-text-primary'>
          {isComplete ? 'All set!' : 'Setting up your workspace'}
        </h2>
        {userName && !isComplete && (
          <p className='text-lg text-text-muted'>
            Personalizing your experience, {userName}
          </p>
        )}
        {isComplete && (
          <p className='text-lg text-green-400 animate-in fade-in duration-300'>
            Welcome to Cogno!
          </p>
        )}
      </div>

      {/* Decorative pulsing dots */}
      {!isComplete && (
        <div className='mt-12 flex gap-2'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='w-2 h-2 rounded-full bg-interactive-active'
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
