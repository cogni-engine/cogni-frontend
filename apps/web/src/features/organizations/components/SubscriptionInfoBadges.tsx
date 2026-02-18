import type { UserOrganizationData } from '@/lib/api/organizationApi';

type SubscriptionInfoBadgesProps = {
  subscriptionPlan: string | null;
  currentOrg: UserOrganizationData;
};

export function SubscriptionInfoBadges({
  subscriptionPlan,
}: SubscriptionInfoBadgesProps) {
  const planName = subscriptionPlan
    ? subscriptionPlan.charAt(0).toUpperCase() + subscriptionPlan.slice(1)
    : 'Free';

  return (
    <div className='py-4 border-b border-border-default'>
      <div className='text-xl text-text-primary'>
        Plan: <span className='font-semibold'>{planName}</span>
      </div>
    </div>
  );
}
