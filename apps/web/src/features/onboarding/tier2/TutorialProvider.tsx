'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  use,
} from 'react';
import { useMachine } from '@xstate/react';
import { usePathname } from 'next/navigation';
import { useTutorialStatus } from '../hooks/useTutorialStatus';
import { tutorialMachine } from './tutorialService';
import { createClient } from '@/lib/supabase/browserClient';
import { OnboardingService } from '../services/onboardingService';
import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
} from '@/lib/api/workspaceMessagesApi';

interface TutorialContextType {
  isActive: boolean;
  isLoading: boolean;
  // XState machine state
  state: ReturnType<typeof useMachine<typeof tutorialMachine>>[0];
  send: ReturnType<typeof useMachine<typeof tutorialMachine>>[1];
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

// Function that loads onboarding context and returns a promise
async function loadOnboardingContext() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const onboardingService = new OnboardingService(supabase);
    const session = await onboardingService.getActiveSession(user.id);

    if (session) {
      // Find the tutorial workspace linked to this session
      const { data: workspace } = await supabase
        .from('workspace')
        .select('id')
        .eq('onboarding_session_id', session.id)
        .maybeSingle();

      return {
        onboardingSessionId: session.id,
        tutorialWorkspaceId: workspace?.id,
        onboardingContext: session.context || {},
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to load onboarding context:', error);
    return null;
  }
}

// Singleton - only load once per app lifecycle (client-side only)
type ContextResult = Awaited<ReturnType<typeof loadOnboardingContext>>;
let contextPromise: Promise<ContextResult> | null = null;

function getContextPromise() {
  if (typeof window === 'undefined') {
    // On server, return a resolved promise with null
    return Promise.resolve(null);
  }

  if (!contextPromise) {
    contextPromise = loadOnboardingContext();
  }
  return contextPromise;
}

export function TutorialProvider({ children }: { children: ReactNode }) {
  // Use singleton promise to ensure it's only created once
  const initialInput = use(getContextPromise());

  const { isActive, isLoading } = useTutorialStatus();
  const [state, send] = useMachine(tutorialMachine, {
    input: initialInput || undefined,
  });
  const pathname = usePathname();

  // Send boss greeting message when entering bossGreeting state
  useEffect(() => {
    const sendBossGreeting = async () => {
      // Only run if we're in bossGreeting state, have a tutorial workspace, and tutorial is active
      if (
        !state.matches('bossGreeting') ||
        !state.context.tutorialWorkspaceId ||
        !isActive ||
        isLoading
      ) {
        return;
      }

      try {
        const supabase = createClient();
        const workspaceId = state.context.tutorialWorkspaceId;

        // Get all workspace members first for debugging
        const { data: allMembers, error: membersError } = await supabase
          .from('workspace_member')
          .select(
            `
            id,
            user_id,
            agent_id,
            agent_profiles!agent_id(id, name)
          `
          )
          .eq('workspace_id', workspaceId);

        if (membersError) {
          console.error('Error fetching workspace members:', membersError);
          return;
        }

        if (!allMembers || allMembers.length === 0) {
          console.error(
            'No workspace members found for workspace',
            workspaceId
          );
          return;
        }

        // Filter to only agent members
        const agentMembers = allMembers.filter(m => m.agent_id !== null);

        // Find the boss member (agent with name 'boss')
        const bossMember = agentMembers.find(member => {
          const profile = member.agent_profiles as
            | { name: string }
            | { name: string }[]
            | null;
          if (Array.isArray(profile)) {
            return profile[0]?.name === 'boss';
          }
          return profile && profile.name === 'boss';
        });

        if (!bossMember) {
          console.error('Boss workspace member not found in workspace members');
          return;
        }

        const bossWorkspaceMemberId = bossMember.id;

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

          await sendWorkspaceMessage(
            workspaceId,
            bossWorkspaceMemberId,
            greetingText
          );
        }
      } catch (error) {
        console.error('Failed to send boss greeting:', error);
      }
    };

    sendBossGreeting();
  }, [state, isActive, isLoading]);

  // Detect when user clicks on the tutorial note
  useEffect(() => {
    if (
      !state.matches('redirectToNotes') ||
      !state.context.tutorialNoteId ||
      !isActive
    ) {
      return;
    }

    // Check if URL includes the tutorial note ID (user opened it)
    const noteIdInUrl = pathname?.includes(
      `/notes/${state.context.tutorialNoteId}`
    );

    if (noteIdInUrl) {
      send({ type: 'NEXT' });
    }
  }, [state, pathname, isActive, send]);

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        isLoading,
        state,
        send,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
