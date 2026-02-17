'use client';

import { useTableDetail } from '@/hooks/useTableDetail';
import { Loader2 } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number | null;
}

function StatCard({ label, value }: StatCardProps) {
  const display =
    value === null || value === undefined
      ? '-'
      : typeof value === 'number'
        ? value.toLocaleString()
        : value;

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 truncate text-sm font-semibold text-foreground">
        {display}
      </div>
    </div>
  );
}

function formatTimestamp(ts: string | null) {
  if (!ts) return null;
  return new Date(ts).toLocaleString();
}

interface TableDetailProps {
  tableName: string;
}

export function TableDetail({ tableName }: TableDetailProps) {
  const { detail, isLoading } = useTableDetail(tableName);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 size={20} className="animate-spin text-muted" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted">
        Failed to load table details
      </div>
    );
  }

  const { stats, columns } = detail;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Statistics
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="Live Rows" value={stats?.live_rows ?? null} />
          <StatCard label="Dead Rows" value={stats?.dead_rows ?? null} />
          <StatCard label="Inserts" value={stats?.inserts ?? null} />
          <StatCard label="Updates" value={stats?.updates ?? null} />
          <StatCard label="Deletes" value={stats?.deletes ?? null} />
          <StatCard label="Seq Scans" value={stats?.seq_scan ?? null} />
          <StatCard label="Idx Scans" value={stats?.idx_scan ?? null} />
          <StatCard
            label="Last Vacuum"
            value={formatTimestamp(stats?.last_autovacuum ?? null)}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Columns ({columns.length})
        </h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs text-muted">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Nullable</th>
                <th className="px-3 py-2">Default</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col) => (
                <tr
                  key={col.column_name}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-3 py-2 text-muted">
                    {col.ordinal_position}
                  </td>
                  <td className="px-3 py-2 font-medium">{col.column_name}</td>
                  <td className="px-3 py-2 text-accent">
                    {col.data_type}
                    {col.character_maximum_length
                      ? `(${col.character_maximum_length})`
                      : ''}
                  </td>
                  <td className="px-3 py-2 text-muted">
                    {col.is_nullable === 'YES' ? 'yes' : 'no'}
                  </td>
                  <td className="max-w-[200px] truncate px-3 py-2 text-xs text-muted">
                    {col.column_default ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
