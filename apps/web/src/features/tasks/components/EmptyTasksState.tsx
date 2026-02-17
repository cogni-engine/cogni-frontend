'use client';

import { RefreshCw } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';

interface EmptyTasksStateProps {
  onAddTask: () => void;
}

/**
 * Empty state display when no tasks exist
 */
export function EmptyTasksState({ onAddTask }: EmptyTasksStateProps) {
  return (
    <div className='text-center py-16'>
      <RefreshCw className='w-16 h-16 text-text-muted mx-auto mb-4' />
      <h3 className='text-xl font-medium text-text-primary mb-2'>
        No tasks yet
      </h3>
      <p className='text-text-muted mb-6'>Create your first recurring task</p>
      <GlassButton onClick={onAddTask} className='px-6 py-3 rounded-full'>
        Add Task
      </GlassButton>
    </div>
  );
}
