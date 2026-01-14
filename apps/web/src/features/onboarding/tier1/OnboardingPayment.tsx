import { NextStepButton } from '../components/NextStepButton';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface OnboardingPaymentProps {
  error: string | null;
  loading: boolean;
  handleContinue: () => void;
  handleBack: () => void;
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
    price: '$12',
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
    price: '$49',
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
  handleBack,
}: OnboardingPaymentProps) {
  const [selectedTier, setSelectedTier] = useState<string>('Free');

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      <div className='text-center space-y-3'>
        <h1 className='text-4xl font-bold text-white'>Choose Your Plan</h1>
        <p className='text-xl text-gray-300'>
          Start with free and upgrade anytime
        </p>
      </div>

      {/* Pricing Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {pricingTiers.map(tier => (
          <button
            key={tier.name}
            onClick={() => setSelectedTier(tier.name)}
            className={`relative text-left p-6 rounded-2xl border transition-all duration-200 ${
              selectedTier === tier.name
                ? tier.highlighted
                  ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                  : 'bg-white/10 border-white/30 shadow-lg'
                : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
            } backdrop-blur-sm`}
          >
            {/* Badge */}
            {tier.badge && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                <span className='bg-linear-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                  {tier.badge}
                </span>
              </div>
            )}

            {/* Selected Indicator */}
            {selectedTier === tier.name && (
              <div className='absolute top-4 right-4'>
                <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                  <Check className='w-4 h-4 text-white' />
                </div>
              </div>
            )}

            <div className='space-y-4'>
              {/* Tier Name */}
              <h3 className='text-2xl font-bold text-white'>{tier.name}</h3>

              {/* Price */}
              <div className='space-y-1'>
                <div className='flex items-baseline gap-1'>
                  <span className='text-4xl font-bold text-white'>
                    {tier.price}
                  </span>
                  <span className='text-gray-400 text-sm'>/{tier.period}</span>
                </div>
                <p className='text-gray-400 text-sm'>{tier.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info Banner */}
      <div className='bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm'>
        <p className='text-blue-200 text-sm text-center'>
          💡 You can change your plan anytime from settings. No credit card
          required for free tier.
        </p>
      </div>

      {error && (
        <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm'>
          <p className='text-red-300 text-sm'>{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex justify-between items-center pt-4'>
        <button
          onClick={handleBack}
          className='text-gray-400 hover:text-white transition-colors'
        >
          ← Back
        </button>
        <NextStepButton
          type='button'
          onClick={handleContinue}
          loading={loading}
          variant='glass'
          text={`Continue with ${selectedTier} →`}
          loadingText='Processing...'
        />
      </div>
    </div>
  );
}
