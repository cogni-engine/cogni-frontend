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
import { StrikeChain, TaskListChain } from '../types';

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
    <div className='sticky top-0 z-20 flex flex-wrap gap-2 mx-2 px-3 py-3 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]'>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={<Bold className='w-4 h-4' />}
        title='Bold'
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={<Italic className='w-4 h-4' />}
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
        icon={<Strikethrough className='w-4 h-4' />}
        title='Strikethrough'
      />
      <div className='w-px h-6 bg-white/10 my-auto' />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={<List className='w-4 h-4' />}
        title='Bullet list'
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        icon={<ListOrdered className='w-4 h-4' />}
        title='Numbered list'
      />
      <ToolbarButton
        onClick={onToggleTaskList}
        isActive={editor.isActive('taskList')}
        icon={<CheckSquare className='w-4 h-4' />}
        title='Task list'
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        icon={<Quote className='w-4 h-4' />}
        title='Quote'
      />
      <div className='w-px h-6 bg-white/10 my-auto' />
      <ToolbarButton
        onClick={onImageUpload}
        disabled={uploadingImage || !canUploadImage}
        icon={
          uploadingImage ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <ImageIcon className='w-4 h-4' />
          )
        }
        title='Insert Image'
      />
      <div className='w-px h-6 bg-white/10 my-auto' />
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        icon={<Undo className='w-4 h-4' />}
        title='Undo'
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        icon={<Redo className='w-4 h-4' />}
        title='Redo'
      />
      <div className='w-px h-6 bg-white/10 my-auto' />
      <ToolbarButton
        onClick={onToggleAI}
        isActive={aiSuggestionsEnabled}
        icon={
          isSuggestionLoading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <Sparkles className='w-4 h-4' />
          )
        }
        title={`AI Suggestions (${aiSuggestionsEnabled ? 'On' : 'Off'}) - Press Tab to accept`}
      />
    </div>
  );
}
