'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Image as ImageIcon,
  File as FileIcon,
  Download,
  X,
} from 'lucide-react';
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
};

const isImage = (mimeType: string): boolean => {
  return mimeType.startsWith('image/');
};

export default function MessageFiles({
  files,
  bucket = 'workspace',
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

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
          <div className='flex flex-col gap-2'>
            {nonImageFiles.map(file => (
              <div
                key={file.id}
                className='relative group overflow-hidden cursor-pointer'
                onClick={() => handleFileClick(file)}
              >
                <div className='flex items-center gap-2 bg-white/13 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/16 transition-all min-w-0'>
                  <FileIcon className='w-5 h-5 text-white/60 flex-shrink-0' />
                  <div className='flex-1 min-w-0 overflow-hidden'>
                    <p
                      className='text-sm text-white truncate'
                      title={file.original_filename}
                    >
                      {file.original_filename}
                    </p>
                    <p className='text-xs text-white/40 truncate'>
                      {formatFileSize(file.file_size)}
                    </p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                    className='ml-2 p-1.5 rounded-md hover:bg-white/10 transition-colors flex-shrink-0'
                    aria-label='Download file'
                  >
                    <Download className='w-4 h-4 text-white/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image files - horizontal wrapping layout */}
        {imageFiles.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {imageFiles.map(file => {
              const imageUrl = imageUrls.get(file.id);

              return (
                <div key={file.id} className='relative group cursor-pointer'>
                  <div
                    data-image-clickable
                    onClick={() => handleImageClick(file)}
                    onTouchEnd={e => {
                      // Prevent parent touch handlers from interfering
                      e.stopPropagation();
                      // Don't prevent default here - let the click happen naturally
                      handleImageClick(file);
                    }}
                    onTouchStart={e => {
                      // Stop propagation to prevent parent swipe handlers
                      e.stopPropagation();
                    }}
                    onPointerDown={e => {
                      // Ensure pointer events work on mobile
                      e.stopPropagation();
                    }}
                    className='relative w-32 h-32 rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all'
                    style={{
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={file.original_filename}
                        fill
                        sizes='128px'
                        className='object-cover pointer-events-none select-none'
                        draggable={false}
                        loading='lazy'
                      />
                    ) : loadingImages.has(file.id) ? (
                      <div className='w-full h-full flex items-center justify-center'>
                        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white/40'></div>
                      </div>
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <ImageIcon className='w-8 h-8 text-white/40' />
                      </div>
                    )}
                    <div className='absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none'>
                      <ImageIcon className='w-6 h-6 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity' />
                    </div>
                  </div>
                </div>
              );
            })}
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
