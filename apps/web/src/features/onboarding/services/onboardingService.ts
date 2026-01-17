/**
 * Onboarding Service using Supabase Client
 * Direct database access - no backend API needed
 */

import { useOnboardingStore } from '@/store/onboardingStore';
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
   * Complete tier 1 onboarding - saves all answers and starts tier 2 onboarding
   */
  async completeTier1Onboarding(
    userId: string,
    onboardingSessionId: string,
    answers: Partial<OnboardingContext>
  ): Promise<{
    success: boolean;
    workspaceId?: number;
    bossWorkspaceMemberId?: number;
    bossAgentProfileId?: string;
  }> {
    try {
      // Merge answers with existing context
      const mergedContext = {
        ...answers,
      };

      // Create tutorial workspace using RPC (includes member creation and icon generation)
      const { data: rpcData, error: rpcError } = await this.supabase.rpc(
        'create_workspace_with_member',
        {
          p_title: 'Tutorial Workspace',
        }
      );

      if (rpcError || !rpcData || rpcData.length === 0) {
        console.error('Error creating tutorial workspace:', rpcError);
        return { success: false };
      }

      const workspaceId = rpcData[0].workspace_id;

      // Update workspace with onboarding_session_id ** this can be moved to the rpc if the rpc is updated
      const { error: updateError } = await this.supabase
        .from('workspace')
        .update({ onboarding_session_id: onboardingSessionId })
        .eq('id', workspaceId);

      if (updateError) {
        console.error('Error updating workspace with session ID:', updateError);
        return { success: false };
      }

      // Create the "boss" agent profile
      const { data: newBoss, error: bossError } = await this.supabase
        .from('agent_profiles')
        .insert({
          name: 'boss',
          avatar_url:
            'https://gtcwgwlgcphwhapmnerq.supabase.co/storage/v1/object/public/avatars/public/DN2QOL01.svg', // Mock URL for now
        })
        .select('id')
        .single();

      if (bossError || !newBoss) {
        console.error('Error creating boss agent:', bossError);
        return { success: false };
      }

      const bossAgentId = newBoss.id;

      // Add boss agent as a member of the tutorial workspace
      const { data: bossMember, error: memberError } = await this.supabase
        .from('workspace_member')
        .insert({
          workspace_id: workspaceId,
          agent_id: bossAgentId,
          user_id: null,
          role: 'member',
        })
        .select('id')
        .single();

      if (memberError || !bossMember) {
        console.error('Error adding boss agent to workspace:', memberError);
        return { success: false };
      }

      const bossWorkspaceMemberId = bossMember.id;

      // Add boss IDs to the merged context
      const finalContext = {
        ...mergedContext,
        bossWorkspaceMemberId,
        bossAgentProfileId: bossAgentId,
        tutorialWorkspaceId: workspaceId,
      };

      // Store all answers and boss IDs in onboarding_sessions.context and mark session as tier2
      const { error: contextError } = await this.supabase
        .from('onboarding_sessions')
        .update({
          state: 'tier2',
          context: finalContext,
        })
        .eq('id', onboardingSessionId);

      const { error: profileError } = await this.supabase
        .from('user_profiles')
        .update({ onboarding_status: 'tier2_in_progress' })
        .eq('id', userId);

      if (contextError) {
        console.error(
          'Error updating onboarding session context:',
          contextError
        );
        return { success: false };
      } else if (profileError) {
        console.error('Error updating user profile:', profileError);
        return { success: false };
      }

      return {
        success: true,
        workspaceId,
        bossWorkspaceMemberId,
        bossAgentProfileId: bossAgentId,
      };
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

      // save to zustand store
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
