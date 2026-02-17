export interface TableInfo {
  table_name: string;
  row_count: number;
  total_size: string;
  total_size_bytes: number;
}

export interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  character_maximum_length: number | null;
  ordinal_position: number;
}

export interface TableStats {
  live_rows: number;
  dead_rows: number;
  inserts: number;
  updates: number;
  deletes: number;
  last_vacuum: string | null;
  last_autovacuum: string | null;
  last_analyze: string | null;
  last_autoanalyze: string | null;
  seq_scan: number;
  seq_tup_read: number;
  idx_scan: number;
  idx_tup_fetch: number;
}

export interface TableDetail {
  table_name: string;
  columns: TableColumn[];
  stats: TableStats | null;
}

export interface RealtimeEvent {
  id: string;
  table: string;
  event_type: 'INSERT' | 'UPDATE' | 'DELETE';
  new_record: Record<string, unknown> | null;
  old_record: Record<string, unknown> | null;
  timestamp: string;
}
