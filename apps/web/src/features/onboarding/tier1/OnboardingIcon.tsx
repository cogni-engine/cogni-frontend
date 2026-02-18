'use client';

import { useCallback, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import type { Area } from 'react-easy-crop';
import { Upload, User } from 'lucide-react';
import { AvatarCropDialog } from '@/features/users/components/AvatarCropDialog';
import {
  getCroppedImageBlob,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';
import { uploadUserAvatar } from '@/lib/api/userProfilesApi';
import { NextStepButton } from '../components/NextStepButton';
import { SubText } from '../components/SubText';

interface OnboardingIconProps {
  error: string | null;
  loading: boolean;
  userId: string;
  userEmail: string;
  userName: string;
  handleContinue: () => void;
}

export function OnboardingIcon({
  error,
  loading,
  userId,
  userEmail,
  userName,
  handleContinue,
}: OnboardingIconProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [localError, setLocalError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generate avatar if user hasn't uploaded one when continuing
  const handleContinueClick = useCallback(async () => {
    // If user already uploaded an avatar, just continue
    if (avatarUrl) {
      handleContinue();
      return;
    }

    // Generate avatar before continuing
    setGenerating(true);
    setLocalError(null);

    try {
      // Use userName as seed for initials, fallback to userEmail or userId
      const seed = userName || userEmail || userId;
      const avatarBlob = await generateAvatarBlob(seed, {
        style: 'cosmic',
        includeInitials: true,
      });
      const file = new File([avatarBlob], 'avatar.png', { type: 'image/png' });

      await uploadUserAvatar(userId, file);

      const previewUrl = URL.createObjectURL(avatarBlob);
      setAvatarUrl(previewUrl);

      // Continue after avatar is generated
      handleContinue();
    } catch (err) {
      console.error('Failed to generate avatar', err);
      setLocalError('Failed to generate avatar. Please try again.');
      setGenerating(false);
    }
  }, [avatarUrl, userId, userEmail, userName, handleContinue]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setLocalError(null);
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedImageSrc(dataUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setAvatarDialogOpen(true);
      } catch (err) {
        console.error('Failed to read avatar file', err);
        setLocalError(
          'Could not open the selected image. Please try another file.'
        );
      }
    },
    []
  );

  const handleAvatarSave = useCallback(async () => {
    if (!selectedImageSrc || !croppedAreaPixels) {
      return;
    }

    setUploading(true);
    setLocalError(null);

    try {
      const croppedBlob = await getCroppedImageBlob(
        selectedImageSrc,
        croppedAreaPixels
      );
      const file = new File([croppedBlob], 'avatar.jpg', {
        type: 'image/jpeg',
      });

      await uploadUserAvatar(userId, file);

      // Get the uploaded URL - we'll need to fetch it
      // For now, create a local preview URL
      const previewUrl = URL.createObjectURL(croppedBlob);
      setAvatarUrl(previewUrl);

      setAvatarDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Failed to upload avatar', err);
      setLocalError('Failed to upload avatar. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [selectedImageSrc, croppedAreaPixels, userId]);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setAvatarDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
    } else {
      setAvatarDialogOpen(true);
    }
  }, []);

  const handleCancelCrop = useCallback(() => {
    setAvatarDialogOpen(false);
    setSelectedImageSrc(null);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <>
      <div className='flex flex-col h-full animate-in fade-in duration-500'>
        {/* Main Content */}
        <div className='flex-1 flex flex-col justify-between'>
          <div className='flex-1 flex flex-col'>
            {/* Title */}
            <div className='text-center space-y-3 mb-8'>
              <h1 className='text-3xl md:text-4xl font-bold text-text-primary leading-tight'>
                Add a profile picture
              </h1>
              <SubText>
                You can upload a photo if you&apos;d like. You can change this
                later.
              </SubText>
            </div>

            {/* Avatar Preview */}
            <div className='flex justify-center mb-8'>
              <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden'>
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt='Profile picture'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-surface-primary flex items-center justify-center'>
                    {generating ? (
                      <div className='w-8 h-8 border-2 border-interactive-active border-t-text-primary rounded-full animate-spin' />
                    ) : (
                      <User className='size-16 md:size-20 text-text-muted' />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='max-w-md mx-auto w-full'>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />

              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || loading || generating}
                className='w-full py-2 px-1 border border-foreground bg-transparent text-foreground hover:bg-foreground/5 dark:border-none dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 font-medium'
              >
                <Upload className='size-4' />
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>

            {/* Error Messages */}
            {(error || localError) && (
              <div className='mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm max-w-md mx-auto'>
                <p className='text-red-600 dark:text-red-300 text-sm'>
                  {error || localError}
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className='mt-8 pt-6'>
            <NextStepButton
              type='button'
              onClick={handleContinueClick}
              disabled={uploading || generating}
              loading={loading || generating}
              loadingText={generating ? 'Generating avatar...' : undefined}
            />
          </div>
        </div>
      </div>

      {/* Avatar Crop Dialog */}
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
        saving={uploading}
        canSave={Boolean(croppedAreaPixels && selectedImageSrc)}
      />
    </>
  );
}
