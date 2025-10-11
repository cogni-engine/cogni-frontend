export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 flex items-center justify-center mb-6">
        <div className="relative">
          {/* 彗星の核 */}
          <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
          {/* アシンメトリーな彗星の尾 */}
          <div className="absolute top-1/2 left-0 w-16 h-0.5 bg-gradient-to-r from-white/60 via-white/30 to-transparent transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-14 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent transform -translate-y-1/2 translate-y-2"></div>
          <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-gradient-to-r from-white/30 via-white/15 to-transparent transform -translate-y-1/2 -translate-y-2"></div>
          <div className="absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -translate-y-1/2 translate-y-3"></div>
          <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/15 via-white/5 to-transparent transform -translate-y-1/2 -translate-y-3"></div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Cogno
      </h2>
      <p className="text-gray-400 max-w-md text-lg">
        Your cosmic AI companion. Ask anything, explore everything.
      </p>
    </div>
  );
}

