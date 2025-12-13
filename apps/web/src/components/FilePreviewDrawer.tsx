'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Loader2,
  FileText,
  Download,
  Image as ImageIcon,
  File as FileIcon,
  Video,
  Music,
  Archive,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();
const WORKSPACE_FILES_BUCKET = 'workspace-files';
const AI_CHAT_FILES_BUCKET = 'ai-chat-files';

export interface FilePreviewData {
  id: number;
  original_filename: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  bucket?: 'workspace' | 'ai-chat';
}

interface FilePreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  file: FilePreviewData | null;
}

// Text-like file extensions and mime types
const TEXT_EXTENSIONS = [
  '.txt',
  '.csv',
  '.json',
  '.xml',
  '.md',
  '.markdown',
  '.html',
  '.htm',
  '.css',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.yml',
  '.yaml',
  '.toml',
  '.ini',
  '.cfg',
  '.conf',
  '.log',
  '.sh',
  '.bash',
  '.zsh',
  '.py',
  '.rb',
  '.php',
  '.java',
  '.c',
  '.cpp',
  '.h',
  '.hpp',
  '.go',
  '.rs',
  '.swift',
  '.kt',
  '.sql',
  '.env',
];

const TEXT_MIME_TYPES = [
  'text/plain',
  'text/csv',
  'text/html',
  'text/css',
  'text/javascript',
  'text/markdown',
  'text/xml',
  'application/json',
  'application/xml',
  'application/javascript',
  'application/x-yaml',
  'application/x-sh',
];

export default function FilePreviewDrawer({
  isOpen,
  onClose,
  file,
}: FilePreviewDrawerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const isTextFile = (mimeType: string, filename: string): boolean => {
    // Check mime type
    if (TEXT_MIME_TYPES.some(t => mimeType.includes(t))) {
      return true;
    }
    // Check file extension
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return TEXT_EXTENSIONS.includes(ext);
  };

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setFileUrl(null);
      setTextContent(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // Load file URL when drawer opens
  useEffect(() => {
    if (isOpen && file) {
      const loadFileUrl = async () => {
        setLoading(true);
        setError(null);
        setTextContent(null);

        try {
          const bucket =
            file.bucket === 'ai-chat'
              ? AI_CHAT_FILES_BUCKET
              : WORKSPACE_FILES_BUCKET;

          const { data: signedUrlData, error: signedUrlError } =
            await supabase.storage
              .from(bucket)
              .createSignedUrl(file.file_path, 3600);

          if (signedUrlError) {
            console.error('Error creating signed URL:', signedUrlError);
            setError('Failed to load file');
            return;
          }

          if (signedUrlData?.signedUrl) {
            setFileUrl(signedUrlData.signedUrl);

            // If it's a text file, fetch its content
            if (isTextFile(file.mime_type, file.original_filename)) {
              try {
                const response = await fetch(signedUrlData.signedUrl);
                const text = await response.text();
                setTextContent(text);
              } catch (fetchErr) {
                console.error('Error fetching text content:', fetchErr);
                // Don't set error - we can still show the file info
              }
            }
          }
        } catch (err) {
          console.error('Error loading file:', err);
          setError('Failed to load file');
        } finally {
          setLoading(false);
        }
      };

      loadFileUrl();
    }
  }, [isOpen, file]);

  const isImage = (mimeType: string): boolean => {
    return mimeType.startsWith('image/');
  };

  const isVideo = (mimeType: string): boolean => {
    return mimeType.startsWith('video/');
  };

  const isAudio = (mimeType: string): boolean => {
    return mimeType.startsWith('audio/');
  };

  const isPdf = (mimeType: string): boolean => {
    return mimeType === 'application/pdf';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/'))
      return <ImageIcon className='w-5 h-5 text-blue-400' />;
    if (mimeType.startsWith('video/'))
      return <Video className='w-5 h-5 text-purple-400' />;
    if (mimeType.startsWith('audio/'))
      return <Music className='w-5 h-5 text-pink-400' />;
    if (mimeType.includes('pdf'))
      return <FileText className='w-5 h-5 text-red-400' />;
    if (
      mimeType.includes('word') ||
      mimeType.includes('document') ||
      mimeType.includes('text')
    )
      return <FileText className='w-5 h-5 text-blue-400' />;
    if (mimeType.includes('sheet') || mimeType.includes('excel'))
      return <FileSpreadsheet className='w-5 h-5 text-green-400' />;
    if (mimeType.includes('zip') || mimeType.includes('compressed'))
      return <Archive className='w-5 h-5 text-yellow-400' />;
    return <FileIcon className='w-5 h-5 text-gray-400' />;
  };

  const handleDownload = async () => {
    if (!file) return;

    setDownloading(true);

    try {
      const bucket =
        file.bucket === 'ai-chat'
          ? AI_CHAT_FILES_BUCKET
          : WORKSPACE_FILES_BUCKET;

      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from(bucket)
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
    } catch (err) {
      console.error('Error downloading file:', err);
      alert('Failed to download file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const renderPreview = () => {
    if (!file) return null;

    if (loading) {
      return (
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='w-8 h-8 text-blue-400 animate-spin' />
        </div>
      );
    }

    if (error) {
      return (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <FileIcon className='w-12 h-12 text-gray-400 opacity-50 mb-3' />
          <p className='text-gray-400'>{error}</p>
        </div>
      );
    }

    // Image preview
    if (isImage(file.mime_type) && fileUrl) {
      return (
        <div className='relative w-full aspect-square max-h-[50vh] rounded-lg overflow-hidden bg-white/5'>
          <Image
            src={fileUrl}
            alt={file.original_filename}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-contain'
            priority
          />
        </div>
      );
    }

    // Video preview
    if (isVideo(file.mime_type) && fileUrl) {
      return (
        <div className='relative w-full aspect-video max-h-[50vh] rounded-lg overflow-hidden bg-white/5'>
          <video
            src={fileUrl}
            controls
            className='w-full h-full object-contain'
            playsInline
          />
        </div>
      );
    }

    // Audio preview
    if (isAudio(file.mime_type) && fileUrl) {
      return (
        <div className='p-6 rounded-lg bg-white/5'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-16 h-16 rounded-lg bg-pink-500/20 flex items-center justify-center'>
              <Music className='w-8 h-8 text-pink-400' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-white font-medium truncate'>
                {file.original_filename}
              </p>
              <p className='text-sm text-gray-400'>
                {formatFileSize(file.file_size)}
              </p>
            </div>
          </div>
          <audio src={fileUrl} controls className='w-full' />
        </div>
      );
    }

    // PDF preview
    if (isPdf(file.mime_type) && fileUrl) {
      return (
        <div className='relative w-full h-[50vh] rounded-lg overflow-hidden bg-white/5'>
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className='w-full h-full'
            title={file.original_filename}
          />
        </div>
      );
    }

    // Text file preview
    if (isTextFile(file.mime_type, file.original_filename) && textContent) {
      return (
        <div className='relative w-full max-h-[60vh] rounded-lg overflow-hidden bg-white/5'>
          <pre className='p-4 text-sm text-gray-200 whitespace-pre-wrap break-words overflow-y-auto max-h-[60vh] font-mono'>
            {textContent}
          </pre>
        </div>
      );
    }

    // Generic file preview
    return (
      <div className='flex flex-col items-center justify-center py-12 px-6 rounded-lg bg-white/5'>
        <div className='w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4'>
          {getFileIcon(file.mime_type)}
        </div>
        <p className='text-white font-medium text-center mb-1'>
          {file.original_filename}
        </p>
        <p className='text-sm text-gray-400'>
          {formatFileSize(file.file_size)}
        </p>
        <p className='text-xs text-gray-500 mt-2'>{file.mime_type}</p>
      </div>
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent zIndex={110} maxHeight='85vh'>
        <DrawerHandle />

        {/* Header */}
        <DrawerHeader className='px-4 pb-2 pt-0'>
          <div className='flex items-center gap-2 flex-1 min-w-0'>
            <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
              {file && getFileIcon(file.mime_type)}
            </div>
            <DrawerTitle className='truncate'>
              {file?.original_filename || 'File Preview'}
            </DrawerTitle>
          </div>
          {file && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 shrink-0'
              title='Download'
            >
              {downloading ? (
                <Loader2 className='w-5 h-5 animate-spin text-gray-400' />
              ) : (
                <Download className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
              )}
            </button>
          )}
        </DrawerHeader>

        {/* Content */}
        <DrawerBody>{renderPreview()}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
