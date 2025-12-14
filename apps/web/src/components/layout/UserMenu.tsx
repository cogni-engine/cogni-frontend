'use client';

// TODO: this needs to be moved to a feature

import * as React from 'react';
import { LogOut, Settings, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { signOut } from '@cogni/api';
import { useUserProfile } from '@/hooks/useUserProfile';
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
  const hoverTimeoutRef = React.useRef<number | null>(null);
  const userId = user?.id ?? null;
  const { profile } = useUserProfile({ userId });

  const email = user?.email ?? 'Unknown user';
  const avatarUrl = profile?.avatar_url ?? null;
  const initials = getInitials(profile, email);

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

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  const handleMouseEnter = () => {
    clearHoverTimeout();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    scheduleClose();
  };

  React.useEffect(() => {
    return () => clearHoverTimeout();
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='relative'
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15'
            aria-label='Open user menu'
          >
            <Avatar className='h-9 w-9'>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={profile?.name || email} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          sideOffset={12}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='w-60 z-110 p-0 border-0 bg-transparent shadow-none'
        >
          <GlassCard className='rounded-lg p-1'>
            <DropdownMenuLabel className='flex flex-col gap-1'>
              <span className='text-sm font-semibold'>
                {profile?.name || initials}
              </span>
              <span className='text-xs text-white/60'>{email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={event => {
                event.preventDefault();
                handleSelectSettings();
              }}
              className='flex items-center gap-2'
            >
              <Settings className='h-4 w-4' />
              <span>User settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={event => {
                event.preventDefault();
                handleSelectTasks();
              }}
              className='flex items-center gap-2'
            >
              <CheckSquare className='h-4 w-4' />
              <span>My Tasks</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={event => {
                event.preventDefault();
                if (!isSigningOut) {
                  handleSignOut();
                }
              }}
              className='flex items-center gap-2 text-red-300'
            >
              <LogOut className='h-4 w-4' />
              <span>{isSigningOut ? 'Signing out…' : 'Log out'}</span>
            </DropdownMenuItem>
          </GlassCard>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
