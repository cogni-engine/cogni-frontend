'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { RealtimeEvent } from '@/types/database';

const EVENT_COLORS: Record<string, string> = {
  INSERT: 'border-l-success text-success',
  UPDATE: 'border-l-warning text-warning',
  DELETE: 'border-l-danger text-danger',
};

const EVENT_BG: Record<string, string> = {
  INSERT: 'bg-success/5',
  UPDATE: 'bg-warning/5',
  DELETE: 'bg-danger/5',
};

interface EventCardProps {
  event: RealtimeEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);

  const colorClass = EVENT_COLORS[event.event_type] ?? 'text-muted';
  const bgClass = EVENT_BG[event.event_type] ?? '';
  const time = new Date(event.timestamp).toLocaleTimeString();

  const payload =
    event.event_type === 'DELETE' ? event.old_record : event.new_record;

  return (
    <div
      className={`rounded-md border border-border border-l-2 ${bgClass} ${colorClass.split(' ')[0]}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
      >
        {expanded ? (
          <ChevronDown size={14} className="text-muted" />
        ) : (
          <ChevronRight size={14} className="text-muted" />
        )}
        <span className={`font-semibold ${colorClass.split(' ')[1]}`}>
          {event.event_type}
        </span>
        <span className="text-foreground">{event.table}</span>
        <span className="ml-auto text-xs text-muted">{time}</span>
      </button>

      {expanded && payload && (
        <div className="border-t border-border px-3 py-2">
          <pre className="max-h-60 overflow-auto text-xs text-muted">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
