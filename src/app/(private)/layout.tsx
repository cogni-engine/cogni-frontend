import React from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-black text-gray-200">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
