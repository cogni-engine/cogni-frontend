import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

interface OrganizationSelectorProps {
  organizations: UserOrganizationData[];
  currentOrg: UserOrganizationData | null;
  onOrganizationChange: (orgId: number) => void;
}

export function OrganizationSelector({
  organizations,
  currentOrg,
  onOrganizationChange,
}: OrganizationSelectorProps) {
  // Don't show selector if there's only one organization
  if (organizations.length <= 1 || !currentOrg) {
    return null;
  }

  return (
    <div className='flex flex-col items-end gap-1'>
      <label className='text-xs text-white/60'>Select Organization</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='w-full md:w-auto justify-between text-left font-normal'
          >
            <span>
              {currentOrg.organization.name} ({currentOrg.role})
            </span>
            <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-[--radix-dropdown-menu-trigger-width]'
          align='start'
        >
          <DropdownMenuRadioGroup
            value={String(currentOrg.organization.id)}
            onValueChange={value => onOrganizationChange(Number(value))}
          >
            {organizations.map(org => (
              <DropdownMenuRadioItem
                key={org.organization.id}
                value={String(org.organization.id)}
              >
                {org.organization.name} ({org.role})
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
