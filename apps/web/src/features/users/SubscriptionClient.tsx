'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PricingCard, type PricingPlan } from '@cogni/pricing';
import { DEFAULT_PRICING_JA } from '@cogni/pricing/src/constants';
import { getSubscriptionPlanFromJWT } from '@/lib/jwtUtils';
import { ArrowLeft } from 'lucide-react';

export default function SubscriptionClient() {
  const router = useRouter();
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getSubscriptionPlanFromJWT().then(plan => {
      setSubscriptionPlan(plan);
      setIsLoading(false);
    });
  }, []);

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
            onClick={() => router.back()}
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

        {isProOrBusiness && (
          <div className='mt-8 p-6 bg-white/5 rounded-lg border border-white/10'>
            <h2 className='text-xl font-semibold text-white mb-4'>
              Subscription Details
            </h2>
            <div className='space-y-2 text-white/80'>
              <p>
                <span className='font-medium'>Current Plan:</span>{' '}
                {subscriptionPlan?.toUpperCase()}
              </p>
              <p>
                <span className='font-medium'>Status:</span> Active
              </p>
              <p className='text-sm text-white/60 mt-4'>
                To cancel or modify your subscription, please contact support or
                use your payment provider&apos;s portal.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
