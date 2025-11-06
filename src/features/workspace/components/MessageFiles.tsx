'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  File as FileIcon,
  Download,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/browserClient';

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
};

const isImage = (mimeType: string): boolean => {
  return mimeType.startsWith('image/');
};

export default function MessageFiles({ files }: MessageFilesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Map<number, string>>(new Map());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const loadedFilesRef = useRef<Set<number>>(new Set());
  const loadingFilesRef = useRef<Set<number>>(new Set());

  // Pre-load image URLs when component mounts or files change
  useEffect(() => {
    const loadImageUrls = async () => {
      const imageFiles = files.filter(file => isImage(file.mime_type));
      
      for (const file of imageFiles) {
        // Skip if already loaded or loading
        if (loadedFilesRef.current.has(file.id) || loadingFilesRef.current.has(file.id)) {
          continue;
        }

        loadingFilesRef.current.add(file.id);
        setLoadingImages(prev => new Set(prev).add(file.id));

        try {
          // Get signed URL for private bucket (valid for 1 hour)
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from(WORKSPACE_FILES_BUCKET)
            .createSignedUrl(file.file_path, 3600);

          if (!signedUrlError && signedUrlData?.signedUrl) {
            loadedFilesRef.current.add(file.id);
            setImageUrls(prev => new Map(prev).set(file.id, signedUrlData.signedUrl));
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

  const handleImageClick = async (file: MessageFile) => {
    if (!imageUrls.has(file.id)) {
      try {
        // Get signed URL for private bucket (valid for 1 hour)
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from(WORKSPACE_FILES_BUCKET)
          .createSignedUrl(file.file_path, 3600);

        if (signedUrlError) {
          console.error('Error creating signed URL:', signedUrlError);
          return;
        }

        if (signedUrlData?.signedUrl) {
          setImageUrls(prev => new Map(prev).set(file.id, signedUrlData.signedUrl));
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
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
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

  return (
    <>
      <div className='flex flex-wrap gap-2 mt-2'>
        {files.map(file => {
          const isImg = isImage(file.mime_type);
          const imageUrl = imageUrls.get(file.id);

          return (
            <div
              key={file.id}
              className={`relative group ${isImg ? 'cursor-pointer' : ''}`}
            >
              {isImg ? (
                <div
                  onClick={() => handleImageClick(file)}
                  className='relative w-32 h-32 rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all'
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={file.original_filename}
                      className='w-full h-full object-cover'
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
                  <div className='absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center'>
                    <ImageIcon className='w-6 h-6 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-2 bg-white/8 backdrop-blur-xl border border-black rounded-lg px-3 py-2 hover:bg-white/12 transition-all'>
                  <FileIcon className='w-5 h-5 text-white/60 flex-shrink-0' />
                  <div className='flex-1 min-w-0'>
                    <p
                      className='text-sm text-white truncate'
                      title={file.original_filename}
                    >
                      {file.original_filename}
                    </p>
                    <p className='text-xs text-white/40'>
                      {formatFileSize(file.file_size)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    className='ml-2 p-1.5 rounded-md hover:bg-white/10 transition-colors'
                    aria-label='Download file'
                  >
                    <Download className='w-4 h-4 text-white/60' />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className='absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors'
            aria-label='Close image'
          >
            <X className='w-5 h-5 text-white' />
          </button>
          <img
            src={selectedImage}
            alt='Preview'
            className='max-w-[90vw] max-h-[90vh] object-contain'
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
