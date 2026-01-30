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

  // Define plan hierarchy for upgrade/downgrade logic
  const planHierarchy: Record<string, number> = {
    free: 0,
    pro: 1,
    business: 2,
  };

  const currentPlanLevel = planHierarchy[subscriptionPlan || 'free'] || 0;

  const getButtonText = (plan: PricingPlan, isCurrent: boolean) => {
    if (isCurrent) {
      return 'ご利用中のプラン';
    }
    if (isFreePlan) {
      return `${plan.name} に切り替える`;
    }
    return `${plan.name} にアップグレードする`;
  };

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {plansToShow.map(plan => {
        const isCurrentPlan = plan.id === subscriptionPlan;
        const planLevel = planHierarchy[plan.id] || 0;
        const isDowngrade = planLevel < currentPlanLevel;
        const isDisabled = isCurrentPlan || isDowngrade;

        return (
          <PricingCard
            key={plan.id}
            plan={plan}
            bestValueLabel={DEFAULT_PRICING_JA.bestValueLabel}
            className={`${
              isCurrentPlan ? 'ring-2 ring-blue-800' : ''
            } ${isDowngrade ? 'opacity-60' : ''}`}
            featureClassName='gap-2'
            priceClassName='text-4xl'
            showCurrentPlanBadge={isCurrentPlan}
            showRecommendedBadge={plan.isBestValue && !isCurrentPlan}
            renderButton={(plan: PricingPlan) => (
              <Button
                variant={
                  plan.isBestValue && !isCurrentPlan ? 'default' : 'outline'
                }
                className={`w-full rounded-full ${
                  plan.isBestValue && !isCurrentPlan
                    ? 'bg-blue-800 hover:bg-blue-700 text-white border-transparent'
                    : isCurrentPlan
                      ? 'bg-white/10 border-white/20 text-white cursor-not-allowed'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                }`}
                onClick={() => onPlanClick(plan.id)}
                disabled={isDisabled}
              >
                {getButtonText(plan, isCurrentPlan)}
              </Button>
            )}
          />
        );
      })}
    </div>
  );
}
