'use client';

import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRealtimeEvents } from '@/hooks/useRealtimeEvents';
import { useTableStats } from '@/hooks/useTableStats';
import { EventCard } from './EventCard';
import { TableFilter } from './TableFilter';

export function RealtimeMonitor() {
  const { tables } = useTableStats();
  const tableNames = useMemo(() => tables.map((t) => t.table_name), [tables]);
  const { events, connected, clearEvents } = useRealtimeEvents(tableNames);
  const [filterTable, setFilterTable] = useState<string | null>(null);

  const filteredEvents = filterTable
    ? events.filter((e) => e.table === filterTable)
    : events;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${connected ? 'bg-success' : 'bg-danger'}`}
          />
          <span className="text-xs text-muted">
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <TableFilter
          tables={tableNames}
          selectedTable={filterTable}
          onSelect={setFilterTable}
        />

        <button
          onClick={clearEvents}
          className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Trash2 size={12} />
          Clear
        </button>

        <span className="ml-auto text-xs text-muted">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-1.5">
        {filteredEvents.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-border text-sm text-muted">
            {connected
              ? 'Waiting for database changes...'
              : 'Connecting to realtime...'}
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}
