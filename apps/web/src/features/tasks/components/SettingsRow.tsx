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
  const className =
    'w-full flex items-center justify-between py-3.5 border-b border-border-default last:border-b-0';

  // customRightがある場合は<button>ではなく<div>を使う
  // （customRightに<button>が含まれる可能性があるため、ネストされた<button>を避ける）
  if (customRight) {
    return (
      <div className={className}>
        <span className='text-text-primary text-[15px]'>{label}</span>
        <div className='flex items-center gap-1'>{customRight}</div>
      </div>
    );
  }

  // onClickがある場合は<button>を使用
  return (
    <button onClick={onClick} className={className}>
      <span className='text-text-primary text-[15px]'>{label}</span>
      <div className='flex items-center gap-1'>
        <span className='text-text-muted text-[15px]'>{value}</span>
        {showChevron && onClick && (
          <ChevronRight className='w-4 h-4 text-text-muted' />
        )}
      </div>
    </button>
  );
}
