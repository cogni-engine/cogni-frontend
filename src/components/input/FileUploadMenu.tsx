'use client';

import { useRef } from 'react';
import { Image, File as FileIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    accept: string
  ) => {
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

  const triggerFileInput = (accept: string) => {
    const input = accept.startsWith('image/') ? imageInputRef : fileInputRef;
    input.current?.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            type='button'
            className='absolute left-0 bottom-2 bg-white/8 backdrop-blur-xl text-white/80 rounded-full border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center w-[50px] h-[50px] p-0 z-10 disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Upload files'
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' side='top' sideOffset={8}>
          <DropdownMenuItem
            onClick={() => triggerFileInput('image/*')}
            className='cursor-pointer'
          >
            <Image className='mr-2 h-4 w-4' />
            <span>Upload Images</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => triggerFileInput('*/*')}
            className='cursor-pointer'
          >
            <FileIcon className='mr-2 h-4 w-4' />
            <span>Upload Files</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={e => handleFileSelect(e, 'image/*')}
      />
      <input
        ref={fileInputRef}
        type='file'
        multiple
        className='hidden'
        onChange={e => handleFileSelect(e, '*/*')}
      />
    </>
  );
}
