'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from '@/lib/api/userProfilesApi';
import type { UserProfile, UserProfileUpdateInput } from '@/types/userProfile';

type UseUserProfileOptions = {
  userId?: string | null;
  loadOnInit?: boolean;
};

export function useUserProfile({
  userId,
  loadOnInit = true,
}: UseUserProfileOptions) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(!!userId && loadOnInit);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return null;

    try {
      setLoading(true);
      setError(null);
      let data = await getUserProfile(userId);

      if (!data) {
        data = await createUserProfile(userId);
      }

      setProfile(data);
      return data;
    } catch (err) {
      console.error('Failed to load user profile', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load user profile'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = useCallback(
    async (updates: UserProfileUpdateInput) => {
      if (!userId) {
        throw new Error('Cannot update profile without a user id');
      }

      const updated = await updateUserProfile(userId, updates);
      setProfile(updated);
      return updated;
    },
    [userId]
  );

  useEffect(() => {
    if (userId && loadOnInit) {
      void fetchProfile();
    }
  }, [userId, loadOnInit, fetchProfile]);

  const value = useMemo(
    () => ({ profile, loading, error }),
    [profile, loading, error]
  );

  return {
    ...value,
    refresh: fetchProfile,
    updateProfile,
  };
}
