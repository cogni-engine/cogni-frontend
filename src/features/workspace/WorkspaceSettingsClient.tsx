'use client';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
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
    removingIcon,
    iconStatus,
    setIconStatus,
    updateIcon,
    removeIcon,
    iconUrl,
  } = useWorkspaceSettings(workspaceId);

  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      const file = new File([croppedBlob], 'workspace-icon.png', {
        type: 'image/png',
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

  const handleRemoveIcon = useCallback(async () => {
    try {
      await removeIcon();
      resetFileInput();
    } catch (err) {
      console.error('Failed to remove workspace icon', err);
    }
  }, [removeIcon, resetFileInput]);

  if (error && !isLoading) {
    return (
      <div className='flex h-full items-center justify-center text-red-300'>
        Failed to load workspace settings.
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto p-6 text-white'>
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
            savingIcon={savingIcon}
            onRemove={handleRemoveIcon}
            removingIcon={removingIcon}
            removeDisabled={removingIcon || !iconUrl}
            status={iconStatus}
          />
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
    </div>
  );
}
