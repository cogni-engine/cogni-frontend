'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@/features/users/subscriptions/api/billingApi';
import { useUserId } from '@/features/users/subscriptions/hooks/useOrganizations';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

type SubscriptionContextType = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  // Organizations data
  organizations: UserOrganizationData[];
  // Plan information
  planType: 'free' | 'pro' | 'business' | null;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const subscriptionKeys = {
  organizations: (userId: string | null) =>
    ['user-organizations', userId] as const,
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { data: userId, isLoading: isLoadingUserId } = useUserId();

  // Fetch all organizations for the user from backend
  const {
    data: organizations,
    isLoading: isLoadingOrganizations,
    isError: isOrganizationsError,
    error: organizationsError,
    refetch,
  } = useQuery({
    queryKey: subscriptionKeys.organizations(userId),
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getOrganizations(userId);
    },
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  });

  // Find the highest plan type across all user's organizations
  const getHighestPlanType = (
    orgs: UserOrganizationData[] | undefined
  ): 'free' | 'pro' | 'business' | null => {
    if (!orgs || orgs.length === 0) return null;

    const planHierarchy = { business: 3, pro: 2, free: 1 };

    const highestPlan = orgs.reduce<'free' | 'pro' | 'business' | null>(
      (highest, org) => {
        const currentPlan = org.organization.plan_type as
          | 'free'
          | 'pro'
          | 'business';
        if (!highest) return currentPlan;

        return planHierarchy[currentPlan] > planHierarchy[highest]
          ? currentPlan
          : highest;
      },
      null
    );

    return highestPlan;
  };

  const planType = getHighestPlanType(organizations);

  const isLoading = isLoadingUserId || isLoadingOrganizations;
  const isError = isOrganizationsError;
  const error = organizationsError as Error | null;

  const value: SubscriptionContextType = {
    isLoading,
    isError,
    error,
    refetch,
    // Organizations data
    organizations: organizations || [],
    // Plan information
    planType,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

/**
 * Hook to access subscription context with user organizations data
 *
 * @example
 * ```tsx
 * const {
 *   organizations,
 *   planType,
 *   isLoading,
 * } = useSubscription();
 *
 * // Access all user organizations
 * console.log(`User is member of ${organizations.length} organizations`);
 *
 * // Check highest plan across all organizations
 * if (planType === 'business') {
 *   // User has access to business features
 * }
 *
 * // Access individual organization details
 * organizations.forEach(org => {
 *   console.log(`Org: ${org.organization.name}`);
 *   console.log(`Role: ${org.role}`);
 *   console.log(`Plan: ${org.organization.plan_type}`);
 *   console.log(`Status: ${org.organization.status}`);
 * });
 * ```
 */
export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider'
    );
  }
  return context;
}
