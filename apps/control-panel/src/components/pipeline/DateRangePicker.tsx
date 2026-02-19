'use client';

import { DateRange } from '@/types/pipeline';

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

function toDateString(d: Date) {
  return d.toISOString().slice(0, 10);
}

const presets: { label: string; days: number | null }[] = [
  { label: 'Today', days: 0 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: 'All', days: null },
];

export function DateRangePicker({ range, onChange }: DateRangePickerProps) {
  function applyPreset(days: number | null) {
    const to = new Date();
    to.setDate(to.getDate() + 1);
    const toStr = toDateString(to);

    if (days === null) {
      onChange({ from: '2020-01-01', to: toStr });
    } else {
      const from = new Date();
      from.setDate(from.getDate() - days);
      onChange({ from: toDateString(from), to: toStr });
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <input
        type='date'
        value={range.from}
        onChange={e => onChange({ ...range, from: e.target.value })}
        className='rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground'
      />
      <span className='text-xs text-muted'>~</span>
      <input
        type='date'
        value={range.to}
        onChange={e => onChange({ ...range, to: e.target.value })}
        className='rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground'
      />
      <div className='ml-2 flex gap-1'>
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => applyPreset(p.days)}
            className='rounded-md border border-border px-2 py-1 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground'
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
