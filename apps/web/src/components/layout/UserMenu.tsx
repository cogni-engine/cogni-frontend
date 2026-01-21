'use client';

// TODO: this needs to be moved to a feature

import * as React from 'react';
import { LogOut, Settings, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassButton from '@/components/glass-design/GlassButton';
import { signOut } from '@cogni/api';
import { useUserProfile } from '@/features/users/hooks/useUserProfile';
import type { UserProfile } from '@/types/userProfile';
import GlassCard from '@/components/glass-design/GlassCard';
import { isInMobileWebView, notifyNativeLogout } from '@/lib/webview';

type UserMenuProps = {
  user: User | null;
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

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const userId = user?.id ?? null;
  const { profile } = useUserProfile({ userId });

  const email = user?.email ?? 'Unknown user';
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
  );
}
