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
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
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
  const { members, isLoading: membersLoading } =
    useWorkspaceMembers(workspaceId);
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
      <DrawerContent zIndex={150} height='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-6 pb-2 pt-0'>
          <div className='flex items-center justify-between w-full'>
            <DrawerTitle>Activity</DrawerTitle>
            {!membersLoading && members.length > 0 && (
              <div className='flex items-center gap-2'>
                {members.map(member => {
                  const profile = getMemberProfile(member);
                  const isSelected = selectedMemberIds.has(member.id);
                  return (
                    <button
                      key={member.id}
                      onClick={() => toggleMemberSelection(member.id)}
                      className={`relative transition-all rounded-full ${
                        isSelected
                          ? 'scale-110'
                          : 'opacity-50 hover:opacity-100 hover:scale-105'
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
