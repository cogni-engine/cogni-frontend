type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ActionButton({
  onClick,
  children,
  className = '',
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-surface-secondary dark:backdrop-blur-xl text-text-primary rounded-3xl border border-border-default hover:border-border-default hover:bg-interactive-hover hover:scale-[1.01] transition-all duration-300 shadow-card hover:shadow-card-hover flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
