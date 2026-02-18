'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getBrowserClient } from '@/lib/supabase/browserClient';
import { RealtimeEvent } from '@/types/database';
import { RealtimeChannel } from '@supabase/supabase-js';

const MAX_EVENTS = 200;

export function useRealtimeEvents(tables: string[]) {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (tables.length === 0) return;

    const supabase = getBrowserClient();

    const channel = supabase.channel('control-panel-realtime', {
      config: { broadcast: { self: true } },
    });

    tables.forEach(table => {
      channel.on(
        'postgres_changes' as 'system',
        { event: '*', schema: 'public', table } as Record<string, string>,
        (payload: Record<string, unknown>) => {
          const event: RealtimeEvent = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            table,
            event_type: payload.eventType as RealtimeEvent['event_type'],
            new_record: (payload.new as Record<string, unknown>) ?? null,
            old_record: (payload.old as Record<string, unknown>) ?? null,
            timestamp: new Date().toISOString(),
          };

          setEvents(prev => [event, ...prev].slice(0, MAX_EVENTS));
        }
      );
    });

    channel.subscribe((status: string) => {
      setConnected(status === 'SUBSCRIBED');
    });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
      setConnected(false);
    };
  }, [tables]);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return { events, connected, clearEvents };
}
