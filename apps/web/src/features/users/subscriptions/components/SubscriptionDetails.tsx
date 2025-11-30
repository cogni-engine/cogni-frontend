import type { UserOrganizationData } from '@/lib/api/organizationApi';
import { SubscriptionInfoBadges } from './SubscriptionInfoBadges';
import { SeatUsageMeter } from './SeatUsageMeter';
import { RenewalInfo } from './RenewalInfo';
import { CancellationWarning } from './CancellationWarning';
import { SubscriptionActions } from './SubscriptionActions';

type SubscriptionDetailsProps = {
  subscriptionPlan: string | null;
  currentOrg: UserOrganizationData;
  onManageBilling: () => void;
  onUpgrade: () => void;
  onUpdateSeats: () => void;
  isOpeningPortal: boolean;
};

export function SubscriptionDetails({
  subscriptionPlan,
  currentOrg,
  onManageBilling,
  onUpgrade,
  onUpdateSeats,
  isOpeningPortal,
}: SubscriptionDetailsProps) {
  return (
    <div className='mt-8 p-6 bg-white/5 rounded-lg border border-white/10'>
      <h2 className='text-xl font-semibold text-white mb-6'>
        Subscription Details
      </h2>

      {/* Plan and Organization Info */}
      <SubscriptionInfoBadges
        subscriptionPlan={subscriptionPlan}
        currentOrg={currentOrg}
      />

      {/* Organization Name */}
      <div className='mb-6 p-4 bg-white/5 rounded-lg border border-white/10'>
        <p className='text-sm text-white/60 mb-1'>Organization</p>
        <p className='text-base font-medium text-white'>
          {currentOrg.organization.name}
        </p>
      </div>

      {/* Seat Usage Meter - Only for Business plan */}
      {subscriptionPlan === 'business' && (
        <SeatUsageMeter organization={currentOrg.organization} />
      )}

      {/* Renewal/Cancellation Info */}
      <RenewalInfo organization={currentOrg.organization} />

      {/* Cancellation Warning */}
      <CancellationWarning organization={currentOrg.organization} />

      {/* Action Buttons */}
      <SubscriptionActions
        subscriptionPlan={subscriptionPlan}
        currentOrg={currentOrg}
        onManageBilling={onManageBilling}
        onUpgrade={onUpgrade}
        onUpdateSeats={onUpdateSeats}
        isOpeningPortal={isOpeningPortal}
      />
    </div>
  );
}
