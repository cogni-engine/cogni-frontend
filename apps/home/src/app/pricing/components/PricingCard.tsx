'use client';

import { Check, X } from 'lucide-react';
import { Button } from '../../components/Button';
import { useLanguage } from '../../context/language-context';

type PricingCardProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  ctaLabel: string;
  ctaHref: string;
  isBestValue?: boolean;
  features: Array<{
    label: string;
    included: boolean;
  }>;
};

export function PricingCard({
  name,
  description,
  price,
  priceNote,
  ctaLabel,
  ctaHref,
  isBestValue,
  features,
}: PricingCardProps) {
  const { copy } = useLanguage();

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all ${
        isBestValue
          ? 'border-purple-500/50 bg-purple-500/10'
          : 'border-white/10 bg-white/5'
      }`}
    >
      {isBestValue && (
        <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
          <span className='rounded-full bg-purple-500 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white'>
            {copy.pricing.bestValueLabel}
          </span>
        </div>
      )}

      <div className='mb-4'>
        <h3 className='mb-2 text-2xl font-semibold text-white'>{name}</h3>
        <p className='text-sm text-slate-300'>{description}</p>
      </div>

      <div className='mb-6 min-h-[80px]'>
        {price && (
          <>
            <div className='mb-1 flex items-baseline gap-2'>
              <span className='text-4xl font-bold text-white'>{price}</span>
            </div>
            {priceNote && (
              <p className='mb-4 text-xs text-slate-400'>{priceNote}</p>
            )}
          </>
        )}
      </div>

      <div className='mb-6 flex justify-center'>
        <Button
          as='link'
          href={ctaHref}
          variant={isBestValue ? 'primary' : 'secondary'}
          className={isBestValue ? 'bg-purple-500 hover:bg-purple-600' : ''}
        >
          {ctaLabel}
        </Button>
      </div>

      <div className='flex-1 space-y-3'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-start gap-3'>
            {feature.included ? (
              <Check className='mt-0.5 h-5 w-5 flex-shrink-0 text-green-400' />
            ) : (
              <X className='mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500' />
            )}
            <span
              className={`text-sm ${
                feature.included ? 'text-slate-200' : 'text-slate-500'
              }`}
            >
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
