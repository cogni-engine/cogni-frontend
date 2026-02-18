'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useSubscription } from '@/providers/SubscriptionProvider';
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

  // Use SubscriptionProvider
  const {
    organizations,
    isLoading: isLoadingOrg,
    planType,
  } = useSubscription();

  // Filter to only managed organizations (owner/admin)
  const managedOrgs = useMemo(() => {
    return organizations.filter(
      org => org.role === 'owner' || org.role === 'admin'
    );
  }, [organizations]);

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
  console.log('currentOrgPlan', currentOrgPlan);

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
        <div className='text-text-primary'>
          Loading subscription information...
        </div>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto pt-20 pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      <div className='max-w-3xl mx-auto px-4 md:px-6'>
        {/* Organization Selector - Show if multiple organizations */}
        {managedOrgs && managedOrgs.length > 1 && currentOrg && (
          <div className='mb-8'>
            <h2 className='text-xl font-bold text-text-primary mb-6'>
              Organization
            </h2>
            <button
              onClick={() => {
                const trigger = document.querySelector(
                  '[data-radix-dropdown-trigger]'
                ) as HTMLElement;
                trigger?.click();
              }}
              className='w-full py-4 flex items-center justify-between border-b border-border-default hover:bg-surface-primary transition-colors'
            >
              <div className='text-left'>
                <div className='text-base text-text-primary font-medium'>
                  {currentOrg.organization.name}
                </div>
                <div className='text-sm text-text-secondary mt-1'>
                  Role: {currentOrg.role}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div data-radix-dropdown-trigger>
                    <ChevronDown className='h-5 w-5 text-text-muted' />
                  </div>
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
            </button>
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

        {/* Pricing Cards Grid - Only show if user's overall plan is free */}
        {planType !== 'business' && (
          <div className='mb-8'>
            <h2 className='text-xl font-bold text-text-primary mb-6'>
              Available Plans
            </h2>
            <PricingCardsGrid
              subscriptionPlan={planType}
              onPlanClick={handlePlanClick}
            />
          </div>
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
