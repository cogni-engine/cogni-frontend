type HistoryToggleProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export default function HistoryToggle({ isExpanded, onToggle }: HistoryToggleProps) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 pt-2 pb-2 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        {/* HISTORYタブ */}
        <div 
          onClick={onToggle}
          className="text-white/50 text-xs font-semibold tracking-widest px-2.5 py-1 rounded-md cursor-pointer hover:bg-white/5"
        >
          HISTORY
        </div>
      </div>
      
      {/* 閉じるボタン（展開時のみ表示） */}
      {isExpanded && (
        <div 
          onClick={onToggle}
          className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      )}
    </div>
  );
}

