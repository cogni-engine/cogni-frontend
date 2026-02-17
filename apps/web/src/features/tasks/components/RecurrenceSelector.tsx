'use client';

import { Check } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@/components/ui/drawer';
import { RECURRENCE_OPTIONS } from '../utils/formatters';

interface RecurrenceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/**
 * Recurrence selector drawer for task scheduling
 */
export function RecurrenceSelector({
  value,
  onChange,
  onClose,
}: RecurrenceSelectorProps) {
  return (
    <Drawer open={true} onOpenChange={open => !open && onClose()}>
      <DrawerContent zIndex={120} swipeToClose={false}>
        {/* Header */}
        <DrawerHeader className='p-4'>
          <button
            onClick={onClose}
            className='text-blue-600 dark:text-blue-400 text-[15px]'
          >
            Cancel
          </button>
          <span className='text-text-primary text-[17px] font-semibold'>
            Repeat
          </span>
          <button
            onClick={onClose}
            className='text-blue-600 dark:text-blue-400 text-[15px]'
          >
            Done
          </button>
        </DrawerHeader>

        {/* Content */}
        <DrawerBody className='pt-0 space-y-1'>
          {RECURRENCE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                value === option.value
                  ? 'bg-interactive-hover text-text-primary'
                  : 'text-text-secondary hover:bg-surface-primary'
              }`}
            >
              <div className='flex items-center justify-between'>
                {option.label}
                {value === option.value && (
                  <Check className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                )}
              </div>
            </button>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
