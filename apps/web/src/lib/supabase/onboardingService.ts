/**
 * Onboarding Service using Supabase Client
 * Direct database access - no backend API needed
 */

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
  lifeIntent?: string;
  aiRelationship?: string;
  workTiming?: string;
  usageContext?: 'personal' | 'team';
  bottleneck?: string;
  immediateWin?: string;
  teamRole?: string;
  teamPain?: string;
  riskSignal?: string;
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
   * Get user's onboarding status
   */
  async getUserStatus(userId: string): Promise<OnboardingStatus> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('onboarding_status')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting onboarding status:', error);
      return 'not_started';
    }

    return (data?.onboarding_status as OnboardingStatus) || 'not_started';
  }

  /**
   * Get or create onboarding session
   */
  async getOrCreateSession(userId: string): Promise<OnboardingSession | null> {
    // Check if session already exists
    const { data: existingSession } = await this.supabase
      .from('onboarding_sessions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingSession) {
      return existingSession;
    }

    // Create new session
    const { data: newSession, error: createError } = await this.supabase
      .from('onboarding_sessions')
      .insert({
        user_id: userId,
        version: 1,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating onboarding session:', createError);
      return null;
    }

    // Update user profile status
    await this.supabase
      .from('user_profiles')
      .update({ onboarding_status: 'tier1_in_progress' })
      .eq('id', userId);

    return newSession;
  }

  /**
   * Update session context
   */
  async updateContext(
    userId: string,
    context: OnboardingContext
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from('onboarding_sessions')
      .update({ context })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating context:', error);
      return false;
    }

    return true;
  }

  /**
   * Save all onboarding answers at once
   * Used by XState onboarding flow
   */
  async saveAllAnswers(
    userId: string,
    answers: Partial<OnboardingContext>
  ): Promise<boolean> {
    try {
      // Get or create session
      const session = await this.getOrCreateSession(userId);
      if (!session) {
        throw new Error('Failed to get or create session');
      }

      // Merge new answers with existing context
      const { data: existingSession } = await this.supabase
        .from('onboarding_sessions')
        .select('context')
        .eq('user_id', userId)
        .single();

      const mergedContext = {
        ...(existingSession?.context || {}),
        ...answers,
      };

      // Update session with all answers
      const { error } = await this.supabase
        .from('onboarding_sessions')
        .update({ context: mergedContext })
        .eq('user_id', userId);

      if (error) {
        console.error('Error saving all answers:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveAllAnswers:', error);
      return false;
    }
  }

  /**
   * Complete onboarding - creates tutorial workspace and marks completed
   */
  async completeOnboarding(
    userId: string
  ): Promise<{ success: boolean; workspaceId?: number }> {
    try {
      // Get session
      const { data: session } = await this.supabase
        .from('onboarding_sessions')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!session) {
        return { success: false };
      }

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

      // Update workspace with onboarding_session_id
      const { error: updateError } = await this.supabase
        .from('workspace')
        .update({ onboarding_session_id: session.id })
        .eq('id', workspaceId);

      if (updateError) {
        console.error('Error updating workspace with session ID:', updateError);
        return { success: false };
      }

      // Mark session as completed
      await this.supabase
        .from('onboarding_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', session.id);

      // Update user profile status
      await this.supabase
        .from('user_profiles')
        .update({ onboarding_status: 'completed' })
        .eq('id', userId);

      return { success: true, workspaceId };
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return { success: false };
    }
  }

  /**
   * Restart onboarding (for testing)
   */
  async restartOnboarding(userId: string): Promise<boolean> {
    try {
      // Delete existing session
      await this.supabase
        .from('onboarding_sessions')
        .delete()
        .eq('user_id', userId);

      // Reset user profile status
      await this.supabase
        .from('user_profiles')
        .update({ onboarding_status: 'not_started' })
        .eq('id', userId);

      return true;
    } catch (error) {
      console.error('Error restarting onboarding:', error);
      return false;
    }
  }
}
