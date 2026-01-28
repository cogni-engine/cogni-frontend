import { useState, useEffect } from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
import { Users, Loader2 } from 'lucide-react';
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

  if (!open) return null;

  const handleUpdate = () => {
    if (currentOrg) {
      onUpdate(newSeats);
    }
  };

  const currentSeatCount = currentOrg?.organization.seat_count || 1;
  const hasChanged = newSeats !== currentSeatCount;

  return (
    <div className='fixed inset-0 z-120 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8'>
      <GlassCard className='w-full max-w-md rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>
        <div className='flex flex-col gap-4 text-white'>
          <div className='flex items-start gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20'>
              <Users className='h-5 w-5 text-blue-300' />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold tracking-tight'>
                Update Seat Count
              </h3>
              <p className='mt-1 text-sm text-white/70'>
                Adjust the number of seats for your Business plan. You can add
                seats anytime, but cannot reduce below your current member
                count.
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>
                Number of seats
              </label>
              <input
                type='number'
                min={currentOrg?.organization.active_member_count || 1}
                value={newSeats}
                onChange={e =>
                  setNewSeats(Math.max(1, parseInt(e.target.value) || 1))
                }
                className='w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
                disabled={isUpdating}
              />
              <p className='text-xs text-white/50'>
                Current: {currentSeatCount} seats | Minimum:{' '}
                {currentOrg?.organization.active_member_count || 1} (active
                members)
              </p>
            </div>

            <div className='p-4 bg-white/5 rounded-xl border border-white/10 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-white/70'>Current cost:</span>
                <span className='text-white font-medium'>
                  ${(15 * currentSeatCount).toFixed(2)}/month
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-white/70'>New cost:</span>
                <span className='text-white font-medium'>
                  ${(15 * newSeats).toFixed(2)}/month
                </span>
              </div>
              {hasChanged && (
                <p className='text-xs text-white/50 pt-2 border-t border-white/10'>
                  Change will be pro-rated based on remaining days in billing
                  cycle
                </p>
              )}
            </div>
          </div>

          <div className='h-px bg-white/10' />

          <div className='flex justify-end gap-3'>
            <button
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
              className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating || !hasChanged}
              className='rounded-full bg-blue-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.35)] transition-colors hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isUpdating ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Updating...
                </>
              ) : (
                'Update Seats'
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
