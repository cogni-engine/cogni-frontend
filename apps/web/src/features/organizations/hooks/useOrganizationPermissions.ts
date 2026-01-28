import { useMemo } from 'react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
import type { OrganizationInvitation } from '@/lib/api/organizationInvitationsApi';
import type { OrganizationPermissions } from '../types/members';
import { calculateSeatUsage } from '../utils/seatCalculations';

/**
 * Hook to calculate organization permissions and seat availability
 */
export function useOrganizationPermissions(
  currentOrg: UserOrganizationData | null,
  invitations: OrganizationInvitation[] = []
): OrganizationPermissions {
  return useMemo(() => {
    if (!currentOrg) {
      return {
        isOwner: false,
        isAdmin: false,
        canInvite: false,
        availableSeats: 0,
        usedSeats: 0,
        pendingInvitationsCount: 0,
      };
    }

    const isOwner = currentOrg.role === 'owner';
    const isAdmin = currentOrg.role === 'admin' || isOwner;

    // Calculate seat usage
    const pendingInvitationsCount = invitations.filter(
      inv => inv.status === 'pending'
    ).length;

    const seatUsage = calculateSeatUsage(
      currentOrg.organization.active_member_count,
      pendingInvitationsCount,
      currentOrg.organization.seat_count
    );

    return {
      isOwner,
      isAdmin,
      canInvite: isAdmin && seatUsage.availableSeats > 0,
      availableSeats: seatUsage.availableSeats,
      usedSeats: seatUsage.usedSeats,
      pendingInvitationsCount,
    };
  }, [currentOrg, invitations]);
}
