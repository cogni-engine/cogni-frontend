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

type UpdateSeatsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOrg: UserOrganizationData | null;
  onUpdate: (seatCount: number) => void;
  isUpdating: boolean;
};

export function UpdateSeatsDialog({
  open,
  onOpenChange,
  currentOrg,
  onUpdate,
  isUpdating,
}: UpdateSeatsDialogProps) {
  const [newSeats, setNewSeats] = useState(1);

  // Initialize seat count when dialog opens
  useEffect(() => {
    if (currentOrg && open) {
      const currentMembers = currentOrg.organization.active_member_count || 1;
      setNewSeats(currentOrg.organization.seat_count || currentMembers);
    }
  }, [currentOrg, open]);

  const handleUpdate = () => {
    if (currentOrg) {
      onUpdate(newSeats);
    }
  };

  const currentSeatCount = currentOrg?.organization.seat_count || 1;
  const hasChanged = newSeats !== currentSeatCount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-gray-900 border-white/10 text-white'>
        <DialogHeader>
          <DialogTitle>Update Seat Count</DialogTitle>
          <DialogDescription className='text-white/60'>
            Adjust the number of seats for your Business plan. You can add seats
            anytime, but cannot reduce below your current member count.
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
              value={newSeats}
              onChange={e =>
                setNewSeats(Math.max(1, parseInt(e.target.value) || 1))
              }
              className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500'
              disabled={isUpdating}
            />
            <p className='text-xs text-white/40'>
              Current: {currentSeatCount} seats | Minimum:{' '}
              {currentOrg?.organization.active_member_count || 1} (active
              members)
            </p>
          </div>

          <div className='p-3 bg-white/5 rounded-lg border border-white/10 space-y-2'>
            <p className='text-sm text-white/80'>
              <span className='font-medium'>Current cost:</span> $
              {(15 * currentSeatCount).toFixed(2)}/month
            </p>
            <p className='text-sm text-white/80'>
              <span className='font-medium'>New cost:</span> $
              {(15 * newSeats).toFixed(2)}/month
            </p>
            {hasChanged && (
              <p className='text-xs text-white/60 pt-2 border-t border-white/10'>
                Change will be pro-rated based on remaining days in billing
                cycle
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isUpdating || !hasChanged}
            className='bg-green-500 hover:bg-green-600'
          >
            {isUpdating ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Updating...
              </>
            ) : (
              'Update Seats'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
