/**
 * Formats a next_run_time string to a time display (HH:MM)
 */
export function formatTime(nextRunTime: string | null | undefined): string {
  if (!nextRunTime) return '--:--';
  const date = new Date(nextRunTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Formats a recurrence pattern to lowercase display text
 */
export function formatRecurrence(pattern: string | null | undefined): string {
  const map: Record<string, string> = {
    daily: 'every day',
    weekly: 'every week',
    biweekly: 'every 2 weeks',
    monthly: 'every month',
    yearly: 'every year',
  };
  return map[pattern || ''] || pattern || '';
}

/**
 * Formats a recurrence pattern to capitalized display text
 */
export function formatRecurrenceDisplay(
  pattern: string | null | undefined
): string {
  const map: Record<string, string> = {
    daily: 'Every day',
    weekly: 'Every week',
    biweekly: 'Every 2 weeks',
    monthly: 'Every month',
    yearly: 'Every year',
  };
  return map[pattern || ''] || pattern || 'Every day';
}

/**
 * Available recurrence options for task scheduling
 */
export const RECURRENCE_OPTIONS = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekly', label: 'Every week' },
  { value: 'biweekly', label: 'Every 2 weeks' },
  { value: 'monthly', label: 'Every month' },
  { value: 'yearly', label: 'Every year' },
] as const;
