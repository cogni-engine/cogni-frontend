'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  useUserId,
  useManagedOrganizationsWithSubscriptions,
} from './hooks/useOrganizations';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
import { getOrganizationSubscriptionPlan } from './utils/subscriptionUtils';
import {
  useCustomerPortal,
  useUpgradeToBusiness,
  useUpdateSeats,
  useSwitchToTeamBilling,
} from './hooks/useBillingMutations';
import { usePageVisibility } from './hooks/usePageVisibility';
import { SubscriptionDetails } from './components/SubscriptionDetails';
import { PricingCardsGrid } from './components/PricingCardsGrid';
import { ErrorAlert } from './components/ErrorAlert';
import { UpgradeToBusinessDialog } from './components/dialogs/UpgradeToBusinessDialog';
import { UpdateSeatsDialog } from './components/dialogs/UpdateSeatsDialog';
import { SwitchToTeamBillingDialog } from './components/dialogs/SwitchToTeamBillingDialog';
import { createClient } from '@/lib/supabase/browserClient';

export default function SubscriptionClient() {
  const router = useRouter();
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showUpdateSeatsDialog, setShowUpdateSeatsDialog] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  // React Query hooks
  const { data: userId } = useUserId();
  const { data: managedOrgs, isLoading: isLoadingOrg } =
    useManagedOrganizationsWithSubscriptions(userId ?? undefined);

  // Select current organization
  const currentOrg = useMemo(() => {
    if (!managedOrgs || managedOrgs.length === 0) return null;

    // If we have a selected org ID, use that
    if (selectedOrgId) {
      return (
        managedOrgs.find(
          (org: UserOrganizationData) => org.organization.id === selectedOrgId
        ) || null
      );
    }

    // Otherwise, use the first one (and set it as selected)
    return managedOrgs[0] || null;
  }, [managedOrgs, selectedOrgId]);

  // Compute subscription plan from current organization
  const currentOrgPlan = useMemo(() => {
    return getOrganizationSubscriptionPlan(currentOrg?.organization);
  }, [currentOrg]);

  // Set selected org ID when currentOrg changes
  useEffect(() => {
    if (currentOrg && !selectedOrgId) {
      setSelectedOrgId(currentOrg.organization.id);
    }
  }, [currentOrg, selectedOrgId]);

  // Mutations
  const customerPortalMutation = useCustomerPortal();
  const upgradeMutation = useUpgradeToBusiness();
  const updateSeatsMutation = useUpdateSeats();
  const switchBillingMutation = useSwitchToTeamBilling();

  // Page visibility handler for refetching after Stripe Portal
  usePageVisibility();

  // Derived state
  const isLoading = isLoadingOrg;
  const isFreePlan = !currentOrgPlan || currentOrgPlan === 'free';
  const isProOrBusiness =
    currentOrgPlan === 'pro' || currentOrgPlan === 'business';

  // Error state (from mutations)
  const error =
    customerPortalMutation.error?.message ??
    upgradeMutation.error?.message ??
    updateSeatsMutation.error?.message ??
    switchBillingMutation.error?.message ??
    null;

  // Handlers
  const handlePlanClick = (planId: string) => {
    if (planId === currentOrgPlan) {
      // Already on this plan
      return;
    }
    // TODO: Implement plan change logic
    console.log('Change plan to', planId);
  };

  const handleManageBilling = async () => {
    if (!currentOrg) return;

    customerPortalMutation.mutate({
      organizationId: currentOrg.organization.id,
      returnUrl: `${window.location.origin}/user/subscription`,
    });
  };

  const handleUpgrade = async (seatCount: number) => {
    if (!currentOrg) return;

    upgradeMutation.mutate({
      organizationId: currentOrg.organization.id,
      seatCount:
        seatCount > (currentOrg.organization.active_member_count || 1)
          ? seatCount
          : undefined, // Only send if user wants more than current members
    });
  };

  const handleUpdateSeats = async (seatCount: number) => {
    if (!currentOrg) return;

    updateSeatsMutation.mutate({
      organizationId: currentOrg.organization.id,
      seatCount,
    });
  };

  const handleSwitchToTeamBilling = async (): Promise<string> => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userEmail = user?.email;
    if (!userEmail) {
      throw new Error('User email not found');
    }

    return new Promise((resolve, reject) => {
      switchBillingMutation.mutate(userEmail, {
        onSuccess: clientSecret => {
          resolve(clientSecret);
        },
        onError: error => {
          reject(error);
        },
      });
    });
  };

  const handleCheckoutComplete = () => {
    router.push('/checkout/success');
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-white'>Loading subscription information...</div>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto pt-20 pb-24 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto py-8'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='text-white/60 hover:text-white mb-4'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Subscription Management
          </h1>
          <p className='text-white/60'>
            {isFreePlan
              ? 'Choose a plan that fits your needs'
              : `You are currently on the ${(currentOrgPlan ?? '').toUpperCase()} plan. Manage your subscription below.`}
          </p>
        </div>

        {/* Organization Selector - Show if multiple organizations */}
        {isProOrBusiness &&
          managedOrgs &&
          managedOrgs.length > 1 &&
          currentOrg && (
            <div className='mt-8 mb-4'>
              <label className='text-sm font-medium text-white/60 mb-2 block'>
                Select Organization
              </label>
              <select
                value={selectedOrgId || ''}
                onChange={e => setSelectedOrgId(Number(e.target.value))}
                className='w-full md:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              >
                {managedOrgs.map((org: UserOrganizationData) => {
                  const orgPlan = getOrganizationSubscriptionPlan(
                    org.organization
                  );
                  const planLabel = orgPlan
                    ? ` (${orgPlan.toUpperCase()})`
                    : '';
                  return (
                    <option
                      key={org.organization.id}
                      value={org.organization.id}
                    >
                      {org.organization.name} ({org.role}){planLabel}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

        {/* Subscription Details - Only show if user has pro/business plan */}
        {isProOrBusiness && currentOrg && (
          <SubscriptionDetails
            subscriptionPlan={currentOrgPlan ?? null}
            currentOrg={currentOrg}
            onManageBilling={handleManageBilling}
            onUpgrade={() => setShowUpgradeDialog(true)}
            onUpdateSeats={() => setShowUpdateSeatsDialog(true)}
            isOpeningPortal={customerPortalMutation.isPending}
          />
        )}

        {/* Pricing Cards Grid - Hide for business plan */}
        {currentOrgPlan !== 'business' && (
          <PricingCardsGrid
            subscriptionPlan={currentOrgPlan ?? null}
            onPlanClick={handlePlanClick}
          />
        )}

        {/* Error Display */}
        {error && <ErrorAlert error={error} />}
      </div>

      {/* Dialogs */}
      <UpgradeToBusinessDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        currentOrg={currentOrg ?? null}
        onUpgrade={handleUpgrade}
        isUpgrading={upgradeMutation.isPending}
      />

      <UpdateSeatsDialog
        open={showUpdateSeatsDialog}
        onOpenChange={setShowUpdateSeatsDialog}
        currentOrg={currentOrg ?? null}
        onUpdate={handleUpdateSeats}
        isUpdating={updateSeatsMutation.isPending}
      />

      <SwitchToTeamBillingDialog
        open={showSwitchDialog}
        onOpenChange={setShowSwitchDialog}
        onSwitch={handleSwitchToTeamBilling}
        onCheckoutComplete={handleCheckoutComplete}
        isSwitching={switchBillingMutation.isPending}
      />
    </div>
  );
}
