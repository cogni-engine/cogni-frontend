'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useMachine } from '@xstate/react';
import { OnboardingService } from '@/features/onboarding/services/onboardingService';
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
import { updateUserProfile } from '@/lib/api/userProfilesApi';
import { getRecommendedUseCases } from '@/features/onboarding/tier1/useCaseMapping';

export default function OnboardingPage() {
  const router = useRouter();
  const [state, send] = useMachine(onboardingMachine);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Initialize profile context
          send({
            type: 'UPDATE_PROFILE',
            profile: {
              userId: user.id,
              userEmail: user.email || '',
              name: '',
            },
          });

          const onboardingService = new OnboardingService(supabase);
          await onboardingService.getOrCreateSession(user.id);
        }
      } catch (err) {
        console.error('Failed to initialize session:', err);
      }
    };

    initSession();
  }, [supabase, send]);

  // Create workspace during loadingReady state (while showing loading screen)
  useEffect(() => {
    if (state.matches('loadingReady') && !state.context.tutorialWorkspaceId) {
      const createWorkspace = async () => {
        try {
          const userId = state.context.profile.userId;
          if (!userId) return;

          const onboardingService = new OnboardingService(supabase);

          // Save all answers
          await onboardingService.saveAllAnswers(userId, state.context.answers);

          // Complete tier 1 onboarding and create workspace
          const result =
            await onboardingService.completeTier1Onboarding(userId);

          if (result.success && result.workspaceId) {
            // Store workspace data in state machine context
            send({
              type: 'STORE_WORKSPACE',
              workspaceId: result.workspaceId,
              bossWorkspaceMemberId: result.bossWorkspaceMemberId,
              bossAgentProfileId: result.bossAgentProfileId,
            });
          }
        } catch (err) {
          console.error('Failed to create tutorial workspace:', err);
        }
      };

      createWorkspace();
    }
  }, [state, supabase, send]);

  // Handle completion - redirect to workspace
  useEffect(() => {
    if (state.matches('completed') && state.context.tutorialWorkspaceId) {
      // Redirect to the tutorial workspace
      router.push(`/workspace/${state.context.tutorialWorkspaceId}/chat`);
    }
  }, [state, router]);

  // Calculate progress based on current state
  const getProgress = (): number => {
    if (state.matches('appIntro')) return 0;
    if (state.matches({ profile: 'name' })) return 10;
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
      const userId = state.context.profile.userId;

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

            try {
              await updateUserProfile(userId, { name: currentName.trim() });
              send({ type: 'NEXT' });
            } catch (err) {
              console.error('Failed to save name:', err);
            }
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

  // Dev tool: Get current state as string
  const getCurrentStateString = (): string => {
    const stateValue = state.value;
    if (typeof stateValue === 'string') return stateValue;
    if (typeof stateValue === 'object') {
      return JSON.stringify(stateValue)
        .replace(/[{}"]/g, '')
        .replace(/:/g, '.');
    }
    return 'unknown';
  };

  // Dev tool: Navigate to a specific state
  const handleDevStateChange = (targetState: string) => {
    console.log('🔧 Dev: Navigating to state:', targetState);

    // Navigate through the state machine by sending appropriate events
    // This is a simplified approach - we'll send multiple NEXT events to reach the target
    if (targetState === 'appIntro') {
      // Reload page to reset
      window.location.reload();
    } else if (targetState === 'profile.name') {
      send({ type: 'NEXT' }); // From appIntro
    } else if (targetState === 'profile.icon') {
      send({ type: 'NEXT' });
      setTimeout(() => send({ type: 'NEXT' }), 100);
    } else if (targetState === 'welcome') {
      send({ type: 'NEXT' });
      setTimeout(() => send({ type: 'NEXT' }), 100);
      setTimeout(() => send({ type: 'NEXT' }), 200);
    } else if (targetState === 'loadingReady') {
      // Fast-forward to loadingReady with mock data
      send({ type: 'ANSWER', key: 'primaryRole', value: ['Manager'] });
      send({ type: 'ANSWER', key: 'aiRelationship', value: ['Engineering'] });
      send({ type: 'ANSWER', key: 'useCase', value: ['Project management'] });
      // Navigate to loadingReady
      setTimeout(() => {
        // Simulate clicking through to loadingReady state
        for (let i = 0; i < 4; i++) {
          setTimeout(() => send({ type: 'NEXT' }), i * 50);
        }
      }, 100);
    } else if (targetState === 'payment') {
      // Skip to payment
      send({ type: 'ANSWER', key: 'primaryRole', value: ['Manager'] });
      send({ type: 'ANSWER', key: 'aiRelationship', value: ['Engineering'] });
      send({ type: 'ANSWER', key: 'useCase', value: ['Project management'] });
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => send({ type: 'NEXT' }), i * 50);
        }
      }, 100);
    }
  };

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
            <div className='flex-1 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm'>
              <div
                className='h-full bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out'
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Main Content Card */}
      <div className='w-full max-w-2xl flex-1 overflow-y-auto px-4 pb-4'>
        <div className='h-full md:bg-white/4 md:backdrop-blur-sm md:rounded-2xl md:border md:border-white/10 md:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-6'>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
