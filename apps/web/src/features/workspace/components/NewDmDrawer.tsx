'use client';

import { useState, useMemo } from 'react';
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
import { User, X, Loader2 } from 'lucide-react';
import useSWR from 'swr';
import {
  getAllWorkspaceMembersForUser,
  findOrCreateDmWorkspace,
} from '@/lib/api/workspaceApi';
import { mutate } from 'swr';

interface NewDmDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewDmDrawer({ open, onOpenChange }: NewDmDrawerProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const { data: members, isLoading } = useSWR(
    open ? '/all-workspace-members' : null,
    getAllWorkspaceMembersForUser
  );

  const filteredMembers = useMemo(() => {
    if (!members) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return members;
    return members.filter(m => {
      const name = (m.user_profile?.name || '').toLowerCase();
      return name.includes(query);
    });
  }, [members, searchQuery]);

  const handleSelectUser = async (userId: string) => {
    if (!userId || loadingUserId) return;
    setLoadingUserId(userId);
    try {
      const result = await findOrCreateDmWorkspace(userId);
      mutate('/workspaces');
      onOpenChange(false);
      router.push(`/workspace/${result.workspace_id}/chat`);
    } catch (error) {
      console.error('Failed to create DM workspace:', error);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent maxHeight='70vh'>
        <DrawerHandle />
        <DrawerHeader>
          <DrawerTitle>New Message</DrawerTitle>
          <DrawerClose>
            <X className='w-5 h-5 text-gray-400' />
          </DrawerClose>
        </DrawerHeader>
        <div className='px-4 py-2'>
          <input
            type='text'
            placeholder='Search members...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20'
            autoFocus
          />
        </div>
        <DrawerBody>
          {isLoading && (
            <div className='flex justify-center py-8'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white' />
            </div>
          )}
          {!isLoading && filteredMembers.length === 0 && (
            <div className='text-center py-8 text-gray-400 text-sm'>
              No members found
            </div>
          )}
          <div className='space-y-1'>
            {filteredMembers.map(member => {
              const profile = member.user_profile;
              const isLoading = loadingUserId === member.user_id;
              return (
                <button
                  key={member.user_id}
                  onClick={() =>
                    member.user_id && handleSelectUser(member.user_id)
                  }
                  disabled={!!loadingUserId}
                  className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50'
                >
                  <Avatar className='h-10 w-10 border border-white/20 bg-white/10 text-sm'>
                    {profile?.avatar_url ? (
                      <AvatarImage
                        src={profile.avatar_url}
                        alt={profile.name ?? 'User'}
                      />
                    ) : (
                      <AvatarFallback>
                        <User className='w-4 h-4 text-gray-300' />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className='text-white text-sm font-medium flex-1 text-left'>
                    {profile?.name ?? 'Unknown'}
                  </span>
                  {isLoading && (
                    <Loader2 className='w-4 h-4 text-gray-400 animate-spin' />
                  )}
                </button>
              );
            })}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
