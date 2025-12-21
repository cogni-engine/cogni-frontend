'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
} from '@cogni/utils';
import { getPersonalWorkspace } from '@/lib/api/workspaceApi';
import NoteDrawer from '@/components/NoteDrawer';
import FilePreviewDrawer from '@/components/FilePreviewDrawer';
import ChatMessageDrawer from '@/components/ChatMessageDrawer';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isInputActive,
    isDrawerOpen,
    noteDrawerOpen,
    selectedNoteId,
    closeNoteDrawer,
    fileDrawerOpen,
    selectedFile,
    closeFileDrawer,
  } = useGlobalUI();
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

  // Global postMessage listener for mobile app navigation
  useEffect(() => {
    const handleMobileNavigation = (event: MessageEvent) => {
      try {
        const data = event.data;

        if (data.type === 'NAVIGATE_TO_MESSAGE') {
          const { workspaceId, messageId } = data;

          if (workspaceId && messageId) {
            console.log('🌐 Global navigation from mobile:', {
              workspaceId,
              messageId,
            });
            // Use Next.js router to navigate (client-side, no page reload)
            router.push(
              `/workspace/${workspaceId}/chat?messageId=${messageId}`
            );
          }
        }
      } catch (error) {
        // Ignore errors from unrelated postMessage events
        console.debug('Error handling mobile navigation:', error);
      }
    };

    window.addEventListener('message', handleMobileNavigation);

    return () => {
      window.removeEventListener('message', handleMobileNavigation);
    };
  }, [router]);

  const showTopLevelChrome =
    pathname === '/home' ||
    pathname === '/notes' ||
    pathname === '/workspace' ||
    pathname === '/personal' ||
    pathname === '/user/settings' ||
    pathname === '/user/tasks';

  // モバイル判定（768px以下）
  // TODO: これって本当に必要？？？
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
  // Also hide footer when drawer is open
  const shouldShowFooter =
    showTopLevelChrome && (!isMobile || !isInputActive) && !isDrawerOpen;

  return (
    <div className='relative h-screen bg-black px-4'>
      {/* Header - Absolutely Positioned, Transparent */}
      {showTopLevelChrome && <Header />}

      {/* Main Content - Full height, scrolls under transparent header and bottom nav */}
      <main className='h-screen overflow-hidden relative'>
        {/* Top darkening gradient */}
        <div className='absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none z-50' />

        {children}

        {/* Bottom darkening gradient */}
        <div className='absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/50 to-transparent pointer-events-none z-50' />
      </main>

      {/* Bottom Navigation - Absolutely Positioned */}
      <div className={shouldShowFooter ? 'block' : 'hidden'}>
        <BottomNav />
      </div>

      {/* Global Note Drawer */}
      <NoteDrawer
        isOpen={noteDrawerOpen}
        onClose={closeNoteDrawer}
        noteId={selectedNoteId}
      />

      {/* Global File Preview Drawer */}
      <FilePreviewDrawer
        isOpen={fileDrawerOpen}
        onClose={closeFileDrawer}
        file={selectedFile}
      />

      {/* Global Chat Message Drawer */}
      <ChatMessageDrawer />
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
