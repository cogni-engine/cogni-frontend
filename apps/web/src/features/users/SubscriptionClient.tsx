'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PricingCard, type PricingPlan } from '@cogni/pricing';
import { DEFAULT_PRICING_JA } from '@cogni/pricing/src/constants';
import { getSubscriptionPlanFromJWT } from '@/lib/jwtUtils';
import {
  ArrowLeft,
  Loader2,
  AlertTriangle,
  CreditCard,
  Users,
  Award,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { getUserOrganizationsData } from '@/lib/api/organizationApi';
import { createClient } from '@/lib/supabase/browserClient';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function SubscriptionClient() {
  const router = useRouter();
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [organizations, setOrganizations] = React.useState<
    UserOrganizationData[]
  >([]);
  const [currentOrg, setCurrentOrg] =
    React.useState<UserOrganizationData | null>(null);
  const [showSwitchDialog, setShowSwitchDialog] = React.useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);
  const [showUpdateSeatsDialog, setShowUpdateSeatsDialog] =
    React.useState(false);
  const [isSwitching, setIsSwitching] = React.useState(false);
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [isUpdatingSeats, setIsUpdatingSeats] = React.useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = React.useState(false);
  const [teamBillingClientSecret, setTeamBillingClientSecret] = React.useState<
    string | null
  >(null);
  const [upgradeSeats, setUpgradeSeats] = React.useState<number>(1);
  const [newSeats, setNewSeats] = React.useState<number>(1);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);

      // Refresh JWT to get latest organization info and custom claims
      const supabase = createClient();
      console.log(
        '🔄 Refreshing session to get latest JWT with updated claims...'
      );
      const { data: refreshData, error: refreshError } =
        await supabase.auth.refreshSession();

      if (refreshError) {
        console.warn('⚠️ Failed to refresh session:', refreshError.message);
        // Continue anyway - we'll use the existing JWT
      } else if (refreshData.session) {
        console.log('✅ Session refreshed successfully');
      }

      // Get subscription plan from JWT (now with fresh claims)
      const plan = await getSubscriptionPlanFromJWT();
      setSubscriptionPlan(plan);
      console.log('📋 Current plan from JWT:', plan);

      // Fetch organizations if user has a subscription
      if (plan === 'pro' || plan === 'business') {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const orgs = await getUserOrganizationsData(user.id);
          setOrganizations(orgs);
          console.log('🏢 Organizations:', orgs);
          // Find organization with active subscription
          const orgWithSubscription = orgs.find(
            org => org.organization.stripe_subscription_id
          );
          setCurrentOrg(orgWithSubscription || orgs[0] || null);
        }
      }
    } catch (err) {
      console.error('Error loading subscription data:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load subscription data'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // Reload data when page becomes visible (e.g., returning from Customer Portal)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isLoading) {
        console.log('Page became visible, reloading subscription data...');
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadData, isLoading]);

  const isFreePlan = !subscriptionPlan || subscriptionPlan === 'free';
  const isProOrBusiness =
    subscriptionPlan === 'pro' || subscriptionPlan === 'business';

  // Show all 3 plans
  const plansToShow = DEFAULT_PRICING_JA.plans.slice(0, 3);

  const handleButtonClick = (planId: string) => {
    if (planId === subscriptionPlan) {
      // Already on this plan
      return;
    }
    // TODO: Implement plan change logic
    console.log('Change plan to', planId);
  };

  // Cancellation is handled via Stripe Customer Portal
  // Users click "Manage Subscription" → Portal → Cancel there

  const handleSwitchToTeamBilling = async () => {
    if (!currentOrg) return;

    setIsSwitching(true);
    setError(null);

    try {
      // Get JWT token for authentication
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session found');
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }

      // Call FastAPI unified purchase endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/purchase`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: 'business',
            createOrganization: true,
            organizationName: `${user.email}'s Team`,
            seatCount: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to switch to team billing');
      }

      // Set client secret for checkout
      if (data.client_secret) {
        setTeamBillingClientSecret(data.client_secret);
      } else {
        throw new Error('No client secret returned');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to switch to team billing'
      );
      setIsSwitching(false);
    }
  };

  const fetchClientSecret = React.useCallback(async () => {
    if (teamBillingClientSecret) {
      return teamBillingClientSecret;
    }
    throw new Error('Client secret not available');
  }, [teamBillingClientSecret]);

  const handleCheckoutComplete = () => {
    router.push('/checkout/success');
  };

  const handleOpenCustomerPortal = async () => {
    if (!currentOrg) return;

    setIsOpeningPortal(true);
    setError(null);

    try {
      // Get JWT token for authentication
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session found');
      }

      // Call FastAPI portal session endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/portal-session`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organizationId: currentOrg.organization.id,
            returnUrl: `${window.location.origin}/user/subscription`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create portal session');
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to open customer portal'
      );
      setIsOpeningPortal(false);
    }
  };

  const handleUpgradeToBusiness = async () => {
    if (!currentOrg) return;

    setIsUpgrading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/upgrade-to-business`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organizationId: currentOrg.organization.id,
            seatCount:
              upgradeSeats > (currentOrg.organization.active_member_count || 1)
                ? upgradeSeats
                : undefined, // Only send if user wants more than current members
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to upgrade to Business plan');
      }

      // Upgrade successful
      setShowUpgradeDialog(false);

      // Wait a moment for webhook to process, then reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to upgrade to Business plan'
      );
      setIsUpgrading(false);
    }
  };

  const handleUpdateSeats = async () => {
    if (!currentOrg) return;

    setIsUpdatingSeats(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/update-seats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organizationId: currentOrg.organization.id,
            seatCount: newSeats,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update seats');
      }

      // Update successful
      setShowUpdateSeatsDialog(false);

      // Wait a moment for webhook to process, then reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update seats');
      setIsUpdatingSeats(false);
    }
  };

  // Initialize seat counts when dialog opens
  React.useEffect(() => {
    if (currentOrg) {
      const currentMembers = currentOrg.organization.active_member_count || 1;
      setUpgradeSeats(currentMembers);
      setNewSeats(currentOrg.organization.seat_count || currentMembers);
    }
  }, [currentOrg, showUpgradeDialog, showUpdateSeatsDialog]);

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
              : `You are currently on the ${subscriptionPlan?.toUpperCase()} plan. Manage your subscription below.`}
          </p>
        </div>

        {isProOrBusiness && currentOrg && (
          <div className='mt-8 p-6 bg-white/5 rounded-lg border border-white/10'>
            <h2 className='text-xl font-semibold text-white mb-6'>
              Subscription Details
            </h2>

            {/* Plan and Organization Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              {/* Plan Badge */}
              <div className='flex items-start gap-3'>
                <div className='p-2 bg-purple-500/20 rounded-lg'>
                  <Award className='h-5 w-5 text-purple-400' />
                </div>
                <div>
                  <p className='text-sm text-white/60'>Current Plan</p>
                  <p className='text-lg font-semibold text-white'>
                    {subscriptionPlan?.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Role Badge */}
              <div className='flex items-start gap-3'>
                <div className='p-2 bg-blue-500/20 rounded-lg'>
                  <Users className='h-5 w-5 text-blue-400' />
                </div>
                <div>
                  <p className='text-sm text-white/60'>Your Role</p>
                  <p className='text-lg font-semibold text-white'>
                    {currentOrg.role === 'owner'
                      ? 'Owner'
                      : currentOrg.role.charAt(0).toUpperCase() +
                        currentOrg.role.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Name */}
            <div className='mb-6 p-4 bg-white/5 rounded-lg border border-white/10'>
              <p className='text-sm text-white/60 mb-1'>Organization</p>
              <p className='text-base font-medium text-white'>
                {currentOrg.organization.name}
              </p>
            </div>

            {/* Seat Usage Meter - Only for Business plan */}
            {subscriptionPlan === 'business' && (
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm font-medium text-white'>Seat Usage</p>
                  <p className='text-sm text-white/60'>
                    {currentOrg.organization.active_member_count || 0} /{' '}
                    {currentOrg.organization.seat_count || 1} seats
                  </p>
                </div>

                {/* Progress Bar */}
                <div className='w-full bg-white/10 rounded-full h-3 overflow-hidden'>
                  <div
                    className={`h-full transition-all duration-300 ${
                      (currentOrg.organization.active_member_count || 0) /
                        (currentOrg.organization.seat_count || 1) >=
                      1
                        ? 'bg-orange-500'
                        : (currentOrg.organization.active_member_count || 0) /
                              (currentOrg.organization.seat_count || 1) >=
                            0.8
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        ((currentOrg.organization.active_member_count || 0) /
                          (currentOrg.organization.seat_count || 1)) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                {/* Usage Info */}
                <div className='mt-2 flex items-center justify-between text-xs'>
                  <span className='text-white/40'>
                    {currentOrg.organization.seat_count -
                      currentOrg.organization.active_member_count >
                    0
                      ? `${currentOrg.organization.seat_count - currentOrg.organization.active_member_count} seats available`
                      : 'All seats in use'}
                  </span>
                  <span
                    className={`font-medium ${
                      (currentOrg.organization.active_member_count || 0) /
                        (currentOrg.organization.seat_count || 1) >=
                      1
                        ? 'text-orange-400'
                        : (currentOrg.organization.active_member_count || 0) /
                              (currentOrg.organization.seat_count || 1) >=
                            0.8
                          ? 'text-yellow-400'
                          : 'text-green-400'
                    }`}
                  >
                    {Math.round(
                      ((currentOrg.organization.active_member_count || 0) /
                        (currentOrg.organization.seat_count || 1)) *
                        100
                    )}
                    % used
                  </span>
                </div>
              </div>
            )}

            {/* Renewal/Cancellation Info */}
            {currentOrg.organization.stripe_subscription_id &&
              currentOrg.organization.current_period_end && (
                <div className='mb-6 p-4 bg-white/5 rounded-lg border border-white/10'>
                  <p className='text-sm text-white/60 mb-1'>
                    {currentOrg.organization.cancel_at_period_end
                      ? 'Access until'
                      : 'Renews on'}
                  </p>
                  <p className='text-base font-medium text-white'>
                    {new Date(
                      currentOrg.organization.current_period_end
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

            {/* Cancellation Warning */}
            {currentOrg.organization.cancel_at_period_end && (
              <div className='mb-6 p-4 bg-orange-500/10 border border-orange-500/50 rounded-lg flex items-start gap-3'>
                <AlertTriangle className='h-5 w-5 text-orange-300 shrink-0 mt-0.5' />
                <div className='text-orange-300 text-sm'>
                  <p className='font-medium mb-1'>
                    Subscription Scheduled for Cancellation
                  </p>
                  <p>
                    Your subscription will be canceled on{' '}
                    {currentOrg.organization.current_period_end &&
                      new Date(
                        currentOrg.organization.current_period_end
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    . You can reactivate it anytime before then in the billing
                    portal.
                  </p>
                </div>
              </div>
            )}
            <div className='flex flex-col sm:flex-row gap-3 mt-6'>
              {currentOrg.organization.stripe_customer_id && (
                <Button
                  onClick={handleOpenCustomerPortal}
                  variant='outline'
                  disabled={isOpeningPortal}
                  className='bg-blue-500/10 border-blue-500/50 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200'
                >
                  {isOpeningPortal ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Opening...
                    </>
                  ) : (
                    <>
                      <CreditCard className='mr-2 h-4 w-4' />
                      {currentOrg.organization.cancel_at_period_end
                        ? 'Reactivate or Manage Billing'
                        : 'Manage Billing'}
                    </>
                  )}
                </Button>
              )}
              {subscriptionPlan === 'pro' && (
                <Button
                  onClick={() => setShowUpgradeDialog(true)}
                  variant='outline'
                  className='bg-purple-500/10 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200'
                >
                  Upgrade to Business
                </Button>
              )}
              {subscriptionPlan === 'business' && (
                <Button
                  onClick={() => setShowUpdateSeatsDialog(true)}
                  variant='outline'
                  className='bg-green-500/10 border-green-500/50 text-green-300 hover:bg-green-500/20 hover:text-green-200'
                >
                  Update Seats
                </Button>
              )}
            </div>
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-3 mt-6'>
          {plansToShow.map(plan => {
            const isCurrentPlan = plan.id === subscriptionPlan;
            return (
              <div key={plan.id} className='relative'>
                {isCurrentPlan && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-10'>
                    <span className='bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                      Current Plan
                    </span>
                  </div>
                )}
                <PricingCard
                  plan={plan}
                  bestValueLabel={DEFAULT_PRICING_JA.bestValueLabel}
                  className={`border-white/20 ${
                    isCurrentPlan ? 'ring-2 ring-purple-500' : ''
                  }`}
                  featureClassName='gap-2'
                  priceClassName='text-5xl'
                  renderButton={(plan: PricingPlan) => (
                    <Button
                      variant={plan.isBestValue ? 'default' : 'outline'}
                      className={`w-full rounded-full ${
                        plan.isBestValue
                          ? 'bg-purple-500 hover:bg-purple-600 text-white border-transparent'
                          : 'bg-white border-white/20 hover:bg-white/80 text-black'
                      }`}
                      onClick={() => handleButtonClick(plan.id)}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan
                        ? 'Current Plan'
                        : isFreePlan
                          ? plan.ctaLabel
                          : 'Switch Plan'}
                    </Button>
                  )}
                />
              </div>
            );
          })}
        </div>

        {error && (
          <div className='mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3'>
            <AlertTriangle className='h-5 w-5 text-red-300 shrink-0 mt-0.5' />
            <p className='text-red-300 text-sm'>{error}</p>
          </div>
        )}
      </div>

      {/* Upgrade to Business Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className='bg-gray-900 border-white/10 text-white'>
          <DialogHeader>
            <DialogTitle>Upgrade to Business Plan</DialogTitle>
            <DialogDescription className='text-white/60'>
              Upgrading to Business plan will:
              <ul className='list-disc list-inside mt-2 space-y-1'>
                <li>Unlock team collaboration features</li>
                <li>Allow you to invite multiple team members</li>
                <li>Automatically adjust billing based on team size</li>
                <li>Pro-rate the upgrade cost to your current billing cycle</li>
              </ul>
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Number of seats
              </label>
              <input
                type='number'
                min={currentOrg?.organization.active_member_count || 1}
                value={upgradeSeats}
                onChange={e =>
                  setUpgradeSeats(Math.max(1, parseInt(e.target.value) || 1))
                }
                className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                disabled={isUpgrading}
              />
              <p className='text-xs text-white/40'>
                Minimum: {currentOrg?.organization.active_member_count || 1}{' '}
                (current members)
              </p>
            </div>

            <div className='p-3 bg-white/5 rounded-lg border border-white/10'>
              <p className='text-sm text-white/80'>
                <span className='font-medium'>Monthly cost:</span> $
                {(15 * upgradeSeats).toFixed(2)} ($15 × {upgradeSeats} seats)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setShowUpgradeDialog(false);
                setError(null);
              }}
              disabled={isUpgrading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpgradeToBusiness}
              disabled={isUpgrading}
              className='bg-purple-500 hover:bg-purple-600'
            >
              {isUpgrading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Upgrading...
                </>
              ) : (
                `Upgrade with ${upgradeSeats} seats`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Seats Dialog */}
      <Dialog
        open={showUpdateSeatsDialog}
        onOpenChange={setShowUpdateSeatsDialog}
      >
        <DialogContent className='bg-gray-900 border-white/10 text-white'>
          <DialogHeader>
            <DialogTitle>Update Seat Count</DialogTitle>
            <DialogDescription className='text-white/60'>
              Adjust the number of seats for your Business plan. You can add
              seats anytime, but cannot reduce below your current member count.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Number of seats
              </label>
              <input
                type='number'
                min={currentOrg?.organization.active_member_count || 1}
                value={newSeats}
                onChange={e =>
                  setNewSeats(Math.max(1, parseInt(e.target.value) || 1))
                }
                className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                disabled={isUpdatingSeats}
              />
              <p className='text-xs text-white/40'>
                Current: {currentOrg?.organization.seat_count || 1} seats |
                Minimum: {currentOrg?.organization.active_member_count || 1}{' '}
                (active members)
              </p>
            </div>

            <div className='p-3 bg-white/5 rounded-lg border border-white/10 space-y-2'>
              <p className='text-sm text-white/80'>
                <span className='font-medium'>Current cost:</span> $
                {(15 * (currentOrg?.organization.seat_count || 1)).toFixed(2)}
                /month
              </p>
              <p className='text-sm text-white/80'>
                <span className='font-medium'>New cost:</span> $
                {(15 * newSeats).toFixed(2)}/month
              </p>
              {newSeats !== (currentOrg?.organization.seat_count || 1) && (
                <p className='text-xs text-white/60 pt-2 border-t border-white/10'>
                  Change will be pro-rated based on remaining days in billing
                  cycle
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setShowUpdateSeatsDialog(false);
                setError(null);
              }}
              disabled={isUpdatingSeats}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSeats}
              disabled={
                isUpdatingSeats ||
                newSeats === currentOrg?.organization.seat_count
              }
              className='bg-green-500 hover:bg-green-600'
            >
              {isUpdatingSeats ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Updating...
                </>
              ) : (
                'Update Seats'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch to Team Billing Dialog */}
      <Dialog open={showSwitchDialog} onOpenChange={setShowSwitchDialog}>
        <DialogContent className='bg-gray-900 border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Switch to Team Billing</DialogTitle>
            <DialogDescription className='text-white/60'>
              Switching to team billing will:
              <ul className='list-disc list-inside mt-2 space-y-1'>
                <li>
                  Cancel your current Pro subscription at the end of the billing
                  period
                </li>
                <li>Create a new team organization with Business plan</li>
                <li>Allow you to invite team members and manage permissions</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          {!teamBillingClientSecret ? (
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setShowSwitchDialog(false);
                  setError(null);
                }}
                disabled={isSwitching}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSwitchToTeamBilling}
                disabled={isSwitching}
                className='bg-purple-500 hover:bg-purple-600'
              >
                {isSwitching ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing...
                  </>
                ) : (
                  'Continue to Checkout'
                )}
              </Button>
            </DialogFooter>
          ) : (
            <div className='mt-4'>
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  fetchClientSecret,
                  onComplete: handleCheckoutComplete,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
