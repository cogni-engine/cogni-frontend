import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassInput from '@/components/glass-design/GlassInput';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserOrganizationData } from '@/lib/api/organizationApi';

type UpgradeToBusinessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOrg: UserOrganizationData | null;
  onUpgrade: (seatCount: number) => void;
  isUpgrading: boolean;
};

export function UpgradeToBusinessDialog({
  open,
  onOpenChange,
  currentOrg,
  onUpgrade,
  isUpgrading,
}: UpgradeToBusinessDialogProps) {
  const [upgradeSeats, setUpgradeSeats] = useState(1);

  // Initialize seat count when dialog opens
  useEffect(() => {
    if (currentOrg && open) {
      const currentMembers = currentOrg.organization.active_member_count || 1;
      setUpgradeSeats(currentMembers);
    }
  }, [currentOrg, open]);

  const handleUpgrade = () => {
    if (currentOrg) {
      onUpgrade(upgradeSeats);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'bg-surface-primary dark:backdrop-blur-xl border border-border-default text-text-primary rounded-3xl',
          'shadow-card',
          'p-8 max-w-lg'
        )}
      >
        <DialogHeader className='space-y-3'>
          <DialogTitle className='text-2xl font-semibold text-text-primary'>
            Upgrade to Business Plan
          </DialogTitle>
          <DialogDescription className='text-text-secondary text-base leading-relaxed'>
            Upgrading to Business plan will:
            <ul className='list-disc list-inside mt-3 space-y-2 text-sm'>
              <li>Unlock team collaboration features</li>
              <li>Allow you to invite multiple team members</li>
              <li>Automatically adjust billing based on team size</li>
              <li>Pro-rate the upgrade cost to your current billing cycle</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-6'>
          <div className='space-y-3'>
            <label className='text-sm font-medium text-text-primary block'>
              Number of seats
            </label>
            <GlassInput
              type='number'
              min={currentOrg?.organization.active_member_count || 1}
              value={upgradeSeats}
              onChange={e =>
                setUpgradeSeats(Math.max(1, parseInt(e.target.value) || 1))
              }
              disabled={isUpgrading}
              className='w-full'
            />
            <p className='text-xs text-text-muted'>
              Minimum: {currentOrg?.organization.active_member_count || 1}{' '}
              (current members)
            </p>
          </div>

          <GlassCard className='p-4 rounded-xl'>
            <p className='text-sm text-text-primary'>
              <span className='font-semibold text-text-primary'>
                Monthly cost:
              </span>{' '}
              <span className='text-purple-400 font-medium'>
                ${(15 * upgradeSeats).toFixed(2)}
              </span>{' '}
              <span className='text-text-secondary'>
                ($15 × {upgradeSeats} {upgradeSeats === 1 ? 'seat' : 'seats'})
              </span>
            </p>
          </GlassCard>
        </div>

        <DialogFooter className='gap-3 sm:gap-2'>
          <GlassButton
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isUpgrading}
            className='rounded-xl px-6 py-2.5'
          >
            Cancel
          </GlassButton>
          <GlassButton
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className={cn(
              'rounded-xl px-6 py-2.5',
              'bg-gradient-to-r from-purple-500 to-purple-600',
              'hover:from-purple-600 hover:to-purple-700',
              'border-purple-400/30',
              'shadow-[0_4px_16px_rgba(139,92,246,0.3)]',
              'hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)]',
              'text-text-primary font-medium'
            )}
          >
            {isUpgrading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Upgrading...
              </>
            ) : (
              `Upgrade with ${upgradeSeats} ${upgradeSeats === 1 ? 'seat' : 'seats'}`
            )}
          </GlassButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
