import { NextStepButton } from '../components/NextStepButton';

interface OnboardingWelcomeProps {
  error: string | null;
  loading: boolean;
  userName: string;
  handleContinue: () => void;
}

export function OnboardingWelcome({
  error,
  loading,
  userName,
  handleContinue,
}: OnboardingWelcomeProps) {
  return (
    <div className='flex flex-col h-full animate-in fade-in duration-500'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex-1 flex flex-col'>
          {/* Welcome Message */}
          <div className='text-center space-y-6 flex-1 flex flex-col justify-center'>
            <div className='space-y-4'>
              <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                Welcome to Cogno
              </h1>
              <h2 className='text-3xl md:text-4xl font-semibold text-gray-200'>
                {userName}!
              </h2>
            </div>

            <div className='space-y-4 max-w-lg mx-auto'>
              <p className='text-xl md:text-2xl text-gray-300 leading-relaxed'>
                Your personalized workspace awaits.
              </p>
              <p className='text-lg text-gray-400'>
                Let&apos;s set up your profile to get started.
              </p>
            </div>

            {/* Decorative elements */}
            <div className='flex justify-center space-x-2 mt-8'>
              <div className='w-3 h-3 rounded-full bg-white/80 animate-pulse'></div>
              <div
                className='w-3 h-3 rounded-full bg-white/50 animate-pulse'
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className='w-3 h-3 rounded-full bg-white/30 animate-pulse'
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm max-w-md mx-auto'>
              <p className='text-red-300 text-sm'>{error}</p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className='mt-8 pt-6'>
          <NextStepButton
            type='button'
            onClick={handleContinue}
            loading={loading}
            loadingText='Loading...'
          />
        </div>
      </div>
    </div>
  );
}
