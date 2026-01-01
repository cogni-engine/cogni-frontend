'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  createUserProfile,
  deleteUserAccount,
  getUserProfile,
  removeUserAvatar,
  updateUserProfile,
  uploadUserAvatar,
} from '@/lib/api/userProfilesApi';
import { createClient } from '@/lib/supabase/browserClient';
import type { UserProfile } from '@/types/userProfile';

import type { StatusMessage } from '../utils/avatar';
import { generateAvatarBlob } from '../utils/avatarGenerator';

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
  generatingAvatar: boolean;
  avatarStatus: StatusMessage | null;
  updateAvatar: (file: File, previousAvatarUrl?: string) => Promise<void>;
  removeAvatar: () => Promise<void>;
  generateAvatar: () => Promise<void>;
  setAvatarStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>>;
  enableAiSuggestion: boolean;
  savingAiSuggestion: boolean;
  toggleAiSuggestion: () => Promise<void>;
  isDeleting: boolean;
  deleteAccount: () => Promise<void>;
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
  const [generatingAvatar, setGeneratingAvatar] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<StatusMessage | null>(null);
  const [generationCounter, setGenerationCounter] = useState(0);

  const [enableAiSuggestion, setEnableAiSuggestion] = useState(false);
  const [savingAiSuggestion, setSavingAiSuggestion] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

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
          userProfile = await createUserProfile(
            user.id,
            user.email ?? undefined
          );
        }

        setProfile(userProfile);
        setName(userProfile?.name ?? '');
        setEnableAiSuggestion(userProfile?.enable_ai_suggestion ?? false);
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

  const generateAvatar = useCallback(async () => {
    if (!userId || !profile) return;

    try {
      setGeneratingAvatar(true);
      setAvatarStatus(null);

      // Use email/name as base seed with counter for variation
      const seed = userEmail || profile.name || userId;
      const uniqueSeed = `${seed}-${generationCounter}`;

      const avatarBlob = await generateAvatarBlob(uniqueSeed, {
        style: 'cosmic',
        includeInitials: true,
      });

      const { avatarUrl } = await uploadUserAvatar(
        userId,
        avatarBlob,
        profile.avatar_url ?? undefined
      );

      const updated = await updateUserProfile(userId, {
        avatar_url: avatarUrl,
      });

      setProfile(updated);
      setGenerationCounter(prev => prev + 1);
      setAvatarStatus({
        type: 'success',
        message: 'Avatar generated successfully.',
      });
    } catch (error) {
      console.error('Failed to generate avatar', error);
      setAvatarStatus({
        type: 'error',
        message: 'Failed to generate avatar. Please try again.',
      });
    } finally {
      setGeneratingAvatar(false);
    }
  }, [generationCounter, profile, userId, userEmail]);

  const toggleAiSuggestion = useCallback(async () => {
    if (!userId || !profile) return;

    const newValue = !enableAiSuggestion;

    try {
      setSavingAiSuggestion(true);
      const updated = await updateUserProfile(userId, {
        enable_ai_suggestion: newValue,
      });
      setProfile(updated);
      setEnableAiSuggestion(newValue);
    } catch (error) {
      console.error('Failed to update AI suggestion setting', error);
      // Revert the local state on error
      setEnableAiSuggestion(enableAiSuggestion);
    } finally {
      setSavingAiSuggestion(false);
    }
  }, [enableAiSuggestion, profile, userId]);

  const deleteAccount = useCallback(async () => {
    if (!userId) return;

    try {
      setIsDeleting(true);
      await deleteUserAccount(userId);
    } catch (error) {
      console.error('Failed to delete account', error);
      setIsDeleting(false);
      throw error;
    }
    // Note: We don't set isDeleting to false here because the user will be signed out
    // and redirected, so the component will unmount
  }, [userId]);

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
    generatingAvatar,
    avatarStatus,
    updateAvatar,
    removeAvatar,
    generateAvatar,
    setAvatarStatus,
    enableAiSuggestion,
    savingAiSuggestion,
    toggleAiSuggestion,
    isDeleting,
    deleteAccount,
  };
}
