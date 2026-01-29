import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrganizationMembers } from '../api/membersApi';
import {
  deleteMember,
  updateMemberRole,
} from '@/lib/api/organizationInvitationsApi';
import type { Member } from '../types/members';

export const memberKeys = {
  all: ['organization-members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  list: (organizationId: number) =>
    [...memberKeys.lists(), organizationId] as const,
};

/**
 * Hook to fetch organization members
 */
export function useOrganizationMembers(
  organizationId: number | null | undefined
) {
  return useQuery({
    queryKey: memberKeys.list(organizationId || 0),
    queryFn: () => {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }
      return getOrganizationMembers(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to remove a member from an organization
 */
export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      memberId,
    }: {
      organizationId: number;
      memberId: number;
    }) => deleteMember(organizationId, memberId),
    onSuccess: (_, variables) => {
      // Invalidate members list
      queryClient.invalidateQueries({
        queryKey: memberKeys.list(variables.organizationId),
      });
      // Invalidate organization data to update member count
      queryClient.invalidateQueries({
        queryKey: ['organizations'],
      });
    },
  });
}

/**
 * Hook to update a member's role
 */
export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      memberId,
      roleId,
    }: {
      organizationId: number;
      memberId: number;
      roleId: number;
    }) => updateMemberRole(organizationId, memberId, roleId),
    onSuccess: (_, variables) => {
      // Invalidate members list to show updated roles
      queryClient.invalidateQueries({
        queryKey: memberKeys.list(variables.organizationId),
      });
    },
  });
}
