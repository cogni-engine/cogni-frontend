import { useQuery } from '@tanstack/react-query';
import { getSubscriptionPlan, refreshSession } from '../api/billingApi';

export const subscriptionKeys = {
  all: ['subscription'] as const,
  plan: () => [...subscriptionKeys.all, 'plan'] as const,
};

/**
 * Query hook for subscription plan
 * Automatically refreshes session before fetching plan
 */
export function useSubscriptionPlan() {
  return useQuery({
    queryKey: subscriptionKeys.plan(),
    queryFn: async () => {
      // Refresh session first to get latest JWT claims
      try {
        await refreshSession();
      } catch (error) {
        // Continue even if refresh fails - use existing JWT
        console.warn('Session refresh failed, using existing JWT');
      }
      return getSubscriptionPlan();
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  });
}
