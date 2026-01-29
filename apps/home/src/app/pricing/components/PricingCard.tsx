'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PricingCard as BasePricingCard } from '@cogni/pricing';
import type { PricingPlan } from '@cogni/pricing';
import { useLanguage } from '../../../context/language-context';

type PricingCardProps = PricingPlan;

export function PricingCard(props: PricingCardProps) {
  const { language } = useLanguage();
  const { id, name, ctaHref } = props;

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
    <BasePricingCard
      plan={props}
      renderButton={() => (
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
      )}
    />
  );
}
