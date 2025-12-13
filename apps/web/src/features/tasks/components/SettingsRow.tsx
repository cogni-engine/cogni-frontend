'use client';

import { ChevronRight } from 'lucide-react';

interface SettingsRowProps {
  label: string;
  value?: string;
  onClick?: () => void;
  showChevron?: boolean;
  customRight?: React.ReactNode;
}

/**
 * Settings row component with label, value, and optional chevron
 */
export function SettingsRow({
  label,
  value,
  onClick,
  showChevron = true,
  customRight,
}: SettingsRowProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick && !customRight}
      className='w-full flex items-center justify-between py-3.5 border-b border-white/10 last:border-b-0'
    >
      <span className='text-white text-[15px]'>{label}</span>
      <div className='flex items-center gap-1'>
        {customRight || (
          <>
            <span className='text-white/50 text-[15px]'>{value}</span>
            {showChevron && onClick && (
              <ChevronRight className='w-4 h-4 text-white/30' />
            )}
          </>
        )}
      </div>
    </button>
  );
}
