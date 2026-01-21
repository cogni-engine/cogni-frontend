/**
 * Boss Message Service
 * Handles sending messages as the boss agent during tier 2 onboarding
 */

import { getUserProfile } from '@/lib/api/userProfilesApi';
import { createClient } from '@/lib/supabase/browserClient';

/**
 * Get user's name from their profile
 */
export async function getUserProfileName(userId: string): Promise<string> {
  try {
    console.log('[BossMessageService] Fetching user profile for:', userId);
    const profile = await getUserProfile(userId);
    console.log('[BossMessageService] User profile retrieved:', profile);
    const userName = profile?.name || 'there';
    console.log('[BossMessageService] User name:', userName);
    return userName;
  } catch (error) {
    console.error('[BossMessageService] Error fetching user profile:', error);
    return 'there';
  }
}

/**
 * Generate personalized boss greeting message
 */
export function generateBossGreeting(userName: string): string {
  const greeting = `Hi ${userName}! 👋 Welcome to your tutorial workspace. I'm here to help you get started.

What's something you'd like to get done or work on today? It could be a task, a project, or anything you want to accomplish.`;
  console.log('[BossMessageService] Generated greeting:', greeting);
  return greeting;
}

/**
 * Send a message as the boss agent
 */
export async function sendBossMessage(
  workspaceId: number,
  bossWorkspaceMemberId: number,
  text: string
): Promise<void> {
  try {
    console.log('[BossMessageService] Sending boss message:', {
      workspaceId,
      bossWorkspaceMemberId,
      textLength: text.length,
      textPreview: text.substring(0, 50),
    });

    const supabase = createClient();
    const { data, error } = await supabase
      .from('workspace_messages')
      .insert({
        workspace_id: workspaceId,
        workspace_member_id: bossWorkspaceMemberId,
        text,
      })
      .select();

    if (error) {
      console.error('[BossMessageService] Error inserting message:', error);
      throw error;
    }

    console.log('[BossMessageService] Message sent successfully:', data);
  } catch (error) {
    console.error('[BossMessageService] Error sending boss message:', error);
    throw error;
  }
}

/**
 * Send personalized boss greeting to user
 */
export async function sendBossGreeting(
  workspaceId: number,
  bossWorkspaceMemberId: number,
  userId: string
): Promise<void> {
  console.log('[BossMessageService] sendBossGreeting called:', {
    workspaceId,
    bossWorkspaceMemberId,
    userId,
  });

  const userName = await getUserProfileName(userId);
  const greeting = generateBossGreeting(userName);
  await sendBossMessage(workspaceId, bossWorkspaceMemberId, greeting);

  console.log('[BossMessageService] Boss greeting completed successfully');
}
