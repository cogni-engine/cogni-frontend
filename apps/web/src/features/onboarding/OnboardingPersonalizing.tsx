import { useEffect, useState } from 'react';

interface OnboardingPersonalizingProps {
  userName?: string;
}

export function OnboardingPersonalizing({
  userName,
}: OnboardingPersonalizingProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col h-full items-center justify-center animate-in fade-in duration-500'>
      {/* Loading Spinner */}
      <div className='relative w-32 h-32 mb-8'>
        <div className='absolute inset-0 rounded-full border-4 border-white/10' />
        <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin' />
      </div>

      {/* Loading Text */}
      <div className='text-center space-y-4'>
        <h2 className='text-2xl md:text-3xl font-semibold text-white'>
          Tailoring the app to your needs
          {'.'.repeat(dots)}
        </h2>
        {userName && (
          <p className='text-lg text-gray-400'>
            Setting up your workspace, {userName}
          </p>
        )}
      </div>

      {/* Optional decorative elements */}
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
    </div>
  );
}
