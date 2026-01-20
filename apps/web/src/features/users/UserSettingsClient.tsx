'use client';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Area } from 'react-easy-crop';
import { signOut } from '@cogni/api';

import { ProfileInfoForm } from './components/ProfileInfoForm';
import { AvatarCard } from './components/AvatarCard';
import { AvatarCropDialog } from './components/AvatarCropDialog';
import { AiSuggestionToggle } from './components/AiSuggestionToggle';
import { DeleteAccountSection } from './components/DeleteAccountSection';
import { PlatformInfoCard } from './components/PlatformInfoCard';
import { useUserSettings } from './hooks/useUserSettings';
import { useNativeImagePicker } from '@/hooks/useNativeImagePicker';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/shared/utils/avatar';

export default function UserSettingsClient() {
  const router = useRouter();
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
    generatingAvatar,
    avatarStatus,
    updateAvatar,
    removeAvatar,
    generateAvatar,
    setAvatarStatus,
    enableAiSuggestion,
    savingAiSuggestion,
    toggleAiSuggestion,
    isDeleting,
    deleteAccount,
  } = useUserSettings();

  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isNativeAvailable, pickImage } = useNativeImagePicker();

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
      const file = new File([croppedBlob], 'avatar.jpg', {
        type: 'image/jpeg',
      });
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

  const handleUploadClick = useCallback(async () => {
    // Use native picker if available (mobile webview)
    if (isNativeAvailable) {
      try {
        const file = await pickImage({
          allowsEditing: false,
          quality: 0.9,
        });

        // Convert File to data URL for cropping
        if (!Array.isArray(file)) {
          setAvatarStatus(null);
          const dataUrl = await readFileAsDataUrl(file);
          setSelectedImageSrc(dataUrl);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setCroppedAreaPixels(null);
          setAvatarDialogOpen(true);
        }
      } catch (error) {
        console.error('Failed to pick avatar image:', error);
        // User probably canceled, no need to show error
      }
    } else {
      // Fallback to file input
      fileInputRef.current?.click();
    }
  }, [isNativeAvailable, pickImage, setAvatarStatus]);

  const handleGenerateAvatar = useCallback(async () => {
    try {
      await generateAvatar();
    } catch (error) {
      console.error('Failed to generate avatar', error);
    }
  }, [generateAvatar]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
      // Sign out and redirect to login after successful deletion
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Failed to delete account', error);
      // Error is already handled in DeleteAccountSection
      throw error;
    }
  }, [deleteAccount, router]);

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

            <PlatformInfoCard />
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
            onGenerate={handleGenerateAvatar}
            generatingAvatar={generatingAvatar}
          />
        </div>
      )}

      {userId && (
        <DeleteAccountSection
          onDelete={handleDeleteAccount}
          isDeleting={isDeleting}
        />
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
