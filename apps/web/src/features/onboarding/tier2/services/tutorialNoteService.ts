/**
 * Tutorial Note Service
 * Returns the noteId of the first note that was already created by the backend in Tier1
 */

import { OnboardingContext } from '../../services/onboardingService';

export interface TutorialNoteInput {
  workspaceId: number;
  sessionId: string;
  onboardingContext: OnboardingContext;
}

export interface TutorialNoteOutput {
  noteId: number;
}

/**
 * Get tutorial note ID from onboarding context
 * Note: The note is already created by the backend during Tier1 completion
 */
export async function createTutorialNote(
  input: TutorialNoteInput
): Promise<TutorialNoteOutput> {
  const { onboardingContext } = input;

  // Backend (Tier1) already created the note
  // We just need to return the noteId from context
  const noteId = onboardingContext.firstNote?.noteId;

  if (!noteId) {
    throw new Error(
      'First note not found. It should have been created in Tier1.'
    );
  }

  return { noteId };
}
