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
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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

  const handleDeleteDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setDeleteDialogOpen(false);
      setDeleteConfirmation('');
      setDeleteError(null);
    } else {
      setDeleteDialogOpen(true);
      setDeleteConfirmation('');
      setDeleteError(null);
    }
  }, []);

  const handleDeleteWorkspace = useCallback(async () => {
    if (!workspace) return;
    if (!normalizedWorkspaceTitle) {
      setDeleteError('Please set a workspace name before deleting.');
      return;
    }

    const normalizedInput = deleteConfirmation.trim();
    if (normalizedInput !== normalizedWorkspaceTitle) {
      setDeleteError('Workspace title does not match.');
      return;
    }

    try {
      setDeleteError(null);
      await deleteWorkspace();
      handleDeleteDialogOpenChange(false);
      router.push('/workspace');
    } catch (err) {
      console.error('Failed to delete workspace', err);
      setDeleteError('Failed to delete workspace. Please try again.');
    }
  }, [
    deleteConfirmation,
    deleteWorkspace,
    handleDeleteDialogOpenChange,
    normalizedWorkspaceTitle,
    router,
    workspace,
  ]);

  if (error && !isLoading) {
    return (
      <div className='flex h-full items-center justify-center text-red-300'>
        Failed to load workspace settings.
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto py-20 text-white'>
      <div>
        <h1 className='text-3xl font-semibold'>Workspace Settings</h1>
        <p className='text-white/60'>Manage workspace name and icon.</p>
      </div>

      {isLoading || !workspace ? (
        <div className='flex flex-1 items-center justify-center text-white/60'>
          Loading workspace settings...
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr,auto]'>
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
        </div>
      )}

      {workspace && (
        <Card className='border border-red-500/30 bg-red-500/5'>
          <CardHeader>
            <CardTitle className='text-red-200'>Danger zone</CardTitle>
            <CardDescription>
              Permanently delete this workspace and all of its data.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='text-sm text-white/70'>
              This action is irreversible. Please make sure you really want to
              remove
              <span className='font-semibold text-white'>
                {' '}
                {workspace.title || 'this workspace'}
              </span>
              .
              {!normalizedWorkspaceTitle && (
                <span className='block text-xs text-white/60 mt-2'>
                  Add a workspace name first to enable deletion.
                </span>
              )}
            </div>
            <Button
              variant='destructive'
              onClick={() => handleDeleteDialogOpenChange(true)}
              disabled={deletingWorkspace || !normalizedWorkspaceTitle}
            >
              {deletingWorkspace ? 'Deleting…' : 'Delete workspace'}
            </Button>
          </CardContent>
        </Card>
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

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete workspace</DialogTitle>
            <DialogDescription>
              Type{' '}
              <span className='font-semibold text-white'>
                {normalizedWorkspaceTitle || '(rename first)'}
              </span>{' '}
              to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <p className='text-sm text-white/70'>
              Deleting this workspace will remove all notes, members, and
              history. This cannot be undone.
            </p>
            <div className='space-y-2'>
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
              />
              {deleteError && (
                <p className='text-sm text-red-300'>{deleteError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='ghost' disabled={deletingWorkspace}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='destructive'
              onClick={handleDeleteWorkspace}
              disabled={
                deletingWorkspace ||
                !normalizedWorkspaceTitle ||
                !deleteConfirmation.trim()
              }
            >
              {deletingWorkspace ? 'Deleting…' : 'Delete workspace'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
