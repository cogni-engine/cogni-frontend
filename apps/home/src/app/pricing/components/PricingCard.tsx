'use client';

import { Check, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../../../context/language-context';

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
  id,
  name,
  description,
  price,
  priceNote,
  ctaLabel,
  ctaHref,
  isBestValue,
  features,
}: PricingCardProps) {
  const { copy, language } = useLanguage();

  const buttonText =
    id === 'business'
      ? language === 'ja'
        ? '今すぐ試す'
        : 'Try now'
      : id === 'enterprise'
        ? language === 'ja'
          ? '営業担当者に問い合わせる'
          : 'Contact sales'
        : language === 'ja'
          ? `${name} をはじめる`
          : `Start ${name}`;
  const isFree = id === 'free';
  const isEnterprise = id === 'enterprise';

  return (
    <div className='relative flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 transition-all'>
      <div className='mb-4'>
        <h3 className='mb-2 text-2xl font-semibold text-white'>{name}</h3>
        <p className='text-sm text-slate-300 min-h-[40px]'>{description}</p>
      </div>

      <div className='mb-6 h-[48px] flex items-end'>
        {price && (
          <div className='flex items-baseline gap-2'>
            <span className='text-4xl font-bold text-white'>{price}</span>
            {priceNote && (
              <span className='text-lg text-slate-400'>{priceNote}</span>
            )}
          </div>
        )}
      </div>

      <div className='mb-6 h-[48px] flex items-center'>
        <Link
          href={ctaHref}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors ${
            isFree || isEnterprise
              ? 'bg-gray-800 text-white hover:bg-slate-600'
              : 'bg-white text-slate-950 hover:bg-white/80'
          }`}
        >
          <span>{buttonText}</span>
          <ArrowUpRight className='h-4 w-4' />
        </Link>
      </div>

      <div className='flex-1 space-y-3'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-start gap-3'>
            {feature.included ? (
              <Check className='mt-0.5 h-5 w-5 flex-shrink-0 text-white' />
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
