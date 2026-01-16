/**
 * Tutorial Note Service
 * Handles creating the tutorial note and updating the onboarding session
 */

import { createClient } from '@/lib/supabase/browserClient';
import { createNote } from '@/lib/api/notesApi';

export interface TutorialNoteInput {
  workspaceId: number;
  sessionId: string;
  onboardingContext: Record<string, unknown>;
}

export interface TutorialNoteOutput {
  noteId: number;
}

/**
 * Create tutorial note and update onboarding session context
 */
export async function createTutorialNote(
  input: TutorialNoteInput
): Promise<TutorialNoteOutput> {
  const { workspaceId, sessionId, onboardingContext } = input;

  // Create the tutorial note
  const note = await createNote(
    workspaceId,
    'My First Note',
    'This is your first note! You can write anything here - ideas, tasks, thoughts, or plans. Try editing this text.',
    null // No folder
  );

  console.log('Created tutorial note:', note.id);

  // Update onboarding session context with note ID
  const supabase = createClient();
  await supabase
    .from('onboarding_sessions')
    .update({
      context: {
        ...onboardingContext,
        tutorialNoteId: note.id,
      },
    })
    .eq('id', sessionId);

  return {
    noteId: note.id,
  };
}