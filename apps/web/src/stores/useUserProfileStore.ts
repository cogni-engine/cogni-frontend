/**
 * Global User Profile Store using Zustand
 *
 * Manages the current authenticated user's profile data globally.
 * This prevents redundant fetches across components.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/browserClient';
import { getUserProfile, createUserProfile } from '@/lib/api/userProfilesApi';
import type { UserProfile } from '@/types/userProfile';

interface UserProfileState {
  // Current authenticated user's Supabase User ID
  userId: string | null;
  // User's email from Supabase auth
  userEmail: string | null;
  // User profile data from user_profiles table
  profile: UserProfile | null;
  // Loading states
  isLoading: boolean;
  isInitialized: boolean;
  // Error state
  error: string | null;
  // Actions
  initialize: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setProfile: (profile: UserProfile | null) => void;
  reset: () => void;
}

const initialState = {
  userId: null,
  userEmail: null,
  profile: null,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const useUserProfileStore = create<UserProfileState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      /**
       * Initialize the store by fetching current user and their profile
       * Call this once on app initialization
       */
      initialize: async () => {
        // Prevent multiple simultaneous initializations
        if (get().isLoading) return;
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser();

          if (authError) {
            throw new Error(`Auth error: ${authError.message}`);
          }

          if (!user) {
            // No user logged in - reset state
            set({
              ...initialState,
              isInitialized: true,
              isLoading: false,
            });
            return;
          }

          // Fetch or create user profile
          let profile = await getUserProfile(user.id);
          if (!profile) {
            // Create profile if it doesn't exist
            profile = await createUserProfile(user.id, user.email ?? undefined);
          }

          set({
            userId: user.id,
            userEmail: user.email ?? null,
            profile,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
        } catch (error) {
          console.error('Failed to initialize user profile store:', error);
          set({
            isLoading: false,
            isInitialized: true,
            error:
              error instanceof Error
                ? error.message
                : 'Failed to load user profile',
          });
        }
      },

      /**
       * Update profile data in the store (optimistic update)
       * Call this after successful profile updates
       */
      updateProfile: updates => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        set({
          profile: {
            ...currentProfile,
            ...updates,
          },
        });
      },

      /**
       * Set profile directly (useful for external updates)
       */
      setProfile: profile => {
        set({ profile });
      },

      /**
       * Reset store to initial state (useful for logout)
       */
      reset: () => {
        set(initialState);
      },
    }),
    { name: 'UserProfileStore' }
  )
);

/**
 * Selector hooks for fine-grained subscriptions
 */

// Get just the profile data (most common use case)
export const useUserProfile = () => useUserProfileStore(state => state.profile);

// Get user ID
export const useUserId = () => useUserProfileStore(state => state.userId);

// Get user email
export const useUserEmail = () => useUserProfileStore(state => state.userEmail);

// Get loading state
export const useUserProfileLoading = () =>
  useUserProfileStore(state => state.isLoading);

// Get profile name (convenience selector)
export const useUserName = () =>
  useUserProfileStore(state => state.profile?.name);

// Get avatar URL (convenience selector)
export const useUserAvatar = () =>
  useUserProfileStore(state => state.profile?.avatar_url);

// Get full state (use sparingly - causes re-renders on any state change)
export const useUserProfileState = () => useUserProfileStore();
