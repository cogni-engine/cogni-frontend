'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import SquareImage from '@/components/sendable/SquareImage';
import SendableDefaultFile from '@/components/sendable/SendableDefaultFile';
import { createClient } from '@/lib/supabase/browserClient';
import { useGlobalUI } from '@/contexts/GlobalUIContext';

const supabase = createClient();
const WORKSPACE_FILES_BUCKET = 'workspace-files';

export interface MessageFile {
  id: number; // bigint (database primary key from workspace_files)
  original_filename: string;
  file_path: string; // Contains UUID in path: {workspace_id}/uploads/{uuid}/{filename}
  mime_type: string;
  file_size: number;
}

type MessageFilesProps = {
  files: MessageFile[];
  bucket?: 'workspace' | 'ai-chat';
  align?: 'left' | 'right';
};

const isImage = (mimeType: string): boolean => {
  return mimeType.startsWith('image/');
};

export default function MessageFiles({
  files,
  bucket = 'workspace',
  align = 'right',
}: MessageFilesProps) {
  const { openFileDrawer } = useGlobalUI();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Map<number, string>>(new Map());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const loadedFilesRef = useRef<Set<number>>(new Set());
  const loadingFilesRef = useRef<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using portal (SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-load image URLs when component mounts or files change
  useEffect(() => {
    const loadImageUrls = async () => {
      const imageFiles = files.filter(file => isImage(file.mime_type));

      for (const file of imageFiles) {
        // Skip if already loaded or loading
        if (
          loadedFilesRef.current.has(file.id) ||
          loadingFilesRef.current.has(file.id)
        ) {
          continue;
        }

        loadingFilesRef.current.add(file.id);
        setLoadingImages(prev => new Set(prev).add(file.id));

        try {
          // Get signed URL for private bucket (valid for 1 hour)
          const { data: signedUrlData, error: signedUrlError } =
            await supabase.storage
              .from(WORKSPACE_FILES_BUCKET)
              .createSignedUrl(file.file_path, 3600);

          if (!signedUrlError && signedUrlData?.signedUrl) {
            loadedFilesRef.current.add(file.id);
            setImageUrls(prev =>
              new Map(prev).set(file.id, signedUrlData.signedUrl)
            );
          }
        } catch (error) {
          console.error('Error loading image URL:', error);
        } finally {
          loadingFilesRef.current.delete(file.id);
          setLoadingImages(prev => {
            const next = new Set(prev);
            next.delete(file.id);
            return next;
          });
        }
      }
    };

    loadImageUrls();
  }, [files]);

  // Lock body scroll when image is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedImage]);

  const handleFileClick = useCallback(
    (file: MessageFile) => {
      openFileDrawer({
        id: file.id,
        original_filename: file.original_filename,
        file_path: file.file_path,
        mime_type: file.mime_type,
        file_size: file.file_size,
        bucket,
      });
    },
    [openFileDrawer, bucket]
  );

  const handleImageClick = async (file: MessageFile) => {
    if (!imageUrls.has(file.id)) {
      try {
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from(WORKSPACE_FILES_BUCKET)
            .createSignedUrl(file.file_path, 3600);

        if (signedUrlError) {
          console.error('Error creating signed URL:', signedUrlError);
          return;
        }

        if (signedUrlData?.signedUrl) {
          setImageUrls(prev =>
            new Map(prev).set(file.id, signedUrlData.signedUrl)
          );
          setSelectedImage(signedUrlData.signedUrl);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      }
    } else {
      setSelectedImage(imageUrls.get(file.id) || null);
    }
  };

  const handleDownload = async (file: MessageFile) => {
    try {
      // Get signed URL for private bucket (valid for 1 hour)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from(WORKSPACE_FILES_BUCKET)
          .createSignedUrl(file.file_path, 3600);

      if (signedUrlError) {
        console.error('Error creating signed URL:', signedUrlError);
        alert('Failed to download file. Please try again.');
        return;
      }

      if (signedUrlData?.signedUrl) {
        const link = document.createElement('a');
        link.href = signedUrlData.signedUrl;
        link.download = file.original_filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  if (files.length === 0) return null;

  // Separate files into images and non-images
  const imageFiles = files.filter(file => isImage(file.mime_type));
  const nonImageFiles = files.filter(file => !isImage(file.mime_type));

  return (
    <>
      <div className='space-y-2 inline-block'>
        {/* Non-image files - vertical layout */}
        {nonImageFiles.length > 0 && (
          <div
            className={`flex flex-col gap-2 ${align === 'right' ? 'items-end' : 'items-start'}`}
          >
            {nonImageFiles.map(file => (
              <SendableDefaultFile
                key={file.id}
                filename={file.original_filename}
                fileSize={file.file_size}
                onClick={() => handleFileClick(file)}
                onDownload={() => handleDownload(file)}
              />
            ))}
          </div>
        )}

        {/* Image files - horizontal wrapping layout */}
        {imageFiles.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 ${align === 'right' ? 'justify-end' : 'justify-start'}`}
          >
            {imageFiles.map(file => (
              <SquareImage
                key={file.id}
                src={imageUrls.get(file.id)}
                alt={file.original_filename}
                size={128}
                isLoading={loadingImages.has(file.id)}
                onClick={() => handleImageClick(file)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Image View - Rendered via Portal to document.body */}
      {mounted &&
        selectedImage &&
        createPortal(
          <div
            className='fixed inset-0 z-[9999] bg-black'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors'
              aria-label='Close image'
            >
              <X className='w-5 h-5 text-white' />
            </button>
            <div
              className='relative w-full h-full'
              style={{ width: '100vw', height: '100vh' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt='Preview'
                fill
                sizes='100vw'
                className='object-contain'
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
