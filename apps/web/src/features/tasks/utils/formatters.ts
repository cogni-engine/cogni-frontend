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
  if (!pattern) return '';

  const map: Record<string, string> = {
    EVERY_DAY: 'every day',
    EVERY_WEEK: 'every week',
    EVERY_MONTH: 'every month',
    EVERY_YEAR: 'every year',
    EVERY_MONDAY: 'every Monday',
    EVERY_TUESDAY: 'every Tuesday',
    EVERY_WEDNESDAY: 'every Wednesday',
    EVERY_THURSDAY: 'every Thursday',
    EVERY_FRIDAY: 'every Friday',
    EVERY_SATURDAY: 'every Saturday',
    EVERY_SUNDAY: 'every Sunday',
  };

  // カンマ区切りの複数パターンに対応
  const patterns = pattern.split(',').map(p => p.trim());
  return patterns.map(p => map[p] || p).join(', ');
}

/**
 * Formats a recurrence pattern to capitalized display text
 */
export function formatRecurrenceDisplay(
  pattern: string | null | undefined
): string {
  if (!pattern) return 'Every day';

  const map: Record<string, string> = {
    EVERY_DAY: 'Every day',
    EVERY_WEEK: 'Every week',
    EVERY_MONTH: 'Every month',
    EVERY_YEAR: 'Every year',
    EVERY_MONDAY: 'Every Monday',
    EVERY_TUESDAY: 'Every Tuesday',
    EVERY_WEDNESDAY: 'Every Wednesday',
    EVERY_THURSDAY: 'Every Thursday',
    EVERY_FRIDAY: 'Every Friday',
    EVERY_SATURDAY: 'Every Saturday',
    EVERY_SUNDAY: 'Every Sunday',
  };

  const patterns = pattern.split(',').map(p => p.trim());
  const first = patterns[0];
  return map[first] || pattern;
}

/**
 * Available recurrence options for task scheduling
 */
export const RECURRENCE_OPTIONS = [
  { value: 'EVERY_DAY', label: 'Every day' },
  { value: 'EVERY_WEEK', label: 'Every week' },
  { value: 'EVERY_MONTH', label: 'Every month' },
  { value: 'EVERY_YEAR', label: 'Every year' },
  { value: 'EVERY_MONDAY', label: 'Every Monday' },
  { value: 'EVERY_TUESDAY', label: 'Every Tuesday' },
  { value: 'EVERY_WEDNESDAY', label: 'Every Wednesday' },
  { value: 'EVERY_THURSDAY', label: 'Every Thursday' },
  { value: 'EVERY_FRIDAY', label: 'Every Friday' },
  { value: 'EVERY_SATURDAY', label: 'Every Saturday' },
  { value: 'EVERY_SUNDAY', label: 'Every Sunday' },
] as const;
