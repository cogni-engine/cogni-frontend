'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useWorkspaceActivity } from '../../hooks/useWorkspaceActivity';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { getInitials } from '@/features/users/utils/avatar';
import ActivityTimeline from './ActivityTimeline';
import type { WorkspaceMember } from '@/types/workspace';

interface WorkspaceActivityDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: number;
}

export default function WorkspaceActivityDrawer({
  open,
  onOpenChange,
  workspaceId,
}: WorkspaceActivityDrawerProps) {
  const { activities, loading, fetchActivities } =
    useWorkspaceActivity(workspaceId);
  const { members, membersLoading } = useWorkspaceContext();
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<number>>(
    new Set()
  );

  // Get member profile info (user or agent)
  const getMemberProfile = (member: WorkspaceMember) => {
    if (member.is_agent && member.agent_profile) {
      return {
        name: member.agent_profile.name,
        avatar_url: member.agent_profile.avatar_url,
      };
    }
    return {
      name: member.user_profile?.name || 'Unknown',
      avatar_url: member.user_profile?.avatar_url || undefined,
    };
  };

  // Toggle member selection
  const toggleMemberSelection = (memberId: number) => {
    setSelectedMemberIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  // Convert Set to array for API call
  const selectedMemberIdsArray = useMemo(() => {
    return selectedMemberIds.size > 0
      ? Array.from(selectedMemberIds)
      : undefined;
  }, [selectedMemberIds]);

  // Fetch activities when drawer opens or selection changes
  useEffect(() => {
    if (open && workspaceId) {
      fetchActivities(selectedMemberIdsArray);
    }
  }, [open, workspaceId, selectedMemberIdsArray, fetchActivities]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        zIndex={150}
        height='85vh'
        data-shepherd-target='activity-drawer'
      >
        <DrawerHandle />

        <DrawerHeader className='px-6 pb-2 pt-0'>
          <div className='flex items-center justify-between w-full gap-2'>
            <DrawerTitle>Activity</DrawerTitle>
            {!membersLoading && members.length > 0 && (
              <div className='relative max-w-3/4 sm:max-w-2/3 md:max-w-1/2 lg:max-w-1/3 min-w-0'>
                <div className='overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-[linear-gradient(to_right,transparent_0%,black_12px,black_calc(100%-12px),transparent_100%)]'>
                  <div className='flex items-center gap-2 min-w-max py-1 px-2'>
                    {members.map((member, index) => {
                      const profile = getMemberProfile(member);
                      const isSelected = selectedMemberIds.has(member.id);
                      return (
                        <button
                          key={`${member.id}-${index}`}
                          onClick={() => toggleMemberSelection(member.id)}
                          className={`relative transition-all rounded-full shrink-0 ${
                            isSelected
                              ? 'scale-110'
                              : 'opacity-50 hover:opacity-70 hover:scale-105'
                          }`}
                          title={profile.name || 'Unknown'}
                        >
                          <Avatar className='h-8 w-8 border border-white/20 bg-white/10'>
                            {profile.avatar_url ? (
                              <AvatarImage
                                src={profile.avatar_url}
                                alt={profile.name || 'Member'}
                              />
                            ) : (
                              <AvatarFallback className='text-xs'>
                                {getInitials(profile.name || 'U')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerHeader>

        <DrawerBody>
          <ActivityTimeline activities={activities} loading={loading} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
