'use client';

import useSWR from 'swr';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/browserClient';

const USER_KEY = '/user';

/**
 * Fetcher function for getting the current user
 */
async function fetchUser(): Promise<User | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user;
}

/**
 * Hook to fetch the current authenticated user using SWR
 * @returns User data, loading state, and error
 */
export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User | null>(USER_KEY, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  });

  return {
    user,
    isLoading,
    error,
    mutate,
  };
}
