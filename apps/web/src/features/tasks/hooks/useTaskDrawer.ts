'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useDrag } from '@use-gesture/react';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import type { Task, TaskCreate, TaskUpdate } from '@/types/task';

export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface TaskFormState {
  formTime: TimeValue;
  formTitle: string;
  formRecurrence: string;
  formIsAiTask: boolean;
  formIsActive: boolean;
}

export interface UseTaskDrawerReturn {
  // Drawer state
  isOpen: boolean;
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
  setFormTime: (value: TimeValue) => void;
  setFormTitle: (value: string) => void;
  setFormRecurrence: (value: string) => void;
  setFormIsAiTask: (value: boolean) => void;
  setFormIsActive: (value: boolean) => void;

  // Drawer actions
  openCreate: () => void;
  openEdit: (task: Task) => void;
  close: () => void;
  setShowRecurrenceSelector: (value: boolean) => void;
  setShowLabelInput: (value: boolean) => void;

  // Gesture binding
  bindDrag: ReturnType<typeof useDrag>;

  // Save handler
  handleSave: (
    onCreateTask: (data: TaskCreate) => Promise<Task>,
    onUpdateTask: (id: number, data: TaskUpdate) => Promise<Task>
  ) => Promise<void>;

  // Delete handler
  handleDelete: (onDeleteTask: (id: number) => Promise<void>) => Promise<void>;
}

const DEFAULT_FORM_STATE: TaskFormState = {
  formTime: { hours: 17, minutes: 0 },
  formTitle: '',
  formRecurrence: 'daily',
  formIsAiTask: false,
  formIsActive: true,
};

export function useTaskDrawer(): UseTaskDrawerReturn {
  const { setDrawerOpen } = useGlobalUI();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Drawer state
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);
  const [showRecurrenceSelector, setShowRecurrenceSelector] = useState(false);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Form state
  const [formTime, setFormTime] = useState(DEFAULT_FORM_STATE.formTime);
  const [formTitle, setFormTitle] = useState(DEFAULT_FORM_STATE.formTitle);
  const [formRecurrence, setFormRecurrence] = useState(
    DEFAULT_FORM_STATE.formRecurrence
  );
  const [formIsAiTask, setFormIsAiTask] = useState(
    DEFAULT_FORM_STATE.formIsAiTask
  );
  const [formIsActive, setFormIsActive] = useState(
    DEFAULT_FORM_STATE.formIsActive
  );

  // Handle drawer open/close for global UI state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDrawerOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
    };
  }, [isOpen, setDrawerOpen]);

  const resetForm = useCallback(() => {
    setFormTime(DEFAULT_FORM_STATE.formTime);
    setFormTitle(DEFAULT_FORM_STATE.formTitle);
    setFormRecurrence(DEFAULT_FORM_STATE.formRecurrence);
    setFormIsAiTask(DEFAULT_FORM_STATE.formIsAiTask);
    setFormIsActive(DEFAULT_FORM_STATE.formIsActive);
    setEditingTask(null);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setShowRecurrenceSelector(false);
    setShowLabelInput(false);
    resetForm();
  }, [resetForm]);

  // Swipe down to close gesture handler
  const bindDrag = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
      if (my > 0) {
        if (last) {
          if (my > 100 || (vy > 0.5 && dy > 0)) {
            close();
            setDragOffset(0);
          } else {
            setDragOffset(0);
          }
        } else {
          setDragOffset(my);
        }
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const openCreate = useCallback(() => {
    resetForm();
    setIsOpen(true);
  }, [resetForm]);

  const openEdit = useCallback((task: Task) => {
    setEditingTask(task);

    if (task.next_run_time) {
      const date = new Date(task.next_run_time);
      setFormTime({ hours: date.getHours(), minutes: date.getMinutes() });
    } else {
      setFormTime({ hours: 17, minutes: 0 });
    }

    setFormTitle(task.title);
    setFormRecurrence(task.recurrence_pattern || 'daily');
    setFormIsAiTask(task.is_ai_task || false);
    setFormIsActive(task.is_recurring_task_active ?? true);
    setIsOpen(true);
  }, []);

  const handleSave = useCallback(
    async (
      onCreateTask: (data: TaskCreate) => Promise<Task>,
      onUpdateTask: (id: number, data: TaskUpdate) => Promise<Task>
    ) => {
      if (!formTitle.trim() || !formRecurrence) return;

      try {
        setSaving(true);

        const now = new Date();
        const nextRun = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          formTime.hours,
          formTime.minutes
        );
        if (nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 1);
        }

        if (editingTask) {
          const updateData: TaskUpdate = {
            title: formTitle.trim(),
            recurrence_pattern: formRecurrence,
            is_ai_task: formIsAiTask,
            next_run_time: nextRun.toISOString(),
            is_recurring_task_active: formIsActive,
          };
          await onUpdateTask(editingTask.id, updateData);
        } else {
          const createData: TaskCreate = {
            title: formTitle.trim(),
            recurrence_pattern: formRecurrence,
            is_ai_task: formIsAiTask,
            next_run_time: nextRun.toISOString(),
            is_recurring_task_active: formIsActive,
          };
          await onCreateTask(createData);
        }

        close();
      } catch (err) {
        console.error('Failed to save task:', err);
      } finally {
        setSaving(false);
      }
    },
    [
      formTitle,
      formRecurrence,
      formTime,
      formIsAiTask,
      formIsActive,
      editingTask,
      close,
    ]
  );

  const handleDelete = useCallback(
    async (onDeleteTask: (id: number) => Promise<void>) => {
      if (!editingTask) return;

      try {
        await onDeleteTask(editingTask.id);
        close();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    },
    [editingTask, close]
  );

  return {
    // Drawer state
    isOpen,
    editingTask,
    saving,
    showRecurrenceSelector,
    showLabelInput,
    dragOffset,
    drawerRef,

    // Form state
    formTime,
    formTitle,
    formRecurrence,
    formIsAiTask,
    formIsActive,

    // Form setters
    setFormTime,
    setFormTitle,
    setFormRecurrence,
    setFormIsAiTask,
    setFormIsActive,

    // Drawer actions
    openCreate,
    openEdit,
    close,
    setShowRecurrenceSelector,
    setShowLabelInput,

    // Gesture binding
    bindDrag,

    // Handlers
    handleSave,
    handleDelete,
  };
}
