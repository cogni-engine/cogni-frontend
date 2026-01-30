import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrganizationInvitations,
  createOrganizationInvitation,
  cancelOrganizationInvitation,
  type OrganizationInvitation,
} from '@/lib/api/organizationInvitationsApi';
import { memberKeys } from './useOrganizationMembers';

export const invitationKeys = {
  all: ['organization-invitations'] as const,
  lists: () => [...invitationKeys.all, 'list'] as const,
  list: (organizationId: number) =>
    [...invitationKeys.lists(), organizationId] as const,
};

/**
 * Hook to fetch organization invitations
 */
export function useOrganizationInvitations(
  organizationId: number | null | undefined
) {
  return useQuery({
    queryKey: invitationKeys.list(organizationId || 0),
    queryFn: () => {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }
      return getOrganizationInvitations(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to create an organization invitation
 */
export function useCreateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      inviteeEmail,
      roleId,
    }: {
      organizationId: number;
      inviteeEmail: string;
      roleId: number;
    }) => createOrganizationInvitation(organizationId, inviteeEmail, roleId),
    onSuccess: (_, variables) => {
      // Invalidate invitations list
      queryClient.invalidateQueries({
        queryKey: invitationKeys.list(variables.organizationId),
      });
      // Invalidate members list in case we need to update seat count
      queryClient.invalidateQueries({
        queryKey: memberKeys.list(variables.organizationId),
      });
      // Invalidate organization data to update seat count
      queryClient.invalidateQueries({
        queryKey: ['organizations'],
      });
    },
  });
}

/**
 * Hook to cancel an organization invitation
 */
export function useCancelInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invitationId,
      organizationId,
    }: {
      invitationId: string;
      organizationId: number;
    }) => cancelOrganizationInvitation(invitationId),
    onSuccess: (_, variables) => {
      // Invalidate invitations list
      queryClient.invalidateQueries({
        queryKey: invitationKeys.list(variables.organizationId),
      });
      // Invalidate organization data to update seat count
      queryClient.invalidateQueries({
        queryKey: ['organizations'],
      });
    },
  });
}
