'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMachine } from '@xstate/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AboutCognoApp,
  OnboardingName,
  OnboardingIcon,
  OnboardingWelcome,
  OnboardingPayment,
  OnboardingLoadingReady,
  QuestionCard,
  onboardingMachine,
  questionConfigs,
} from '@/features/onboarding';
import GlassButton from '@/components/glass-design/GlassButton';
import { ChevronLeft } from 'lucide-react';
import { getRecommendedUseCases } from '@/features/onboarding/tier1/useCaseMapping';
import { useOnboardingStore } from '@/stores/onboardingStore';

interface OnboardingFlowProps {
  userId: string;
  onboardingSessionId: string;
}

export function OnboardingFlow({
  userId,
  onboardingSessionId,
}: OnboardingFlowProps) {
  const router = useRouter();

  // Get snapshot setter (don't subscribe to machineSnapshot)
  const setMachineSnapshot = useOnboardingStore(
    state => state.setMachineSnapshot
  );

  // Capture initial snapshot ONCE on mount using lazy initializer
  const [initialSnapshot] = useState(() => {
    // Read snapshot directly without subscribing
    const machineSnapshot = useOnboardingStore.getState().machineSnapshot;
    console.log('machineSnapshot', machineSnapshot);

    // Validate snapshot belongs to current user/session
    return machineSnapshot;
  });

  // Initialize state machine with optional snapshot restoration
  const [state, send, actor] = useMachine(onboardingMachine, {
    input: {
      userId,
      onboardingSessionId,
    },
    snapshot: initialSnapshot,
  });

  // Subscribe to state changes and save snapshots
  useEffect(() => {
    const subscription = actor.subscribe(snapshot => {
      // Log current state to console
      console.log('🔄 Onboarding State Transition:', {
        state: snapshot.value,
        context: snapshot.context,
        status: snapshot.status,
      });

      // Save snapshot to Zustand
      setMachineSnapshot(snapshot);
    });

    return () => subscription.unsubscribe();
  }, [actor, setMachineSnapshot]);

  // Handle completion - redirect to workspace
  useEffect(() => {
    if (state.matches('completed')) {
      // Clear the saved snapshot since onboarding is complete
      setMachineSnapshot(null);
      console.log('✅ Onboarding completed - clearing saved state');

      // Redirect to the main workspace page
      router.push('/workspace');
    }
  }, [state, router, setMachineSnapshot]);

  // Calculate progress based on current state
  const getProgress = (): number => {
    if (state.matches('appIntro')) return 0;
    if (state.matches({ profile: 'name' })) return 0;
    if (state.matches({ profile: 'icon' })) return 20;
    if (state.matches('welcome')) return 30;
    if (state.matches({ context: 'primaryRole' })) return 40;
    if (state.matches({ context: 'aiRelationship' })) return 50;
    if (state.matches({ context: 'useCase' })) return 60;
    if (state.matches('loadingReady')) return 80;
    if (state.matches('payment')) return 90;
    if (state.matches('completed')) return 100;
    return 0;
  };

  // Get a unique key for the current step to trigger animations
  const getStepKey = (): string => {
    if (state.matches('appIntro')) return 'appIntro';
    if (state.matches({ profile: 'name' })) return 'profile-name';
    if (state.matches({ profile: 'icon' })) return 'profile-icon';
    if (state.matches('welcome')) return 'welcome';
    if (state.matches({ context: 'primaryRole' })) return 'context-primaryRole';
    if (state.matches({ context: 'aiRelationship' }))
      return 'context-aiRelationship';
    if (state.matches({ context: 'useCase' })) return 'context-useCase';
    if (state.matches('loadingReady')) return 'loadingReady';
    if (state.matches('payment')) return 'payment';
    if (state.matches('completed')) return 'completed';
    return 'unknown';
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  // Track direction of navigation for animation
  const [direction, setDirection] = useState(1);

  // Create wrapped send function to track direction
  const sendWithDirection = (
    event:
      | { type: 'NEXT' }
      | { type: 'BACK' }
      | { type: 'COMPLETE' }
      | {
          type: 'ANSWER';
          key: 'primaryRole' | 'aiRelationship' | 'useCase';
          value: string | string[];
        }
      | {
          type: 'UPDATE_PROFILE';
          profile: Partial<{ name: string; userId: string; userEmail: string }>;
        }
  ) => {
    // Set direction based on event type
    if (event.type === 'BACK') {
      setDirection(-1); // Going back, slide in from left
    } else if (
      event.type === 'NEXT' ||
      event.type === 'ANSWER' ||
      event.type === 'COMPLETE'
    ) {
      setDirection(1); // Going forward, slide in from right
    }
    send(event);
  };

  // Render the appropriate step based on state
  const renderStep = () => {
    // App intro
    if (state.matches('appIntro')) {
      return (
        <AboutCognoApp
          error={null}
          loading={false}
          handleGetStarted={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    // Profile: Name
    if (state.matches({ profile: 'name' })) {
      return (
        <OnboardingName
          error={null}
          loading={false}
          name={state.context.profile.name}
          setName={name =>
            sendWithDirection({ type: 'UPDATE_PROFILE', profile: { name } })
          }
          handleNameSubmit={async e => {
            e.preventDefault();
            const currentName = state.context.profile.name;

            if (!currentName || !userId) {
              console.error('Name or userId missing:', { currentName, userId });
              return;
            }

            sendWithDirection({ type: 'NEXT' });
          }}
        />
      );
    }

    // Profile: Icon
    if (state.matches({ profile: 'icon' })) {
      return (
        <OnboardingIcon
          error={null}
          loading={false}
          userId={state.context.profile.userId}
          userEmail={state.context.profile.userEmail}
          userName={state.context.profile.name}
          handleContinue={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    // Welcome
    if (state.matches('welcome')) {
      return (
        <OnboardingWelcome
          error={null}
          loading={false}
          userName={state.context.profile.name}
          handleContinue={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    // Context questions
    if (state.matches({ context: 'primaryRole' })) {
      return (
        <QuestionCard
          config={questionConfigs.primaryRole}
          value={state.context.answers.primaryRole}
          onAnswer={value =>
            sendWithDirection({ type: 'ANSWER', key: 'primaryRole', value })
          }
          onNext={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: 'aiRelationship' })) {
      return (
        <QuestionCard
          config={questionConfigs.aiRelationship}
          value={state.context.answers.aiRelationship}
          onAnswer={value =>
            sendWithDirection({ type: 'ANSWER', key: 'aiRelationship', value })
          }
          onNext={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: 'useCase' })) {
      // Get dynamic use case options based on selected roles
      const selectedRoles = state.context.answers.primaryRole;
      const roles = Array.isArray(selectedRoles) ? selectedRoles : [];
      const { recommended } = getRecommendedUseCases(roles);

      // Create dynamic config with recommended use cases
      const useCaseConfig = {
        ...questionConfigs.useCase,
        options: recommended,
      };

      return (
        <QuestionCard
          config={useCaseConfig}
          value={state.context.answers.useCase}
          onAnswer={value =>
            sendWithDirection({ type: 'ANSWER', key: 'useCase', value })
          }
          onNext={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    // LoadingReady (combined loading animation and ready screen)
    if (state.matches('loadingReady')) {
      // Check if the completeTier1 actor has finished successfully
      // The actor is done when it has an output (success) or is in error state
      const actorSnapshot = state.children.completeTier1?.getSnapshot();
      const isProcessingComplete =
        actorSnapshot?.status === 'done' ||
        actorSnapshot?.status === 'error' ||
        !!actorSnapshot?.output;

      // Debug logging
      console.log('[OnboardingFlow] LoadingReady state:', {
        actorStatus: actorSnapshot?.status,
        hasOutput: !!actorSnapshot?.output,
        isProcessingComplete,
        actorId: state.children.completeTier1?.id,
      });

      return (
        <OnboardingLoadingReady
          userName={state.context.profile.name}
          workspaceReady={!!isProcessingComplete}
          error={null}
          handleContinue={() => sendWithDirection({ type: 'NEXT' })}
        />
      );
    }

    // Payment (plan selection)
    if (state.matches('payment')) {
      return (
        <OnboardingPayment
          error={null}
          loading={false}
          handleContinue={() => sendWithDirection({ type: 'COMPLETE' })}
          handleBack={() => sendWithDirection({ type: 'BACK' })}
          userName={state.context.profile.name}
        />
      );
    }

    // Completed - redirect happens in useEffect, render nothing
    if (state.matches('completed')) {
      return null;
    }

    return null;
  };

  const showBackButton =
    !state.matches('appIntro') &&
    !state.matches('loadingReady') &&
    !state.matches('payment') &&
    !state.matches('completed');

  return (
    <div className='w-full h-screen flex flex-col items-center overflow-hidden'>
      {/* Progress Bar */}
      <div className='w-full max-w-2xl shrink-0 py-4 px-4 flex items-center gap-4'>
        {showBackButton && (
          <>
            <GlassButton
              size='icon'
              className='size-12'
              onClick={() => sendWithDirection({ type: 'BACK' })}
            >
              <ChevronLeft className='size-6' />
            </GlassButton>
            <div className='flex-1 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm'>
              <div
                className='h-full bg-white transition-all duration-500 ease-out'
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Main Content Card */}
      <div className='w-full max-w-2xl flex-1 overflow-y-auto px-4 pb-4'>
        <div className='h-full relative'>
          <AnimatePresence initial={false} custom={direction} mode='sync'>
            <motion.div
              key={getStepKey()}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1], // Custom ease curve for smooth motion
              }}
              className='h-full absolute inset-0'
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
