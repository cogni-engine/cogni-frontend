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

type WorkspaceIconCropDialogProps = {
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

export function WorkspaceIconCropDialog({
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
}: WorkspaceIconCropDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Adjust workspace icon</DialogTitle>
          <DialogDescription>
            Center the important part of the image. The final icon will be a
            square.
          </DialogDescription>
        </DialogHeader>
        <div className='relative h-80 w-full overflow-hidden rounded-xl bg-dialog-overlay'>
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
          <Label htmlFor='workspace-icon-zoom'>Zoom</Label>
          <input
            id='workspace-icon-zoom'
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
            {saving ? 'Saving…' : 'Save icon'}
          </Button>
        </DialogModalFooter>
      </DialogContent>
    </Dialog>
  );
}
