type ButtonVariant = 'primary' | 'secondary' | 'glass';

interface NextStepButtonProps {
  /** Whether the form/selection is valid and button can be clicked */
  isFormValid?: boolean;
  /** Loading state - shows loading text and disables button */
  loading?: boolean;
  /** Button type - defaults to 'button' */
  type?: 'button' | 'submit';
  /** Text to display on the button - defaults to 'Continue' */
  text?: string;
  /** Text to display when loading - defaults to 'Saving...' */
  loadingText?: string;
  /** Click handler - required if type is 'button' */
  onClick?: () => void;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Additional CSS classes */
  className?: string;
  /** Whether button is disabled (independent of isFormValid) */
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white hover:bg-gray-100 text-black disabled:hover:bg-white',
  secondary: 'bg-white hover:bg-gray-100 text-black disabled:hover:bg-white',
  glass:
    'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30 disabled:hover:bg-white/10',
};

export function NextStepButton({
  isFormValid = true,
  loading = false,
  type = 'button',
  text = 'Continue',
  loadingText = 'Saving...',
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: NextStepButtonProps) {
  const isDisabled = !isFormValid || loading || disabled;

  const baseStyles =
    'w-full px-8 py-4 font-semibold text-lg rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading ? loadingText : text}
    </button>
  );
}
