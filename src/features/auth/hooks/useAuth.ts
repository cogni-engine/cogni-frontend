'use client';

import { useState } from 'react';
import { signIn, signUp, signOut, signInWithGoogle } from '../api/supabaseAuth';
import { getPersonalWorkspace } from '@/lib/api/workspaceApi';
import {
  setCookie,
  COOKIE_KEYS,
  getPendingInviteToken,
  setCurrentUserId,
  clearAllUserCookies,
} from '@/lib/cookies';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Check if there's a pending invite token
      const inviteToken = getPendingInviteToken();

      // Build redirect URL based on whether user is signing up from invite
      const redirectUrl =
        typeof window !== 'undefined'
          ? inviteToken
            ? `${window.location.origin}/auth/callback?invite=${inviteToken}`
            : `${window.location.origin}/auth/callback`
          : undefined;

      // Sign up the user with custom redirect
      await signUp(email, password, redirectUrl);

      // Note: We don't fetch personal workspace here because user isn't confirmed yet
      // That will happen in the callback after email verification
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'An error occurred during sign up'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Sign in the user
      const { user } = await signIn(email, password);

      // Store current user ID in cookie
      if (user?.id) {
        setCurrentUserId(user.id);
      }

      // Fetch and store personal workspace ID
      try {
        const personalWorkspace = await getPersonalWorkspace();
        if (personalWorkspace?.id) {
          setCookie(
            COOKIE_KEYS.PERSONAL_WORKSPACE_ID,
            personalWorkspace.id.toString()
          );
        }
      } catch (workspaceError) {
        // Log the error but don't fail the login
        console.error('Failed to fetch personal workspace:', workspaceError);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'An error occurred during sign in'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if there's a pending invite token
      const inviteToken = getPendingInviteToken();

      // Build redirect URL based on whether user is signing in from invite
      const redirectUrl =
        typeof window !== 'undefined'
          ? inviteToken
            ? `${window.location.origin}/auth/callback?invite=${inviteToken}`
            : `${window.location.origin}/auth/callback`
          : undefined;

      await signInWithGoogle(redirectUrl);
      // Note: The redirect will happen automatically, so we don't need to handle navigation here
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'An error occurred during Google sign in'
      );
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut();
      // Clear all user-related cookies
      clearAllUserCookies();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'An error occurred during sign out'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignUp,
    handleSignIn,
    handleSignInWithGoogle,
    handleSignOut,
    loading,
    error,
  };
}
