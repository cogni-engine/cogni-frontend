'use client';

import { ArrowLeft, Users } from 'lucide-react';
import { AssignmentDropdown } from './AssignmentDropdown';
import { WorkspaceMember } from '@/types/workspace';

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
    <header className='flex items-center gap-3 py-4 relative z-100'>
      {/* 戻るボタン - 丸く浮き出る */}
      <button
        onClick={onBack}
        className='w-[50px] h-[50px] min-w-[50px] shrink-0 rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center'
      >
        <ArrowLeft className='w-5 h-5' />
      </button>
      <input
        type='text'
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder='タイトル'
        className='flex-1 min-w-0 text-2xl font-bold bg-transparent focus:outline-none text-white placeholder-gray-500 truncate'
      />
      {/* Assignment button for group notes */}
      {isGroupNote && (
        <div className='relative shrink-0'>
          <button
            onClick={onToggleAssignmentDropdown}
            className='w-[50px] h-[50px] min-w-[50px] shrink-0 rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center relative'
            title='担当者'
          >
            <Users className='w-5 h-5' />
            {assigneeIds.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'>
                {assigneeIds.length}
              </span>
            )}
          </button>

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
