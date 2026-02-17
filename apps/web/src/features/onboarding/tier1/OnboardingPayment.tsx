import { NextStepButton } from '../components/NextStepButton';
import { X } from 'lucide-react';
import { useState } from 'react';

interface OnboardingPaymentProps {
  error: string | null;
  loading: boolean;
  handleContinue: () => void;
  handleBack: () => void;
  userName?: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Unlimited notes',
      'Basic AI assistance',
      '1 workspace',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$40',
    period: 'per month',
    description: 'For power users',
    features: [
      'Everything in Free',
      'Advanced AI features',
      'Unlimited workspaces',
      'Priority support',
      'Custom integrations',
      'Advanced analytics',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: '$45',
    period: 'per month',
    description: 'For growing teams',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared workspaces',
      'Admin controls',
      'Team analytics',
      'Dedicated support',
    ],
  },
];

export function OnboardingPayment({
  error,
  loading,
  handleContinue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBack: _handleBack,
  userName,
}: OnboardingPaymentProps) {
  const [selectedTier, setSelectedTier] = useState<string>('Free');

  return (
    <div className='flex flex-col h-full animate-in fade-in duration-500'>
      {/* Close button - top right */}
      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleContinue}
          className='text-text-muted hover:text-text-secondary transition-colors p-2'
          aria-label='Close'
        >
          <X className='size-6' />
        </button>
      </div>

      {/* Header */}
      <div className='shrink-0 text-center space-y-3 mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-text-primary leading-tight'>
          Hey {userName || 'there'}! It&apos;s time to get full access to Cogno!
        </h1>
      </div>

      {/* Scrollable Content: Pricing Cards */}
      <div className='flex-1 overflow-y-auto min-h-0 question-card-scroll'>
        <div className='space-y-4'>
          {/* Pricing Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {pricingTiers.map(tier => (
              <button
                key={tier.name}
                type='button'
                onClick={() => setSelectedTier(tier.name)}
                className={`relative w-full py-4 px-4 text-left rounded-xl dark:backdrop-blur-md transition-all duration-200 ${
                  tier.name === 'Pro'
                    ? 'bg-interactive-hover border-2 border-border-default'
                    : 'bg-surface-primary border border-border-default'
                } ${
                  selectedTier === tier.name
                    ? 'text-text-primary ring-2 ring-ring'
                    : 'text-text-secondary'
                }`}
              >
                <div className='space-y-2'>
                  {/* Tier Name */}
                  <h3 className='text-xl font-bold'>{tier.name}</h3>

                  {/* Price */}
                  <div className='space-y-0.5'>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-bold'>{tier.price}</span>
                      <span className='text-sm opacity-70'>/{tier.period}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className='bg-surface-primary border border-border-default rounded-xl p-4 dark:backdrop-blur-sm mt-4'>
            <p className='text-text-muted text-sm text-center'>
              You can change your plan anytime from settings. No credit card
              required for free tier.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mt-4 bg-red-900/30 border border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm'>
              <p className='text-red-600 dark:text-red-300 text-sm'>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer: Continue Button */}
      <div className='shrink-0 mt-4 pt-6'>
        <NextStepButton
          type='button'
          onClick={handleContinue}
          loading={loading}
          variant='primary'
          text={
            selectedTier === 'Free'
              ? 'Try for $0'
              : `Continue with ${selectedTier}`
          }
          loadingText='Processing...'
        />
      </div>
    </div>
  );
}
