'use client';

import { X, Check, Trash2 } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerBody,
} from '@/components/ui/drawer';
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
  isOpen: boolean;
  editingTask: Task | null;
  saving: boolean;
  showRecurrenceSelector: boolean;
  showLabelInput: boolean;

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
}

/**
 * Main task edit/create drawer component
 */
export function TaskEditDrawer({
  isOpen,
  editingTask,
  saving,
  showRecurrenceSelector,
  showLabelInput,
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
}: TaskEditDrawerProps) {
  return (
    <>
      <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
        <DrawerContent>
          <DrawerHandle />

          {/* Header */}
          <DrawerHeader className='px-4 pb-3 pt-1'>
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
          </DrawerHeader>

          {/* Content */}
          <DrawerBody className='p-0'>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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
