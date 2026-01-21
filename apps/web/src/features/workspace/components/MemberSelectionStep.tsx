'use client';

import { useMemo, useState, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WorkspaceMember } from '@/types/workspace';
import { User, Check } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { getAllWorkspaceMembersForUser } from '@/lib/api/workspaceApi';
import useSWR from 'swr';

interface MemberSelectionStepProps {
  selectedUserIds: string[];
  onSelectionChange: (userIds: string[]) => void;
}

export default function MemberSelectionStep({
  selectedUserIds,
  onSelectionChange,
}: MemberSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all workspace members using Supabase directly
  const {
    data: allMembers = [],
    isLoading,
    error,
  } = useSWR<WorkspaceMember[]>(
    '/api/workspace-members/all',
    getAllWorkspaceMembersForUser,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return allMembers;
    }

    const query = searchQuery.trim().toLowerCase();
    return allMembers.filter(member => {
      const name = member.user_profile?.name ?? 'Unknown';
      return name.toLowerCase().includes(query);
    });
  }, [allMembers, searchQuery]);

  const toggleMember = useCallback(
    (userId: string) => {
      const newSelection = selectedUserIds.includes(userId)
        ? selectedUserIds.filter(id => id !== userId)
        : [...selectedUserIds, userId];
      onSelectionChange(newSelection);
    },
    [selectedUserIds, onSelectionChange]
  );

  if (isLoading) {
    return (
      <div className='flex flex-col h-full'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
        </div>
        <div className='mt-auto pt-4'>
          <SearchBar
            placeholder='Search members...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            disabled
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-full'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-red-400 mb-2'>Failed to load members</p>
            <p className='text-sm text-gray-400'>
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </div>
        <div className='mt-auto pt-4'>
          <SearchBar
            placeholder='Search members...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            disabled
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full min-h-0'>
      {/* Member List */}
      <div className='flex-1 overflow-y-auto space-y-2 pb-4'>
        {filteredMembers.length === 0 ? (
          <div className='text-center py-8'>
            <User className='w-12 h-12 text-gray-400 mx-auto mb-3' />
            <p className='text-gray-400'>
              {searchQuery.trim()
                ? 'No members found matching your search'
                : 'No members available to invite'}
            </p>
          </div>
        ) : (
          filteredMembers.map(member => {
            const profile = member.user_profile ?? null;
            const isSelected = selectedUserIds.includes(member.user_id);
            const name = profile?.name ?? 'Unknown';

            return (
              <button
                key={member.user_id}
                type='button'
                onClick={() => toggleMember(member.user_id)}
                className={`w-full flex items-center gap-3 bg-white/5 rounded-lg p-4 border transition-colors ${
                  isSelected
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-white/10 hover:bg-white/10'
                }`}
              >
                <Avatar className='h-10 w-10 border border-white/20 bg-white/10 text-sm font-medium'>
                  {profile?.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} alt={name} />
                  ) : (
                    <AvatarFallback>
                      <User className='w-4 h-4 text-gray-300' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className='flex-1 text-left'>
                  <p className='text-white font-medium'>{name}</p>
                </div>
                {isSelected && (
                  <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-500'>
                    <Check className='w-4 h-4 text-white' />
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Search Bar at the bottom */}
      <div className='mt-auto pt-4 border-t border-white/10'>
        <SearchBar
          placeholder='Search members...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
