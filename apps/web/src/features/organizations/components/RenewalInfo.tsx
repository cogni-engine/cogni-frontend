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
    <div className='mb-6 p-4 bg-white/5 rounded-lg border border-white/10'>
      <p className='text-sm text-white/60 mb-1'>
        {isCancelled ? 'Access until' : 'Renews on'}
      </p>
      <p className='text-base font-medium text-white'>
        {renewalDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}
