'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@/components/ui/drawer';

interface LabelInputDrawerProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/**
 * Label input drawer for task naming
 */
export function LabelInputDrawer({
  value,
  onChange,
  onClose,
}: LabelInputDrawerProps) {
  return (
    <Drawer open={true} onOpenChange={open => !open && onClose()}>
      <DrawerContent zIndex={80} swipeToClose={false}>
        {/* Header */}
        <DrawerHeader className='p-4'>
          <button onClick={onClose} className='text-blue-400 text-[15px]'>
            Cancel
          </button>
          <span className='text-white text-[17px] font-semibold'>Label</span>
          <button onClick={onClose} className='text-blue-400 text-[15px]'>
            Done
          </button>
        </DrawerHeader>

        {/* Content */}
        <DrawerBody className='pt-0'>
          <input
            type='text'
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder='Task name'
            autoFocus
            className='w-full bg-white/5 text-white text-[17px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-blue-400 placeholder:text-white/30 transition-colors'
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
