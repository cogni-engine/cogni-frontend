'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerClose,
} from '@/components/ui/drawer';
import { User, X, MessageSquare, GitBranch, Loader2 } from 'lucide-react';
import {
  useUserProfileDrawer,
  useActivityDrawer,
} from '@/stores/useGlobalUIStore';
import { findOrCreateDmWorkspace } from '@/lib/api/workspaceApi';
import { getCurrentUserId } from '@cogni/utils';
import { useWorkspaceContext } from '@/features/workspace/contexts/WorkspaceContext';
import { mutate } from 'swr';

export default function UserProfileDrawer() {
  const { isOpen, profile, close } = useUserProfileDrawer();
  const activityDrawer = useActivityDrawer();
  const { members } = useWorkspaceContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const currentUserId = getCurrentUserId();
  const isOwnProfile = profile?.userId === currentUserId;

  const handleStartDm = async () => {
    if (!profile?.userId || isLoading) return;
    setIsLoading(true);
    try {
      const result = await findOrCreateDmWorkspace(profile.userId);
      mutate('/workspaces');
      close();
      router.push(`/workspace/${result.workspace_id}/chat`);
    } catch (error) {
      console.error('Failed to create DM workspace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewActivity = () => {
    if (!profile?.userId) return;
    const member = members.find(m => m.user_id === profile.userId);
    close();
    activityDrawer.open(member ? [member.id] : undefined);
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && close()}>
      <DrawerContent maxHeight='50vh'>
        <DrawerHandle />
        <div className='flex items-center justify-between px-4 py-1'>
          <DrawerTitle>Profile</DrawerTitle>
          <DrawerClose>
            <X className='w-5 h-5 text-gray-400' />
          </DrawerClose>
        </div>
        <DrawerBody className='flex flex-col items-center gap-4 py-6'>
          <Avatar className='h-20 w-20 border border-white/20 bg-white/10 text-2xl'>
            {profile?.avatarUrl ? (
              <AvatarImage
                src={profile.avatarUrl}
                alt={profile.name ?? 'User'}
              />
            ) : (
              <AvatarFallback>
                <User className='w-8 h-8 text-gray-300' />
              </AvatarFallback>
            )}
          </Avatar>

          <div className='text-center'>
            <p className='text-lg font-semibold text-white'>
              {profile?.name ?? 'Unknown'}
            </p>
            {profile?.role && (
              <span className='inline-block mt-1 px-2.5 py-0.5 text-xs font-medium text-white/70 bg-white/10 rounded-full capitalize'>
                {profile.role}
              </span>
            )}
          </div>

          <div className='flex items-center gap-3'>
            {!isOwnProfile && (
              <button
                onClick={handleStartDm}
                disabled={isLoading}
                className='flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-sm font-medium text-white transition-colors disabled:opacity-50'
              >
                {isLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <MessageSquare className='w-4 h-4' />
                )}
                Message
              </button>
            )}
            <button
              onClick={handleViewActivity}
              className='flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-sm font-medium text-white transition-colors'
            >
              <GitBranch className='w-4 h-4' />
              Activity
            </button>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
