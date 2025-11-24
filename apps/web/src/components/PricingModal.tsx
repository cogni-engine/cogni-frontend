'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PricingCard, type PricingPlan } from '@cogni/pricing';
import { DEFAULT_PRICING_JA } from '@cogni/pricing/src/constants';
import { getSubscriptionPlanFromJWT } from '@/lib/jwtUtils';

type PricingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const router = useRouter();
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      getSubscriptionPlanFromJWT().then(plan => {
        setSubscriptionPlan(plan);
        setIsLoading(false);
      });
    }
  }, [open]);

  const isProOrBusiness =
    subscriptionPlan === 'pro' || subscriptionPlan === 'business';

  // Show all 3 plans if free, otherwise show all plans (user can still see them)
  const plansToShow = DEFAULT_PRICING_JA.plans.slice(0, 3);

  const handleButtonClick = (planId: string) => {
    if (isProOrBusiness) {
      // Redirect to subscription management page
      router.push('/user/subscription');
      onOpenChange(false);
    } else {
      // Handle upgrade logic for free users
      console.log('Upgrade to', planId);
      // TODO: Implement upgrade flow
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-full max-h-[80vh] overflow-y-auto z-110'>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center mb-2'>
            {DEFAULT_PRICING_JA.title}
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            {DEFAULT_PRICING_JA.description}
          </DialogDescription>
        </DialogHeader>

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
                      disabled={isLoading || isCurrentPlan}
                    >
                      {isLoading
                        ? 'Loading...'
                        : isProOrBusiness
                          ? 'サブスクリプションを管理'
                          : isCurrentPlan
                            ? '現在のプラン'
                            : 'アップグレード'}
                    </Button>
                  )}
                />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
