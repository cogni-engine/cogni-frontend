import type { Member } from '../types/members';

/**
 * Get initials from member name or email
 */
export function getMemberInitials(member: Member): string {
  if (member.name) {
    return member.name.charAt(0).toUpperCase();
  }
  if (member.email) {
    return member.email.charAt(0).toUpperCase();
  }
  return '?';
}

/**
 * Get display name for member
 */
export function getMemberDisplayName(member: Member): string {
  return member.name || member.email || 'Unknown';
}

/**
 * Check if member is owner
 */
export function isMemberOwner(roleName: string): boolean {
  return roleName?.toLowerCase() === 'owner';
}

/**
 * Capitalize role name
 */
export function formatRoleName(roleName: string): string {
  return roleName.charAt(0).toUpperCase() + roleName.slice(1);
}
