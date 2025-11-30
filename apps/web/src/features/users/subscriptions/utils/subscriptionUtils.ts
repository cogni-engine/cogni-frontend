import type { Organization } from '@/lib/api/organizationApi';

/**
 * Derive subscription plan from organization data
 *
 * Logic:
 * - No stripe_subscription_id → 'free'
 * - Has stripe_subscription_id + seat_count > 1 → 'business'
 * - Has stripe_subscription_id + seat_count === 1 → 'pro'
 */
export function getOrganizationSubscriptionPlan(
  org: Organization | null | undefined
): 'free' | 'pro' | 'business' | null {
  if (!org) return null;

  // No subscription = free
  if (!org.stripe_subscription_id) {
    return 'free';
  }

  // Has subscription + multiple seats = business
  if (org.seat_count > 1) {
    return 'business';
  }

  // Has subscription + single seat = pro
  return 'pro';
}
