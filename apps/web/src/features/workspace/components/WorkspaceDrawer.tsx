'use client';

import { useState, useCallback, useMemo, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { Share, Plus, Camera, Sparkles } from 'lucide-react';
import type { Area } from 'react-easy-crop';

import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import GlassButton from '@/components/glass-design/GlassButton';
import MemberInviteDrawer from './MemberInviteDrawer';
import { WorkspaceIconCropDialog } from './WorkspaceIconCropDialog';
import { useWorkspaceContext } from '../contexts/WorkspaceContext';
import { useWorkspaceInvitations } from '../hooks/useWorkspaceInvitations';
import { useWorkspaceSettings } from '../hooks/useWorkspaceSettings';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';

interface WorkspaceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: number;
}

export default function WorkspaceDrawer({
  open,
  onOpenChange,
  workspaceId,
}: WorkspaceDrawerProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { members, membersLoading } = useWorkspaceContext();
  const { createAnonymousInviteLink } = useWorkspaceInvitations(workspaceId);

  const {
    workspace,
    title,
    setTitle,
    savingTitle,
    saveTitle,
    savingIcon,
    generatingIcon,
    removingIcon,
    setIconStatus,
    updateIcon,
    generateIcon,
    removeIcon,
    iconUrl,
    deleteWorkspace,
    deletingWorkspace,
  } = useWorkspaceSettings(workspaceId);

  // State
  const [isSharing, setIsSharing] = useState(false);
  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showIconOptions, setShowIconOptions] = useState(false);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Icon crop state
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initials = useMemo(() => {
    return getInitials(title, workspace?.title ?? 'W');
  }, [title, workspace?.title]);

  const normalizedWorkspaceTitle = useMemo(
    () => workspace?.title?.trim() ?? '',
    [workspace?.title]
  );

  // Handlers
  const handleShareLink = useCallback(async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
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
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share link:', error);
        try {
          const link = await createAnonymousInviteLink();
          await navigator.clipboard.writeText(link);
        } catch (clipboardError) {
          console.error('Failed to copy link:', clipboardError);
        }
      }
    } finally {
      setIsSharing(false);
    }
  }, [createAnonymousInviteLink, isSharing]);

  const handleMembersAdded = useCallback(async () => {
    await mutate(`/workspaces/${workspaceId}/members`);
  }, [workspaceId, mutate]);

  const startEditingName = useCallback(() => {
    setEditedName(title);
    setIsEditingName(true);
  }, [title]);

  const handleSaveName = useCallback(async () => {
    if (editedName.trim() && editedName.trim() !== title.trim()) {
      setTitle(editedName.trim());
      await saveTitle();
    }
    setIsEditingName(false);
  }, [editedName, title, setTitle, saveTitle]);

  const handleCancelEditName = useCallback(() => {
    setIsEditingName(false);
    setEditedName('');
  }, []);

  // Icon handlers
  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setIconStatus(null);
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedImageSrc(dataUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setIconDialogOpen(true);
        setShowIconOptions(false);
      } catch (err) {
        console.error('Failed to read workspace icon file', err);
      }
    },
    [setIconStatus]
  );

  const handleIconSave = useCallback(async () => {
    if (!selectedImageSrc || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImageBlob(
        selectedImageSrc,
        croppedAreaPixels
      );
      const file = new File([croppedBlob], 'workspace-icon.jpg', {
        type: 'image/jpeg',
      });
      await updateIcon(file);
      setIconDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
      resetFileInput();
    } catch (err) {
      console.error('Failed to update workspace icon', err);
    }
  }, [croppedAreaPixels, resetFileInput, selectedImageSrc, updateIcon]);

  const handleIconDialogClose = useCallback(() => {
    setIconDialogOpen(false);
    setSelectedImageSrc(null);
    setCroppedAreaPixels(null);
    resetFileInput();
  }, [resetFileInput]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleGenerateIcon = useCallback(async () => {
    try {
      await generateIcon();
      setShowIconOptions(false);
    } catch (err) {
      console.error('Failed to generate workspace icon', err);
    }
  }, [generateIcon]);

  const handleRemoveIcon = useCallback(async () => {
    try {
      await removeIcon();
      resetFileInput();
      setShowIconOptions(false);
    } catch (err) {
      console.error('Failed to remove workspace icon', err);
    }
  }, [removeIcon, resetFileInput]);

  // Delete handlers
  const handleDeleteDrawerClose = useCallback(() => {
    setIsDeleteDrawerOpen(false);
    setDeleteConfirmation('');
    setDeleteError(null);
  }, []);

  const handleDeleteWorkspace = useCallback(async () => {
    if (!workspace || !normalizedWorkspaceTitle) return;

    const normalizedInput = deleteConfirmation.trim();
    if (normalizedInput !== normalizedWorkspaceTitle) {
      setDeleteError('Workspace name does not match.');
      return;
    }

    try {
      setDeleteError(null);
      await deleteWorkspace();
      handleDeleteDrawerClose();
      onOpenChange(false);
      router.push('/workspace');
    } catch (err) {
      console.error('Failed to delete workspace', err);
      setDeleteError('Failed to delete workspace.');
    }
  }, [
    deleteConfirmation,
    deleteWorkspace,
    handleDeleteDrawerClose,
    normalizedWorkspaceTitle,
    onOpenChange,
    router,
    workspace,
  ]);

  const getMemberProfile = (member: (typeof members)[0]) => {
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

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent zIndex={140} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-6 pb-2 pt-0'>
            <div className='flex items-center justify-center w-full relative'>
              <DrawerTitle>Workspace</DrawerTitle>
              <button
                type='button'
                onClick={handleShareLink}
                disabled={isSharing}
                title='Share link'
                className='absolute right-0 p-2 text-white/50 hover:text-white transition-colors disabled:opacity-50'
              >
                <Share className='w-5 h-5' />
              </button>
            </div>
          </DrawerHeader>

          <DrawerBody>
            {/* Members Section */}
            <div className='space-y-1'>
              {/* Invite */}
              <button
                type='button'
                onClick={() => setIsInviteDrawerOpen(true)}
                className='w-full flex items-center gap-3 py-3 px-2 hover:bg-white/5 transition-colors rounded-xl'
              >
                <div className='h-10 w-10 rounded-full border border-dashed border-white/30 flex items-center justify-center'>
                  <Plus className='w-5 h-5 text-white/60' />
                </div>
                <span className='text-white/70 text-sm'>Invite</span>
              </button>

              {/* Members List */}
              {membersLoading ? (
                <div className='flex justify-center py-4'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white/50' />
                </div>
              ) : (
                members.map(member => {
                  const profile = getMemberProfile(member);
                  return (
                    <div
                      key={member.id}
                      className='flex items-center gap-3 py-3 px-2'
                    >
                      <Avatar className='h-10 w-10 border border-white/10'>
                        {profile.avatar_url ? (
                          <AvatarImage
                            src={profile.avatar_url}
                            alt={profile.name || 'Member'}
                          />
                        ) : (
                          <AvatarFallback className='bg-white/5 text-white/60 text-sm'>
                            {getInitials(profile.name || 'U')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className='text-white text-sm'>{profile.name}</p>
                        <p className='text-white/40 text-xs capitalize'>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Divider */}
            <div className='h-px bg-white/10 my-4' />

            {/* Settings Section */}
            <div className='flex flex-col items-center space-y-4'>
              {/* Centered Icon */}
              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setShowIconOptions(!showIconOptions)}
                  disabled={savingIcon || generatingIcon}
                  className='relative group'
                >
                  <Avatar className='h-24 w-24 border border-white/10'>
                    {iconUrl ? (
                      <AvatarImage
                        src={iconUrl}
                        alt={workspace?.title || 'Workspace'}
                      />
                    ) : (
                      <AvatarFallback className='bg-white/5 text-white text-2xl'>
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {/* Camera overlay */}
                  <div className='absolute -bottom-1 -right-1 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center border border-white/20'>
                    <Camera className='w-4 h-4 text-white' />
                  </div>
                </button>
              </div>

              {/* Icon Options */}
              {showIconOptions && (
                <div className='flex items-center gap-2'>
                  <GlassButton
                    onClick={handleUploadClick}
                    disabled={savingIcon || generatingIcon}
                    className='py-2 px-3'
                  >
                    <span className='text-white/80 text-xs'>
                      {savingIcon ? '...' : 'Upload'}
                    </span>
                  </GlassButton>
                  <GlassButton
                    onClick={handleGenerateIcon}
                    disabled={savingIcon || generatingIcon}
                    className='py-2 px-3 gap-1'
                  >
                    <Sparkles className='w-3 h-3 text-white/60' />
                    <span className='text-white/80 text-xs'>
                      {generatingIcon ? '...' : 'Generate'}
                    </span>
                  </GlassButton>
                  {iconUrl && (
                    <GlassButton
                      onClick={handleRemoveIcon}
                      disabled={removingIcon || generatingIcon}
                      className='py-2 px-3'
                    >
                      <span className='text-white/50 text-xs'>
                        {removingIcon ? '...' : 'Remove'}
                      </span>
                    </GlassButton>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />

              {/* Workspace Title - Centered */}
              <div className='w-full border-b border-white/10 pb-3'>
                {isEditingName ? (
                  <input
                    type='text'
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') handleCancelEditName();
                    }}
                    onBlur={handleSaveName}
                    autoFocus
                    className='w-full bg-transparent text-white text-xl font-semibold outline-none text-center'
                    placeholder='Workspace name'
                  />
                ) : (
                  <button
                    type='button'
                    onClick={startEditingName}
                    className='w-full'
                  >
                    <span className='text-white text-xl font-semibold'>
                      {title || 'Untitled'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Delete Workspace - Centered at bottom */}
            <div className='mt-8 flex justify-center'>
              <button
                type='button'
                onClick={() => setIsDeleteDrawerOpen(true)}
                disabled={deletingWorkspace || !normalizedWorkspaceTitle}
                className='text-white/30 hover:text-white/50 text-sm transition-colors disabled:opacity-50'
              >
                Delete Workspace
              </button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Member Invite Drawer */}
      <MemberInviteDrawer
        isOpen={isInviteDrawerOpen}
        onClose={() => setIsInviteDrawerOpen(false)}
        workspaceId={workspaceId}
        onMembersAdded={handleMembersAdded}
      />

      {/* Icon Crop Dialog */}
      <WorkspaceIconCropDialog
        open={iconDialogOpen}
        onOpenChange={open => !open && handleIconDialogClose()}
        imageSrc={selectedImageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        onSave={handleIconSave}
        onCancel={handleIconDialogClose}
        saving={savingIcon}
        canSave={Boolean(croppedAreaPixels && selectedImageSrc)}
      />

      {/* Delete Confirmation Drawer */}
      <Drawer
        open={isDeleteDrawerOpen}
        onOpenChange={open => !open && handleDeleteDrawerClose()}
      >
        <DrawerContent zIndex={160} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-6 pb-2 pt-0 justify-center border-none'>
            <DrawerTitle className='text-center'>Delete Workspace</DrawerTitle>
          </DrawerHeader>

          <DrawerBody className='flex flex-col gap-4'>
            <p className='text-sm text-white/50 text-center'>
              Type{' '}
              <span className='text-white/80'>
                {normalizedWorkspaceTitle || 'workspace name'}
              </span>{' '}
              to confirm
            </p>

            <Input
              value={deleteConfirmation}
              onChange={e => {
                setDeleteConfirmation(e.target.value);
                if (deleteError) setDeleteError(null);
              }}
              placeholder={normalizedWorkspaceTitle || 'Workspace name'}
              disabled={deletingWorkspace}
              className='bg-white/5 border-white/10'
            />

            {deleteError && (
              <p className='text-sm text-white/50 text-center'>{deleteError}</p>
            )}

            <div className='flex gap-3 pt-2'>
              <GlassButton
                onClick={handleDeleteDrawerClose}
                disabled={deletingWorkspace}
                className='flex-1 py-3'
              >
                <span className='text-white/70 text-sm'>Cancel</span>
              </GlassButton>
              <GlassButton
                onClick={handleDeleteWorkspace}
                disabled={
                  deletingWorkspace ||
                  !normalizedWorkspaceTitle ||
                  !deleteConfirmation.trim()
                }
                className='flex-1 py-3'
              >
                <span className='text-white text-sm'>
                  {deletingWorkspace ? 'Deleting...' : 'Delete'}
                </span>
              </GlassButton>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
