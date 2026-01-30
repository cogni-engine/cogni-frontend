import { useState, useEffect } from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
import { Users, Loader2, AlertCircle } from 'lucide-react';
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
  const [inputValue, setInputValue] = useState('');

  // Initialize seat count when dialog opens
  useEffect(() => {
    if (currentOrg && open) {
      setInputValue(String(currentOrg.organization.seat_count || 1));
    }
  }, [currentOrg, open]);

  if (!open) return null;

  const handleUpdate = () => {
    const seatCount = parseInt(inputValue);
    if (currentOrg && !isNaN(seatCount)) {
      onUpdate(seatCount);
    }
  };

  const currentSeatCount = currentOrg?.organization.seat_count || 1;
  const minSeats = currentOrg?.organization.active_member_count || 1;
  const newSeats = parseInt(inputValue);

  // Validation logic
  const getValidationState = () => {
    if (inputValue === '') {
      return {
        isValid: false,
        message: 'Please enter a number of seats',
        type: 'empty' as const,
      };
    }

    if (isNaN(newSeats) || newSeats < 1) {
      return {
        isValid: false,
        message: 'Please enter a valid number (minimum 1)',
        type: 'invalid' as const,
      };
    }

    if (!Number.isInteger(newSeats)) {
      return {
        isValid: false,
        message: 'Seat count must be a whole number',
        type: 'notInteger' as const,
      };
    }

    if (newSeats < minSeats) {
      return {
        isValid: false,
        message: `Seat count cannot be less than ${minSeats} (your active members)`,
        type: 'tooLow' as const,
      };
    }

    if (newSeats === currentSeatCount) {
      return {
        isValid: false,
        message: 'New seat count is the same as current',
        type: 'noChange' as const,
      };
    }

    return {
      isValid: true,
      message: '',
      type: 'valid' as const,
    };
  };

  const validation = getValidationState();
  const hasChanged = !isNaN(newSeats) && newSeats !== currentSeatCount;

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
            </div>
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>
                Number of seats
              </label>
              <input
                type='number'
                step='1'
                value={inputValue}
                onChange={e => {
                  const value = e.target.value;
                  // Allow empty string or only integers (no decimals)
                  if (value === '' || /^\d+$/.test(value)) {
                    setInputValue(value);
                  }
                }}
                onKeyDown={e => {
                  // Prevent decimal point and 'e' (scientific notation)
                  if (
                    e.key === '.' ||
                    e.key === 'e' ||
                    e.key === 'E' ||
                    e.key === '-' ||
                    e.key === '+'
                  ) {
                    e.preventDefault();
                  }
                }}
                placeholder='Enter number of seats'
                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                  validation.isValid
                    ? 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20'
                    : 'border-red-500/30 focus:border-red-500/50 focus:ring-red-500/20'
                }`}
                disabled={isUpdating}
              />

              {/* Validation Message */}
              {!validation.isValid && (
                <div className='flex items-start gap-2 text-xs text-red-400'>
                  <AlertCircle className='h-3.5 w-3.5 mt-0.5 shrink-0' />
                  <span>{validation.message}</span>
                </div>
              )}

              <p className='text-xs text-white/50'>
                Current: {currentSeatCount} seats | Minimum: {minSeats} (active
                members)
              </p>
            </div>

            <div className='p-4 bg-white/5 rounded-xl border border-white/10 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-white/70'>Current cost:</span>
                <span className='text-white font-medium'>
                  ${(45 * currentSeatCount).toFixed(2)}/month
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-white/70'>New cost:</span>
                <span className='text-white font-medium'>
                  {!isNaN(newSeats) && newSeats > 0
                    ? `$${(45 * newSeats).toFixed(2)}/month`
                    : '—'}
                </span>
              </div>
              {hasChanged && validation.isValid && (
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
              disabled={isUpdating || !validation.isValid}
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
