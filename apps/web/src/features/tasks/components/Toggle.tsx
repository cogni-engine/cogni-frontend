'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * iOS-style toggle switch (green when active)
 */
export function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        if (!disabled) onChange(!checked);
      }}
      disabled={disabled}
      className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${
        checked ? 'bg-emerald-500' : 'bg-white/20'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <div
        className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  );
}

