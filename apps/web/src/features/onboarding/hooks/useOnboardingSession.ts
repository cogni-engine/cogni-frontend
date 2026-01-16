'use client';

import useSWR from 'swr';
import { createClient } from '@/lib/supabase/browserClient';

interface OnboardingSessionData {
  sessionId: string;
  workspaceId: number | undefined;
  context: Record<string, unknown>;
  state: string;
  isTutorialActive: boolean;
}

async function fetchOnboardingSession(): Promise<OnboardingSessionData | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch the active session (tier1 or tier2)
    const { data: session } = await supabase
      .from('onboarding_sessions')
      .select('id, context, state')
      .eq('user_id', user.id)
      .in('state', ['tier1', 'tier2'])
      .maybeSingle();

    if (!session) return null;

    const { data: workspace } = await supabase
      .from('workspace')
      .select('id')
      .eq('onboarding_session_id', session.id)
      .maybeSingle();

    if (!workspace) return null;

    return {
      sessionId: session.id,
      workspaceId: workspace?.id,
      context: session.context || {},
      state: session.state,
      isTutorialActive: session.state === 'tier2',
    };
  } catch (error) {
    console.error('Failed to load onboarding session:', error);
    return null;
  }
}

export function useOnboardingSession() {
  const { data, error, isLoading, mutate } =
    useSWR<OnboardingSessionData | null>(
      '/onboarding-session',
      fetchOnboardingSession,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  return {
    session: data,
    isActive: data?.isTutorialActive ?? false,
    isLoading,
    error,
    refetch: mutate,
  };
}
