/**
 * Onboarding Service using Supabase Client
 * Direct database access - no backend API needed
 */

import { useOnboardingStore } from '@/stores/onboardingStore';
import { SupabaseClient } from '@supabase/supabase-js';

export type OnboardingStatus =
  | 'not_started'
  | 'tier1_in_progress'
  | 'completed';

export interface OnboardingContext {
  role?: string;
  goal?: string;
  industry?: string;
  // XState onboarding answers
  primaryRole?: string | string[];
  lifeIntent?: string;
  aiRelationship?: string | string[];
  useCase?: string | string[];
  // Tutorial workspace IDs (added during tier1 completion)
  bossWorkspaceMemberId?: number;
  bossAgentProfileId?: string;
  tutorialWorkspaceId?: number;
  tutorialNoteId?: number;
  // First note (noteId only, saved by backend)
  firstNote?: { noteId: number };
}

export interface OnboardingSession {
  id: string;
  user_id: string;
  version: number;
  context?: OnboardingContext;
  completed_at?: string;
  created_at: string;
}

export class OnboardingService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Get or create onboarding session
   */
  async getActiveSession(userId: string): Promise<OnboardingSession | null> {
    // Check if session already exists
    const { data: activeSession } = await this.supabase
      .from('onboarding_sessions')
      .select('*')
      .eq('user_id', userId)
      .in('state', ['tier1', 'tier2'])
      .maybeSingle();

    return activeSession || null;
  }
  /**
   * Complete tier 1 onboarding - saves all answers and marks onboarding as completed
   */
  async completeTier1Onboarding(
    userId: string,
    onboardingSessionId: string,
    answers: Partial<OnboardingContext>,
    userName?: string
  ): Promise<{
    success: boolean;
  }> {
    try {
      // Store all answers in onboarding_sessions.context and mark session as completed
      const { error: contextError } = await this.supabase
        .from('onboarding_sessions')
        .update({
          state: 'completed',
          completed_at: new Date().toISOString(),
          context: answers,
        })
        .eq('id', onboardingSessionId);

      if (contextError) {
        console.error(
          'Error updating onboarding session context:',
          contextError
        );
        return { success: false };
      }

      // Update user profile with name and onboarding status
      const profileUpdate: { onboarding_status: string; name?: string } = {
        onboarding_status: 'completed',
      };

      if (userName) {
        profileUpdate.name = userName;
      }

      const { error: profileError } = await this.supabase
        .from('user_profiles')
        .update(profileUpdate)
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating user profile:', profileError);
        return { success: false };
      }

      // Refresh session to get new JWT with updated onboarding_status
      try {
        const { error: refreshError } =
          await this.supabase.auth.refreshSession();
        if (refreshError) {
          console.warn(
            'Warning: Failed to refresh session after onboarding completion:',
            refreshError
          );
          // Don't fail the whole operation if refresh fails
        } else {
          console.log(
            '✅ Session refreshed - new JWT issued with updated onboarding_status'
          );
        }
      } catch (error) {
        console.warn(
          'Warning: Error refreshing session after onboarding completion:',
          error
        );
        // Don't fail the whole operation if refresh fails
      }

      return { success: true };
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return { success: false };
    }
  }

  /**
   * Complete tier 2 onboarding - marks tutorial as fully completed
   */
  async completeTier2Onboarding(userId: string): Promise<boolean> {
    try {
      // Get session
      const { data: session } = await this.supabase
        .from('onboarding_sessions')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!session) {
        console.error('No onboarding session found for user:', userId);
        return false;
      }

      // Mark session as completed
      const { error: sessionError } = await this.supabase
        .from('onboarding_sessions')
        .update({
          state: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', session.id);

      if (sessionError) {
        console.error('Error updating session:', sessionError);
        return false;
      }

      // Update user profile onboarding status
      const { error: profileError } = await this.supabase
        .from('user_profiles')
        .update({ onboarding_status: 'completed' })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating user profile:', profileError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error completing tier 2 onboarding:', error);
      return false;
    }
  }

  /**
   * Restart onboarding (for testing)
   * Cancels all existing sessions and creates a new one
   */
  async startOnboarding(): Promise<boolean> {
    try {
      // Get session from local storage (no API call)
      const {
        data: { session },
      } = await this.supabase.auth.getSession();

      if (!session?.user) {
        console.error('No authenticated user found');
        return false;
      }

      const userId = session.user.id;

      // Cancel all existing onboarding sessions
      await this.supabase
        .from('onboarding_sessions')
        .update({ state: 'canceled' })
        .eq('user_id', userId)
        .neq('state', 'canceled'); // Only update non-canceled sessions

      // Create new onboarding session with tier1 state
      const { data: newSession, error: createError } = await this.supabase
        .from('onboarding_sessions')
        .insert({
          user_id: userId,
          version: 1,
          state: 'tier1',
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating new onboarding session:', createError);
        return false;
      }

      // Reset user profile status to tier1_in_progress
      await this.supabase
        .from('user_profiles')
        .update({ onboarding_status: 'tier1_in_progress' }) // This is a typo, it should be 'tier1_in_progress'
        .eq('id', userId);

      // Clear ALL persisted onboarding state (localStorage cache)
      useOnboardingStore.getState().reset();

      // Set new session data
      useOnboardingStore.setState({
        userId,
        onboardingSessionId: newSession.id,
      });

      return true;
    } catch (error) {
      console.error('Error restarting onboarding:', error);
      return false;
    }
  }
}
