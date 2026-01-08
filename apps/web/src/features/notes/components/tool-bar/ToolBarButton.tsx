import { ToolbarButtonProps } from '../../types';

export const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  icon,
  title,
  variant = 'default',
}: ToolbarButtonProps) => {
  // Default variant: has background
  const defaultClasses = `shrink-0 p-2.5 rounded-xl transition-all ${
    isActive
      ? 'bg-white/25 text-white shadow-inner'
      : 'bg-white/8 text-gray-300 active:bg-white/15'
  } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`;

  // Minimal variant: no background, text color indicates state
  const minimalClasses = `shrink-0 p-2.5 rounded-xl transition-all ${
    isActive
      ? 'text-white'
      : 'text-gray-400 hover:text-gray-200 active:text-white'
  } ${disabled ? 'opacity-40 cursor-not-allowed text-gray-600' : ''}`;

  return (
    <button
      type='button'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      onMouseDown={e => e.preventDefault()} // Prevent focus loss
      disabled={disabled}
      title={title}
      className={variant === 'minimal' ? minimalClasses : defaultClasses}
    >
      {icon}
    </button>
  );
};
