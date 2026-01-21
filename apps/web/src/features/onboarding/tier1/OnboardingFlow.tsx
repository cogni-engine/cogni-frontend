'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMachine } from '@xstate/react';
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
    if (state.matches('completed') && state.context.tutorialWorkspaceId) {
      // Clear the saved snapshot since onboarding is complete
      setMachineSnapshot(null);
      console.log('✅ Onboarding completed - clearing saved state');

      // Redirect to the tutorial workspace
      router.push(`/workspace/${state.context.tutorialWorkspaceId}/chat`);
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

  // Render the appropriate step based on state
  const renderStep = () => {
    // App intro
    if (state.matches('appIntro')) {
      return (
        <AboutCognoApp
          error={null}
          loading={false}
          handleGetStarted={() => send({ type: 'NEXT' })}
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
          setName={name => send({ type: 'UPDATE_PROFILE', profile: { name } })}
          handleNameSubmit={async e => {
            e.preventDefault();
            const currentName = state.context.profile.name;

            if (!currentName || !userId) {
              console.error('Name or userId missing:', { currentName, userId });
              return;
            }

            send({ type: 'NEXT' });
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
          handleContinue={() => send({ type: 'NEXT' })}
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
          handleContinue={() => send({ type: 'NEXT' })}
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
            send({ type: 'ANSWER', key: 'primaryRole', value })
          }
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: 'aiRelationship' })) {
      return (
        <QuestionCard
          config={questionConfigs.aiRelationship}
          value={state.context.answers.aiRelationship}
          onAnswer={value =>
            send({ type: 'ANSWER', key: 'aiRelationship', value })
          }
          onNext={() => send({ type: 'NEXT' })}
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
          onAnswer={value => send({ type: 'ANSWER', key: 'useCase', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    // LoadingReady (combined loading animation and ready screen)
    if (state.matches('loadingReady')) {
      return (
        <OnboardingLoadingReady
          userName={state.context.profile.name}
          workspaceReady={!!state.context.tutorialWorkspaceId}
          error={null}
          handleContinue={() => send({ type: 'NEXT' })}
        />
      );
    }

    // Payment (plan selection)
    if (state.matches('payment')) {
      return (
        <OnboardingPayment
          error={null}
          loading={false}
          handleContinue={() => send({ type: 'COMPLETE' })}
          handleBack={() => send({ type: 'BACK' })}
          userName={state.context.profile.name}
        />
      );
    }

    // Completed (transitioning to workspace)
    if (state.matches('completed')) {
      return (
        <div className='flex flex-col items-center justify-center h-full space-y-6 animate-in fade-in duration-300'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-bold text-white'>
              Entering your workspace...
            </h2>
            <p className='text-gray-400'>Get ready for your tutorial!</p>
          </div>
        </div>
      );
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
              onClick={() => send({ type: 'BACK' })}
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
        <div className='h-full'>{renderStep()}</div>
      </div>
    </div>
  );
}
