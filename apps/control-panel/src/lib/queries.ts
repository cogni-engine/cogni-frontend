import sql from './db';

export function listTables() {
  return sql`
    SELECT
      c.relname AS table_name,
      COALESCE(s.n_live_tup, 0) AS row_count,
      pg_size_pretty(pg_total_relation_size(c.oid)) AS total_size,
      pg_total_relation_size(c.oid) AS total_size_bytes
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    LEFT JOIN pg_stat_user_tables s ON s.relid = c.oid
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'
    ORDER BY pg_total_relation_size(c.oid) DESC
  `;
}

export function tableColumns(tableName: string) {
  return sql`
    SELECT
      column_name,
      data_type,
      is_nullable,
      column_default,
      character_maximum_length,
      ordinal_position
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = ${tableName}
    ORDER BY ordinal_position
  `;
}

export function tableStats(tableName: string) {
  return sql`
    SELECT
      n_live_tup AS live_rows,
      n_dead_tup AS dead_rows,
      n_tup_ins AS inserts,
      n_tup_upd AS updates,
      n_tup_del AS deletes,
      last_vacuum,
      last_autovacuum,
      last_analyze,
      last_autoanalyze,
      seq_scan,
      seq_tup_read,
      idx_scan,
      idx_tup_fetch
    FROM pg_stat_user_tables
    WHERE relname = ${tableName}
  `;
}

export function aggregateStats() {
  return sql`
    SELECT
      COUNT(*)::int AS table_count,
      COALESCE(SUM(s.n_live_tup), 0)::bigint AS total_rows,
      COALESCE(SUM(s.n_dead_tup), 0)::bigint AS total_dead_rows,
      COALESCE(SUM(s.n_tup_ins), 0)::bigint AS total_inserts,
      COALESCE(SUM(s.n_tup_upd), 0)::bigint AS total_updates,
      COALESCE(SUM(s.n_tup_del), 0)::bigint AS total_deletes,
      pg_size_pretty(SUM(pg_total_relation_size(c.oid))) AS total_size
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_stat_user_tables s ON s.relid = c.oid
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'
  `;
}

/* ── Pipeline queries ─────────────────────────────────────────── */

export function pipelineFunnel(from: string, to: string) {
  return sql`
    WITH ws AS (
      SELECT DISTINCT workspace_id
      FROM (
        SELECT workspace_id FROM cognition.raw_events
        WHERE occurred_at >= ${from}::timestamptz AND occurred_at < ${to}::timestamptz
        UNION
        SELECT workspace_id::int FROM public.tasks
        WHERE created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
          AND source_type IS NOT NULL
      ) u
    ),
    raw_counts AS (
      SELECT
        workspace_id,
        COUNT(*) FILTER (WHERE event_type LIKE 'note_version%') AS raw_note,
        COUNT(*) FILTER (WHERE event_type LIKE 'workspace_message%') AS raw_message,
        COUNT(*) AS raw_total
      FROM cognition.raw_events
      WHERE occurred_at >= ${from}::timestamptz AND occurred_at < ${to}::timestamptz
      GROUP BY workspace_id
    ),
    sem_counts AS (
      SELECT
        workspace_id,
        COUNT(*) FILTER (WHERE event_type LIKE 'note%') AS sem_note,
        COUNT(*) FILTER (WHERE event_type LIKE 'message%' OR event_type LIKE 'workspace_message%') AS sem_message,
        COUNT(*) AS sem_total
      FROM cognition.semantic_events
      WHERE occurred_at >= ${from}::timestamptz AND occurred_at < ${to}::timestamptz
      GROUP BY workspace_id
    ),
    task_counts AS (
      SELECT workspace_id, COUNT(*) AS cnt
      FROM public.tasks
      WHERE created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
        AND source_type IS NOT NULL
      GROUP BY workspace_id
    ),
    notif_counts AS (
      SELECT workspace_id, COUNT(*) AS cnt
      FROM public.ai_notifications
      WHERE created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
      GROUP BY workspace_id
    )
    SELECT
      w.id AS workspace_id,
      COALESCE(w.title, 'Workspace ' || w.id) AS workspace_title,
      COALESCE(rc.raw_note, 0)::int AS raw_events_note,
      COALESCE(rc.raw_message, 0)::int AS raw_events_message,
      COALESCE(rc.raw_total, 0)::int AS raw_events_total,
      COALESCE(sc.sem_note, 0)::int AS semantic_events_note,
      COALESCE(sc.sem_message, 0)::int AS semantic_events_message,
      COALESCE(sc.sem_total, 0)::int AS semantic_events_total,
      COALESCE(tc.cnt, 0)::int AS tasks_count,
      COALESCE(nc.cnt, 0)::int AS notifications_count
    FROM ws
    JOIN public.workspace w ON w.id = ws.workspace_id
    LEFT JOIN raw_counts rc ON rc.workspace_id = ws.workspace_id
    LEFT JOIN sem_counts sc ON sc.workspace_id = ws.workspace_id
    LEFT JOIN task_counts tc ON tc.workspace_id = ws.workspace_id
    LEFT JOIN notif_counts nc ON nc.workspace_id = ws.workspace_id
    ORDER BY COALESCE(rc.raw_total, 0) DESC
  `;
}

export function pipelineTotals(from: string, to: string) {
  return sql`
    SELECT
      (SELECT COUNT(*) FROM cognition.raw_events
       WHERE occurred_at >= ${from}::timestamptz AND occurred_at < ${to}::timestamptz
      )::int AS raw_events,
      (SELECT COUNT(*) FROM cognition.semantic_events
       WHERE occurred_at >= ${from}::timestamptz AND occurred_at < ${to}::timestamptz
      )::int AS semantic_events,
      (SELECT COUNT(*) FROM public.tasks
       WHERE created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
         AND source_type IS NOT NULL
      )::int AS tasks,
      (SELECT COUNT(*) FROM public.ai_notifications
       WHERE created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
      )::int AS notifications,
      (SELECT COUNT(*) FROM cognition.procrastinate_jobs j
       JOIN cognition.procrastinate_events e ON e.job_id = j.id AND e.type = 'deferred'
       WHERE j.status = 'succeeded'
         AND e.at >= ${from}::timestamptz AND e.at < ${to}::timestamptz
      )::int AS jobs_succeeded,
      (SELECT COUNT(*) FROM cognition.procrastinate_jobs j
       JOIN cognition.procrastinate_events e ON e.job_id = j.id AND e.type = 'deferred'
       WHERE j.status = 'failed'
         AND e.at >= ${from}::timestamptz AND e.at < ${to}::timestamptz
      )::int AS jobs_failed,
      (SELECT COUNT(*) FROM cognition.procrastinate_jobs j
       JOIN cognition.procrastinate_events e ON e.job_id = j.id AND e.type = 'deferred'
       WHERE j.status = 'doing'
         AND e.at >= ${from}::timestamptz AND e.at < ${to}::timestamptz
      )::int AS jobs_doing
  `;
}

export function jobStatusSummary(from: string, to: string) {
  return sql`
    SELECT
      j.task_name,
      COUNT(*) FILTER (WHERE j.status = 'succeeded')::int AS succeeded,
      COUNT(*) FILTER (WHERE j.status = 'doing')::int AS doing,
      COUNT(*) FILTER (WHERE j.status = 'failed')::int AS failed,
      COUNT(*)::int AS total
    FROM cognition.procrastinate_jobs j
    JOIN cognition.procrastinate_events e ON e.job_id = j.id AND e.type = 'deferred'
    WHERE e.at >= ${from}::timestamptz AND e.at < ${to}::timestamptz
    GROUP BY j.task_name
    ORDER BY total DESC
  `;
}

export function recentFailedJobs(limit: number) {
  return sql`
    SELECT
      j.id,
      j.task_name,
      j.status,
      j.args,
      j.attempts,
      e_deferred.at AS deferred_at,
      e_started.at AS started_at,
      e_failed.at AS failed_at,
      CASE
        WHEN e_started.at IS NOT NULL AND e_failed.at IS NOT NULL
        THEN EXTRACT(EPOCH FROM (e_failed.at - e_started.at)) * 1000
        ELSE NULL
      END::int AS duration_ms,
      COALESCE(
        (SELECT json_agg(json_build_object('type', ev.type, 'at', ev.at) ORDER BY ev.at)
         FROM cognition.procrastinate_events ev WHERE ev.job_id = j.id),
        '[]'::json
      ) AS events
    FROM cognition.procrastinate_jobs j
    LEFT JOIN LATERAL (
      SELECT at FROM cognition.procrastinate_events
      WHERE job_id = j.id AND type = 'deferred'
      ORDER BY at DESC LIMIT 1
    ) e_deferred ON true
    LEFT JOIN LATERAL (
      SELECT at FROM cognition.procrastinate_events
      WHERE job_id = j.id AND type = 'started'
      ORDER BY at DESC LIMIT 1
    ) e_started ON true
    LEFT JOIN LATERAL (
      SELECT at FROM cognition.procrastinate_events
      WHERE job_id = j.id AND type = 'failed'
      ORDER BY at DESC LIMIT 1
    ) e_failed ON true
    WHERE j.status = 'failed'
    ORDER BY e_failed.at DESC NULLS LAST
    LIMIT ${limit}
  `;
}

export function workspaceNotifications(
  workspaceId: number,
  from: string,
  to: string
) {
  return sql`
    SELECT
      n.id,
      n.title,
      n.body,
      n.status,
      n.due_date,
      n.task_id,
      COALESCE(t.title, '') AS task_title,
      t.source_type,
      t.source_id,
      CASE WHEN t.source_type = 'note' THEN (SELECT nt.title FROM public.notes nt WHERE nt.id = t.source_id) ELSE NULL END AS source_title,
      n.workspace_id,
      COALESCE(up.name, ap.name, 'Unknown') AS member_name,
      n.reaction_text,
      n.reaction_choices,
      n.reacted_at,
      n.created_at
    FROM public.ai_notifications n
    LEFT JOIN public.tasks t ON t.id = n.task_id
    LEFT JOIN public.workspace_member wm ON wm.id = n.workspace_member_id
    LEFT JOIN public.user_profiles up ON up.id = wm.user_id
    LEFT JOIN public.agent_profiles ap ON ap.id = wm.agent_id
    WHERE n.workspace_id = ${workspaceId}
      AND n.created_at >= ${from}::timestamptz
      AND n.created_at < ${to}::timestamptz
    ORDER BY n.created_at DESC
  `;
}
