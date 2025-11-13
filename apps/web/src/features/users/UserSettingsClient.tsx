'use client';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import type { Area } from 'react-easy-crop';

import { ProfileInfoForm } from './components/ProfileInfoForm';
import { AvatarCard } from './components/AvatarCard';
import { AvatarCropDialog } from './components/AvatarCropDialog';
import { AiSuggestionToggle } from './components/AiSuggestionToggle';
import { useUserSettings } from './hooks/useUserSettings';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from './utils/avatar';

export default function UserSettingsClient() {
  const {
    userId,
    profile,
    name,
    setName,
    userEmail,
    isLoading,
    savingName,
    nameStatus,
    saveName,
    setNameStatus,
    savingAvatar,
    removingAvatar,
    avatarStatus,
    updateAvatar,
    removeAvatar,
    setAvatarStatus,
    enableAiSuggestion,
    savingAiSuggestion,
    toggleAiSuggestion,
  } = useUserSettings();

  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const emailFallback = useMemo(
    () => userEmail || profile?.id || '',
    [profile, userEmail]
  );

  const initials = getInitials(profile?.name, emailFallback);

  const disableNameSave = useMemo(() => {
    if (!profile) return true;
    return name.trim() === (profile.name ?? '').trim();
  }, [name, profile]);

  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleNameSubmit = useCallback(async () => {
    await saveName();
  }, [saveName]);

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value);
      if (nameStatus) {
        setNameStatus(null);
      }
    },
    [nameStatus, setName, setNameStatus]
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setAvatarStatus(null);
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedImageSrc(dataUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setAvatarDialogOpen(true);
      } catch (error) {
        console.error('Failed to read avatar file', error);
        setAvatarStatus({
          type: 'error',
          message:
            'Could not open the selected image. Please try another file.',
        });
      }
    },
    [setAvatarStatus]
  );

  const handleAvatarSave = useCallback(async () => {
    if (!selectedImageSrc || !croppedAreaPixels || !userId || !profile) {
      return;
    }

    try {
      const croppedBlob = await getCroppedImageBlob(
        selectedImageSrc,
        croppedAreaPixels
      );
      const file = new File([croppedBlob], 'avatar.png', { type: 'image/png' });
      await updateAvatar(file, profile.avatar_url ?? undefined);
      setAvatarDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
      resetFileInput();
    } catch (error) {
      console.error('Failed to update avatar', error);
    }
  }, [
    croppedAreaPixels,
    profile,
    resetFileInput,
    selectedImageSrc,
    updateAvatar,
    userId,
  ]);

  const handleRemoveAvatar = useCallback(async () => {
    try {
      await removeAvatar();
      resetFileInput();
    } catch (error) {
      console.error('Failed to remove avatar', error);
    }
  }, [removeAvatar, resetFileInput]);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setAvatarDialogOpen(false);
        setSelectedImageSrc(null);
        setCroppedAreaPixels(null);
        resetFileInput();
      } else {
        setAvatarDialogOpen(true);
      }
    },
    [resetFileInput]
  );

  const handleCancelCrop = useCallback(() => {
    setAvatarDialogOpen(false);
    setSelectedImageSrc(null);
    setCroppedAreaPixels(null);
    resetFileInput();
  }, [resetFileInput]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto p-6 py-20'>
      {isLoading ? (
        <div className='flex flex-1 items-center justify-center text-white/60'>
          Loading your settings...
        </div>
      ) : !userId ? (
        <div className='flex flex-1 items-center justify-center text-red-300'>
          You need to be signed in to manage your settings.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr,auto]'>
          <div className='flex flex-col gap-6'>
            <ProfileInfoForm
              name={name}
              onNameChange={handleNameChange}
              onSubmit={handleNameSubmit}
              saving={savingName}
              disableSave={disableNameSave}
              status={nameStatus}
            />

            <AiSuggestionToggle
              enabled={enableAiSuggestion}
              onToggle={toggleAiSuggestion}
              saving={savingAiSuggestion}
            />
          </div>

          <AvatarCard
            avatarUrl={profile?.avatar_url}
            avatarAlt={profile?.name ?? 'User avatar'}
            initials={initials}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onUploadClick={handleUploadClick}
            savingAvatar={savingAvatar}
            onRemove={handleRemoveAvatar}
            removingAvatar={removingAvatar}
            removeDisabled={removingAvatar || !profile?.avatar_url}
            status={avatarStatus}
          />
        </div>
      )}

      <AvatarCropDialog
        open={avatarDialogOpen}
        onOpenChange={handleDialogOpenChange}
        imageSrc={selectedImageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        onSave={handleAvatarSave}
        onCancel={handleCancelCrop}
        saving={savingAvatar}
        canSave={Boolean(croppedAreaPixels && selectedImageSrc)}
      />
    </div>
  );
}
