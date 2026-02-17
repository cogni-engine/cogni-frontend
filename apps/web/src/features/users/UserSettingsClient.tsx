'use client';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Area } from 'react-easy-crop';
import { signOut } from '@cogni/api';
import { createBrowserClient } from '@supabase/ssr';
import { OnboardingService } from '@/features/onboarding/services/onboardingService';

import { ProfileInfoForm } from './components/ProfileInfoForm';
import { AvatarCard } from './components/AvatarCard';
import { AvatarCropDialog } from './components/AvatarCropDialog';
import { AiSuggestionToggle } from './components/AiSuggestionToggle';
import { DeleteAccountSection } from './components/DeleteAccountSection';
import { PlatformInfoCard } from './components/PlatformInfoCard';
import { ThemeToggle } from './components/ThemeToggle';
import { useUserSettings } from './hooks/useUserSettings';
import { useNativeImagePicker } from '@/hooks/useNativeImagePicker';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from './utils/avatar';

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
  const [restartingTutorial, setRestartingTutorial] = useState(false);
  const [restartError, setRestartError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isNativeAvailable, pickImage } = useNativeImagePicker();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  const handleRestartTutorial = useCallback(async () => {
    setRestartingTutorial(true);
    setRestartError(null);

    try {
      const onboardingService = new OnboardingService(supabase);
      const success = await onboardingService.startOnboarding();

      if (!success) {
        throw new Error('Failed to restart onboarding');
      }

      // Redirect to onboarding
      router.push('/onboarding');
      router.refresh(); // Refresh to update middleware
    } catch (error) {
      console.error('Failed to restart tutorial:', error);
      setRestartError('Failed to restart tutorial. Please try again.');
      setRestartingTutorial(false);
    }
  }, [router, supabase]);

  return (
    <div className='flex h-full flex-col gap-6 overflow-auto p-6 py-20'>
      {isLoading ? (
        <div className='flex flex-1 items-center justify-center text-text-secondary'>
          Loading your settings...
        </div>
      ) : !userId ? (
        <div className='flex flex-1 items-center justify-center text-red-600 dark:text-red-300'>
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

            <ThemeToggle />

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
        <>
          {/* Restart Tutorial Section */}
          <div className='rounded-lg border border-border-default bg-card-bg dark:backdrop-blur-sm p-6 shadow-card'>
            <h3 className='mb-2 text-lg font-medium text-text-primary'>
              Development & Testing
            </h3>
            <p className='mb-4 text-sm text-text-muted'>
              Restart the onboarding tutorial to test the flow. This will reset
              your onboarding status.
            </p>
            {restartError && (
              <div className='mb-4 rounded-lg border border-red-500/50 bg-red-50 dark:bg-red-900/30 dark:backdrop-blur-sm p-3'>
                <p className='text-sm text-red-600 dark:text-red-300'>
                  {restartError}
                </p>
              </div>
            )}
            <button
              onClick={handleRestartTutorial}
              disabled={restartingTutorial}
              className='rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg'
            >
              {restartingTutorial ? 'Restarting...' : 'Restart Tutorial'}
            </button>
          </div>

          <DeleteAccountSection
            onDelete={handleDeleteAccount}
            isDeleting={isDeleting}
          />
        </>
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
