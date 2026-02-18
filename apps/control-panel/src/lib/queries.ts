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
