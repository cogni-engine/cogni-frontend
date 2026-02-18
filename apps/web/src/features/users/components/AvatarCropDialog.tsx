'use client';

import Cropper, { type Area } from 'react-easy-crop';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter as DialogModalFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type AvatarCropDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (area: Area, areaPixels: Area) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  canSave: boolean;
};

export function AvatarCropDialog({
  open,
  onOpenChange,
  imageSrc,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onSave,
  onCancel,
  saving,
  canSave,
}: AvatarCropDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl rounded-3xl bg-dialog-bg backdrop-blur-sm border border-border-default shadow-card'>
        <DialogHeader>
          <DialogTitle className='text-foreground'>Crop avatar</DialogTitle>
          <DialogDescription className='text-text-secondary'>
            Adjust the crop to center your face. The result will be a square
            image.
          </DialogDescription>
        </DialogHeader>
        <div className='relative h-80 w-full overflow-hidden rounded-3xl bg-surface-secondary border border-border-default'>
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              showGrid={false}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div className='flex h-full items-center justify-center text-text-secondary'>
              No image selected.
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='zoom' className='text-foreground'>
            Zoom
          </Label>
          <input
            id='zoom'
            type='range'
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={event => onZoomChange(Number(event.target.value))}
            className='w-full accent-white'
          />
        </div>
        <DialogModalFooter className='gap-3 sm:flex-row sm:justify-end'>
          <DialogClose asChild>
            <button
              type='button'
              disabled={saving}
              onClick={onCancel}
              className='flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-surface-secondary backdrop-blur-xl text-foreground rounded-3xl border border-border-default hover:border-border-default hover:bg-interactive-hover hover:scale-[1.01] transition-all duration-300 shadow-card hover:shadow-card-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              Cancel
            </button>
          </DialogClose>
          <button
            type='button'
            onClick={onSave}
            disabled={saving || !canSave}
            className='flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-surface-secondary backdrop-blur-xl text-foreground rounded-3xl border border-border-default hover:border-border-default hover:bg-interactive-hover hover:scale-[1.01] transition-all duration-300 shadow-card hover:shadow-card-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {saving ? 'Saving…' : 'Save avatar'}
          </button>
        </DialogModalFooter>
      </DialogContent>
    </Dialog>
  );
}
