'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  CheckSquare,
  Square,
  Trash2,
  Pencil,
  Calendar,
  RefreshCw,
  Bot,
} from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import GlassButton from '@/components/glass-card/GlassButton';
import ScrollableView from '@/components/layout/ScrollableView';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from '@/lib/api/tasksApi';
import type { Task, TaskCreate, TaskUpdate } from '@/types/task';

type FilterStatus = 'all' | 'pending' | 'completed';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');

  // Create/Edit dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formRecurrencePattern, setFormRecurrencePattern] = useState('daily');
  const [formIsAiTask, setFormIsAiTask] = useState(false);
  const [formNextRunTime, setFormNextRunTime] = useState('');
  const [formIsRecurringTaskActive, setFormIsRecurringTaskActive] =
    useState(true);
  const [saving, setSaving] = useState(false);

  // Delete confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormRecurrencePattern('daily');
    setFormIsAiTask(false);
    setFormNextRunTime('');
    setFormIsRecurringTaskActive(true);
    setEditingTask(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDescription(task.description || '');
    setFormRecurrencePattern(task.recurrence_pattern || 'daily');
    setFormIsAiTask(task.is_ai_task || false);
    setFormIsRecurringTaskActive(task.is_recurring_task_active ?? true);
    setFormNextRunTime(
      task.next_run_time ? task.next_run_time.slice(0, 16) : '' // Format for datetime-local input
    );
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formTitle.trim() || !formRecurrencePattern || !formNextRunTime) return;

    try {
      setSaving(true);

      if (editingTask) {
        // Update existing task
        const updateData: TaskUpdate = {
          title: formTitle.trim(),
          description: formDescription.trim() || null,
          recurrence_pattern: formRecurrencePattern,
          is_ai_task: formIsAiTask,
          next_run_time: new Date(formNextRunTime).toISOString(),
          is_recurring_task_active: formIsRecurringTaskActive,
        };
        const updated = await updateTask(editingTask.id, updateData);
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      } else {
        // Create new task
        const createData: TaskCreate = {
          title: formTitle.trim(),
          description: formDescription.trim() || null,
          recurrence_pattern: formRecurrencePattern,
          is_ai_task: formIsAiTask,
          next_run_time: new Date(formNextRunTime).toISOString(),
          is_recurring_task_active: formIsRecurringTaskActive,
        };
        const created = await createTask(createData);
        setTasks(prev => [created, ...prev]);
      }

      setDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Failed to save task:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const updated = await toggleTaskStatus(task.id);
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error('Failed to toggle task status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeleting(true);
      await deleteTask(deleteConfirmId);
      setTasks(prev => prev.filter(t => t.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setDeleting(false);
    }
  };

  const formatNextRunTime = (nextRunTime: string | null | undefined) => {
    if (!nextRunTime) return null;
    const date = new Date(nextRunTime);
    const now = new Date();
    const isPast = date < now;
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return { formatted, isPast };
  };

  const formatRecurrencePattern = (pattern: string | null | undefined) => {
    if (!pattern) return null;
    return pattern.charAt(0).toUpperCase() + pattern.slice(1);
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      {/* Filter Tabs */}
      <div className='absolute top-16 left-1/2 -translate-x-1/2 z-100'>
        <GlassCard className='flex items-center gap-1 p-1 rounded-full'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Completed ({completedCount})
          </button>
        </GlassCard>
      </div>

      {/* Task List */}
      <ScrollableView className='pt-28 pb-36'>
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
          </div>
        )}

        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 mx-4'>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className='space-y-2 px-4'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => {
                const nextRunInfo = formatNextRunTime(task.next_run_time);
                const recurrenceLabel = formatRecurrencePattern(
                  task.recurrence_pattern
                );
                return (
                  <GlassCard
                    key={task.id}
                    className='p-4 rounded-xl group cursor-pointer hover:bg-white/5'
                    onClick={() => openEditDialog(task)}
                  >
                    <div className='flex items-start gap-3'>
                      {/* Checkbox */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleToggleStatus(task);
                        }}
                        className='mt-0.5 text-white/60 hover:text-white transition-colors'
                      >
                        {task.status === 'completed' ? (
                          <CheckSquare className='w-5 h-5 text-green-400' />
                        ) : (
                          <Square className='w-5 h-5' />
                        )}
                      </button>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2'>
                          <h3
                            className={`font-medium ${
                              task.status === 'completed'
                                ? 'text-white/50 line-through'
                                : 'text-white'
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.is_ai_task && (
                            <Bot className='w-4 h-4 text-blue-400' />
                          )}
                        </div>
                        {task.description && (
                          <p className='text-sm text-white/50 mt-1 line-clamp-2'>
                            {task.description}
                          </p>
                        )}
                        <div className='flex items-center gap-3 mt-2'>
                          {recurrenceLabel && (
                            <div className='flex items-center gap-1 text-xs text-white/40'>
                              <RefreshCw className='w-3 h-3' />
                              <span>{recurrenceLabel}</span>
                            </div>
                          )}
                          {nextRunInfo && (
                            <div
                              className={`flex items-center gap-1 text-xs ${
                                nextRunInfo.isPast
                                  ? 'text-orange-400'
                                  : 'text-white/40'
                              }`}
                            >
                              <Calendar className='w-3 h-3' />
                              <span>Next: {nextRunInfo.formatted}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            openEditDialog(task);
                          }}
                          className='p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors'
                        >
                          <Pencil className='w-4 h-4' />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setDeleteConfirmId(task.id);
                          }}
                          className='p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })
            ) : (
              <div className='text-center py-12'>
                <CheckSquare className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                <h3 className='text-lg font-medium text-white mb-2'>
                  {filter === 'all'
                    ? 'No tasks yet'
                    : filter === 'pending'
                      ? 'No pending tasks'
                      : 'No completed tasks'}
                </h3>
                <p className='text-gray-400 mb-6'>
                  {filter === 'all'
                    ? 'Create your first task to get started'
                    : filter === 'pending'
                      ? 'All caught up!'
                      : 'Complete some tasks to see them here'}
                </p>
                {filter === 'all' && (
                  <GlassButton
                    onClick={openCreateDialog}
                    className='px-6 py-2.5 rounded-xl'
                  >
                    Create Task
                  </GlassButton>
                )}
              </div>
            )}
          </div>
        )}
      </ScrollableView>

      {/* Create Button */}
      <div className='fixed bottom-[72px] right-4 z-100'>
        <GlassButton
          onClick={openCreateDialog}
          size='icon'
          className='size-14 rounded-full shadow-lg'
        >
          <Plus className='w-6 h-6 text-white' />
        </GlassButton>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='rounded-2xl max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? 'Edit Task' : 'Create Task'}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div>
              <label className='text-sm text-white/70 mb-1.5 block'>
                Title
              </label>
              <Input
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                placeholder='Enter task title...'
                autoFocus
              />
            </div>

            <div>
              <label className='text-sm text-white/70 mb-1.5 block'>
                Description (optional)
              </label>
              <textarea
                value={formDescription}
                onChange={e => setFormDescription(e.target.value)}
                placeholder='Add a description...'
                rows={3}
                className='flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base text-white ring-offset-black placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 resize-none'
              />
            </div>

            <div>
              <label className='text-sm text-white/70 mb-1.5 block'>
                Recurrence Pattern
              </label>
              <select
                value={formRecurrencePattern}
                onChange={e => setFormRecurrencePattern(e.target.value)}
                className='flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base text-white ring-offset-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 [color-scheme:dark]'
              >
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='biweekly'>Biweekly</option>
                <option value='monthly'>Monthly</option>
                <option value='yearly'>Yearly</option>
              </select>
            </div>

            <div>
              <label className='text-sm text-white/70 mb-1.5 block'>
                Next Run Date & Time
              </label>
              <Input
                type='datetime-local'
                value={formNextRunTime}
                onChange={e => setFormNextRunTime(e.target.value)}
                className='[color-scheme:dark]'
                required
              />
              <p className='text-xs text-white/40 mt-1'>
                When should this task run next?
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={() => setFormIsAiTask(!formIsAiTask)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formIsAiTask ? 'bg-blue-600' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formIsAiTask ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <label className='text-sm text-white/70 flex items-center gap-2'>
                <Bot className='w-4 h-4' />
                AI Task
              </label>
            </div>

            <div className='flex items-center gap-3'>
              <Switch
                checked={formIsRecurringTaskActive}
                onCheckedChange={setFormIsRecurringTaskActive}
              />
              <label className='text-sm text-white/70 flex items-center gap-2'>
                <RefreshCw className='w-4 h-4' />
                Recurring Task Active
              </label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant='ghost'
                className='text-white/70 hover:text-white hover:bg-white/10'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              disabled={
                !formTitle.trim() ||
                !formRecurrencePattern ||
                !formNextRunTime ||
                saving
              }
              className='bg-white/10 hover:bg-white/20 text-white'
            >
              {saving ? 'Saving...' : editingTask ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <GlassCard className='p-6 max-w-sm w-full rounded-2xl'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Delete Task
            </h3>
            <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className='flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className='flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-red-500/20 disabled:opacity-50'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
