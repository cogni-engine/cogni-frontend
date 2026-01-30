'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import type { PricingPlan } from './types';

type PricingCardProps = {
  plan: PricingPlan;
  bestValueLabel?: string;
  /**
   * Render prop for the CTA button.
   * Receives the plan data and returns a React element.
   * This allows the button to have different functionality depending on where it's used.
   */
  renderButton?: (plan: PricingPlan) => React.ReactNode;
  /**
   * Optional className for the card container
   */
  className?: string;
  /**
   * Optional className for feature items
   */
  featureClassName?: string;
  /**
   * Optional className for the price text (defaults to 'text-4xl')
   */
  priceClassName?: string;
};

export function PricingCard({
  plan,
  bestValueLabel = 'Best Value',
  renderButton,
  className = '',
  featureClassName = '',
  priceClassName = 'text-4xl',
}: PricingCardProps) {
  const { id, name, description, price, priceNote, isBestValue, features } =
    plan;

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 transition-all ${className}`}
    >
      {/* Header section - fixed height */}
      <div className='mb-4' style={{ height: '80px' }}>
        <h3 className='mb-2 text-2xl font-semibold text-white'>{name}</h3>
        <p className='text-sm text-slate-300' style={{ height: '48px' }}>
          {description}
        </p>
      </div>

      {/* Price section - fixed height */}
      <div className='mb-6 flex items-end' style={{ height: '60px' }}>
        {price && (
          <div className='flex items-baseline gap-2'>
            <span className={`font-bold text-white ${priceClassName}`}>{price}</span>
            {priceNote && (
              <span className='text-lg text-slate-400'>{priceNote}</span>
            )}
          </div>
        )}
      </div>

      {/* Button section - fixed height */}
      {renderButton && (
        <div className='mb-6 flex items-center' style={{ minHeight: '48px' }}>
          {renderButton(plan)}
        </div>
      )}

      {/* Features section - grows to fill space */}
      <div className='flex-1' style={{ minHeight: '200px' }}>
        <div className='space-y-6'>
          {features.map((feature, index) => (
            <div key={index} className={`flex items-start gap-3 ${featureClassName}`}>
              {feature.included ? (
                <Check className='mt-0.5 h-5 w-5 flex-shrink-0 text-white' />
              ) : (
                <X className='mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500' />
              )}
              <span
                className={`text-sm leading-relaxed ${
                  feature.included ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

