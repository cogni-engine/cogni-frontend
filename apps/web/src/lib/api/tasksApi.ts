import { createClient } from '@/lib/supabase/browserClient';
import type { Task, TaskCreate, TaskUpdate } from '@/types/task';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

const supabase = createClient();

/**
 * Get the current authenticated user ID
 */
async function getCurrentUserId(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');
  return user.id;
}

/**
 * Get all tasks for the current authenticated user
 */
export async function getTasks(): Promise<Task[]> {
  const userId = await getCurrentUserId();

  const response = await fetch(
    `${API_BASE_URL}/api/tasks?user_id=${encodeURIComponent(userId)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const data = await response.json();
  return data.tasks || [];
}

/**
 * Get a single task by ID
 */
export async function getTask(id: number): Promise<Task | null> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch task: ${response.status}`);
  }

  const data = await response.json();
  return data.task;
}

/**
 * Create a new recurring task
 */
export async function createTask(taskData: TaskCreate): Promise<Task> {
  const userId = await getCurrentUserId();

  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      title: taskData.title,
      description: taskData.description,
      recurrence_pattern: taskData.recurrence_pattern,
      is_ai_task: taskData.is_ai_task ?? false,
      next_run_time: taskData.next_run_time,
      is_recurring_task_active: taskData.is_recurring_task_active ?? true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.status}`);
  }

  const data = await response.json();
  return data.task;
}

/**
 * Update an existing recurring task
 */
export async function updateTask(
  id: number,
  taskData: TaskUpdate
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      recurrence_pattern: taskData.recurrence_pattern,
      is_ai_task: taskData.is_ai_task,
      next_run_time: taskData.next_run_time,
      is_recurring_task_active: taskData.is_recurring_task_active,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  const data = await response.json();
  return data.task;
}

/**
 * Delete a task
 */
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.status}`);
  }
}

/**
 * Toggle task status between pending and completed
 */
export async function toggleTaskStatus(id: number): Promise<Task> {
  // First get the current task
  const task = await getTask(id);

  if (!task) {
    throw new Error('Task not found');
  }

  const newStatus = task.status === 'completed' ? 'pending' : 'completed';

  return updateTask(id, { status: newStatus });
}

/**
 * Get tasks filtered by status
 */
export async function getTasksByStatus(
  status: 'pending' | 'completed'
): Promise<Task[]> {
  const allTasks = await getTasks();
  return allTasks.filter(task => task.status === status);
}
