import * as React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
import { formatRoleName } from '../utils/memberUtils';

interface OrganizationInfoCardProps {
  organization: UserOrganizationData;
  isOwner: boolean;
}

export function OrganizationInfoCard({
  organization,
  isOwner,
}: OrganizationInfoCardProps) {
  return (
    <div className='mt-8 p-6 bg-white/5 rounded-lg border border-white/10'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-white mb-2'>
          {organization.organization.name}
        </h2>
        <div className='flex items-center gap-4 text-sm text-white/60'>
          <span className='flex items-center gap-1'>
            <UsersIcon className='h-4 w-4' />
            {organization.organization.active_member_count} members
          </span>
          {organization.organization.seat_count > 0 && (
            <span>• {organization.organization.seat_count} seats</span>
          )}
        </div>
      </div>

      {/* Your Role Badge */}
      <div className='inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm text-blue-300'>
        <UsersIcon className='h-4 w-4' />
        {formatRoleName(organization.role)}
      </div>
    </div>
  );
}
