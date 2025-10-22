type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ActionButton({ onClick, children, className = "", disabled = false }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white/8 backdrop-blur-xl text-white rounded-3xl border border-white/10 hover:border-white/15 hover:bg-white/12 hover:scale-[1.01] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

