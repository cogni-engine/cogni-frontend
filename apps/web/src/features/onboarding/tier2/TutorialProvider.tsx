'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useMachine } from '@xstate/react';
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

export function TutorialProvider({ children }: { children: ReactNode }) {
  const { isActive, isLoading } = useTutorialStatus();
  const [state, send] = useMachine(tutorialMachine);

  // Load onboarding session context on mount
  useEffect(() => {
    const loadOnboardingContext = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const onboardingService = new OnboardingService(supabase);
        const session = await onboardingService.getOrCreateSession(user.id);

        if (session) {
          // Find the tutorial workspace linked to this session
          const { data: workspace } = await supabase
            .from('workspace')
            .select('id')
            .eq('onboarding_session_id', session.id)
            .maybeSingle();

          send({
            type: 'LOAD_CONTEXT',
            sessionId: session.id,
            workspaceId: workspace?.id,
            context: session.context || {},
          });
        }
      } catch (error) {
        console.error('Failed to load onboarding context:', error);
      }
    };

    loadOnboardingContext();
  }, [send]);

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

        console.log('All workspace members:', allMembers);

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

        console.log('Boss member found:', bossMember);

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
  }, [state]);

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
