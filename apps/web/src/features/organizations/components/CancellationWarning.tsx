import { AlertTriangle } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

type CancellationWarningProps = {
  organization: UserOrganizationData['organization'];
};

export function CancellationWarning({
  organization,
}: CancellationWarningProps) {
  if (!organization.cancel_at_period_end || !organization.current_period_end) {
    return null;
  }

  const cancellationDate = new Date(organization.current_period_end);

  return (
    <div className='mb-6 p-4 bg-orange-500/10 border border-orange-500/50 rounded-lg flex items-start gap-3'>
      <AlertTriangle className='h-5 w-5 text-orange-300 shrink-0 mt-0.5' />
      <div className='text-orange-300 text-sm'>
        <p className='font-medium mb-1'>
          Subscription Scheduled for Cancellation
        </p>
        <p>
          Your subscription will be canceled on{' '}
          {cancellationDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          . You can reactivate it anytime before then in the billing portal.
        </p>
      </div>
    </div>
  );
}
