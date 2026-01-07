'use client';

import { useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { useWorkspaceActivity } from '../../hooks/useWorkspaceActivity';
import ActivityTimeline from './ActivityTimeline';

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

  // Fetch activities when drawer opens
  useEffect(() => {
    if (open && workspaceId) {
      fetchActivities();
    }
  }, [open, workspaceId, fetchActivities]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent zIndex={150} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-4 pb-2 pt-0'>
          <DrawerTitle>Activity</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <ActivityTimeline activities={activities} loading={loading} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
