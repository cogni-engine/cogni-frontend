'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AspectImage from '@/components/sendable/AspectImage';
import SendableDefaultFile from '@/components/sendable/SendableDefaultFile';
import { createClient } from '@/lib/supabase/browserClient';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';

const supabase = createClient();
const WORKSPACE_FILES_BUCKET = 'workspace-files';

export interface MessageFile {
  id: number;
  original_filename: string;
  file_path: string;
  mime_type: string;
  file_size: number;
}

type MessageFilesProps = {
  files: MessageFile[];
  bucket?: 'workspace' | 'ai-chat';
  align?: 'left' | 'right';
};

// for special files
const isImage = (mimeType: string): boolean => mimeType.startsWith('image/');
const isAudio = (mimeType: string): boolean => mimeType.startsWith('audio/');
const isVideo = (mimeType: string): boolean => mimeType.startsWith('video/');

function AudioPlayer({ src, filename }: { src: string; filename: string }) {
  return (
    <div className='flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-white/5 rounded-2xl px-4 py-3 min-w-[300px] md:min-w-[360px] max-w-full shadow-2xl ring-1 ring-white/10'>
      <div className='w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20'>
        <Volume2 className='w-5 h-5 text-blue-400' />
      </div>
      <div className='flex-1 min-w-0'>
        <p
          className='text-[10px] font-medium text-white/40 truncate mb-1.5 px-1'
          title={filename}
        >
          {filename}
        </p>
        <audio
          controls
          src={src}
          className='w-full h-8 opacity-90 brightness-90 contrast-125'
          controlsList='nodownload'
        />
      </div>
    </div>
  );
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div className='relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 max-w-sm'>
      <video
        ref={videoRef}
        src={src}
        className='w-full aspect-video object-contain'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      />
      {!isPlaying && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer group-hover:bg-black/40 transition-all duration-300'
          onClick={togglePlay}
        >
          <div className='w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300'>
            <Play className='w-7 h-7 text-white ml-1' fill='currentColor' />
          </div>
        </div>
      )}
    </div>
  );
}

export default function MessageFiles({
  files,
  bucket = 'workspace',
  align = 'right',
}: MessageFilesProps) {
  const openFileDrawer = useGlobalUIStore(state => state.openFileDrawer);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileUrls, setFileUrls] = useState<Map<number, string>>(new Map());
  const [loadingFiles, setLoadingFiles] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadFileUrls = async () => {
      // gets the special files
      const mediaFiles = files.filter(
        file =>
          isImage(file.mime_type) ||
          isAudio(file.mime_type) ||
          isVideo(file.mime_type)
      );

      // render the special files
      for (const file of mediaFiles) {
        if (fileUrls.has(file.id) || loadingFiles.has(file.id)) continue;

        setLoadingFiles(prev => new Set(prev).add(file.id));

        try {
          const { data, error } = await supabase.storage
            .from(WORKSPACE_FILES_BUCKET)
            .createSignedUrl(file.file_path, 3600);

          if (!error && data?.signedUrl) {
            setFileUrls(prev => new Map(prev).set(file.id, data.signedUrl));
          }
        } catch (error) {
          console.error('Error loading file URL:', error);
        } finally {
          setLoadingFiles(prev => {
            const next = new Set(prev);
            next.delete(file.id);
            return next;
          });
        }
      }
    };

    loadFileUrls();
  }, [files, fileUrls, loadingFiles]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedImage]);

  const handleDownload = async (file: MessageFile) => {
    try {
      let url = fileUrls.get(file.id);
      if (!url) {
        const { data, error } = await supabase.storage
          .from(WORKSPACE_FILES_BUCKET)
          .createSignedUrl(file.file_path, 3600);
        if (error) throw error;
        url = data.signedUrl;
      }

      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = file.original_filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const imageFiles = useMemo(
    () => files.filter(file => isImage(file.mime_type)),
    [files]
  );
  const audioFiles = useMemo(
    () => files.filter(file => isAudio(file.mime_type)),
    [files]
  );
  const videoFiles = useMemo(
    () => files.filter(file => isVideo(file.mime_type)),
    [files]
  );
  const otherFiles = useMemo(
    () =>
      files.filter(
        file =>
          !isImage(file.mime_type) &&
          !isAudio(file.mime_type) &&
          !isVideo(file.mime_type)
      ),
    [files]
  );

  if (files.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-3',
          align === 'right' ? 'items-end' : 'items-start'
        )}
      >
        {/* Videos */}
        {videoFiles.map(file => {
          const url = fileUrls.get(file.id);
          if (!url) {
            return (
              <div
                key={file.id}
                className='relative rounded-xl overflow-hidden border border-white/10 bg-black/40 w-full max-w-sm aspect-video flex items-center justify-center'
              >
                <div className='animate-pulse w-12 h-12 rounded-full bg-white/10' />
              </div>
            );
          }
          return <VideoPlayer key={file.id} src={url} />;
        })}

        {/* Audios */}
        {audioFiles.map(file => {
          const url = fileUrls.get(file.id);
          if (!url) {
            return (
              <div
                key={file.id}
                className='flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 min-w-[300px] md:min-w-[360px] max-w-full shadow-lg h-[86px]'
              >
                <div className='w-10 h-10 rounded-full bg-blue-500/10 animate-pulse shrink-0' />
                <div className='flex-1 space-y-2'>
                  <div className='h-2 w-24 bg-white/5 rounded animate-pulse' />
                  <div className='h-8 w-full bg-white/5 rounded-full animate-pulse' />
                </div>
              </div>
            );
          }
          return (
            <AudioPlayer
              key={file.id}
              src={url}
              filename={file.original_filename}
            />
          );
        })}

        {/* Images with Grid Logic */}
        {imageFiles.length > 0 && (
          <div
            className={cn(
              'grid gap-1',
              imageFiles.length === 1
                ? 'grid-cols-1'
                : imageFiles.length === 2
                  ? 'grid-cols-2'
                  : imageFiles.length === 3
                    ? 'grid-cols-2'
                    : 'grid-cols-2'
            )}
          >
            {imageFiles.map((file, idx) => (
              <AspectImage
                key={file.id}
                src={fileUrls.get(file.id)}
                alt={file.original_filename}
                size={imageFiles.length === 1 ? 240 : 120}
                isLoading={loadingFiles.has(file.id)}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedImage(fileUrls.get(file.id) || null);
                }}
                aspectRatio={
                  imageFiles.length === 3 && idx === 0 ? 'auto' : '1/1'
                }
                className={cn(
                  'rounded-lg overflow-hidden',
                  imageFiles.length === 3 && idx === 0 ? 'row-span-2' : ''
                )}
              />
            ))}
          </div>
        )}

        {/* Other Files */}
        {otherFiles.length > 0 && (
          <div className='flex flex-col gap-2'>
            {otherFiles.map(file => (
              <SendableDefaultFile
                key={file.id}
                filename={file.original_filename}
                fileSize={file.file_size}
                mimeType={file.mime_type}
                onClick={() => openFileDrawer({ ...file, bucket })}
                onDownload={() => handleDownload(file)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Improved Full Screen Portal */}
      {mounted &&
        selectedImage &&
        createPortal(
          <div className='fixed inset-0 z-10000 flex items-center justify-center p-4 md:p-10'>
            <div
              className='absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300'
              onClick={() => setSelectedImage(null)}
            />

            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-xl'
            >
              <X className='w-6 h-6' />
            </button>

            <div
              className='relative w-full h-full max-w-5xl max-h-full flex items-center justify-center animate-in zoom-in-95 fade-in duration-300'
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt='Preview'
                fill
                className='object-contain select-none shadow-2xl'
                priority
                sizes='(max-width: 1280px) 100vw, 1280px'
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
