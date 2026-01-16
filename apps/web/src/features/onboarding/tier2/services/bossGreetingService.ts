/**
 * Boss Greeting Service
 * Handles sending the initial greeting message from the boss agent
 */

import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
} from '@/lib/api/workspaceMessagesApi';

export interface BossGreetingInput {
  workspaceId: number;
  bossWorkspaceMemberId: number;
}

/**
 * Send boss greeting message if not already sent
 */
export async function sendBossGreeting(
  input: BossGreetingInput
): Promise<void> {
  const { workspaceId, bossWorkspaceMemberId } = input;

  // Validate inputs
  if (!bossWorkspaceMemberId || !workspaceId) {
    console.log('Skipping boss greeting - invalid input');
    return;
  }

  // Check if boss has already sent any messages
  const existingMessages = await getWorkspaceMessages(workspaceId, 50);
  const bossMessages = existingMessages.filter(
    msg => msg.workspace_member_id === bossWorkspaceMemberId
  );

  // If boss hasn't sent any messages yet, send greeting
  if (bossMessages.length === 0) {
    const greetingText = `Welcome to your tutorial workspace! 👋

I'm your AI assistant, and I'm here to help you get started with Cogno. This is a special workspace created just for you to learn the ropes.

Feel free to ask me anything or explore the features. I'll be guiding you through the basics!`;

    await sendWorkspaceMessage(workspaceId, bossWorkspaceMemberId, greetingText);

    console.log('Boss greeting sent successfully');
  } else {
    console.log('Boss greeting already sent, skipping');
  }
}