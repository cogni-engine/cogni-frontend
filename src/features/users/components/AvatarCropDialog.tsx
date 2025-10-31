'use client';

import Cropper, { type Area } from 'react-easy-crop';

import { Button } from '@/components/ui/button';
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
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Crop avatar</DialogTitle>
          <DialogDescription>
            Adjust the crop to center your face. The result will be a square
            image.
          </DialogDescription>
        </DialogHeader>
        <div className='relative h-80 w-full overflow-hidden rounded-lg bg-black/40'>
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
            <div className='flex h-full items-center justify-center text-white/60'>
              No image selected.
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='zoom'>Zoom</Label>
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
        <DialogModalFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant='ghost'
              disabled={saving}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type='button' onClick={onSave} disabled={saving || !canSave}>
            {saving ? 'Saving…' : 'Save avatar'}
          </Button>
        </DialogModalFooter>
      </DialogContent>
    </Dialog>
  );
}
