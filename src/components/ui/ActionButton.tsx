type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function ActionButton({ onClick, children, className = "" }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white/8 backdrop-blur-md text-white rounded-3xl border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-sm ${className}`}
    >
      {children}
    </button>
  );
}

