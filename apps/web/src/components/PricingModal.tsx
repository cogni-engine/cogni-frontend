'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PricingCard, type PricingPlan } from '@cogni/pricing';
import { DEFAULT_PRICING_EN } from '@cogni/pricing/src/constants';

type PricingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-full max-h-[80vh] overflow-y-auto z-110'>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center mb-2'>
            {DEFAULT_PRICING_EN.title}
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            {DEFAULT_PRICING_EN.description}
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 md:grid-cols-3 mt-6'>
          {DEFAULT_PRICING_EN.plans.slice(0, 3).map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              bestValueLabel={DEFAULT_PRICING_EN.bestValueLabel}
              className='border-white/20'
              featureClassName='gap-2'
              priceClassName='text-5xl'
              renderButton={(plan: PricingPlan) => (
                <Button
                  variant={plan.isBestValue ? 'default' : 'outline'}
                  className={`w-full rounded-full  ${
                    plan.isBestValue
                      ? 'bg-purple-500 hover:bg-purple-600 text-white border-transparent'
                      : 'bg-white border-white/20 hover:bg-white/80 text-black'
                  }`}
                  onClick={() => {
                    // Handle upgrade logic here
                    console.log('Upgrade to', plan.id);
                  }}
                >
                  {plan.ctaLabel}
                </Button>
              )}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
