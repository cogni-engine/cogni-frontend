'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Volume2, VolumeX, Pause, Disc, Download, RotateCcw, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import AspectImage from '@/components/sendable/AspectImage';
import SendableDefaultFile from '@/components/sendable/SendableDefaultFile';
import { createClient } from '@/lib/supabase/browserClient';
import { useGlobalUI } from '@/contexts/GlobalUIContext';

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

const AudioPlayer = ({
  src,
  filename,
}: {
  src: string;
  filename?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [volume, setVolume] = useState(1);
  const lastVolumeRef = useRef(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [isProgressHovering, setIsProgressHovering] = useState(false);
  const [isVolumeHovering, setIsVolumeHovering] = useState(false);
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => {
      if (!isPlaying) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoadStart = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('loadstart', onLoadStart);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('loadstart', onLoadStart);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isHoveringRef.current) return;
      if (e.target instanceof HTMLInputElement) return;

      const audio = audioRef.current;
      if (!audio) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (audio.paused) audio.play();
          else audio.pause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          audio.currentTime = Math.max(0, audio.currentTime - 15);
          break;
        case 'ArrowRight':
          e.preventDefault();
          audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
    } else {
      await audioRef.current.pause();
    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newVolume = parseFloat(e.target.value);
    lastVolumeRef.current = newVolume;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = lastVolumeRef.current;
      setVolume(lastVolumeRef.current);
      setIsMuted(false);
    } else {
      lastVolumeRef.current = audio.volume;
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const togglePlaybackRate = () => {
    if (!audioRef.current) return;
    const rates = [1, 1.25, 1.5, 1.75, 2, 0.75, 0.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleDownload = () => {
    if (!src) return;
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'audio-track';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full max-w-md mx-auto group font-sans"
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">

        <div className="relative p-6 flex flex-col gap-5 z-10">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-11 h-11 rounded-full bg-blue-500/90 flex items-center justify-center shadow-md flex-shrink-0 transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <Disc size={22} className="text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-white font-semibold tracking-tight text-sm leading-tight truncate">{filename || "Audio Track"}</h3>
                <p className="text-neutral-500 text-[11px] tracking-wide font-medium mt-0.5">
                  {isLoading ? 'Loading...' : `${formatTime(duration)}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[3px] h-8 flex-shrink-0 ml-3">
              {[12, 18, 24, 30, 20, 16, 28, 22, 26, 18, 14, 25].map((height, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full transition-all duration-150"
                  style={{
                    background: 'linear-gradient(to top, rgb(59,130,246), rgb(96,165,250))',
                    height: isPlaying ? `${height}px` : '6px',
                    animation: isPlaying ? `wave-${i} ${0.5 + (i % 3) * 0.2}s ease-in-out infinite alternate` : 'none',
                    opacity: isPlaying ? (0.6 + (i % 4) * 0.1) : 0.25
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div
              className="relative w-full py-2 -mx-1 px-1 cursor-pointer group/progress"
              onMouseEnter={() => setIsProgressHovering(true)}
              onMouseLeave={() => setIsProgressHovering(false)}
            >
              <div className="relative w-full h-1 rounded-full bg-white/[0.08] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />

                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                  style={{
                    width: `${progressPercent}%`,
                    transition: 'none'
                  }}
                />
              </div>

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="any"
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={isLoading}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />

              <div
                className="absolute top-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg pointer-events-none"
                style={{
                  left: `${progressPercent}%`,
                  transform: `translate(-50%, -50%) scale(${isProgressHovering ? 1 : 0})`,
                  opacity: isProgressHovering ? 1 : 0,
                  transition: 'transform 0.15s ease-out, opacity 0.15s ease-out'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-sm" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-medium text-neutral-500 font-mono px-0.5">
              <span className="text-white/60 tabular-nums">{formatTime(currentTime)}</span>
              <span className="tabular-nums">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">

            <div
              className="flex items-center gap-2.5 w-[140px]"
              onMouseEnter={() => setIsVolumeHovering(true)}
              onMouseLeave={() => setIsVolumeHovering(false)}
            >
              <button
                onClick={toggleMute}
                className="text-neutral-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg flex-shrink-0"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="relative w-20 h-8 flex items-center cursor-pointer">
                <div className="absolute w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neutral-400 to-neutral-300 rounded-full"
                    style={{
                      width: `${isMuted ? 0 : volume * 100}%`,
                      background: isVolumeHovering ? 'linear-gradient(to right, rgb(255,255,255), rgb(226,232,240))' : undefined,
                      transition: 'none'
                    }}
                  />
                </div>

                <div
                  className="absolute w-3 h-3 bg-white rounded-full shadow-md pointer-events-none"
                  style={{
                    left: `calc(${isMuted ? 0 : volume * 100}% - 6px)`,
                    opacity: isVolumeHovering ? 1 : 0,
                    transform: isVolumeHovering ? 'scale(1)' : 'scale(0.7)',
                    transition: 'opacity 0.15s, transform 0.15s'
                  }}
                />

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 w-[180px]">
              <button
                onClick={() => skip(-15)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-90 flex-shrink-0"
                title="Back 15s"
              >
                <RotateCcw size={25} className="relative z-10" />
                <span className="absolute text-[9px] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[1px] pointer-events-none">
                  15
                </span>
              </button>

              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white hover:bg-white/95 text-black transition-all duration-200 shadow-lg shadow-white/10 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause size={22} className="fill-black" />
                ) : (
                  <Play size={22} className="fill-black ml-1" />
                )}
              </button>

              <button
                onClick={() => skip(15)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-90 flex-shrink-0"
                title="Forward 15s"
              >
                <RotateCw size={25} className="relative z-10" />
                <span className="absolute text-[9px] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[1px] pointer-events-none">
                  15
                </span>
              </button>
            </div>

            {/* Right Controls - FIXED WIDTH */}
            <div className="flex items-center justify-end gap-2 w-[140px]">
              <button
                onClick={togglePlaybackRate}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-95 tabular-nums min-w-[44px] text-center"
              >
                {playbackRate}×
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-95 flex-shrink-0"
                title="Download"
              >
                <Download size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <audio ref={audioRef} src={src} />

      <style>{`
        @keyframes wave-0 { 0% { height: 12px; } 100% { height: 28px; } }
        @keyframes wave-1 { 0% { height: 18px; } 100% { height: 32px; } }
        @keyframes wave-2 { 0% { height: 24px; } 100% { height: 14px; } }
        @keyframes wave-3 { 0% { height: 30px; } 100% { height: 18px; } }
        @keyframes wave-4 { 0% { height: 20px; } 100% { height: 32px; } }
        @keyframes wave-5 { 0% { height: 16px; } 100% { height: 26px; } }
        @keyframes wave-6 { 0% { height: 28px; } 100% { height: 16px; } }
        @keyframes wave-7 { 0% { height: 22px; } 100% { height: 30px; } }
        @keyframes wave-8 { 0% { height: 26px; } 100% { height: 20px; } }
        @keyframes wave-9 { 0% { height: 18px; } 100% { height: 28px; } }
        @keyframes wave-10 { 0% { height: 14px; } 100% { height: 24px; } }
        @keyframes wave-11 { 0% { height: 25px; } 100% { height: 15px; } }
        
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

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
  const { openFileDrawer } = useGlobalUI();
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
