import * as React from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
import { Building2, ChevronDown, Check } from 'lucide-react';
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
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!currentOrg) {
    return null;
  }

  // If only one organization, show it as display only (no dropdown)
  if (organizations.length <= 1) {
    return (
      <GlassCard className='flex items-center gap-3 px-4 py-2.5 rounded-3xl w-full md:w-[400px]'>
        <div className='flex items-center justify-center w-8 h-8 rounded-2xl bg-surface-primary'>
          <Building2 className='w-4 h-4 text-blue-600 dark:text-blue-400' />
        </div>
        <div className='text-left'>
          <div className='text-sm font-semibold text-text-primary'>
            {currentOrg.organization.name}
          </div>
          <div className='text-xs text-text-muted capitalize'>
            {currentOrg.role}
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className='relative w-full md:w-[400px]' ref={dropdownRef}>
      {/* Organization Display / Selector */}
      <GlassCard
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 px-4 py-2.5 rounded-3xl cursor-pointer group transition-all duration-200 hover:bg-surface-primary w-full'
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-2xl bg-surface-primary'>
          <Building2 className='w-4 h-4 text-blue-600 dark:text-blue-400' />
        </div>
        <div className='flex-1 text-left'>
          <div className='text-sm font-semibold text-text-primary'>
            {currentOrg.organization.name}
          </div>
          <div className='text-xs text-text-muted capitalize'>
            {currentOrg.role}
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform duration-200 group-hover:text-text-primary ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </GlassCard>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute z-50 left-0 right-0 mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200'>
          <GlassCard className='rounded-3xl p-2 bg-surface-secondary dark:backdrop-blur-xl border border-border-default'>
            <div className='space-y-1'>
              {organizations.map(org => {
                const isSelected =
                  org.organization.id === currentOrg.organization.id;

                return (
                  <button
                    key={org.organization.id}
                    onClick={() => {
                      onOrganizationChange(org.organization.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-blue-500/20 hover:bg-blue-500/25'
                        : 'hover:bg-interactive-hover'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-2xl ${
                        isSelected ? 'bg-blue-500/20' : 'bg-surface-primary'
                      }`}
                    >
                      <Building2 className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    </div>
                    <div className='flex-1 text-left'>
                      <div className='text-sm font-semibold text-text-primary'>
                        {org.organization.name}
                      </div>
                      <div className='text-xs text-text-muted capitalize'>
                        {org.role}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
