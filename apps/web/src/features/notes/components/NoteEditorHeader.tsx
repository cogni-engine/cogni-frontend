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
  onSelectAllAssignees?: () => void;
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
  onSelectAllAssignees,
}: NoteEditorHeaderProps) {
  const hasAssignees = assigneeIds.length > 0;

  return (
    <header className='flex items-center gap-3 px-2 md:px-6 py-4 md:pb-1 relative z-100'>
      {/* 戻るボタン - 丸く浮き出る */}
      <GlassButton onClick={onBack} className='size-12'>
        <ArrowLeft className='w-5 h-5' />
      </GlassButton>
      <input
        type='text'
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder='Title'
        className='flex-1 min-w-0 text-md font-bold bg-transparent focus:outline-none text-foreground placeholder-input-placeholder truncate'
      />
      {/* Assignment button for group notes */}
      {isGroupNote && (
        <div className='relative shrink-0'>
          <GlassButton
            onClick={onToggleAssignmentDropdown}
            className={hasAssignees ? 'h-12 px-4 rounded-full' : 'size-12'}
            title='Assignees'
          >
            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5' />
              {hasAssignees && (
                <span className='text-sm font-medium text-foreground'>
                  {assigneeIds.length}
                </span>
              )}
            </div>
          </GlassButton>

          <AssignmentDropdown
            isOpen={showAssignmentDropdown}
            onClose={onCloseAssignmentDropdown}
            members={members}
            assigneeIds={assigneeIds}
            onToggleAssignee={onToggleAssignee}
            onSelectAll={onSelectAllAssignees}
          />
        </div>
      )}
    </header>
  );
}
