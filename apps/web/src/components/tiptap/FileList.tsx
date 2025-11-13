import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { SuggestionProps } from '@tiptap/suggestion';
import type { WorkspaceFile } from '@/lib/api/workspaceFilesApi';
import GlassCard from '../glass-card/GlassCard';

export interface FileListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export interface FileListProps extends SuggestionProps {
  items: WorkspaceFile[];
}

export const FileList = forwardRef<FileListRef, FileListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({
        id: item.id.toString(),
        label: item.original_filename,
        fileId: item.id,
      });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (props.items.length === 0) {
    return (
      <GlassCard className='rounded-xl p-3 text-sm text-gray-400'>
        No files found
      </GlassCard>
    );
  }

  // Helper function to get file icon based on mime type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.includes('pdf')) return '📄';
    if (
      mimeType.includes('word') ||
      mimeType.includes('document') ||
      mimeType.includes('text')
    )
      return '📝';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
    if (mimeType.includes('zip') || mimeType.includes('compressed'))
      return '📦';
    return '📎';
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <GlassCard className='rounded-xl overflow-hidden'>
      {props.items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => selectItem(index)}
          className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-3 ${
            index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <span className='text-lg shrink-0'>
            {getFileIcon(item.mime_type)}
          </span>
          <div className='flex-1 min-w-0'>
            <div className='text-sm font-medium text-white truncate'>
              {item.original_filename}
            </div>
            <div className='text-xs text-gray-400'>
              {formatFileSize(item.file_size)}
            </div>
          </div>
        </button>
      ))}
    </GlassCard>
  );
});

FileList.displayName = 'FileList';
