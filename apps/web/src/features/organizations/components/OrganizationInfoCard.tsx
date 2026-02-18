import * as React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

interface OrganizationInfoCardProps {
  organization: UserOrganizationData;
}

export function OrganizationInfoCard({
  organization,
}: OrganizationInfoCardProps) {
  return (
    <div className='mt-8 p-6 bg-surface-primary rounded-lg border border-border-default'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-text-primary mb-2'>
          {organization.organization.name}
        </h2>
        <div className='flex items-center gap-4 text-sm text-text-secondary'>
          <span className='flex items-center gap-1'>
            <UsersIcon className='h-4 w-4' />
            {organization.organization.active_member_count} members
          </span>
          {organization.organization.seat_count > 0 && (
            <span>• {organization.organization.seat_count} seats</span>
          )}
        </div>
      </div>
    </div>
  );
}
