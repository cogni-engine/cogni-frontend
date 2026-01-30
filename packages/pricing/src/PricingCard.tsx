'use client';

import * as React from 'react';
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Brain,
  Settings,
  Users,
  Video,
  Code,
  Check,
} from 'lucide-react';
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
  /**
   * Show "Current Plan" badge
   */
  showCurrentPlanBadge?: boolean;
  /**
   * Show "Recommended" badge
   */
  showRecommendedBadge?: boolean;
};

// Icon mapping for features
const getFeatureIcon = (index: number) => {
  const icons = [
    Sparkles,
    MessageSquare,
    ImageIcon,
    Brain,
    Settings,
    Users,
    Video,
    Code,
  ];
  return icons[index % icons.length];
};

export function PricingCard({
  plan,
  bestValueLabel = 'Best Value',
  renderButton,
  className = '',
  featureClassName = '',
  priceClassName = 'text-4xl',
  showCurrentPlanBadge = false,
  showRecommendedBadge = false,
}: PricingCardProps) {
  const { id, name, description, price, priceNote, isBestValue, features } =
    plan;

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all ${className}`}
    >
      {/* Badges - top right corner */}
      {(showCurrentPlanBadge || showRecommendedBadge) && (
        <div className='absolute -top-3 right-4 z-10'>
          {showCurrentPlanBadge && (
            <span className='bg-blue-800 text-white text-xs font-semibold px-3 py-1 rounded-full'>
              ご利用中のプラン
            </span>
          )}
          {showRecommendedBadge && (
            <span className='bg-blue-800 text-white text-xs font-semibold px-3 py-1 rounded-full'>
              推奨
            </span>
          )}
        </div>
      )}

      {/* Header section */}
      <div className='mb-4'>
        <h3 className='mb-2 text-2xl font-semibold text-white'>{name}</h3>
        <p className='text-sm text-white/70 leading-relaxed'>{description}</p>
      </div>

      {/* Price section */}
      <div className='mb-6'>
        {price && (
          <div className='flex items-baseline gap-2'>
            <span className={`font-bold text-white ${priceClassName}`}>
              {price}
            </span>
            {priceNote && (
              <span className='text-base text-white/60'>{priceNote}</span>
            )}
          </div>
        )}
      </div>

      {/* Button section */}
      {renderButton && (
        <div className='mb-6'>{renderButton(plan)}</div>
      )}

      {/* Features section */}
      <div className='flex-1 space-y-4'>
        {features.map((feature, index) => {
          if (!feature.included) return null;
          const IconComponent = getFeatureIcon(index);
          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${featureClassName}`}
            >
              <IconComponent className='mt-0.5 h-5 w-5 flex-shrink-0 text-white/80' />
              <span className='text-sm leading-relaxed text-white/80'>
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

