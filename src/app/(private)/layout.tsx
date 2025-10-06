import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <h1 className="text-lg font-semibold text-white">Cogno</h1>
        <div className="relative">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          {/* アシンメトリーな彗星の尾 */}
          <div className="absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/50 via-white/20 to-transparent transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/30 via-white/10 to-transparent transform -translate-y-1/2 translate-y-1.5"></div>
          <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/20 via-white/5 to-transparent transform -translate-y-1/2 -translate-y-1.5"></div>
          <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-white/15 via-white/3 to-transparent transform -translate-y-1/2 translate-y-2.5"></div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}