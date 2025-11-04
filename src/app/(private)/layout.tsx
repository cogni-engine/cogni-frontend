'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ThreadSidebar from '@/features/thread/ThreadSidebar';
import { ThreadProvider } from '@/contexts/ThreadContext';
import { UIProvider, useUI } from '@/contexts/UIContext';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-textarea/styles.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isInputActive } = useUI();
  const [isMobile, setIsMobile] = useState(false);

  const showTopLevelChrome =
    pathname === '/home' ||
    pathname === '/notes' ||
    pathname === '/workspace' ||
    pathname === '/personal' ||
    pathname === '/user/settings';

  // モバイル判定（768px以下）
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初回チェック
    checkMobile();

    // リサイズ時にチェック
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // モバイルかつ入力中の場合のみフッターを非表示、デスクトップでは常に表示
  const shouldShowFooter = showTopLevelChrome && (!isMobile || !isInputActive);

  return (
    <div className='flex flex-col h-screen bg-black text-gray-200 relative'>
      {/* Thread Sidebar */}
      <ThreadSidebar />

      {/* Main Layout */}
      <div className='flex flex-col h-screen'>
        {/* Header */}
        {showTopLevelChrome && <Header />}

        {/* Main */}
        <main className='flex-1 overflow-hidden'>{children}</main>

        {/* Bottom Navigation - モバイルかつ入力中は非表示、デスクトップでは常に表示 */}
        {shouldShowFooter && <BottomNav />}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreadProvider>
      <UIProvider>
        <CopilotKit runtimeUrl='/api/copilotkit'>
          <LayoutContent>{children}</LayoutContent>
        </CopilotKit>
      </UIProvider>
    </ThreadProvider>
  );
}
