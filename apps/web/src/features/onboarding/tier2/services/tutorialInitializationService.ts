/**
 * Tutorial Initialization Service
 * Handles fetching onboarding session data for tutorial initialization
 */

import { createClient } from '@/lib/supabase/browserClient';
import { OnboardingContext } from '../../types';

export interface TutorialInitializationData {
  onboardingSessionId?: string;
  tutorialWorkspaceId?: number;
  onboardingContext?: OnboardingContext;
  isTier2Active?: boolean;
}

/**
 * Initialize tutorial by fetching onboarding session data
 */
export async function initializeTutorial(): Promise<TutorialInitializationData | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('No user found, skipping tutorial initialization');
      return null;
    }

    // Fetch the active session (tier1 or tier2)
    const { data: session } = await supabase
      .from('onboarding_sessions')
      .select('id, context, state')
      .eq('user_id', user.id)
      .in('state', ['tier1', 'tier2'])
      .maybeSingle();

    if (!session) {
      console.log('No active onboarding session found');
      return null;
    }

    // Find the tutorial workspace linked to this session
    const { data: workspace } = await supabase
      .from('workspace')
      .select('id')
      .eq('onboarding_session_id', session.id)
      .maybeSingle();

    const result: TutorialInitializationData = {
      onboardingSessionId: session.id,
      tutorialWorkspaceId: workspace?.id,
      onboardingContext:
        (session.context as OnboardingContext) || ({} as OnboardingContext),
      isTier2Active: session.state === 'tier2',
    };

    return result;
  } catch (error) {
    console.error('Failed to initialize tutorial:', error);
    return null;
  }
}
