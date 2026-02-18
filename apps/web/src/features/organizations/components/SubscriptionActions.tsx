import {
  ChevronRight,
  CreditCard,
  Loader2,
  ArrowUpCircle,
  Users,
} from 'lucide-react';
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
    <div className='space-y-0'>
      {currentOrg.organization.stripe_customer_id && (
        <button
          onClick={onManageBilling}
          disabled={isOpeningPortal}
          className='w-full py-4 flex items-center justify-between border-b border-border-default hover:bg-surface-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          data-manage-billing
        >
          <div className='flex items-center gap-3'>
            <CreditCard className='h-5 w-5 text-text-secondary' />
            <div className='text-left'>
              <div className='text-base text-text-primary font-medium'>
                {currentOrg.organization.cancel_at_period_end
                  ? 'Reactivate or manage billing'
                  : 'Manage billing'}
              </div>
              <div className='text-sm text-text-secondary mt-0.5'>
                Update payment method, invoices, and more
              </div>
            </div>
          </div>
          {isOpeningPortal ? (
            <Loader2 className='h-5 w-5 text-text-muted animate-spin' />
          ) : (
            <ChevronRight className='h-5 w-5 text-text-muted' />
          )}
        </button>
      )}

      {subscriptionPlan === 'pro' && (
        <button
          onClick={onUpgrade}
          className='w-full py-4 flex items-center justify-between border-b border-border-default hover:bg-surface-primary transition-colors'
        >
          <div className='flex items-center gap-3'>
            <ArrowUpCircle className='h-5 w-5 text-blue-600 dark:text-blue-400' />
            <div className='text-left'>
              <div className='text-base text-text-primary font-medium'>
                Upgrade to Business
              </div>
              <div className='text-sm text-text-secondary mt-0.5'>
                Add team members and collaboration features
              </div>
            </div>
          </div>
          <ChevronRight className='h-5 w-5 text-text-muted' />
        </button>
      )}

      {subscriptionPlan === 'business' && (
        <button
          onClick={onUpdateSeats}
          className='w-full py-4 flex items-center justify-between border-b border-border-default hover:bg-surface-primary transition-colors'
        >
          <div className='flex items-center gap-3'>
            <Users className='h-5 w-5 text-blue-600 dark:text-blue-400' />
            <div className='text-left'>
              <div className='text-base text-text-primary font-medium'>
                Update seats
              </div>
              <div className='text-sm text-text-secondary mt-0.5'>
                Add or remove team member seats
              </div>
            </div>
          </div>
          <ChevronRight className='h-5 w-5 text-text-muted' />
        </button>
      )}
    </div>
  );
}
