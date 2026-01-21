'use client';

import React, { useState } from 'react';
import { useShepherd } from '@/features/onboarding/tier2/shepherd/ShepherdProvider';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import { X, Square, Zap, Code, Activity } from 'lucide-react';
import { exampleTours } from '@/features/onboarding/tier2/shepherd/tours';
import type { StepOptions } from '@/features/onboarding/tier2/shepherd/ShepherdProvider';
import { useTutorial } from '@/features/onboarding/tier2/TutorialProvider';

export function ShepherdControlPanel() {
  const { showStep, cancelTour, isActive } = useShepherd();
  const { state: tutorialState, send: tutorialSend } = useTutorial();
  const [isOpen, setIsOpen] = useState(false);
  const [customSelector, setCustomSelector] = useState('');
  const [customText, setCustomText] = useState('');
  const [customPosition, setCustomPosition] = useState<
    'top' | 'bottom' | 'left' | 'right'
  >('bottom');

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const availableTours = Object.keys(exampleTours);

  // Flatten all steps from all tours for individual testing
  const allSteps: Array<{
    tourId: string;
    stepIndex: number;
    step: StepOptions;
  }> = [];
  availableTours.forEach(tourId => {
    exampleTours[tourId].forEach((step, index) => {
      allSteps.push({ tourId, stepIndex: index, step });
    });
  });

  return (
    <>
      {/* Toggle Button - Fixed position */}
      <GlassButton
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-4 right-4 z-9999'
        title='Shepherd Control Panel'
        size='icon'
      >
        {isOpen ? <X className='w-5 h-5' /> : <Zap className='w-5 h-5' />}
      </GlassButton>

      {/* Control Panel */}
      {isOpen && (
        <GlassCard className='fixed bottom-20 right-4 z-9999 rounded-3xl p-6 min-w-[320px] max-w-[400px]'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-white font-semibold text-lg'>
              Shepherd Control Panel
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-gray-400 hover:text-white transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {isActive && (
            <GlassCard className='mb-4 p-3 bg-yellow-500/10 border-yellow-500/30 rounded-xl'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse' />
                <span className='text-yellow-200 text-sm font-medium'>
                  Step is active
                </span>
              </div>
            </GlassCard>
          )}

          <div className='space-y-2'>
            <p className='text-gray-300 text-sm mb-3'>Test individual steps:</p>
            <div className='max-h-[300px] overflow-y-auto space-y-2'>
              {allSteps.map(({ tourId, stepIndex, step }, idx) => (
                <GlassButton
                  key={`${tourId}-${stepIndex}-${idx}`}
                  onClick={() => showStep(step)}
                  disabled={isActive}
                  className='w-full justify-start px-4 py-2.5 text-sm'
                >
                  <Zap className='w-4 h-4 mr-2' />
                  <div className='flex flex-col items-start'>
                    <span className='text-xs text-gray-400'>
                      {tourId.replace(/([A-Z])/g, ' $1')} - Step {stepIndex + 1}
                    </span>
                    <span className='text-xs text-gray-300 truncate max-w-[200px]'>
                      {step.text.substring(0, 40)}
                      {step.text.length > 40 ? '...' : ''}
                    </span>
                  </div>
                </GlassButton>
              ))}
            </div>

            {/* Custom Selector Input */}
            {/* <div className='mt-4 pt-4 border-t border-white/10'>
              <p className='text-gray-300 text-sm mb-3 flex items-center gap-2'>
                <Code className='w-4 h-4' />
                Custom Selector Test
              </p>
              <div className='space-y-2'>
                <input
                  type='text'
                  placeholder='CSS selector (e.g., .my-class, #my-id)'
                  value={customSelector}
                  onChange={e => setCustomSelector(e.target.value)}
                  disabled={isActive}
                  className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 disabled:opacity-50'
                />
                <textarea
                  placeholder='Tooltip text...'
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  disabled={isActive}
                  rows={2}
                  className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 disabled:opacity-50 resize-none'
                />
                <select
                  value={customPosition}
                  onChange={e =>
                    setCustomPosition(
                      e.target.value as 'top' | 'bottom' | 'left' | 'right'
                    )
                  }
                  disabled={isActive}
                  className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/20 disabled:opacity-50'
                >
                  <option value='top'>Top</option>
                  <option value='bottom'>Bottom</option>
                  <option value='left'>Left</option>
                  <option value='right'>Right</option>
                </select>
                <GlassButton
                  onClick={() => {
                    if (customSelector && customText) {
                      showStep({
                        id: 'custom-selector',
                        text: customText,
                        attachTo: {
                          element: customSelector,
                          on: customPosition,
                        },
                      });
                    }
                  }}
                  disabled={isActive || !customSelector || !customText}
                  className='w-full px-4 py-2.5 text-sm'
                >
                  <Code className='w-4 h-4 mr-2' />
                  Test Custom Selector
                </GlassButton>
              </div>
            </div> */}

            {isActive && (
              <GlassButton
                onClick={cancelTour}
                className='w-full mt-4 px-4 py-2.5 text-sm bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-300'
              >
                <Square className='w-4 h-4 mr-2' />
                Cancel Active Step
              </GlassButton>
            )}
          </div>

          {/* XState Tutorial Machine Monitor */}
          <div className='mt-4 pt-4 border-t border-white/10'>
            <p className='text-gray-300 text-sm mb-3 flex items-center gap-2'>
              <Activity className='w-4 h-4' />
              Tutorial XState Monitor
            </p>
            {!tutorialState ? (
              <GlassCard className='p-3 bg-gray-500/10 border-gray-500/30 rounded-xl mb-3'>
                <div className='text-xs text-gray-400'>
                  No active tutorial session
                </div>
              </GlassCard>
            ) : (
              <>
                <GlassCard className='p-3 bg-blue-500/10 border-blue-500/30 rounded-xl mb-3'>
                  <div className='space-y-2 text-xs'>
                    <div>
                      <span className='text-gray-400'>State:</span>{' '}
                      <span className='text-blue-300 font-mono font-semibold'>
                        {String(tutorialState.value)}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-400'>Session ID:</span>{' '}
                      <span className='text-white font-mono'>
                        {tutorialState.context.onboardingSessionId || 'none'}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-400'>
                        Tutorial Workspace ID:
                      </span>{' '}
                      <span className='text-white font-mono'>
                        {tutorialState.context.tutorialWorkspaceId || 'none'}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-400'>Current Step:</span>{' '}
                      <span className='text-white'>
                        {tutorialState.context.currentStep}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-400'>Completed Steps:</span>{' '}
                      <span className='text-white'>
                        {`[${tutorialState.context.completedSteps.join(', ') || 'none'}]`}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-400'>Onboarding Context:</span>{' '}
                      <span className='text-white font-mono text-[10px] break-all'>
                        {tutorialState.context.onboardingContext
                          ? JSON.stringify(
                              tutorialState.context.onboardingContext,
                              null,
                              2
                            )
                          : 'none'}
                      </span>
                    </div>
                  </div>
                </GlassCard>
                <div className='flex flex-wrap gap-2'>
                  {tutorialState.can({ type: 'START' }) && (
                    <GlassButton
                      onClick={() => tutorialSend?.({ type: 'START' })}
                      className='px-3 py-1.5 text-xs'
                    >
                      START
                    </GlassButton>
                  )}
                  {tutorialState.can({ type: 'NEXT' }) && (
                    <GlassButton
                      onClick={() => tutorialSend?.({ type: 'NEXT' })}
                      className='px-3 py-1.5 text-xs'
                    >
                      NEXT
                    </GlassButton>
                  )}
                  {tutorialState.can({ type: 'BACK' }) && (
                    <GlassButton
                      onClick={() => tutorialSend?.({ type: 'BACK' })}
                      className='px-3 py-1.5 text-xs'
                    >
                      BACK
                    </GlassButton>
                  )}
                  {tutorialState.can({ type: 'COMPLETE' }) && (
                    <GlassButton
                      onClick={() => tutorialSend?.({ type: 'COMPLETE' })}
                      className='px-3 py-1.5 text-xs'
                    >
                      COMPLETE
                    </GlassButton>
                  )}
                  {tutorialState.can({ type: 'SKIP' }) && (
                    <GlassButton
                      onClick={() => tutorialSend?.({ type: 'SKIP' })}
                      className='px-3 py-1.5 text-xs'
                    >
                      SKIP
                    </GlassButton>
                  )}
                </div>
              </>
            )}
          </div>

          <div className='mt-4 pt-4 border-t border-white/10'>
            <p className='text-gray-400 text-xs'>
              Development tool for testing Shepherd.js tours
            </p>
          </div>
        </GlassCard>
      )}
    </>
  );
}
