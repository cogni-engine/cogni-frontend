import type { UserOrganizationData } from '@/lib/api/organizationApi';

type RenewalInfoProps = {
  organization: UserOrganizationData['organization'];
};

export function RenewalInfo({ organization }: RenewalInfoProps) {
  if (
    !organization.stripe_subscription_id ||
    !organization.current_period_end
  ) {
    return null;
  }

  const renewalDate = new Date(organization.current_period_end);
  const isCancelled = organization.cancel_at_period_end;

  return (
    <div className='py-4 border-b border-border-default'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-base text-text-primary font-medium'>
            {isCancelled ? 'Access until' : 'Next billing date'}
          </div>
          <div className='text-sm text-text-secondary mt-1'>
            {isCancelled
              ? 'Your subscription will end on this date'
              : 'Your subscription will renew on this date'}
          </div>
        </div>
        <div className='text-base text-text-primary font-medium'>
          {renewalDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
