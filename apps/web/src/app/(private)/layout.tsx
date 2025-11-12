'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { GlobalUIProvider, useGlobalUI } from '@/contexts/GlobalUIContext';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-textarea/styles.css';
import { createClient } from '@/lib/supabase/browserClient';
import {
  setCurrentUserId,
  getCurrentUserId,
  getCookie,
  setCookie,
  COOKIE_KEYS,
} from '@/lib/cookies';
import { getPersonalWorkspace } from '@/lib/api/workspaceApi';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isInputActive } = useGlobalUI();
  const [isMobile, setIsMobile] = useState(false);
  const supabase = createClient();

  // Setup user session after OAuth login
  useEffect(() => {
    const setupUserSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Set user ID if not already set
        const currentUserId = getCurrentUserId();
        if (!currentUserId && user.id) {
          setCurrentUserId(user.id);
        }

        // Fetch and set personal workspace if not already set
        const personalWorkspaceId = getCookie(
          COOKIE_KEYS.PERSONAL_WORKSPACE_ID
        );
        if (!personalWorkspaceId) {
          try {
            const personalWorkspace = await getPersonalWorkspace();
            if (personalWorkspace?.id) {
              setCookie(
                COOKIE_KEYS.PERSONAL_WORKSPACE_ID,
                personalWorkspace.id.toString()
              );
            }
          } catch (error) {
            // Log but don't fail - workspace might not exist yet
            console.warn('Failed to fetch personal workspace:', error);
          }
        }
      } catch (error) {
        console.error('Error setting up user session:', error);
      }
    };

    setupUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <GlobalUIProvider>
      <CopilotKit runtimeUrl='/api/copilotkit'>
        <LayoutContent>{children}</LayoutContent>
      </CopilotKit>
    </GlobalUIProvider>
  );
}
