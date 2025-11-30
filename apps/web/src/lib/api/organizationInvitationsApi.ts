import { createClient } from '@/lib/supabase/browserClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface OrganizationInvitation {
  id: string;
  organization_id: number;
  organization_name: string;
  inviter_id: string;
  inviter_name: string | null;
  invitee_email: string;
  invitee_id: string | null;
  token: string;
  role_id: number | null;
  role_name: string | null;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
  invitation_link: string;
}

export interface OrganizationInvitationsListResponse {
  organization_id: number;
  total_pending: number;
  invitations: OrganizationInvitation[];
}

/**
 * Get auth token for API requests
 */
async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token || null;
}

/**
 * Create an organization invitation
 */
export async function createOrganizationInvitation(
  organizationId: number,
  inviteeEmail: string,
  roleId?: number
): Promise<OrganizationInvitation> {
  const token = await getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/api/organizations/invitations/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      organizationId,
      inviteeEmail,
      roleId,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create invitation' }));
    throw new Error(error.detail || 'Failed to create invitation');
  }

  return response.json();
}

/**
 * Accept an organization invitation
 */
export async function acceptOrganizationInvitation(token: string): Promise<{
  success: boolean;
  organization_id: number;
  organization_name: string;
  message: string;
}> {
  const authToken = await getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/api/organizations/invitations/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to accept invitation' }));
    throw new Error(error.detail || 'Failed to accept invitation');
  }

  return response.json();
}

/**
 * Get all invitations for an organization
 */
export async function getOrganizationInvitations(
  organizationId: number
): Promise<OrganizationInvitation[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/organizations/${organizationId}/invitations`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch invitations');
  }

  const data: OrganizationInvitationsListResponse = await response.json();
  return data.invitations;
}

/**
 * Cancel an organization invitation
 */
export async function cancelOrganizationInvitation(invitationId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/organizations/invitations/${invitationId}`,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to cancel invitation' }));
    throw new Error(error.detail || 'Failed to cancel invitation');
  }
}

/**
 * Generate an organization invitation link
 */
export function generateOrganizationInvitationLink(token: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/invite/org/${token}`;
}


