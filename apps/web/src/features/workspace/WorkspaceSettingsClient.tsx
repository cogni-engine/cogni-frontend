'use client';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Area } from 'react-easy-crop';

import { WorkspaceInfoForm } from './components/WorkspaceInfoForm';
import { WorkspaceIconCard } from './components/WorkspaceIconCard';
import { WorkspaceIconCropDialog } from './components/WorkspaceIconCropDialog';
import { useWorkspaceSettings } from './hooks/useWorkspaceSettings';

import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';
import GlassButton from '@/components/glass-design/GlassButton';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

type WorkspaceSettingsClientProps = {
  workspaceId: number;
};

export default function WorkspaceSettingsClient({
  workspaceId,
}: WorkspaceSettingsClientProps) {
  const {
    workspace,
    isLoading,
    error,
    title,
    setTitle,
    savingTitle,
    titleStatus,
    setTitleStatus,
    saveTitle,
    savingIcon,
    generatingIcon,
    removingIcon,
    iconStatus,
    setIconStatus,
    updateIcon,
    generateIcon,
    removeIcon,
    iconUrl,
    deleteWorkspace,
    deletingWorkspace,
  } = useWorkspaceSettings(workspaceId);

  const router = useRouter();
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const initials = useMemo(() => {
    return getInitials(title, workspace?.title ?? 'Workspace');
  }, [title, workspace?.title]);

  const disableTitleSave = useMemo(() => {
    if (!workspace) return true;
    return title.trim() === (workspace.title ?? '').trim();
  }, [title, workspace]);

  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      if (titleStatus) {
        setTitleStatus(null);
      }
    },
    [setTitle, setTitleStatus, titleStatus]
  );

  const handleTitleSubmit = useCallback(async () => {
    await saveTitle();
  }, [saveTitle]);

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
      } catch (err) {
        console.error('Failed to read workspace icon file', err);
        setIconStatus({
          type: 'error',
          message:
            'Could not open the selected image. Please try another file.',
        });
      }
    },
    [setIconStatus]
  );

  const handleIconSave = useCallback(async () => {
    if (!selectedImageSrc || !croppedAreaPixels) {
      return;
    }

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

  const handleIconDialogOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setIconDialogOpen(false);
        setSelectedImageSrc(null);
        setCroppedAreaPixels(null);
        resetFileInput();
      } else {
        setIconDialogOpen(true);
      }
    },
    [resetFileInput]
  );

  const handleIconCancel = useCallback(() => {
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
    } catch (err) {
      console.error('Failed to generate workspace icon', err);
    }
  }, [generateIcon]);

  const handleRemoveIcon = useCallback(async () => {
    try {
      await removeIcon();
      resetFileInput();
    } catch (err) {
      console.error('Failed to remove workspace icon', err);
    }
  }, [removeIcon, resetFileInput]);

  const normalizedWorkspaceTitle = useMemo(
    () => workspace?.title?.trim() ?? '',
    [workspace?.title]
  );

  const handleDeleteDrawerClose = useCallback(() => {
    setDeleteDrawerOpen(false);
    setDeleteConfirmation('');
    setDeleteError(null);
  }, []);

  const handleDeleteWorkspace = useCallback(async () => {
    if (!workspace) return;
    if (!normalizedWorkspaceTitle) {
      setDeleteError('Please set a workspace name before deleting.');
      return;
    }

    const normalizedInput = deleteConfirmation.trim();
    if (normalizedInput !== normalizedWorkspaceTitle) {
      setDeleteError('Workspace name does not match.');
      return;
    }

    try {
      setDeleteError(null);
      await deleteWorkspace();
      handleDeleteDrawerClose();
      router.push('/workspace');
    } catch (err) {
      console.error('Failed to delete workspace', err);
      setDeleteError('Failed to delete workspace. Please try again.');
    }
  }, [
    deleteConfirmation,
    deleteWorkspace,
    handleDeleteDrawerClose,
    normalizedWorkspaceTitle,
    router,
    workspace,
  ]);

  if (error && !isLoading) {
    return (
      <div className='flex h-full items-center justify-center text-white/50'>
        Failed to load settings.
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col gap-8 overflow-auto py-20 px-4 text-white'>
      {isLoading || !workspace ? (
        <div className='flex flex-1 items-center justify-center text-white/60'>
          Loading...
        </div>
      ) : (
        <div className='flex flex-col gap-8'>
          <WorkspaceInfoForm
            title={title}
            onTitleChange={handleTitleChange}
            onSubmit={handleTitleSubmit}
            saving={savingTitle}
            disableSave={disableTitleSave}
            status={titleStatus}
          />

          <WorkspaceIconCard
            iconUrl={iconUrl}
            iconAlt={workspace.title ?? 'Workspace icon'}
            initials={initials}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onUploadClick={handleUploadClick}
            onGenerateClick={handleGenerateIcon}
            savingIcon={savingIcon}
            generatingIcon={generatingIcon}
            onRemove={handleRemoveIcon}
            removingIcon={removingIcon}
            removeDisabled={removingIcon || !iconUrl}
            status={iconStatus}
          />

          {/* Delete Workspace Section */}
          <div className='pt-6 border-t border-white/10'>
            <button
              type='button'
              onClick={() => setDeleteDrawerOpen(true)}
              disabled={deletingWorkspace || !normalizedWorkspaceTitle}
              className='text-white/40 hover:text-white/60 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Delete Workspace
            </button>
          </div>
        </div>
      )}

      <WorkspaceIconCropDialog
        open={iconDialogOpen}
        onOpenChange={handleIconDialogOpenChange}
        imageSrc={selectedImageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        onSave={handleIconSave}
        onCancel={handleIconCancel}
        saving={savingIcon}
        canSave={Boolean(croppedAreaPixels && selectedImageSrc)}
      />

      {/* Delete Workspace Drawer */}
      <Drawer
        open={deleteDrawerOpen}
        onOpenChange={open => !open && handleDeleteDrawerClose()}
      >
        <DrawerContent zIndex={160} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-4 pb-2 pt-4 justify-center border-none'>
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
              onChange={event => {
                setDeleteConfirmation(event.target.value);
                if (deleteError) {
                  setDeleteError(null);
                }
              }}
              placeholder={normalizedWorkspaceTitle || 'Workspace name'}
              disabled={deletingWorkspace}
              className='bg-white/5 border-white/10 focus:border-white/20'
            />

            {deleteError && (
              <p className='text-sm text-white/50 text-center'>{deleteError}</p>
            )}

            <div className='flex gap-3 pt-2'>
              <GlassButton
                type='button'
                onClick={handleDeleteDrawerClose}
                disabled={deletingWorkspace}
                className='flex-1 py-3'
              >
                <span className='text-white/70 text-sm'>Cancel</span>
              </GlassButton>
              <GlassButton
                type='button'
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
    </div>
  );
}
