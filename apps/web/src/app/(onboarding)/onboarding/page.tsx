'use client';

import { useOnboardingStore } from '@/store/onboardingStore';
import { OnboardingFlow } from '@/features/onboarding/tier1/OnboardingFlow';

export default function OnboardingPage() {
  // Get userId and onboardingSessionId from Zustand store
  const userId = useOnboardingStore(state => state.userId);
  const onboardingSessionId = useOnboardingStore(
    state => state.onboardingSessionId
  );

  // Don't render flow until we have required data
  if (!userId || !onboardingSessionId) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  // Render flow component with guaranteed valid props
  return (
    <OnboardingFlow userId={userId} onboardingSessionId={onboardingSessionId} />
  );
}
