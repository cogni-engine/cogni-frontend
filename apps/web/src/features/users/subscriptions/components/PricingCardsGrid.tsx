import { Button } from '@/components/ui/button';
import { PricingCard, type PricingPlan } from '@cogni/pricing';
import { DEFAULT_PRICING_JA } from '@cogni/pricing/src/constants';

type PricingCardsGridProps = {
  subscriptionPlan: string | null;
  onPlanClick: (planId: string) => void;
};

export function PricingCardsGrid({
  subscriptionPlan,
  onPlanClick,
}: PricingCardsGridProps) {
  const isFreePlan = !subscriptionPlan || subscriptionPlan === 'free';
  const plansToShow = DEFAULT_PRICING_JA.plans.slice(0, 3);

  return (
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
                  onClick={() => onPlanClick(plan.id)}
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
  );
}
