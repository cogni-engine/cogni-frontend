'use client';

import { useState } from 'react';
import { signIn, signUp, signOut } from '../api/supabaseAuth';
import { getPersonalWorkspace } from '@/lib/api/workspaceApi';
import { setCookie, deleteCookie, COOKIE_KEYS } from '@/lib/cookies';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Sign up the user
      await signUp(email, password);

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
        // Log the error but don't fail the signup
        console.error('Failed to fetch personal workspace:', workspaceError);
      }
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
      await signIn(email, password);

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

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut();
      // Clear the personal workspace ID cookie
      deleteCookie(COOKIE_KEYS.PERSONAL_WORKSPACE_ID);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'An error occurred during sign out'
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, handleSignIn, handleSignOut, loading, error };
}
