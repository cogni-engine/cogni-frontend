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
import ActivityByTask from './ActivityByTask';
import ActivityByPerson from './ActivityByPerson';
import { cn } from '@/lib/utils';
import type { WorkspaceMember } from '@/types/workspace';

type ViewMode = 'task' | 'person' | 'timeline';

interface WorkspaceActivityDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: number;
  initialSelectedMemberIds?: number[] | null;
}

const VIEW_TABS: { key: ViewMode; label: string }[] = [
  { key: 'task', label: 'Tasks' },
  { key: 'person', label: 'People' },
  { key: 'timeline', label: 'Timeline' },
];

export default function WorkspaceActivityDrawer({
  open,
  onOpenChange,
  workspaceId,
  initialSelectedMemberIds,
}: WorkspaceActivityDrawerProps) {
  const { activities, loading, fetchActivities } =
    useWorkspaceActivity(workspaceId);
  const { members, membersLoading } = useWorkspaceContext();
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<number>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<ViewMode>('task');

  // Apply initial member selection when drawer opens with pre-selected members
  useEffect(() => {
    if (
      open &&
      initialSelectedMemberIds &&
      initialSelectedMemberIds.length > 0
    ) {
      setSelectedMemberIds(new Set(initialSelectedMemberIds));
    }
  }, [open, initialSelectedMemberIds]);

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

  const selectedMemberIdsArray = useMemo(() => {
    return selectedMemberIds.size > 0
      ? Array.from(selectedMemberIds)
      : undefined;
  }, [selectedMemberIds]);

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
          <div className='flex flex-col w-full gap-3'>
            {/* Top: Title + Member Filter */}
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
                            <Avatar className='h-8 w-8 border border-border-default bg-interactive-hover'>
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

            {/* View Mode Tabs */}
            <div className='flex gap-1 bg-surface-primary rounded-xl p-1'>
              {VIEW_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setViewMode(tab.key)}
                  className={cn(
                    'flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    viewMode === tab.key
                      ? 'bg-interactive-hover text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-secondary hover:bg-surface-primary'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </DrawerHeader>

        <DrawerBody>
          {viewMode === 'task' && (
            <ActivityByTask activities={activities} loading={loading} />
          )}
          {viewMode === 'person' && (
            <ActivityByPerson activities={activities} loading={loading} />
          )}
          {viewMode === 'timeline' && (
            <ActivityTimeline activities={activities} loading={loading} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
