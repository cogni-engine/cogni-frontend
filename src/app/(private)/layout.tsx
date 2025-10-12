import React from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { ThreadProvider } from "@/contexts/ThreadContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreadProvider>
      <div className="flex flex-col h-screen bg-black text-gray-200">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="flex-1 overflow-hidden">{children}</main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </ThreadProvider>
  );
}
