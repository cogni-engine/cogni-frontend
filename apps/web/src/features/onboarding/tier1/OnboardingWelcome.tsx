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
            <div className='space-y-2'>
              <h1 className='text-3xl md:text-4xl font-bold text-text-primary leading-tight'>
                Welcome, {userName}
              </h1>
            </div>

            <div className='space-y-3 max-w-lg mx-auto'>
              <p className='text-xl md:text-2xl text-text-secondary leading-relaxed font-semibold'>
                Let&apos;s personalize your workspace
              </p>
              <p className='text-base text-text-muted'>
                We have a few questions to help us understand how you work
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm max-w-md mx-auto'>
              <p className='text-red-600 dark:text-red-300 text-sm'>{error}</p>
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
