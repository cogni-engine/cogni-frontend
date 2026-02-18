import { NextStepButton } from '../components/NextStepButton';
import { Loader2 } from 'lucide-react';

interface OnboardingReadyProps {
  error: string | null;
  workspaceReady: boolean;
  handleEnterApp: () => void;
  handleBack: () => void;
}

export function OnboardingReady({
  error,
  workspaceReady,
  handleEnterApp,
}: OnboardingReadyProps) {
  return (
    <div className='text-center space-y-6 animate-in fade-in duration-500'>
      <div className='flex justify-center'>
        {workspaceReady ? (
          <div className='w-24 h-24 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse shadow-lg'>
            <span className='text-5xl'>✓</span>
          </div>
        ) : (
          <div className='w-24 h-24 bg-linear-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
            <Loader2 className='w-12 h-12 text-text-primary animate-spin' />
          </div>
        )}
      </div>

      <div className='space-y-3'>
        {workspaceReady ? (
          <>
            <h1 className='text-4xl font-bold text-text-primary'>
              You&apos;re all set!
            </h1>
            <p className='text-xl text-text-secondary'>
              Your tutorial workspace is ready to go
            </p>
          </>
        ) : (
          <>
            <h1 className='text-4xl font-bold text-text-primary'>
              Setting up your workspace...
            </h1>
            <p className='text-xl text-text-secondary'>
              We&apos;re creating your personalized tutorial workspace
            </p>
          </>
        )}
      </div>

      <div className='bg-surface-primary dark:backdrop-blur-sm border border-border-default rounded-xl p-6 space-y-4'>
        <h2 className='text-lg font-semibold text-text-primary'>
          What happens next?
        </h2>
        <div className='space-y-3 text-left'>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-text-primary text-sm font-bold shadow-md'>
              1
            </div>
            <div className='flex-1'>
              <p className='text-text-secondary'>
                You&apos;ll enter your{' '}
                <strong className='text-text-primary'>
                  tutorial workspace
                </strong>{' '}
                with a guided walkthrough
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-text-primary text-sm font-bold shadow-md'>
              2
            </div>
            <div className='flex-1'>
              <p className='text-text-secondary'>
                Learn the basics: creating notes, tasks, and chatting with your
                AI assistant
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-3'>
            <div className='shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-text-primary text-sm font-bold shadow-md'>
              3
            </div>
            <div className='flex-1'>
              <p className='text-text-secondary'>
                When you&apos;re ready, create your own workspaces and invite
                your team
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm'>
          <p className='text-red-600 dark:text-red-300 text-sm'>{error}</p>
        </div>
      )}

      <div className='pt-4 flex justify-center'>
        {workspaceReady ? (
          <NextStepButton
            type='button'
            onClick={handleEnterApp}
            loading={false}
            variant='glass'
            text='Start Tutorial →'
            loadingText='Loading...'
          />
        ) : (
          <div className='flex items-center gap-2 text-text-muted'>
            <Loader2 className='w-4 h-4 animate-spin' />
            <span className='text-sm'>Preparing your workspace...</span>
          </div>
        )}
      </div>
    </div>
  );
}
