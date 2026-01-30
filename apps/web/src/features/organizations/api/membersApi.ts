import type { Member } from '../types/members';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface GetMembersResponse {
  members: Member[];
}

/**
 * Get all members of an organization
 */
export async function getOrganizationMembers(
  organizationId: number
): Promise<Member[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/organizations/${organizationId}/members`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch members');
  }

  const data: GetMembersResponse = await response.json();
  return data.members || [];
}
