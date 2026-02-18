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
      ? 'bg-interactive-active text-foreground shadow-inner'
      : 'bg-surface-secondary text-text-secondary active:bg-interactive-active'
  } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`;

  // Minimal variant: no background, text color indicates state
  const minimalClasses = `shrink-0 p-2.5 rounded-xl transition-all ${
    isActive
      ? 'text-foreground'
      : 'text-text-muted hover:text-text-secondary active:text-foreground'
  } ${disabled ? 'opacity-40 cursor-not-allowed text-text-muted' : ''}`;

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
