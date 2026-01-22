'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '@/features/tasks/apis/tasksApi';
import type { Task, TaskCreate, TaskUpdate } from '@/types/task';

export interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskCreate) => Promise<Task>;
  updateTask: (id: number, data: TaskUpdate) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskActive: (task: Task, newValue: boolean) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const createTask = useCallback(async (data: TaskCreate): Promise<Task> => {
    const created = await apiCreateTask(data);
    setTasks(prev => [created, ...prev]);
    return created;
  }, []);

  const updateTask = useCallback(
    async (id: number, data: TaskUpdate): Promise<Task> => {
      const updated = await apiUpdateTask(id, data);
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      return updated;
    },
    []
  );

  const deleteTask = useCallback(async (id: number): Promise<void> => {
    await apiDeleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTaskActive = useCallback(
    async (task: Task, newValue: boolean): Promise<void> => {
      try {
        const updated = await apiUpdateTask(task.id, {
          is_recurring_task_active: newValue,
        });
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      } catch (err) {
        console.error('Failed to toggle task:', err);
      }
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskActive,
  };
}
