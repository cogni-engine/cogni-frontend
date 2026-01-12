'use client';

import useSWR from 'swr';
import { createBrowserClient } from '@supabase/ssr';

interface TutorialStatus {
  isActive: boolean;
}

async function fetchTutorialStatus(): Promise<TutorialStatus | null> {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Check if onboarding session is in tier2 state
  const { data: session } = await supabase
    .from('onboarding_sessions')
    .select('state')
    .eq('user_id', user.id)
    .single();

  return {
    isActive: session?.state === 'tier2',
  };
}

export function useTutorialStatus() {
  const { data, error, isLoading } = useSWR<TutorialStatus | null>(
    '/tutorial-status',
    fetchTutorialStatus,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    isActive: data?.isActive ?? false,
    isLoading,
    error,
  };
}
