'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import { Button } from '@/components/ui/button';
import { getSubscriptionPlanFromJWT } from '@/lib/jwtUtils';
import { refreshSession } from '@cogni/api';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // First refresh the JWT to get updated subscription info from the backend
    // Then get the subscription plan from the refreshed JWT
    const updateSubscriptionPlan = async () => {
      try {
        // Refresh the session to get a new JWT with updated subscription info
        await refreshSession();

        // Now get the subscription plan from the refreshed JWT
        const plan = await getSubscriptionPlanFromJWT();
        setSubscriptionPlan(plan);
      } catch (error) {
        console.error(
          'Error refreshing session or getting subscription plan:',
          error
        );
        // Fallback: try to get plan from current JWT even if refresh failed
        try {
          const plan = await getSubscriptionPlanFromJWT();
          setSubscriptionPlan(plan);
        } catch {
          // Ignore errors
        }
      } finally {
        setIsLoading(false);
      }
    };

    updateSubscriptionPlan();
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <GlassCard className='max-w-md w-full p-8'>
        <div className='space-y-6 text-center'>
          <div className='flex justify-center'>
            <div className='rounded-full bg-green-500/20 p-4'>
              <CheckCircle className='h-12 w-12 text-green-400' />
            </div>
          </div>

          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-white'>
              Payment Successful!
            </h1>
            <p className='text-white/60'>
              Your subscription has been activated successfully.
            </p>
          </div>

          {!isLoading && subscriptionPlan && (
            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
              <p className='text-sm text-white/60 mb-1'>Current Plan</p>
              <p className='text-xl font-semibold text-white capitalize'>
                {subscriptionPlan}
              </p>
            </div>
          )}

          <div className='flex flex-col gap-3 pt-4'>
            <Button
              onClick={() => router.push('/home')}
              className='w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white border-transparent'
            >
              Return to Home
            </Button>
            <Button
              onClick={() => router.push('/user/subscription')}
              variant='outline'
              className='w-full'
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
