'use client';

import { useState, useCallback, useMemo } from 'react';
import { Share, Users } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import MemberSelectionStep from './MemberSelectionStep';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { useWorkspaceInvitations } from '../hooks/useWorkspaceInvitations';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { addWorkspaceMembers } from '@/lib/api/workspaceApi';

type DrawerStep = 'initial' | 'invite-friends';

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
  const [step, setStep] = useState<DrawerStep>('initial');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { createAnonymousInviteLink } = useWorkspaceInvitations(workspaceId);

  const { members } = useWorkspaceMembers(workspaceId);

  const handleShareLink = useCallback(async () => {
    if (isSharing || isClicked) return;

    // Trigger click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    setIsSharing(true);
    try {
      // Always create a new invite link
      const inviteLink = await createAnonymousInviteLink();

      if (navigator.share) {
        await navigator.share({
          title: 'Join my workspace on Cogno',
          text: "You've been invited to join a Cogno workspace!",
          url: inviteLink,
        });
      } else {
        await navigator.clipboard.writeText(inviteLink);
      }
      // Close drawer after successful share
      onClose();
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share link:', error);
        try {
          // Always create a new link on error fallback too
          const link = await createAnonymousInviteLink();
          await navigator.clipboard.writeText(link);
          // Close drawer after copying to clipboard
          onClose();
        } catch (clipboardError) {
          console.error('Failed to copy link to clipboard:', clipboardError);
        }
      }
    } finally {
      setIsSharing(false);
    }
  }, [createAnonymousInviteLink, isSharing, isClicked, onClose]);

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
    setStep('initial');
    setSelectedUserIds([]);
    onClose();
  }, [onClose]);

  const handleInviteFriends = useCallback(() => {
    setStep('invite-friends');
  }, []);

  const existingMemberUserIds = useMemo(() => {
    return members.map(m => m.user_id).filter(Boolean) as string[];
  }, [members]);

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DrawerContent zIndex={160} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-4 pb-2 pt-0'>
          <DrawerTitle>Invite Members</DrawerTitle>
        </DrawerHeader>

        <DrawerBody className='flex flex-col gap-4'>
          {step === 'initial' && (
            <>
              {/* Initial Selection Options */}
              <GlassCard className='rounded-3xl p-2 border border-border-default'>
                <button
                  type='button'
                  onClick={handleShareLink}
                  disabled={isSharing}
                  className='w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-interactive-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <div className='w-10 h-10 rounded-2xl bg-surface-primary flex items-center justify-center flex-shrink-0'>
                    <Share className='w-5 h-5 text-text-secondary' />
                  </div>
                  <div className='text-left'>
                    <p className='text-sm font-medium text-text-primary'>
                      {isSharing ? 'Sharing...' : 'Share Link'}
                    </p>
                    <p className='text-xs text-text-muted'>
                      Copy invite link to share
                    </p>
                  </div>
                </button>

                <button
                  type='button'
                  onClick={handleInviteFriends}
                  className='w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-interactive-hover transition-colors'
                >
                  <div className='w-10 h-10 rounded-2xl bg-surface-primary flex items-center justify-center flex-shrink-0'>
                    <Users className='w-5 h-5 text-text-secondary' />
                  </div>
                  <div className='text-left'>
                    <p className='text-sm font-medium text-text-primary'>
                      Add Friends
                    </p>
                    <p className='text-xs text-text-muted'>
                      Invite from existing members
                    </p>
                  </div>
                </button>
              </GlassCard>

              {/* Cancel Button */}
              <div className='pt-3 border-t border-border-default'>
                <GlassButton
                  type='button'
                  onClick={handleClose}
                  variant='ghost'
                  className='w-full opacity-100'
                >
                  <span className='font-medium text-text-primary text-sm'>
                    Cancel
                  </span>
                </GlassButton>
              </div>
            </>
          )}

          {step === 'invite-friends' && (
            <>
              {/* Member Selection */}
              <MemberSelectionStep
                selectedUserIds={selectedUserIds}
                onSelectionChange={setSelectedUserIds}
                excludeUserIds={existingMemberUserIds}
              />

              {/* Action Buttons */}
              <div className='flex gap-3 pt-3 border-t border-border-default'>
                <GlassButton
                  type='button'
                  onClick={handleClose}
                  variant='ghost'
                  className='flex-1 opacity-100'
                >
                  <span className='font-medium text-text-primary text-sm'>
                    Cancel
                  </span>
                </GlassButton>
                <GlassButton
                  type='button'
                  onClick={handleAddExistingMembers}
                  disabled={selectedUserIds.length === 0 || isAddingMembers}
                  className='flex-1'
                >
                  <span className='font-medium text-text-primary text-sm'>
                    {isAddingMembers
                      ? 'Adding...'
                      : `Add ${selectedUserIds.length} member${
                          selectedUserIds.length !== 1 ? 's' : ''
                        }`}
                  </span>
                </GlassButton>
              </div>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
