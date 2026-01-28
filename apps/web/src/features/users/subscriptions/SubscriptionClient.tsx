'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import {
  useUserId,
  useManagedOrganizationsWithSubscriptions,
} from './hooks/useOrganizations';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
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
  const currentOrgPlan = currentOrg?.organization.plan_type;

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

    // Handle Pro → Business upgrade via dialog (existing flow)
    if (currentOrgPlan === 'pro' && planId === 'business') {
      setShowUpgradeDialog(true);
      return;
    }

    // Handle Free → Pro/Business via checkout page
    if (
      (!currentOrgPlan || currentOrgPlan === 'free') &&
      (planId === 'pro' || planId === 'business')
    ) {
      router.push(`/checkout/${planId}`);
      return;
    }

    // No downgrades allowed - this shouldn't happen if UI is correct
    console.warn('Invalid plan transition:', currentOrgPlan, '→', planId);
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
      seatCount,
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
        onSuccess: (clientSecret: string) => {
          resolve(clientSecret);
        },
        onError: (error: Error) => {
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
        </div>

        {/* Organization Selector - Show if multiple organizations */}
        {managedOrgs && managedOrgs.length > 1 && currentOrg && (
          <div className='mt-8 mb-4'>
            <label className='text-sm font-medium text-white/60 mb-2 block'>
              Select Organization
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full md:w-auto justify-between text-left font-normal'
                >
                  <span>
                    {currentOrg.organization.name} ({currentOrg.role})
                  </span>
                  <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width]'
                align='start'
              >
                <DropdownMenuRadioGroup
                  value={String(selectedOrgId || '')}
                  onValueChange={value => setSelectedOrgId(Number(value))}
                >
                  {managedOrgs.map((org: UserOrganizationData) => (
                    <DropdownMenuRadioItem
                      key={org.organization.id}
                      value={String(org.organization.id)}
                    >
                      {org.organization.name} ({org.role})
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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

        {currentOrg && (
          <div className='p-4 mt-6 bg-zinc-900 rounded-md text-xs'>
            <div className='mb-2 font-semibold text-white/70'>
              Organization Debug Info
            </div>
            <pre className='whitespace-pre-wrap text-white/60 overflow-auto'>
              {JSON.stringify(currentOrg, null, 2)}
            </pre>
          </div>
        )}

        {/* Pricing Cards Grid - Hide for business plan */}
        {currentOrgPlan && currentOrgPlan === 'free' && (
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
