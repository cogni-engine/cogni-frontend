import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { subscriptionKeys } from './useSubscriptionPlan';
import { organizationKeys } from './useOrganizations';

/**
 * Hook to refetch queries when page becomes visible
 * Useful for returning from Stripe Customer Portal
 */
export function usePageVisibility() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page became visible, refetching subscription data...');
        // Refetch subscription and organization queries
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
        queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [queryClient]);
}
