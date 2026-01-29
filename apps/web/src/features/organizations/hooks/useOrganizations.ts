import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getOrganizations,
  getCurrentOrganization,
  getManagedOrganizations,
} from '../api/billingApi';
import { createClient } from '@/lib/supabase/browserClient';

export const organizationKeys = {
  all: ['organizations'] as const,
  lists: () => [...organizationKeys.all, 'list'] as const,
  list: (userId: string) => [...organizationKeys.lists(), userId] as const,
  current: (userId: string) =>
    [...organizationKeys.all, 'current', userId] as const,
  managed: (userId: string) =>
    [...organizationKeys.all, 'managed', userId] as const,
};

/**
 * Query hook for user organizations
 */
export function useOrganizations(userId: string | undefined) {
  return useQuery({
    queryKey: organizationKeys.list(userId || ''),
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getOrganizations(userId);
    },
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Query hook for current organization with active subscription
 */
export function useCurrentOrganization(userId: string | undefined) {
  return useQuery({
    queryKey: organizationKeys.current(userId || ''),
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getCurrentOrganization(userId);
    },
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Query hook for all organizations where user is owner/admin (regardless of subscription status)
 */
export function useManagedOrganizationsWithSubscriptions(
  userId: string | undefined
) {
  return useQuery({
    queryKey: organizationKeys.managed(userId || ''),
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getManagedOrganizations(userId);
    },
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get current user ID
 * Note: This is a simple hook that doesn't use React Query
 * since user ID doesn't change frequently and we can get it synchronously
 */
export function useUserId() {
  const supabase = createClient();
  const [userId, setUserId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserId(user?.id || null);
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setUserId(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, [supabase]);

  return { data: userId, isLoading };
}
