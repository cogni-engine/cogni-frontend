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
import { Plus } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkspaceIconCropDialog } from './WorkspaceIconCropDialog';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';

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
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button
            type='button'
            disabled={isLoading}
            variant='outline'
            className='bg-white/10 backdrop-blur-xl border border-black p-2 rounded-full hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] size-11'
          >
            <Plus className='h-6 w-6' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {workspace ? 'Edit workspace' : 'Create new workspace'}
            </DialogTitle>
            <DialogDescription>
              Give your workspace a name and optional icon.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='workspace-title'>Workspace name</Label>
              <Input
                id='workspace-title'
                placeholder='Enter workspace name'
                value={title}
                onChange={event => handleTitleChange(event.target.value)}
                disabled={isSubmitting}
                autoComplete='organization'
                autoFocus
              />
            </div>
            <div className='space-y-3'>
              <Label>Workspace icon</Label>
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
                <div className='text-sm text-white/60'>
                  <p>Recommended: square image, at least 256×256px.</p>
                  <p>Supported formats: PNG or JPG.</p>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleUploadClick}
                  disabled={isSubmitting}
                >
                  {iconPreviewUrl ? 'Change icon' : 'Upload icon'}
                </Button>
                {iconPreviewUrl && iconFile && (
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={handleClearSelectedIcon}
                    disabled={isSubmitting}
                  >
                    Reset selection
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />
              {iconError && <p className='text-sm text-red-300'>{iconError}</p>}
            </div>
            {error && (
              <div className='rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200'>
                {error}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='ghost' disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting
                  ? 'Saving…'
                  : workspace
                    ? 'Save changes'
                    : 'Create workspace'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
