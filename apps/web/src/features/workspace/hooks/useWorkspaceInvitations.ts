import { useState, useEffect, useCallback } from 'react';
import {
  createInvitation,
  createInviteLink,
  getWorkspaceInvitations,
  getWorkspaceInviteLinks,
  cancelInvitation,
  disableInviteLink,
  generateInvitationLink,
} from '@/features/workspace/api/invitationsApi';
import type {
  WorkspaceInvitation,
  WorkspaceInviteLink,
} from '@/types/workspace';

interface UseWorkspaceInvitationsReturn {
  invitations: WorkspaceInvitation[];
  inviteLinks: WorkspaceInviteLink[];
  loading: boolean;
  error: string | null;
  createEmailInvitation: (email: string, userId?: string) => Promise<string>;
  createAnonymousInviteLink: () => Promise<string>;
  cancelInvitationById: (invitationId: string) => Promise<void>;
  disableInviteLinkById: (inviteLinkId: string) => Promise<void>;
  refreshInvitations: () => Promise<void>;
}

export function useWorkspaceInvitations(
  workspaceId: number
): UseWorkspaceInvitationsReturn {
  const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
  const [inviteLinks, setInviteLinks] = useState<WorkspaceInviteLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvitations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [invitationsData, inviteLinksData] = await Promise.all([
        getWorkspaceInvitations(workspaceId),
        getWorkspaceInviteLinks(workspaceId),
      ]);
      setInvitations(invitationsData);
      setInviteLinks(inviteLinksData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch invitations'
      );
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createEmailInvitation = useCallback(
    async (email: string, userId?: string): Promise<string> => {
      try {
        setError(null);
        const invitation = await createInvitation(workspaceId, email, userId);

        // Refresh the invitations list
        await fetchInvitations();

        return generateInvitationLink(invitation.token);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create invitation';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [workspaceId, fetchInvitations]
  );

  const createAnonymousInviteLink = useCallback(async (): Promise<string> => {
    try {
      setError(null);
      const inviteLink = await createInviteLink(workspaceId);

      // Refresh the invitations list
      await fetchInvitations();

      return generateInvitationLink(inviteLink.token);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create invite link';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [workspaceId, fetchInvitations]);

  const cancelInvitationById = useCallback(
    async (invitationId: string): Promise<void> => {
      try {
        setError(null);
        await cancelInvitation(invitationId);

        // Refresh the invitations list
        await fetchInvitations();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to cancel invitation';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [fetchInvitations]
  );

  const disableInviteLinkById = useCallback(
    async (inviteLinkId: string): Promise<void> => {
      try {
        setError(null);
        await disableInviteLink(inviteLinkId);

        // Refresh the invitations list
        await fetchInvitations();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to disable invite link';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [fetchInvitations]
  );

  const refreshInvitations = useCallback(async () => {
    await fetchInvitations();
  }, [fetchInvitations]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return {
    invitations,
    inviteLinks,
    loading,
    error,
    createEmailInvitation,
    createAnonymousInviteLink,
    cancelInvitationById,
    disableInviteLinkById,
    refreshInvitations,
  };
}
