'use client';

import { useCallback, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import type { Area } from 'react-easy-crop';
import { Upload, Sparkles } from 'lucide-react';
import { AvatarCropDialog } from '@/features/users/components/AvatarCropDialog';
import {
  getCroppedImageBlob,
  readFileAsDataUrl,
  getInitials,
} from '@/features/users/utils/avatar';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';
import { uploadUserAvatar } from '@/lib/api/userProfilesApi';
import GlassButton from '@/components/glass-design/GlassButton';
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
  const [generating, setGenerating] = useState(false);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [localError, setLocalError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initials = getInitials(userName, userEmail);

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

  const handleGenerateAvatar = useCallback(async () => {
    setGenerating(true);
    setLocalError(null);

    try {
      const seed = userEmail || userId;
      const avatarBlob = await generateAvatarBlob(seed);
      const file = new File([avatarBlob], 'avatar.png', { type: 'image/png' });

      await uploadUserAvatar(userId, file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(avatarBlob);
      setAvatarUrl(previewUrl);
    } catch (err) {
      console.error('Failed to generate avatar', err);
      setLocalError('Failed to generate avatar. Please try again.');
    } finally {
      setGenerating(false);
    }
  }, [userId, userEmail]);

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
              <h1 className='text-4xl md:text-5xl font-bold text-white leading-tight'>
                Add a profile picture
              </h1>
              <SubText>
                Upload a photo or generate one automatically. You can change
                this later.
              </SubText>
            </div>

            {/* Avatar Preview */}
            <div className='flex justify-center mb-8'>
              <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt='Profile picture'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <span className='text-4xl md:text-5xl font-bold text-white'>
                    {initials}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3 max-w-md mx-auto w-full'>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />

              <GlassButton
                type='button'
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || generating || loading}
                className='w-full py-4 h-12'
              >
                <Upload className='size-5' />
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </GlassButton>

              <GlassButton
                type='button'
                onClick={handleGenerateAvatar}
                disabled={uploading || generating || loading}
                className='w-full py-4 h-12'
              >
                <Sparkles className='size-5' />
                {generating ? 'Generating...' : 'Generate Avatar'}
              </GlassButton>
            </div>

            {/* Error Messages */}
            {(error || localError) && (
              <div className='mt-4 bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm max-w-md mx-auto'>
                <p className='text-red-300 text-sm'>{error || localError}</p>
              </div>
            )}

            {/* Skip Option */}
            <div className='text-center mt-6'>
              <button
                type='button'
                onClick={handleContinue}
                disabled={uploading || generating || loading}
                className='text-gray-400 hover:text-gray-200 text-sm transition-colors disabled:opacity-50'
              >
                Skip for now
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <div className=''>
            <NextStepButton
              type='button'
              onClick={handleContinue}
              disabled={uploading || generating}
              loading={loading}
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
