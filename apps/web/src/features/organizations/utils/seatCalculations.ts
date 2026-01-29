import type { SeatUsage } from '../types/members';

/**
 * Calculate seat usage for an organization
 */
export function calculateSeatUsage(
  activeMemberCount: number,
  pendingInvitationsCount: number,
  totalSeats: number
): SeatUsage {
  const usedSeats = activeMemberCount + pendingInvitationsCount;
  const availableSeats =
    totalSeats > 0 ? Math.max(0, totalSeats - usedSeats) : 0;

  return {
    activeMemberCount,
    pendingInvitationsCount,
    usedSeats,
    totalSeats,
    availableSeats,
  };
}

/**
 * Check if new members can be invited
 */
export function canInviteMembers(availableSeats: number): boolean {
  return availableSeats > 0;
}

/**
 * Format seat usage for display
 */
export function formatSeatUsage(seatUsage: SeatUsage): string {
  return `${seatUsage.usedSeats}/${seatUsage.totalSeats} seats used`;
}

/**
 * Get seat usage tooltip message
 */
export function getSeatUsageTooltip(seatUsage: SeatUsage): string {
  return `${seatUsage.activeMemberCount} members + ${seatUsage.pendingInvitationsCount} pending invitations`;
}
