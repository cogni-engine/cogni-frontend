import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
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
      <DialogContent className='bg-gray-900 border-white/10 text-white'>
        <DialogHeader>
          <DialogTitle>Upgrade to Business Plan</DialogTitle>
          <DialogDescription className='text-white/60'>
            Upgrading to Business plan will:
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>Unlock team collaboration features</li>
              <li>Allow you to invite multiple team members</li>
              <li>Automatically adjust billing based on team size</li>
              <li>Pro-rate the upgrade cost to your current billing cycle</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-white'>
              Number of seats
            </label>
            <input
              type='number'
              min={currentOrg?.organization.active_member_count || 1}
              value={upgradeSeats}
              onChange={e =>
                setUpgradeSeats(Math.max(1, parseInt(e.target.value) || 1))
              }
              className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              disabled={isUpgrading}
            />
            <p className='text-xs text-white/40'>
              Minimum: {currentOrg?.organization.active_member_count || 1}{' '}
              (current members)
            </p>
          </div>

          <div className='p-3 bg-white/5 rounded-lg border border-white/10'>
            <p className='text-sm text-white/80'>
              <span className='font-medium'>Monthly cost:</span> $
              {(15 * upgradeSeats).toFixed(2)} ($15 × {upgradeSeats} seats)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isUpgrading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className='bg-purple-500 hover:bg-purple-600'
          >
            {isUpgrading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Upgrading...
              </>
            ) : (
              `Upgrade with ${upgradeSeats} seats`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
