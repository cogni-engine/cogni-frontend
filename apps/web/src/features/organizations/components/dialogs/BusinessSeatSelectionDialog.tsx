'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import { Users, Info } from 'lucide-react';

interface BusinessSeatSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusinessSeatSelectionDialog({
  open,
  onOpenChange,
}: BusinessSeatSelectionDialogProps) {
  const router = useRouter();
  const [seatCount, setSeatCount] = useState(1);

  const handleContinue = () => {
    // Pass seat count via URL parameter
    router.push(`/checkout/business?seats=${seatCount}`);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent zIndex={150} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-6 pb-2 pt-0'>
          <DrawerTitle>Select Number of Seats</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleContinue();
            }}
            className='space-y-6 px-4'
          >
            <div className='p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl'>
              <div className='flex items-start gap-2 text-sm text-blue-200'>
                <Info className='h-4 w-4 mt-0.5 shrink-0' />
                <p>
                  Business plans are charged per seat. Each seat allows one team
                  member to access your organization.
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='seat-count'
                className='text-sm font-medium text-text-secondary'
              >
                Number of seats
              </label>
              <input
                id='seat-count'
                type='number'
                min={1}
                value={seatCount}
                onChange={e =>
                  setSeatCount(Math.max(1, parseInt(e.target.value) || 1))
                }
                className='w-full px-4 py-3.5 bg-surface-primary border border-border-default rounded-xl text-text-primary focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
                autoFocus
              />
              <p className='text-xs text-text-muted'>
                You can add or remove seats anytime after subscribing
              </p>
            </div>

            <GlassCard className='p-4 rounded-xl bg-surface-primary'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-text-secondary'>Price per seat:</span>
                  <span className='text-text-primary font-medium'>
                    $15/month
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-text-secondary'>Number of seats:</span>
                  <span className='text-text-primary font-medium'>
                    {seatCount}
                  </span>
                </div>
                <div className='h-px bg-border-default my-2' />
                <div className='flex justify-between'>
                  <span className='text-text-primary font-semibold'>
                    Total monthly cost:
                  </span>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg'>
                    ${(15 * seatCount).toFixed(2)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </form>
        </DrawerBody>

        <DrawerFooter className='px-4 pb-6'>
          <div className='flex gap-2 w-full'>
            <GlassButton
              type='button'
              onClick={() => onOpenChange(false)}
              className='flex-1 h-12'
            >
              Cancel
            </GlassButton>
            <GlassButton
              type='button'
              onClick={handleContinue}
              className='flex-1 h-12 bg-blue-500/20 hover:bg-blue-500/30'
            >
              <Users className='mr-2 h-4 w-4' />
              Continue to Checkout
            </GlassButton>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
