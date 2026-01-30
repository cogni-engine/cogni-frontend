'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import MemberSelectionStep from './MemberSelectionStep';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { addWorkspaceMembers } from '@/lib/api/workspaceApi';

interface MemberInviteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: number;
  onMembersAdded?: () => void;
}

export default function MemberInviteDrawer({
  isOpen,
  onClose,
  workspaceId,
  onMembersAdded,
}: MemberInviteDrawerProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  const { members } = useWorkspaceMembers(workspaceId);

  const handleAddExistingMembers = useCallback(async () => {
    if (selectedUserIds.length === 0) return;

    setIsAddingMembers(true);
    try {
      await addWorkspaceMembers(workspaceId, selectedUserIds);
      setSelectedUserIds([]);
      onMembersAdded?.();
      onClose();
    } catch (error) {
      console.error('Failed to add members:', error);
    } finally {
      setIsAddingMembers(false);
    }
  }, [workspaceId, selectedUserIds, onMembersAdded, onClose]);

  const handleClose = useCallback(() => {
    setSelectedUserIds([]);
    onClose();
  }, [onClose]);

  const existingMemberUserIds = useMemo(() => {
    return members.map(m => m.user_id).filter(Boolean) as string[];
  }, [members]);

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DrawerContent zIndex={160} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-4 pb-2 pt-4 justify-center border-none'>
          <DrawerTitle className='text-center'>Invite</DrawerTitle>
        </DrawerHeader>

        <DrawerBody className='flex flex-col gap-4'>
          <MemberSelectionStep
            selectedUserIds={selectedUserIds}
            onSelectionChange={setSelectedUserIds}
            excludeUserIds={existingMemberUserIds}
          />

          <div className='flex gap-3 pt-3'>
            <GlassButton
              type='button'
              onClick={handleClose}
              className='flex-1 py-3'
            >
              <span className='text-white/70 text-sm'>Cancel</span>
            </GlassButton>
            <GlassButton
              type='button'
              onClick={handleAddExistingMembers}
              disabled={selectedUserIds.length === 0 || isAddingMembers}
              className='flex-1 py-3'
            >
              <span className='text-white text-sm'>
                {isAddingMembers
                  ? 'Adding...'
                  : selectedUserIds.length > 0
                    ? `Add ${selectedUserIds.length}`
                    : 'Add'}
              </span>
            </GlassButton>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
