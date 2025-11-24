'use client';

// TODO: this needs to be moved to a feature

import * as React from 'react';
import { ArrowUpCircle, LogOut, Settings, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassButton from '@/components/glass-design/GlassButton';
import { signOut } from '@cogni/api';
import { useUserProfile } from '@/features/users/hooks/useUserProfile';
import type { UserProfile } from '@/types/userProfile';
import GlassCard from '@/components/glass-design/GlassCard';
import { isInMobileWebView, notifyNativeLogout } from '@/lib/webview';
import { createClient } from '@/lib/supabase/browserClient';
import { PricingModal } from '@/components/PricingModal';

type UserMenuProps = {
  userId: string | null;
};

function getInitials(profile?: UserProfile | null, email?: string | null) {
  const name = profile?.name;
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0]?.slice(0, 2).toUpperCase();
    }
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'ME';
}

export function UserMenu({ userId }: UserMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { profile } = useUserProfile({ userId });

  // Lazy load email only when needed (when dropdown opens)
  const [email, setEmail] = React.useState<string>('Unknown user');

  React.useEffect(() => {
    if (open && userId && email === 'Unknown user') {
      const fetchEmail = async () => {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) {
          setEmail(user.email);
        }
      };
      fetchEmail();
    }
  }, [open, userId, email]);

  const avatarUrl = profile?.avatar_url ?? null;
  const initials = getInitials(profile, email);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const handleSelectSettings = React.useCallback(() => {
    setOpen(false);
    router.push('/user/settings');
  }, [router]);

  const handleSelectTasks = React.useCallback(() => {
    setOpen(false);
    router.push('/user/tasks');
  }, [router]);

  const handleUpgradePlan = React.useCallback(() => {
    setOpen(false);
    setIsPricingModalOpen(true);
  }, []);

  const handleSignOut = React.useCallback(async () => {
    setIsSigningOut(true);
    try {
      // If in mobile webview, notify native app before signing out
      if (isInMobileWebView()) {
        notifyNativeLogout();
        // Give native app time to receive the message
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Failed to sign out', error);
    } finally {
      setIsSigningOut(false);
      setOpen(false);
    }
  }, [router]);

  return (
    <>
      <div className='relative' ref={dropdownRef}>
        <GlassButton
          onClick={() => setOpen(!open)}
          title='User menu'
          size='icon'
          className='size-12'
        >
          <Avatar className='h-11 w-11'>
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={profile?.name || email} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </GlassButton>

        {/* Dropdown Menu */}
        {open && (
          <GlassCard className='absolute right-0 mt-2 w-60 rounded-3xl z-110'>
            <div className='p-1'>
              <div className='flex flex-col gap-1 px-3 py-2 mb-1'>
                <span className='text-sm font-semibold'>
                  {profile?.name || initials}
                </span>
                <span className='text-xs text-white/60'>{email}</span>
              </div>
              <div className='h-px bg-white/10 my-1' />
              <button
                onClick={handleSelectSettings}
                className='w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-sm text-white/80 hover:text-white'
              >
                <Settings className='h-4 w-4' />
                <span>User settings</span>
              </button>
              <button
                onClick={handleSelectTasks}
                className='w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-sm text-white/80 hover:text-white'
              >
                <CheckSquare className='h-4 w-4' />
                <span>My Tasks</span>
              </button>
              <button
                onClick={handleUpgradePlan}
                className='w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-sm text-blue-400 hover:text-blue-300'
              >
                <ArrowUpCircle className='h-4 w-4' />
                <span>Upgrade Plan</span>
              </button>
              <div className='h-px bg-white/10 my-1' />
              <button
                onClick={() => {
                  if (!isSigningOut) {
                    handleSignOut();
                  }
                }}
                className='w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-md transition-colors text-sm text-red-300 hover:text-red-200'
              >
                <LogOut className='h-4 w-4' />
                <span>{isSigningOut ? 'Signing out…' : 'Log out'}</span>
              </button>
            </div>
          </GlassCard>
        )}
      </div>

      <PricingModal
        open={isPricingModalOpen}
        onOpenChange={setIsPricingModalOpen}
      />
    </>
  );
}
