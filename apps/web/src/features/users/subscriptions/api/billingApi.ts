import { createClient } from '@/lib/supabase/browserClient';
import { getSubscriptionPlanFromJWT } from '@/lib/jwtUtils';
import {
  getUserOrganizationsData,
  type UserOrganizationData,
} from '@/lib/api/organizationApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Refresh Supabase session to get latest JWT with updated claims
 */
export async function refreshSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    console.warn('⚠️ Failed to refresh session:', error.message);
    throw error;
  }

  return data;
}

/**
 * Get subscription plan from JWT
 */
export async function getSubscriptionPlan(): Promise<string | null> {
  return getSubscriptionPlanFromJWT();
}

/**
 * Get user organizations
 */
export async function getOrganizations(
  userId: string
): Promise<UserOrganizationData[]> {
  return getUserOrganizationsData(userId);
}

/**
 * Get current organization with active subscription
 */
export async function getCurrentOrganization(
  userId: string
): Promise<UserOrganizationData | null> {
  const orgs = await getOrganizations(userId);
  const orgWithSubscription = orgs.find(
    org => org.organization.stripe_subscription_id
  );
  return orgWithSubscription || orgs[0] || null;
}

/**
 * Get all organizations where user is owner/admin (regardless of subscription status)
 */
export async function getManagedOrganizations(
  userId: string
): Promise<UserOrganizationData[]> {
  const orgs = await getOrganizations(userId);
  // Filter for organizations where user is owner or admin
  return orgs.filter(org => org.role === 'owner' || org.role === 'admin');
}

/**
 * Create Stripe Customer Portal session
 */
export async function createPortalSession(
  organizationId: number,
  returnUrl: string
): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  const response = await fetch(`${API_BASE_URL}/api/billing/portal-session`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organizationId,
      returnUrl,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to create portal session');
  }

  if (!data.url) {
    throw new Error('No portal URL returned');
  }

  return data.url;
}

/**
 * Upgrade Pro plan to Business plan
 */
export async function upgradeToBusiness(
  organizationId: number,
  seatCount: number
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/billing/upgrade-to-business`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizationId,
        seatCount,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to upgrade to Business plan');
  }
}

/**
 * Update seat count for Business plan
 */
export async function updateSeats(
  organizationId: number,
  seatCount: number
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  const response = await fetch(`${API_BASE_URL}/api/billing/update-seats`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organizationId,
      seatCount,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update seats');
  }
}

/**
 * Switch to team billing (create new Business organization)
 */
export async function switchToTeamBilling(userEmail: string): Promise<string> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const response = await fetch(`${API_BASE_URL}/api/billing/purchase`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId: 'business',
      createOrganization: true,
      organizationName: `${userEmail}'s Team`,
      seatCount: 1,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to switch to team billing');
  }

  if (!data.client_secret) {
    throw new Error('No client secret returned');
  }

  return data.client_secret;
}
