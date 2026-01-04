'use client';

import { ArrowLeft, Users } from 'lucide-react';
import { AssignmentDropdown } from './AssignmentDropdown';
import { WorkspaceMember } from '@/types/workspace';
import GlassButton from '@/components/glass-design/GlassButton';

interface NoteEditorHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  onBack: () => void;
  isGroupNote: boolean;
  showAssignmentDropdown: boolean;
  onToggleAssignmentDropdown: () => void;
  onCloseAssignmentDropdown: () => void;
  members: WorkspaceMember[];
  assigneeIds: number[];
  onToggleAssignee: (memberId: number) => void;
}

export function NoteEditorHeader({
  title,
  onTitleChange,
  onBack,
  isGroupNote,
  showAssignmentDropdown,
  onToggleAssignmentDropdown,
  onCloseAssignmentDropdown,
  members,
  assigneeIds,
  onToggleAssignee,
}: NoteEditorHeaderProps) {
  return (
    <header className='flex items-center gap-3 px-2 md:px-6 py-4 relative z-100'>
      {/* 戻るボタン - 丸く浮き出る */}
      <GlassButton onClick={onBack} className='size-12'>
        <ArrowLeft className='w-5 h-5' />
      </GlassButton>
      <input
        type='text'
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder='タイトル'
        className='flex-1 min-w-0 text-md font-bold bg-transparent focus:outline-none text-white placeholder-gray-500 truncate'
      />
      {/* Assignment button for group notes */}
      {isGroupNote && (
        <div className='relative shrink-0'>
          <GlassButton
            onClick={onToggleAssignmentDropdown}
            className='size-12'
            title='担当者'
          >
            <Users className='w-5 h-5' />
            {assigneeIds.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'>
                {assigneeIds.length}
              </span>
            )}
          </GlassButton>

          <AssignmentDropdown
            isOpen={showAssignmentDropdown}
            onClose={onCloseAssignmentDropdown}
            members={members}
            assigneeIds={assigneeIds}
            onToggleAssignee={onToggleAssignee}
          />
        </div>
      )}
    </header>
  );
}
