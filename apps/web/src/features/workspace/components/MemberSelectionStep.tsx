'use client';

import { useMemo, useState, useCallback, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WorkspaceMember } from '@/types/workspace';
import { User, Check, Mail, Link, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { getAllWorkspaceMembersForUser } from '@/lib/api/workspaceApi';
import useSWR from 'swr';
import ScrollableView from '@/components/layout/ScrollableView';

interface MemberSelectionStepProps {
  selectedUserIds: string[];
  onSelectionChange: (userIds: string[]) => void;
  excludeUserIds?: string[];
  onInviteByEmail?: () => void;
  onShareLink?: () => void;
  hideInvitationButtons?: boolean;
}

export default function MemberSelectionStep({
  selectedUserIds,
  onSelectionChange,
  excludeUserIds = [],
  onInviteByEmail,
  onShareLink,
  hideInvitationButtons = false,
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

  // Get selected members for display
  const selectedMembers = useMemo(() => {
    return allMembers.filter(
      member =>
        member.user_id &&
        selectedUserIds.includes(member.user_id) &&
        member.user_profile
    );
  }, [allMembers, selectedUserIds]);

  // Filter members: exclude already selected, exclude existing members, and filter by search
  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let filtered = allMembers.filter(
      member =>
        member.user_id &&
        !excludeUserIds.includes(member.user_id) &&
        !selectedUserIds.includes(member.user_id) && // Exclude selected members
        member.user_profile
    );

    if (query) {
      filtered = filtered.filter(member => {
        const name = member.user_profile?.name?.toLowerCase() || '';
        return name.includes(query);
      });
    }

    return filtered;
  }, [allMembers, searchQuery, excludeUserIds, selectedUserIds]);

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
      <div className='flex-shrink-0 pb-4 border-b border-white/10 mb-4'>
        <SearchBar
          placeholder='Search members...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Selected Members - Display below search */}
      {selectedMembers.length > 0 && (
        <div className='flex-shrink-0 mb-4 pb-4 border-b border-white/10'>
          <p className='text-sm text-gray-400 mb-3'>Selected members</p>
          <div className='flex flex-wrap gap-3'>
            {selectedMembers.map(member => {
              if (!member.user_id || !member.user_profile) return null;
              const displayName = member.user_profile.name || 'Unknown User';

              return (
                <div
                  key={member.user_id}
                  className='flex flex-col items-center gap-1.5 group relative'
                >
                  <div className='relative'>
                    <Avatar className='h-14 w-14 border-2 border-white/20 group-hover:border-white/40 transition-colors'>
                      {member.user_profile.avatar_url ? (
                        <AvatarImage
                          src={member.user_profile.avatar_url}
                          alt={displayName}
                        />
                      ) : (
                        <AvatarFallback className='bg-white/10'>
                          {displayName
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2) || <User className='w-6 h-6' />}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveSelectedMember(member.user_id!)
                      }
                      className='absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg'
                      title='Remove'
                    >
                      <X className='w-3.5 h-3.5 text-white' />
                    </button>
                  </div>
                  <p className='text-white text-xs text-center max-w-[70px] truncate font-medium'>
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
                onClick={() => handleToggleMember(member.user_id!)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 ${
                  isSelected
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <Avatar className='h-10 w-10 border border-white/10'>
                  {member.user_profile.avatar_url ? (
                    <AvatarImage
                      src={member.user_profile.avatar_url}
                      alt={displayName}
                    />
                  ) : (
                    <AvatarFallback>
                      {displayName
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2) || <User className='w-5 h-5' />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className='flex-1 text-left'>
                  <p className='text-white font-medium text-sm'>
                    {displayName}
                  </p>
                </div>
                {isSelected && (
                  <div className='p-1 rounded-full bg-white/20'>
                    <Check className='w-4 h-4 text-white' />
                  </div>
                )}
              </button>
            );
          })}
      </ScrollableView>
    </div>
  );
}
