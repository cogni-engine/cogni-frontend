'use client';

import { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, File as FileIcon } from 'lucide-react';

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
  };

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <div className='relative flex flex-col items-center gap-3'>
      {isOpen && (
        <div className='absolute bottom-full mb-3 flex flex-col items-center gap-2 bg-white/8 backdrop-blur-xl text-white/80 rounded-full border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] px-3 py-4'>
          <button
            type='button'
            onClick={() => triggerFileInput('image')}
            disabled={disabled}
            className='relative group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Upload images'
          >
            <ImageIcon className='h-4 w-4' />
            <span className='pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              Upload images
            </span>
          </button>
          <button
            type='button'
            onClick={() => triggerFileInput('file')}
            disabled={disabled}
            className='relative group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Upload files'
          >
            <FileIcon className='h-4 w-4' />
            <span className='pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              Upload files
            </span>
          </button>
        </div>
      )}
      <button
        type='button'
        onClick={() => {
          if (disabled) return;
          setIsOpen(prev => !prev);
        }}
        disabled={disabled}
        className='flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/8 backdrop-blur-xl text-white/80 border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed'
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
        accept='image/*'
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
  );
}
