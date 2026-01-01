'use client';

import { useState } from 'react';
import { signIn, signUp, signOut, signInWithGoogle, signInWithApple } from '../supabase/auth';
import { getPersonalWorkspace } from '../workspace';
import {
  setCookie,
  COOKIE_KEYS,
  getPendingInviteToken,
  setCurrentUserId,
  clearAllUserCookies,
} from '@cogni/utils';

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
      console.error('Google sign in error:', e);
      setError(
        e instanceof Error
          ? e.message
          : 'An error occurred during Google sign in'
      );
      setLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
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

      console.log('Initiating Apple sign in with redirect:', redirectUrl);
      const result = await signInWithApple(redirectUrl);
      console.log('Apple sign in result:', result);
      
      // Check if we got a URL to redirect to
      if (result?.url) {
        // Redirect to Apple OAuth page
        window.location.href = result.url;
      } else {
        const errorMsg = 'No redirect URL received from Apple OAuth. This usually means:\n1. The redirect URL is not registered in Apple Developer portal\n2. Localhost may not be supported (try using ngrok or similar)\n3. Check Supabase dashboard for Apple provider configuration';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (e) {
      console.error('Apple sign in error:', e);
      const errorMessage = e instanceof Error ? e.message : 'An error occurred during Apple sign in';
      
      // Provide more helpful error message for common issues
      if (errorMessage.includes('redirect_uri_mismatch') || errorMessage.includes('redirect')) {
        setError(
          'Apple OAuth redirect URL mismatch. Please ensure your redirect URL is registered in Apple Developer portal and matches exactly (including http/https and port).'
        );
      } else {
        setError(errorMessage);
      }
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
    handleSignInWithApple,
    handleSignOut,
    loading,
    error,
  };
}

