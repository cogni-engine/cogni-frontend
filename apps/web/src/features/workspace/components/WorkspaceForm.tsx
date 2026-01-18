'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Area } from 'react-easy-crop';
import type { Workspace } from '@/types/workspace';
import { Plus, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassButton from '@/components/glass-design/GlassButton';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import { WorkspaceIconCropDialog } from './WorkspaceIconCropDialog';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';

interface WorkspaceFormProps {
  workspace?: Workspace | null;
  onSubmit: (payload: {
    id: number | null;
    title: string;
    iconFile: File | null;
  }) => Promise<void>;
  onEditComplete?: () => void;
  isLoading?: boolean;
}

export default function WorkspaceForm({
  workspace,
  onSubmit,
  onEditComplete,
  isLoading,
}: WorkspaceFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(() => workspace?.title ?? '');
  const [error, setError] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingIcon, setGeneratingIcon] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);

  const [iconPreviewUrl, setIconPreviewUrl] = useState<string | null>(
    () => workspace?.icon_url ?? null
  );
  const iconPreviewRef = useRef<string | null>(workspace?.icon_url ?? null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const updateIconPreview = useCallback((preview: string | null) => {
    if (iconPreviewRef.current && iconPreviewRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(iconPreviewRef.current);
    }
    iconPreviewRef.current = preview;
    setIconPreviewUrl(preview);
  }, []);

  useEffect(() => {
    return () => {
      if (
        iconPreviewRef.current &&
        iconPreviewRef.current.startsWith('blob:')
      ) {
        URL.revokeObjectURL(iconPreviewRef.current);
      }
    };
  }, []);

  const resetState = useCallback(() => {
    setTitle(workspace?.title ?? '');
    setError(null);
    setIconError(null);
    setIconFile(null);
    updateIconPreview(workspace?.icon_url ?? null);
    setSelectedImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [updateIconPreview, workspace]);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  const handleDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setOpen(false);
        resetState();
        onEditComplete?.();
      } else {
        resetState();
        setOpen(true);
      }
    },
    [onEditComplete, resetState]
  );

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setIconError(null);
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedImageSrc(dataUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setCropDialogOpen(true);
      } catch (err) {
        console.error('Failed to read workspace icon file', err);
        setIconError(
          'Could not open the selected image. Please try another file.'
        );
      }
    },
    []
  );

  const handleCropDialogOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setCropDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setCropDialogOpen(true);
    }
  }, []);

  const handleIconCancel = useCallback(() => {
    handleCropDialogOpenChange(false);
  }, [handleCropDialogOpenChange]);

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
      const previewUrl = URL.createObjectURL(file);
      updateIconPreview(previewUrl);
      setIconFile(file);
      setIconError(null);
      handleCropDialogOpenChange(false);
    } catch (err) {
      console.error('Failed to process workspace icon', err);
      setIconError('Unable to process the selected image. Please try again.');
    }
  }, [
    croppedAreaPixels,
    handleCropDialogOpenChange,
    selectedImageSrc,
    updateIconPreview,
  ]);

  const handleClearSelectedIcon = useCallback(() => {
    setIconFile(null);
    setIconError(null);
    updateIconPreview(workspace?.icon_url ?? null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [updateIconPreview, workspace?.icon_url]);

  const handleGenerateIcon = useCallback(async () => {
    try {
      setGeneratingIcon(true);
      setIconError(null);

      // Use workspace title or default seed
      const seed =
        title.trim() || workspace?.title || `workspace-${Date.now()}`;
      const uniqueSeed = `${seed}-${generationCounter}`;

      const iconBlob = await generateAvatarBlob(uniqueSeed, {
        style: 'cosmic',
        includeInitials: false,
      });

      const file = new File([iconBlob], 'workspace-icon.png', {
        type: 'image/png',
      });
      const previewUrl = URL.createObjectURL(file);
      updateIconPreview(previewUrl);
      setIconFile(file);
      setGenerationCounter(prev => prev + 1);
    } catch (err) {
      console.error('Failed to generate workspace icon', err);
      setIconError('Failed to generate icon. Please try again.');
    } finally {
      setGeneratingIcon(false);
    }
  }, [generationCounter, title, workspace?.title, updateIconPreview]);

  const initials = useMemo(
    () => getInitials(title || workspace?.title || 'Workspace', 'Workspace'),
    [title, workspace?.title]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        setError('Workspace name is required');
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit({
          id: workspace?.id ?? null,
          title: trimmedTitle,
          iconFile,
        });
        handleDialogOpenChange(false);
      } catch (err) {
        console.error('Failed to save workspace', err);
        setError(
          err instanceof Error ? err.message : 'Failed to save workspace'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleDialogOpenChange, iconFile, onSubmit, title, workspace?.id]
  );

  return (
    <>
      <GlassButton
        type='button'
        onClick={() => setOpen(true)}
        disabled={isLoading}
        size='icon'
        className='size-12 disabled:cursor-not-allowed'
      >
        <Plus className='size-6' />
      </GlassButton>

      <Drawer open={open} onOpenChange={handleDialogOpenChange}>
        <DrawerContent zIndex={150} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-6 pb-2 pt-0'>
            <DrawerTitle>
              {workspace ? 'Edit workspace' : 'Create workspace'}
            </DrawerTitle>
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit} className='space-y-6 px-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='workspace-title'
                  className='text-sm font-medium text-white/80'
                >
                  Workspace name
                </label>
                <input
                  id='workspace-title'
                  type='text'
                  placeholder='Enter workspace name'
                  value={title}
                  onChange={event => handleTitleChange(event.target.value)}
                  disabled={isSubmitting}
                  autoComplete='organization'
                  autoFocus
                  className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all'
                />
              </div>

              <div className='space-y-3'>
                <label className='text-sm font-medium text-white/80'>
                  Workspace icon
                </label>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-16 w-16 border border-white/10 text-xl'>
                    {iconPreviewUrl ? (
                      <AvatarImage
                        src={iconPreviewUrl}
                        alt='Workspace icon preview'
                      />
                    ) : (
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className='text-sm text-white/60 flex-1'>
                    <p>Recommended: square image, at least 256×256px.</p>
                    <p>Supported formats: PNG or JPG.</p>
                  </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <GlassButton
                    type='button'
                    onClick={handleUploadClick}
                    disabled={isSubmitting || generatingIcon}
                    className='px-4 py-2'
                  >
                    {iconPreviewUrl ? 'Change icon' : 'Upload icon'}
                  </GlassButton>
                  <GlassButton
                    type='button'
                    onClick={handleGenerateIcon}
                    disabled={isSubmitting || generatingIcon}
                    className='px-4 py-2 gap-2'
                  >
                    <Sparkles className='w-4 h-4' />
                    {generatingIcon ? 'Generating…' : 'Generate icon'}
                  </GlassButton>
                  {iconPreviewUrl && iconFile && (
                    <GlassButton
                      type='button'
                      onClick={handleClearSelectedIcon}
                      disabled={isSubmitting || generatingIcon}
                      variant='ghost'
                      className='px-4 py-2'
                    >
                      Reset
                    </GlassButton>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                {iconError && (
                  <p className='text-sm text-red-300'>{iconError}</p>
                )}
              </div>

              {error && (
                <div className='rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200'>
                  {error}
                </div>
              )}
            </form>
          </DrawerBody>

          <DrawerFooter className='flex gap-3 px-4 pb-4'>
            <GlassButton
              type='button'
              onClick={() => handleDialogOpenChange(false)}
              disabled={isSubmitting}
              variant='ghost'
              className='flex-1'
            >
              Cancel
            </GlassButton>
            <GlassButton
              type='button'
              onClick={async () => {
                setError(null);
                const trimmedTitle = title.trim();
                if (!trimmedTitle) {
                  setError('Workspace name is required');
                  return;
                }
                setIsSubmitting(true);
                try {
                  await onSubmit({
                    id: workspace?.id ?? null,
                    title: trimmedTitle,
                    iconFile,
                  });
                  handleDialogOpenChange(false);
                } catch (err) {
                  console.error('Failed to save workspace', err);
                  setError(
                    err instanceof Error
                      ? err.message
                      : 'Failed to save workspace'
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting || !title.trim()}
              className='flex-1'
            >
              {isSubmitting
                ? 'Saving…'
                : workspace
                  ? 'Save changes'
                  : 'Create workspace'}
            </GlassButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <WorkspaceIconCropDialog
        open={cropDialogOpen}
        onOpenChange={handleCropDialogOpenChange}
        imageSrc={selectedImageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        onSave={handleIconSave}
        onCancel={handleIconCancel}
        saving={false}
        canSave={Boolean(selectedImageSrc && croppedAreaPixels)}
      />
    </>
  );
}
