'use client';

import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Loader2,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { StrikeChain } from '../types';
import GlassCard from '@/components/glass-design/GlassCard';

interface NoteEditorToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  canUploadImage: boolean;
  onImageUpload: () => void;
  onToggleTaskList: () => void;
  aiSuggestionsEnabled: boolean;
  isSuggestionLoading: boolean;
  onToggleAI: () => void;
}

export function NoteEditorToolbar({
  editor,
  uploadingImage,
  canUploadImage,
  onImageUpload,
  onToggleTaskList,
  aiSuggestionsEnabled,
  isSuggestionLoading,
  onToggleAI,
}: NoteEditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className='sticky top-0 z-18 mx-6'>
      <GlassCard className='px-6 py-1 rounded-3xl'>
        <div className='flex gap-1 flex-wrap'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            icon={<Bold className='w-5 h-5' />}
            title='Bold'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            icon={<Italic className='w-5 h-5' />}
            title='Italic'
          />
          <ToolbarButton
            onClick={() => {
              const chain = editor.chain().focus() as StrikeChain;
              if (chain.toggleStrike) {
                chain.toggleStrike().run();
              }
            }}
            isActive={editor.isActive('strike')}
            icon={<Strikethrough className='w-5 h-5' />}
            title='Strikethrough'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            icon={<List className='w-5 h-5' />}
            title='Bullet list'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            icon={<ListOrdered className='w-5 h-5' />}
            title='Numbered list'
          />
          <ToolbarButton
            onClick={onToggleTaskList}
            isActive={editor.isActive('taskList')}
            icon={<CheckSquare className='w-5 h-5' />}
            title='Task list'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            icon={<Quote className='w-5 h-5' />}
            title='Quote'
          />
          <ToolbarButton
            onClick={onImageUpload}
            disabled={uploadingImage || !canUploadImage}
            icon={
              uploadingImage ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                <ImageIcon className='w-5 h-5' />
              )
            }
            title='Insert Image'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<Undo className='w-5 h-5' />}
            title='Undo'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<Redo className='w-5 h-5' />}
            title='Redo'
          />
          <ToolbarButton
            onClick={onToggleAI}
            isActive={aiSuggestionsEnabled}
            icon={
              isSuggestionLoading ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                <Sparkles className='w-5 h-5' />
              )
            }
            title={`AI Suggestions (${aiSuggestionsEnabled ? 'On' : 'Off'}) - Press Tab to accept`}
          />
        </div>
      </GlassCard>
    </div>
  );
}
