import { NextStepButton } from './components/NextStepButton';

interface OnboardingReadyProps {
  error: string | null;
  loading: boolean;
  handleEnterApp: () => void;
  handleBack: () => void;
}

export function OnboardingReady({
  error,
  loading,
  handleEnterApp,
}: OnboardingReadyProps) {
  return (
    <div className='text-center space-y-6 animate-in fade-in duration-500'>
      <div className='flex justify-center'>
        <div className='w-24 h-24 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse shadow-lg'>
          <span className='text-5xl'>✓</span>
        </div>
      </div>

      <div className='space-y-3'>
        <h1 className='text-4xl font-bold text-white'>You&apos;re all set!</h1>
        <p className='text-xl text-gray-300'>Your workspace is ready to go</p>
      </div>

      <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4'>
        <h2 className='text-lg font-semibold text-white'>What happens next?</h2>
        <div className='space-y-3 text-left'>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md'>
              1
            </div>
            <div className='flex-1'>
              <p className='text-gray-300'>
                We&apos;ll create your{' '}
                <strong className='text-white'>personal workspace</strong> to
                get you started
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md'>
              2
            </div>
            <div className='flex-1'>
              <p className='text-gray-300'>
                Try creating notes, tasks, and chatting with the AI assistant
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md'>
              3
            </div>
            <div className='flex-1'>
              <p className='text-gray-300'>
                When you&apos;re ready, create your own workspaces and invite
                your team
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm'>
          <p className='text-red-300 text-sm'>{error}</p>
        </div>
      )}

      <div className='pt-4 flex justify-center'>
        <NextStepButton
          type='button'
          onClick={handleEnterApp}
          loading={loading}
          variant='glass'
          text='Enter Cogni →'
          loadingText='Setting up your workspace...'
        />
      </div>
    </div>
  );
}
