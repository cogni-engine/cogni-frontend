import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

type SubscriptionActionsProps = {
  subscriptionPlan: string | null;
  currentOrg: UserOrganizationData;
  onManageBilling: () => void;
  onUpgrade: () => void;
  onUpdateSeats: () => void;
  isOpeningPortal: boolean;
};

export function SubscriptionActions({
  subscriptionPlan,
  currentOrg,
  onManageBilling,
  onUpgrade,
  onUpdateSeats,
  isOpeningPortal,
}: SubscriptionActionsProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-3 mt-6'>
      {currentOrg.organization.stripe_customer_id && (
        <Button
          onClick={onManageBilling}
          variant='outline'
          disabled={isOpeningPortal}
          className='bg-blue-500/10 border-blue-500/50 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200'
          data-manage-billing
        >
          {isOpeningPortal ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Opening...
            </>
          ) : (
            <>
              <CreditCard className='mr-2 h-4 w-4' />
              {currentOrg.organization.cancel_at_period_end
                ? 'Reactivate or Manage Billing'
                : 'Manage Billing'}
            </>
          )}
        </Button>
      )}
      {subscriptionPlan === 'pro' && (
        <Button
          onClick={onUpgrade}
          variant='outline'
          className='bg-purple-500/10 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200'
        >
          Upgrade to Business
        </Button>
      )}
      {subscriptionPlan === 'business' && (
        <Button
          onClick={onUpdateSeats}
          variant='outline'
          className='bg-green-500/10 border-green-500/50 text-green-300 hover:bg-green-500/20 hover:text-green-200'
        >
          Update Seats
        </Button>
      )}
    </div>
  );
}
