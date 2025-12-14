'use client';

import GlassCard from '@/components/glass-design/GlassCard';
import type { Task } from '@/types/task';

import { Toggle } from './Toggle';
import { formatTime, formatRecurrence } from '../utils/formatters';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onToggleActive: (task: Task, newValue: boolean) => void;
}

/**
 * Individual task card displaying time, title, recurrence, and toggle
 */
export function TaskCard({ task, onEdit, onToggleActive }: TaskCardProps) {
  const isActive = task.is_recurring_task_active ?? true;

  return (
    <GlassCard
      className='px-5 py-[8px] rounded-[20px] cursor-pointer transition-colors'
      onClick={() => onEdit(task)}
    >
      <div className='flex items-center justify-between'>
        <div
          className={`flex-1 ${!isActive ? 'opacity-40' : ''} transition-opacity`}
        >
          <div className='text-[32px] font-extralight leading-none tracking-tight'>
            {formatTime(task.next_run_time)}
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <span className='text-white/50 text-sm'>
              {task.title !== 'タスク' && task.title !== 'Task' && (
                <>
                  {task.title.replace(/^タスク\s*-\s*/, '').trim()}
                  {task.recurrence_pattern && ', '}
                </>
              )}
              {task.recurrence_pattern &&
                formatRecurrence(task.recurrence_pattern)}
            </span>
            {task.is_ai_task && (
              <span className='px-1.5 py-0.5 text-[10px] font-medium text-blue-300/70 bg-blue-500/10 rounded'>
                AI
              </span>
            )}
          </div>
        </div>
        <Toggle
          checked={isActive}
          onChange={newValue => onToggleActive(task, newValue)}
        />
      </div>
    </GlassCard>
  );
}
