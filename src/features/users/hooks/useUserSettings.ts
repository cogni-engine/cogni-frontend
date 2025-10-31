'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  createUserProfile,
  getUserProfile,
  removeUserAvatar,
  updateUserProfile,
  uploadUserAvatar,
} from '@/lib/api/userProfilesApi';
import { createClient } from '@/lib/supabase/browserClient';
import type { UserProfile } from '@/types/userProfile';

import type { StatusMessage } from '../utils/avatar';

type UseUserSettingsReturn = {
  userId: string | null;
  profile: UserProfile | null;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  isLoading: boolean;
  savingName: boolean;
  nameStatus: StatusMessage | null;
  saveName: () => Promise<void>;
  setNameStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>>;
  savingAvatar: boolean;
  removingAvatar: boolean;
  avatarStatus: StatusMessage | null;
  updateAvatar: (file: File, previousAvatarUrl?: string) => Promise<void>;
  removeAvatar: () => Promise<void>;
  setAvatarStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>>;
};

export function useUserSettings(): UseUserSettingsReturn {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [savingName, setSavingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<StatusMessage | null>(null);

  const [savingAvatar, setSavingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<StatusMessage | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsLoading(false);
          return;
        }

        setUserId(user.id);
        setUserEmail(user.email ?? '');

        let userProfile = await getUserProfile(user.id);
        if (!userProfile) {
          userProfile = await createUserProfile(user.id);
        }

        setProfile(userProfile);
        setName(userProfile?.name ?? '');
      } catch (error) {
        console.error('Failed to load user profile', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadInitialData();
  }, []);

  const saveName = useCallback(async () => {
    if (!userId || !profile) return;
    if (name === (profile.name ?? '')) {
      setNameStatus({ type: 'success', message: 'No changes to save.' });
      return;
    }

    try {
      setSavingName(true);
      const updated = await updateUserProfile(userId, { name });
      setProfile(updated);
      setNameStatus({
        type: 'success',
        message: 'Name updated successfully.',
      });
    } catch (error) {
      console.error('Failed to update name', error);
      setNameStatus({
        type: 'error',
        message: 'Something went wrong while updating your name.',
      });
    } finally {
      setSavingName(false);
    }
  }, [name, profile, userId]);

  const updateAvatar = useCallback(
    async (file: File, previousAvatarUrl?: string) => {
      if (!userId || !profile) return;

      try {
        setSavingAvatar(true);
        const { avatarUrl } = await uploadUserAvatar(
          userId,
          file,
          previousAvatarUrl
        );

        const updated = await updateUserProfile(userId, {
          avatar_url: avatarUrl,
        });
        setProfile(updated);
        setAvatarStatus({
          type: 'success',
          message: 'Avatar updated successfully.',
        });
      } catch (error) {
        console.error('Failed to update avatar', error);
        setAvatarStatus({
          type: 'error',
          message: 'Something went wrong while saving your avatar.',
        });
        throw error;
      } finally {
        setSavingAvatar(false);
      }
    },
    [profile, userId]
  );

  const removeAvatar = useCallback(async () => {
    if (!userId || !profile?.avatar_url) return;

    try {
      setRemovingAvatar(true);
      const updated = await removeUserAvatar(userId, profile.avatar_url);
      setProfile(updated);
      setAvatarStatus({ type: 'success', message: 'Avatar removed.' });
    } catch (error) {
      console.error('Failed to remove avatar', error);
      setAvatarStatus({
        type: 'error',
        message: 'Unable to remove avatar. Please try again.',
      });
      throw error;
    } finally {
      setRemovingAvatar(false);
    }
  }, [profile?.avatar_url, userId]);

  return {
    userId,
    profile,
    name,
    setName,
    userEmail,
    isLoading,
    savingName,
    nameStatus,
    saveName,
    setNameStatus,
    savingAvatar,
    removingAvatar,
    avatarStatus,
    updateAvatar,
    removeAvatar,
    setAvatarStatus,
  };
}
