'use client';

// TODO: this needs to be moved to a feature

import * as React from 'react';
import {
  ArrowUpCircle,
  Building2,
  LogOut,
  Settings,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@cogni/api';
import { useUserEmail, useUserProfile } from '@/stores/useUserProfileStore';
import type { UserProfile } from '@/types/userProfile';
import GlassCard from '@/components/glass-design/GlassCard';
import { isInMobileWebView, notifyNativeLogout } from '@/lib/webview';
import { PricingModal } from '@/components/PricingModal';
import { useSubscription } from '@/providers/SubscriptionProvider';

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

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = React.useState(false);
  const { planType } = useSubscription();
  const profile = useUserProfile();

  const isProOrBusiness = planType === 'pro' || planType === 'business';

  const email = useUserEmail();
  const avatarUrl = profile?.avatar_url ?? null;
  const initials = getInitials(profile, email);

  const handleSelectSettings = React.useCallback(() => {
    setOpen(false);
    router.push('/user/settings');
  }, [router]);

  const handleSelectOrganizations = React.useCallback(() => {
    setOpen(false);
    router.push('/user/organizations');
  }, [router]);

  const handleSelectSubscriptions = React.useCallback(() => {
    setOpen(false);
    if (isProOrBusiness) {
      router.push('/user/subscription');
    } else {
      setIsPricingModalOpen(true);
    }
  }, [isProOrBusiness, router]);

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

      // Reset user profile store on logout
      const { useUserProfileStore } = await import(
        '@/stores/useUserProfileStore'
      );
      useUserProfileStore.getState().reset();

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
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <div className='relative'>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='size-12 rounded-full border border-border-default bg-surface-primary text-text-primary hover:bg-interactive-hover'
              aria-label='Open user menu'
            >
              <Avatar className='size-11'>
                {avatarUrl ? (
                  <AvatarImage
                    src={avatarUrl}
                    alt={(profile?.name || email) ?? ''}
                  />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={12}
            className='w-60 z-110 p-0 border-0 bg-transparent shadow-none'
          >
            <GlassCard className='rounded-3xl p-1'>
              <DropdownMenuLabel className='flex flex-col gap-1'>
                <span className='text-sm font-semibold'>
                  {profile?.name || initials}
                </span>
                <span className='text-xs text-text-secondary'>{email}</span>
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
                <span>User Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={event => {
                  event.preventDefault();
                  handleSelectOrganizations();
                }}
                className='flex items-center gap-2'
              >
                <Building2 className='h-4 w-4' />
                <span>Organizations</span>
              </DropdownMenuItem>
              {!isInMobileWebView() && (
                <DropdownMenuItem
                  onSelect={event => {
                    event.preventDefault();
                    handleSelectSubscriptions();
                  }}
                  className={`flex items-center gap-2 ${
                    isProOrBusiness
                      ? ''
                      : 'text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
                  }`}
                >
                  <ArrowUpCircle className='h-4 w-4' />
                  <span>
                    {isProOrBusiness ? 'Subscriptions' : 'Upgrade Plan'}
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={event => {
                  event.preventDefault();
                  if (!isSigningOut) {
                    handleSignOut();
                  }
                }}
                className='flex items-center gap-2 text-red-600 hover:text-red-500 dark:text-red-300 dark:hover:text-red-200'
              >
                <LogOut className='h-4 w-4' />
                <span>{isSigningOut ? 'Signing out…' : 'Log out'}</span>
              </DropdownMenuItem>
            </GlassCard>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>

      <PricingModal
        open={isPricingModalOpen}
        onOpenChange={setIsPricingModalOpen}
      />
    </>
  );
}
