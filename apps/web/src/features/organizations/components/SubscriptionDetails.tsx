import type { UserOrganizationData } from '@/lib/api/organizationApi';
import { SubscriptionInfoBadges } from './SubscriptionInfoBadges';
import { SeatUsageMeter } from './SeatUsageMeter';
import { RenewalInfo } from './RenewalInfo';
import { CancellationWarning } from './CancellationWarning';
import { SubscriptionActions } from './SubscriptionActions';
import { PaymentStatusBanner } from './PaymentStatusBanner';

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
    <div className='mb-8'>
      {/* Payment Status Banner - Shows warnings for past_due, canceled, restricted */}
      <PaymentStatusBanner organization={currentOrg.organization} />

      {/* Current Plan Section */}
      <div className='mb-8'>
        {/* Plan Info */}
        <SubscriptionInfoBadges
          subscriptionPlan={subscriptionPlan}
          currentOrg={currentOrg}
        />
      </div>

      {/* Seat Usage Section - Only for Business plan */}
      {subscriptionPlan === 'business' && (
        <div className='mb-8'>
          <h2 className='text-xl font-bold text-white'>Seat Usage</h2>
          <SeatUsageMeter organization={currentOrg.organization} />
        </div>
      )}

      {/* Billing Information Section */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-white mb-6'>
          Billing Information
        </h2>
        {/* Renewal/Cancellation Info */}
        <RenewalInfo organization={currentOrg.organization} />
        {/* Cancellation Warning */}
        <CancellationWarning organization={currentOrg.organization} />
      </div>

      {/* Manage Subscription Section */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-white mb-6'>
          Manage Subscription
        </h2>
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
    </div>
  );
}
