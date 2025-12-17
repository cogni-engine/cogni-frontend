import { ToolbarButtonProps } from '../../types';

export const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  icon,
  title,
}: ToolbarButtonProps) => (
  <button
    type='button'
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    onMouseDown={e => e.preventDefault()} // Prevent focus loss
    disabled={disabled}
    title={title}
    className={`shrink-0 p-2.5 rounded-xl transition-all ${
      isActive
        ? 'bg-white/25 text-white shadow-inner'
        : 'bg-white/8 text-gray-300 active:bg-white/15'
    } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
  >
    {icon}
  </button>
);
