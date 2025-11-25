'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import {
  useIsInputActive,
  useIsDrawerOpen,
  useNoteDrawer,
  useFileDrawer,
} from '@/stores/useGlobalUIStore';
import { createClient } from '@/lib/supabase/browserClient';
import {
  setCurrentUserId,
  getCurrentUserId,
  getCookie,
  setCookie,
  COOKIE_KEYS,
} from '@cogni/utils';
import { getPersonalWorkspace } from '@/lib/api/workspaceApi';
import NoteDrawer from '@/features/notes/components/NoteDrawer';
import FilePreviewDrawer from '@/components/FilePreviewDrawer';
import ChatMessageDrawer from '@/components/ChatMessageDrawer';
import { ShepherdProvider } from '@/features/onboarding/tier2/shepherd/ShepherdProvider';
import { exampleTours } from '@/features/onboarding/tier2/shepherd/tours';
import { TutorialProvider } from '@/features/onboarding/tier2/TutorialProvider';
import { TutorialStepManager } from '@/features/onboarding/tier2/components/TutorialStepManager';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isInputActive = useIsInputActive();
  const isDrawerOpen = useIsDrawerOpen();
  const {
    isOpen: noteDrawerOpen,
    noteId: selectedNoteId,
    close: closeNoteDrawer,
  } = useNoteDrawer();
  const {
    isOpen: fileDrawerOpen,
    file: selectedFile,
    close: closeFileDrawer,
  } = useFileDrawer();
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
        } else if (data.type === 'TRIGGER_NOTIFICATION') {
          console.log('🌐 Global TRIGGER_NOTIFICATION from mobile:', {
            notificationId: data.notificationId,
          });

          const notificationId = data.notificationId;

          // Wait for Header to be ready before dispatching event
          const waitForHeaderReady = () => {
            return new Promise<void>(resolve => {
              // If already on /workspace, Header should be ready
              if (pathname === '/workspace') {
                // Give Header a moment to set up listener
                setTimeout(resolve, 200);
                return;
              }

              // Navigate to /workspace first
              router.push('/workspace');

              // Wait for pathname to change, then wait for Header
              let checkCount = 0;
              const maxChecks = 20; // Max 1 second (20 * 50ms)
              const checkReady = () => {
                checkCount++;
                // Check if we're now on /workspace
                if (window.location.pathname === '/workspace') {
                  // Header should be mounting now, wait for it to set up listener
                  setTimeout(resolve, 300);
                } else if (checkCount < maxChecks) {
                  // Check again after a short delay
                  setTimeout(checkReady, 50);
                } else {
                  // Timeout - resolve anyway to avoid infinite waiting
                  console.warn('Timeout waiting for navigation to /workspace');
                  setTimeout(resolve, 300);
                }
              };
              checkReady();
            });
          };

          waitForHeaderReady().then(() => {
            window.dispatchEvent(
              new CustomEvent('header:toggleNotificationPanel', {
                detail: { notificationId },
              })
            );
          });
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
  }, [router, pathname]);

  const showTopLevelChrome =
    pathname === '/cogno' ||
    pathname === '/notes' ||
    pathname === '/workspace' ||
    pathname === '/personal' ||
    pathname === '/user/settings' ||
    pathname === '/user/tasks' ||
    pathname === '/user/subscription';

    

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
  // Hide footer on user settings and subscription pages
  const isUserSettingsPage = pathname === '/user/settings' || pathname === '/user/subscription';
  const shouldShowFooter =
    showTopLevelChrome && 
    (!isMobile || !isInputActive) && 
    !isDrawerOpen && 
    !isUserSettingsPage;

  return (
    <div className='relative h-screen bg-black px-2'>
      {/* Header - Absolutely Positioned, Transparent */}
      {showTopLevelChrome && <Header />}

      {/* Main Content - Full height, scrolls under transparent header and bottom nav */}
      <main className='h-screen overflow-hidden relative'>
        {/* Top darkening gradient */}
        <div className='absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none z-50' />

        {children}

        {/* Bottom darkening gradient */}
        {!isDrawerOpen && (
          <div className='absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/50 to-transparent pointer-events-none z-50' />
        )}
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
    <TutorialProvider>
      <ShepherdProvider tours={exampleTours}>
        <TutorialStepManager />
        <LayoutContent>{children}</LayoutContent>
      </ShepherdProvider>
    </TutorialProvider>
  );
}
