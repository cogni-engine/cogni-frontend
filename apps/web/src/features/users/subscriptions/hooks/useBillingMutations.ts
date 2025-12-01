import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createPortalSession,
  upgradeToBusiness,
  updateSeats,
  switchToTeamBilling,
} from '../api/billingApi';
import { subscriptionKeys } from './useSubscriptionPlan';
import { organizationKeys } from './useOrganizations';

/**
 * Mutation hook for creating Stripe Customer Portal session
 */
export function useCustomerPortal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      returnUrl,
    }: {
      organizationId: number;
      returnUrl: string;
    }) => createPortalSession(organizationId, returnUrl),
    onSuccess: url => {
      // Redirect to Stripe portal
      window.location.href = url;
      // Invalidate queries when user returns (handled by page visibility hook)
    },
  });
}

/**
 * Mutation hook for upgrading Pro to Business plan
 */
export function useUpgradeToBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      seatCount,
    }: {
      organizationId: number;
      seatCount: number;
    }) => upgradeToBusiness(organizationId, seatCount),
    onSuccess: () => {
      // Invalidate subscription and organization queries
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      // Wait for webhook to process, then reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });
}

/**
 * Mutation hook for updating seat count
 */
export function useUpdateSeats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      seatCount,
    }: {
      organizationId: number;
      seatCount: number;
    }) => updateSeats(organizationId, seatCount),
    onSuccess: () => {
      // Invalidate organization queries
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      // Wait for webhook to process, then reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });
}

/**
 * Mutation hook for switching to team billing
 * Returns the client secret for Stripe checkout
 */
export function useSwitchToTeamBilling() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userEmail: string) => switchToTeamBilling(userEmail),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}
