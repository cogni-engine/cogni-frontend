import { headers } from 'next/headers';

/**
 * Get organizations from request headers (server-side)
 */
export async function getOrgsFromHeaders(): Promise<unknown[]> {
  try {
    const headersList = await headers();
    const orgsHeader = headersList.get('x-user-orgs');

    if (!orgsHeader) return [];

    return JSON.parse(orgsHeader) as unknown[];
  } catch (error) {
    console.error('Error getting orgs from headers:', error);
    return [];
  }
}

/**
 * Get subscription plan from request headers (server-side)
 */
export async function getSubscriptionPlanFromHeaders(): Promise<string | null> {
  try {
    const headersList = await headers();
    return headersList.get('x-user-subscription-plan');
  } catch (error) {
    console.error('Error getting subscription plan from headers:', error);
    return null;
  }
}

/**
 * Get both orgs and subscription plan from request headers (server-side)
 */
export async function getUserDataFromHeaders(): Promise<{
  orgs: unknown[];
  subscriptionPlan: string | null;
}> {
  try {
    const headersList = await headers();
    const orgsHeader = headersList.get('x-user-orgs');
    const subscriptionPlanHeader = headersList.get('x-user-subscription-plan');

    return {
      orgs: orgsHeader ? (JSON.parse(orgsHeader) as unknown[]) : [],
      subscriptionPlan: subscriptionPlanHeader,
    };
  } catch (error) {
    console.error('Error getting user data from headers:', error);
    return { orgs: [], subscriptionPlan: null };
  }
}
