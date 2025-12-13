'use client';

import { Bot } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
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
      className='p-4 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors'
      onClick={() => onEdit(task)}
    >
      <div className='flex items-center justify-between'>
        <div
          className={`flex-1 ${!isActive ? 'opacity-40' : ''} transition-opacity`}
        >
          <div className='text-[56px] font-extralight leading-none tracking-tight'>
            {formatTime(task.next_run_time)}
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <span className='text-white/50 text-sm'>
              {task.title}
              {task.recurrence_pattern && (
                <>, {formatRecurrence(task.recurrence_pattern)}</>
              )}
            </span>
            {task.is_ai_task && <Bot className='w-4 h-4 text-blue-400' />}
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
