'use client';

import { X, Check, Trash2 } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import type { Task } from '@/types/task';

import { TimeWheelPicker } from './TimeWheelPicker';
import { SettingsRow } from './SettingsRow';
import { Toggle } from './Toggle';
import { RecurrenceSelector } from './RecurrenceSelector';
import { LabelInputDrawer } from './LabelInputDrawer';
import { formatRecurrenceDisplay } from '../utils/formatters';
import type { TimeValue } from '../hooks/useTaskDrawer';

interface TaskEditDrawerProps {
  // Drawer state
  editingTask: Task | null;
  saving: boolean;
  showRecurrenceSelector: boolean;
  showLabelInput: boolean;
  dragOffset: number;
  drawerRef: React.RefObject<HTMLDivElement | null>;

  // Form state
  formTime: TimeValue;
  formTitle: string;
  formRecurrence: string;
  formIsAiTask: boolean;
  formIsActive: boolean;

  // Form setters
  onTimeChange: (value: TimeValue) => void;
  onTitleChange: (value: string) => void;
  onRecurrenceChange: (value: string) => void;
  onIsAiTaskChange: (value: boolean) => void;
  onIsActiveChange: (value: boolean) => void;

  // Drawer actions
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onShowRecurrenceSelector: (value: boolean) => void;
  onShowLabelInput: (value: boolean) => void;

  // Gesture binding
  bindDrag: () => React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Main task edit/create drawer component
 */
export function TaskEditDrawer({
  editingTask,
  saving,
  showRecurrenceSelector,
  showLabelInput,
  dragOffset,
  drawerRef,
  formTime,
  formTitle,
  formRecurrence,
  formIsAiTask,
  formIsActive,
  onTimeChange,
  onTitleChange,
  onRecurrenceChange,
  onIsAiTaskChange,
  onIsActiveChange,
  onClose,
  onSave,
  onDelete,
  onShowRecurrenceSelector,
  onShowLabelInput,
  bindDrag,
}: TaskEditDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className='fixed inset-x-0 bottom-0 z-60 animate-[slide-up_0.3s_ease-out]'
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
      >
        <GlassCard className='rounded-t-3xl rounded-b-none max-h-[85vh] flex flex-col'>
          {/* Drag Handle */}
          <div
            {...bindDrag()}
            className='pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none'
          >
            <div className='w-12 h-1 bg-white/20 rounded-full mx-auto' />
          </div>

          {/* Header */}
          <div className='flex items-center justify-between px-4 pb-3 pt-1 border-b border-white/10'>
            <button
              onClick={onClose}
              className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors'
            >
              <X className='w-4 h-4 text-white/70' />
            </button>
            <span className='text-white text-[17px] font-semibold'>
              {editingTask ? 'Edit Task' : 'New Task'}
            </span>
            <button
              onClick={onSave}
              disabled={!formTitle.trim() || saving}
              className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 transition-colors'
            >
              <Check className='w-5 h-5 text-white' />
            </button>
          </div>

          {/* Content */}
          <div className='flex-1 overflow-y-auto'>
            {/* Time Picker */}
            <TimeWheelPicker value={formTime} onChange={onTimeChange} />

            {/* Settings */}
            <div className='mx-4 mb-4'>
              <GlassCard className='rounded-xl px-4'>
                <SettingsRow
                  label='Repeat'
                  value={formatRecurrenceDisplay(formRecurrence)}
                  onClick={() => onShowRecurrenceSelector(true)}
                />
                <SettingsRow
                  label='Label'
                  value={formTitle || 'Task'}
                  onClick={() => onShowLabelInput(true)}
                />
                <SettingsRow
                  label='AI Task'
                  showChevron={false}
                  customRight={
                    <Toggle
                      checked={formIsAiTask}
                      onChange={onIsAiTaskChange}
                    />
                  }
                />
                <SettingsRow
                  label='Active'
                  showChevron={false}
                  customRight={
                    <Toggle
                      checked={formIsActive}
                      onChange={onIsActiveChange}
                    />
                  }
                />
              </GlassCard>
            </div>

            {/* Delete Button */}
            {editingTask && (
              <div className='mx-4 mb-8'>
                <GlassCard className='rounded-xl overflow-hidden'>
                  <button
                    onClick={onDelete}
                    className='w-full py-4 text-red-400 text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                    Delete Task
                  </button>
                </GlassCard>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Recurrence Selector */}
      {showRecurrenceSelector && (
        <RecurrenceSelector
          value={formRecurrence}
          onChange={onRecurrenceChange}
          onClose={() => onShowRecurrenceSelector(false)}
        />
      )}

      {/* Label Input Drawer */}
      {showLabelInput && (
        <LabelInputDrawer
          value={formTitle}
          onChange={onTitleChange}
          onClose={() => onShowLabelInput(false)}
        />
      )}
    </>
  );
}
