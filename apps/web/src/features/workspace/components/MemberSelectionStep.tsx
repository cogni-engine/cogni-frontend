'use client';

import { useMemo, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { WorkspaceMember } from '@/types/workspace';
import { Check, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { getAllWorkspaceMembersForUser } from '@/lib/api/workspaceApi';
import useSWR from 'swr';
import ScrollableView from '@/components/layout/ScrollableView';

interface MemberSelectionStepProps {
  selectedUserIds: string[];
  onSelectionChange: (userIds: string[]) => void;
  excludeUserIds?: string[];
}

export default function MemberSelectionStep({
  selectedUserIds,
  onSelectionChange,
  excludeUserIds = [],
}: MemberSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Get selected members for display (exclude agents)
  const selectedMembers = useMemo(() => {
    return allMembers.filter(
      member =>
        member.user_id &&
        selectedUserIds.includes(member.user_id) &&
        member.user_profile &&
        !member.is_agent
    );
  }, [allMembers, selectedUserIds]);

  // Filter members: exclude existing members, agents, and filter by search (keep selected members)
  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let filtered = allMembers.filter(
      member =>
        member.user_id &&
        !excludeUserIds.includes(member.user_id) &&
        member.user_profile &&
        !member.is_agent // Exclude agent users
    );

    if (query) {
      filtered = filtered.filter(member => {
        const name = member.user_profile?.name?.toLowerCase() || '';
        return name.includes(query);
      });
    }

    return filtered;
  }, [allMembers, searchQuery, excludeUserIds]);

  const handleToggleMember = useCallback(
    (userId: string) => {
      if (selectedUserIds.includes(userId)) {
        onSelectionChange(selectedUserIds.filter(id => id !== userId));
      } else {
        onSelectionChange([...selectedUserIds, userId]);
      }
    },
    [selectedUserIds, onSelectionChange]
  );

  const handleRemoveSelectedMember = useCallback(
    (userId: string) => {
      onSelectionChange(selectedUserIds.filter(id => id !== userId));
    },
    [selectedUserIds, onSelectionChange]
  );

  return (
    <div className='flex flex-col flex-1 min-h-0 relative'>
      {/* Search Bar fixed at top */}
      <div className='shrink-0 pb-4 border-b border-white/10 mb-4'>
        <SearchBar
          placeholder='Search members...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Selected Members - Display below search */}
      {selectedMembers.length > 0 && (
        <div className='shrink-0 mb-4 pb-4 border-b border-white/10'>
          <p className='text-sm text-gray-400 mb-3'>
            Selected ({selectedMembers.length})
          </p>
          <div className='flex flex-wrap gap-2.5'>
            {selectedMembers.map(member => {
              if (!member.user_id || !member.user_profile) return null;
              const displayName = member.user_profile.name || 'Unknown User';

              return (
                <div
                  key={member.user_id}
                  className='flex flex-col items-center gap-1.5 group relative'
                >
                  <div className='relative'>
                    {member.user_profile.avatar_url ? (
                      <Image
                        src={member.user_profile.avatar_url}
                        alt={displayName}
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover border-2 border-white/20'
                      />
                    ) : (
                      <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-sm text-white font-medium border-2 border-white/20'>
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveSelectedMember(member.user_id!)
                      }
                      className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg'
                      title='Remove'
                    >
                      <X className='w-3 h-3 text-white' />
                    </button>
                  </div>
                  <p className='text-white text-xs text-center max-w-[60px] truncate font-medium'>
                    {displayName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Member List - scrollable */}
      <ScrollableView ref={scrollContainerRef} className='pr-2'>
        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
            Failed to load members
          </div>
        )}

        {isLoading && (
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
          </div>
        )}

        {!isLoading && !error && filteredMembers.length === 0 && (
          <div className='text-center py-8 text-gray-400'>
            {searchQuery.trim()
              ? 'No members found matching your search'
              : 'No members available from other workspaces'}
          </div>
        )}

        {!isLoading &&
          !error &&
          filteredMembers.length > 0 &&
          filteredMembers.map(member => {
            if (!member.user_id || !member.user_profile) return null;

            const isSelected = selectedUserIds.includes(member.user_id);
            const displayName = member.user_profile.name || 'Unknown User';

            return (
              <button
                key={member.user_id}
                type='button'
                onClick={() => handleToggleMember(member.user_id!)}
                className='w-full p-2 text-left text-sm hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  {member.user_profile.avatar_url ? (
                    <Image
                      src={member.user_profile.avatar_url}
                      alt={displayName}
                      width={24}
                      height={24}
                      className='w-6 h-6 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-medium'>
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className='text-white'>{displayName}</span>
                </div>
                {isSelected && <Check className='w-4 h-4 text-white' />}
              </button>
            );
          })}
      </ScrollableView>
    </div>
  );
}
