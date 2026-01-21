'use client';

import { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, File as FileIcon, Camera } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerBody,
} from '@/components/ui/drawer';
import { useNativeImagePicker } from '@/shared/hooks/useNativeImagePicker';
import { useNativeDocumentPicker } from '@/shared/hooks/useNativeDocumentPicker';

type FileUploadMenuProps = {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  disabled?: boolean;
};

export default function FileUploadMenu({
  onFilesSelected,
  maxFiles = 4,
  disabled = false,
}: FileUploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    isNativeAvailable: isImageNativeAvailable,
    pickImage,
    takePhoto,
  } = useNativeImagePicker();
  const { isNativeAvailable: isFileNativeAvailable, pickFile } =
    useNativeDocumentPicker();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Limit to maxFiles
    const selectedFiles = files.slice(0, maxFiles);

    // Validate file count
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
    }

    onFilesSelected(selectedFiles);

    // Reset input
    e.target.value = '';
  };

  const triggerFileInput = (accept: 'image' | 'file') => {
    const input = accept === 'image' ? imageInputRef : fileInputRef;
    input.current?.click();
    setIsOpen(false);
  };

  const handleNativeImagePick = async () => {
    setIsOpen(false);
    try {
      const result = await pickImage({
        multiple: true,
        quality: 0.8,
      });
      const files = Array.isArray(result) ? result : [result];
      const limitedFiles = files.slice(0, maxFiles);
      onFilesSelected(limitedFiles);
    } catch (error) {
      console.error('Failed to pick image:', error);
      // User probably canceled, no need to show error
    }
  };

  const handleNativeCamera = async () => {
    setIsOpen(false);
    try {
      const file = await takePhoto({ quality: 0.8 });
      onFilesSelected([file]);
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleNativeFilePick = async () => {
    setIsOpen(false);
    try {
      const result = await pickFile({
        multiple: true,
      });
      const files = Array.isArray(result) ? result : [result];
      const limitedFiles = files.slice(0, maxFiles);
      onFilesSelected(limitedFiles);
    } catch (error) {
      console.error('Failed to pick file:', error);
      // User probably canceled, no need to show error
    }
  };

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <>
      <div className='flex flex-col items-center gap-3'>
        <button
          type='button'
          onClick={() => {
            if (disabled) return;
            setIsOpen(true);
          }}
          disabled={disabled}
          className='flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/3 backdrop-blur-md text-white/80 border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Add files'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='12' y1='5' x2='12' y2='19'></line>
            <line x1='5' y1='12' x2='19' y2='12'></line>
          </svg>
        </button>

        {/* Hidden file inputs */}
        <input
          ref={imageInputRef}
          type='file'
          accept='image/png,image/jpeg,image/jpg,image/gif,image/webp'
          multiple
          className='hidden'
          onChange={handleFileSelect}
        />
        <input
          ref={fileInputRef}
          type='file'
          multiple
          className='hidden'
          onChange={handleFileSelect}
        />
      </div>

      {/* File Upload Drawer - outside relative container to avoid stacking context issues */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent maxHeight='auto'>
          <DrawerHandle />
          <DrawerBody className='pb-8'>
            <div className='flex flex-col gap-2'>
              {isImageNativeAvailable || isFileNativeAvailable ? (
                <>
                  {isImageNativeAvailable && (
                    <>
                      <button
                        type='button'
                        onClick={handleNativeImagePick}
                        disabled={disabled}
                        className='flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                          <ImageIcon className='h-5 w-5' />
                        </div>
                        <span className='text-[17px]'>Choose from library</span>
                      </button>
                      <button
                        type='button'
                        onClick={handleNativeCamera}
                        disabled={disabled}
                        className='flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                          <Camera className='h-5 w-5' />
                        </div>
                        <span className='text-[17px]'>Take photo</span>
                      </button>
                    </>
                  )}
                  {isFileNativeAvailable && (
                    <button
                      type='button'
                      onClick={handleNativeFilePick}
                      disabled={disabled}
                      className='flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                        <FileIcon className='h-5 w-5' />
                      </div>
                      <span className='text-[17px]'>Choose files</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={() => triggerFileInput('image')}
                    disabled={disabled}
                    className='flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                      <ImageIcon className='h-5 w-5' />
                    </div>
                    <span className='text-[17px]'>Upload images</span>
                  </button>
                  <button
                    type='button'
                    onClick={() => triggerFileInput('file')}
                    disabled={disabled}
                    className='flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white/5 text-white/90 transition-all duration-200 hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                      <FileIcon className='h-5 w-5' />
                    </div>
                    <span className='text-[17px]'>Upload files</span>
                  </button>
                </>
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
