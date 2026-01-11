'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useMachine } from '@xstate/react';
import { OnboardingService } from '@/lib/supabase/onboardingService';
import {
  AboutCognoApp,
  OnboardingName,
  OnboardingIcon,
  OnboardingWelcome,
  OnboardingReady,
  OnboardingLoading,
  QuestionCard,
  onboardingMachine,
  questionConfigs,
} from '@/features/onboarding';
import GlassButton from '@/components/glass-design/GlassButton';
import { ChevronLeft } from 'lucide-react';
import { updateUserProfile } from '@/lib/api/userProfilesApi';

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

  // Handle completion - save all answers and redirect
  useEffect(() => {
    if (state.matches('completed')) {
      const completeOnboarding = async () => {
        try {
          const userId = state.context.profile.userId;
          if (!userId) return;

          const onboardingService = new OnboardingService(supabase);

          // Save all answers
          await onboardingService.saveAllAnswers(userId, state.context.answers);

          // Complete onboarding and create workspace
          const result = await onboardingService.completeOnboarding(userId);

          if (result.success && result.workspaceId) {
            // Redirect to the tutorial workspace
            router.push(`/workspace/${result.workspaceId}`);
            router.refresh();
          } else if (result.success) {
            // Fallback to home if workspaceId is not available
            router.push('/home');
            router.refresh();
          }
        } catch (err) {
          console.error('Failed to complete onboarding:', err);
        }
      };

      completeOnboarding();
    }
  }, [state, supabase, router]);

  // Calculate progress based on current state
  const getProgress = (): number => {
    if (state.matches('appIntro')) return 0;
    if (state.matches({ profile: 'name' })) return 10;
    if (state.matches({ profile: 'icon' })) return 20;
    if (state.matches('welcome')) return 30;
    if (state.matches({ context: 'lifeIntent' })) return 40;
    if (state.matches({ context: 'aiRelationship' })) return 50;
    if (state.matches({ context: 'workTiming' })) return 60;
    if (state.matches({ context: 'usageContext' })) return 70;
    if (state.matches({ context: { personal: 'bottleneck' } })) return 80;
    if (state.matches({ context: { personal: 'immediateWin' } })) return 85;
    if (state.matches({ context: { team: 'role' } })) return 80;
    if (state.matches({ context: { team: 'teamPain' } })) return 85;
    if (state.matches({ context: 'riskSignal' })) return 90;
    if (state.matches('loading')) return 95;
    if (state.matches('ready')) return 100;
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
    if (state.matches({ context: 'lifeIntent' })) {
      return (
        <QuestionCard
          config={questionConfigs.lifeIntent}
          value={state.context.answers.lifeIntent}
          onAnswer={value => send({ type: 'ANSWER', key: 'lifeIntent', value })}
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

    if (state.matches({ context: 'workTiming' })) {
      return (
        <QuestionCard
          config={questionConfigs.workTiming}
          value={state.context.answers.workTiming}
          onAnswer={value => send({ type: 'ANSWER', key: 'workTiming', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: 'usageContext' })) {
      return (
        <QuestionCard
          config={questionConfigs.usageContext}
          value={state.context.answers.usageContext}
          onAnswer={value =>
            send({
              type: 'ANSWER',
              key: 'usageContext',
              value: value === 'For my personal work' ? 'personal' : 'team',
            })
          }
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    // Personal flow
    if (state.matches({ context: { personal: 'bottleneck' } })) {
      return (
        <QuestionCard
          config={questionConfigs.bottleneck}
          value={state.context.answers.bottleneck}
          onAnswer={value => send({ type: 'ANSWER', key: 'bottleneck', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: { personal: 'immediateWin' } })) {
      return (
        <QuestionCard
          config={questionConfigs.immediateWin}
          value={state.context.answers.immediateWin}
          onAnswer={value =>
            send({ type: 'ANSWER', key: 'immediateWin', value })
          }
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    // Team flow
    if (state.matches({ context: { team: 'role' } })) {
      return (
        <QuestionCard
          config={questionConfigs.role}
          value={state.context.answers.role}
          onAnswer={value => send({ type: 'ANSWER', key: 'role', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    if (state.matches({ context: { team: 'teamPain' } })) {
      return (
        <QuestionCard
          config={questionConfigs.teamPain}
          value={state.context.answers.teamPain}
          onAnswer={value => send({ type: 'ANSWER', key: 'teamPain', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    // Risk signal (common to both flows)
    if (state.matches({ context: 'riskSignal' })) {
      return (
        <QuestionCard
          config={questionConfigs.riskSignal}
          value={state.context.answers.riskSignal}
          onAnswer={value => send({ type: 'ANSWER', key: 'riskSignal', value })}
          onNext={() => send({ type: 'NEXT' })}
        />
      );
    }

    // Loading (shows after questions)
    if (state.matches('loading')) {
      return (
        <OnboardingLoading
          userName={state.context.profile.name}
          onComplete={() => send({ type: 'COMPLETE' })}
        />
      );
    }

    // Ready (final screen with "Enter App" button)
    if (state.matches('ready')) {
      return (
        <OnboardingReady
          error={null}
          loading={false}
          handleEnterApp={() => send({ type: 'COMPLETE' })}
          handleBack={() => send({ type: 'BACK' })}
        />
      );
    }

    return null;
  };

  const showBackButton =
    !state.matches('appIntro') &&
    !state.matches('loading') &&
    !state.matches('ready');

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
