'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { DEFAULT_PRICING_JA } from '@cogni/pricing/src/constants';
import GlassCard from '@/components/glass-card/GlassCard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/browserClient';
import { getPrimaryUserOrganizationData } from '@/lib/api/organizationApi';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Find plan details
  const plan = React.useMemo(() => {
    if (!planId) return null;
    return DEFAULT_PRICING_JA.plans.find(p => p.id === planId);
  }, [planId]);

  React.useEffect(() => {
    if (!planId) {
      setError('Invalid plan ID');
      setIsLoading(false);
      return;
    }

    if (!plan) {
      const availablePlans = DEFAULT_PRICING_JA.plans.map(p => p.id).join(', ');
      setError(`Plan not found: ${planId}. Available plans: ${availablePlans}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [planId, plan]);

  // Fetch client secret function for EmbeddedCheckoutProvider
  const fetchClientSecret = React.useCallback(async () => {
    try {
      console.log(`🚀 Using FastAPI for ${planId} plan purchase`);

      // Get current user
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error('You must be logged in to purchase a plan');
      }

      // Get JWT token for authentication
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session found');
      }

      // Get user's primary organization
      const primaryOrg = await getPrimaryUserOrganizationData(user.id);

      // Prepare request body
      const requestBody: any = {
        planId: planId,
      };

      if (primaryOrg) {
        // Use existing organization
        requestBody.organizationId = primaryOrg.organization.id;
        console.log(
          '📦 Using existing organization:',
          primaryOrg.organization.id
        );
      } else {
        // Create new organization
        requestBody.createOrganization = true;
        requestBody.organizationName = `${user.email}'s Organization`;
        console.log('📝 Will create new organization');
      }

      // Add seat count for business plan
      if (planId === 'business') {
        requestBody.seatCount = 1;
      }

      // Call unified FastAPI endpoint
      const response = await fetch(`${API_BASE_URL}/api/billing/purchase`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 'Failed to create checkout session'
        );
      }

      const data = await response.json();
      if (!data.client_secret) {
        throw new Error('No client secret returned');
      }

      console.log('✅ Checkout session created via FastAPI');
      return data.client_secret;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to initialize checkout'
      );
      throw err;
    }
  }, [planId]);

  const options = React.useMemo(
    () => ({
      fetchClientSecret,
      onComplete: () => {
        // Redirect to success page after payment completion
        router.push('/checkout/success');
      },
    }),
    [fetchClientSecret, router]
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-8 w-8 animate-spin text-white' />
          <p className='text-white/60'>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className='flex items-center justify-center min-h-screen px-4'>
        <GlassCard className='max-w-md w-full p-6'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-semibold text-white'>Error</h1>
            <p className='text-white/60'>{error || 'Plan not found'}</p>
            <Button
              onClick={() => router.push('/home')}
              variant='outline'
              className='w-full'
            >
              Return Home
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto'>
      <div className='min-h-full px-4 py-8'>
        <div className='w-full max-w-7xl mx-auto space-y-6 pb-8'>
          <Button
            onClick={() => router.back()}
            variant='ghost'
            className='mb-4'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left side - Plan info (desktop) / Top (mobile) */}
            <div className='w-full lg:w-1/2 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto'>
              <GlassCard className='p-6 md:p-8'>
                <div className='space-y-6'>
                  <div>
                    <h1 className='text-3xl font-bold text-white mb-2'>
                      Complete Your Purchase
                    </h1>
                    <p className='text-white/60'>Upgrade to {plan.name} plan</p>
                  </div>

                  <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                    <div className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <p className='text-white font-semibold'>{plan.name}</p>
                        <p className='text-2xl font-bold text-white'>
                          {plan.price}
                          <span className='text-sm font-normal text-white/60 ml-1'>
                            {plan.priceNote}
                          </span>
                        </p>
                      </div>
                      <p className='text-sm text-white/60'>
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right side - Checkout (desktop) / Bottom (mobile) */}
            <div className='w-full lg:w-1/2'>
              <GlassCard className='p-6 md:p-8'>
                <div className='space-y-4'>
                  <div className='lg:hidden'>
                    <h2 className='text-xl font-semibold text-white mb-2'>
                      Payment Details
                    </h2>
                  </div>
                  {/* Embedded Checkout using official React components */}
                  <div id='checkout' className='min-h-[600px]'>
                    <EmbeddedCheckoutProvider
                      stripe={stripePromise}
                      options={options}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
