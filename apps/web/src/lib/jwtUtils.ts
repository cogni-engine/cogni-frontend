'use client';

import { getSession } from '@cogni/api';

/**
 * Decode JWT payload without verification (for reading custom claims)
 */
function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode base64url (JWT uses base64url, not standard base64)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const decoded = atob(padded);

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Get organizations from JWT (client-side)
 */
export async function getOrgsFromJWT(): Promise<unknown[]> {
  try {
    const session = await getSession();
    if (!session?.access_token) return [];

    const payload = decodeJWT(session.access_token);
    return (payload?.orgs as unknown[]) || [];
  } catch (error) {
    console.error('Error getting orgs from JWT:', error);
    return [];
  }
}

/**
 * Get subscription plan from JWT (client-side)
 */
export async function getSubscriptionPlanFromJWT(): Promise<string | null> {
  try {
    const session = await getSession();
    if (!session?.access_token) return null;

    const payload = decodeJWT(session.access_token);
    return (payload?.subscription_plan as string) || null;
  } catch (error) {
    console.error('Error getting subscription plan from JWT:', error);
    return null;
  }
}

/**
 * Get both orgs and subscription plan from JWT (client-side)
 */
export async function getUserDataFromJWT(): Promise<{
  orgs: unknown[];
  subscriptionPlan: string | null;
}> {
  try {
    const session = await getSession();
    if (!session?.access_token) {
      return { orgs: [], subscriptionPlan: null };
    }

    const payload = decodeJWT(session.access_token);
    return {
      orgs: (payload?.orgs as unknown[]) || [],
      subscriptionPlan: (payload?.subscription_plan as string) || null,
    };
  } catch (error) {
    console.error('Error getting user data from JWT:', error);
    return { orgs: [], subscriptionPlan: null };
  }
}
