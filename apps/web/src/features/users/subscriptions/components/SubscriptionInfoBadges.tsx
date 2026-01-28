import { Award, Users } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

type SubscriptionInfoBadgesProps = {
  subscriptionPlan: string | null;
  currentOrg: UserOrganizationData;
};

export function SubscriptionInfoBadges({
  subscriptionPlan,
  currentOrg,
}: SubscriptionInfoBadgesProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
      {/* Plan Badge */}
      <div className='flex items-start gap-3'>
        <div className='p-2 bg-purple-500/20 rounded-lg'>
          <Award className='h-5 w-5 text-purple-400' />
        </div>
        <div>
          <p className='text-sm text-white/60'>Current Plan</p>
          <p className='text-lg font-semibold text-white'>
            {subscriptionPlan?.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Role Badge */}
      <div className='flex items-start gap-3'>
        {/* <div className='p-2 bg-blue-500/20 rounded-lg'>
          <Users className='h-5 w-5 text-blue-400' />
        </div>
        <div>
          <p className='text-sm text-white/60'>Your Role</p>
          <p className='text-lg font-semibold text-white'>
            {currentOrg.role === 'owner'
              ? 'Owner'
              : currentOrg.role.charAt(0).toUpperCase() +
                currentOrg.role.slice(1)}
          </p>
        </div> */}
      </div>
    </div>
  );
}
