'use client';

import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { OnboardingFlow } from '@/features/onboarding/tier1/OnboardingFlow';
import { OnboardingService } from '@/features/onboarding/services/onboardingService';
import { createClient } from '@/lib/supabase/browserClient';

export default function OnboardingPage() {
  const [isInitializing, setIsInitializing] = useState(true);
  const userId = useOnboardingStore(state => state.userId);
  const onboardingSessionId = useOnboardingStore(
    state => state.onboardingSessionId
  );
  const setUserId = useOnboardingStore(state => state.setUserId);
  const setOnboardingSessionId = useOnboardingStore(
    state => state.setOnboardingSessionId
  );

  // Initialize onboarding store if not already initialized
  useEffect(() => {
    const initializeOnboarding = async () => {
      // If already initialized, skip
      if (userId && onboardingSessionId) {
        setIsInitializing(false);
        return;
      }

      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error('No authenticated user found');
          setIsInitializing(false);
          return;
        }

        const onboardingService = new OnboardingService(supabase);

        // Try to get existing active session
        let session = await onboardingService.getActiveSession(user.id);

        // If no active session exists, create a new one
        if (!session) {
          const { data: newSession, error: createError } = await supabase
            .from('onboarding_sessions')
            .insert({
              user_id: user.id,
              version: 1,
              state: 'tier1',
            })
            .select('id')
            .single();

          if (createError || !newSession) {
            console.error('Error creating onboarding session:', createError);
            setIsInitializing(false);
            return;
          }

          session = {
            id: newSession.id,
            user_id: user.id,
            version: 1,
            context: undefined,
            completed_at: undefined,
            created_at: new Date().toISOString(),
          };
        }

        // Update store with session data
        setUserId(user.id);
        setOnboardingSessionId(session.id);
      } catch (error) {
        console.error('Error initializing onboarding:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeOnboarding();
  }, [userId, onboardingSessionId, setUserId, setOnboardingSessionId]);

  // Show black loading screen while initializing
  if (isInitializing || !userId || !onboardingSessionId) {
    return <div className='w-full h-screen bg-background' />;
  }

  // Render flow component with guaranteed valid props
  return (
    <OnboardingFlow userId={userId} onboardingSessionId={onboardingSessionId} />
  );
}
