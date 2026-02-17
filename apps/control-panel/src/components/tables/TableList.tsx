'use client';

import { TableInfo } from '@/types/database';
import { TableSizeBar } from './TableSizeBar';

interface TableListProps {
  tables: TableInfo[];
  selectedTable: string | null;
  onSelectTable: (name: string) => void;
}

export function TableList({
  tables,
  selectedTable,
  onSelectTable,
}: TableListProps) {
  const maxSize = Math.max(...tables.map((t) => t.total_size_bytes), 1);

  if (tables.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted">
        No tables found
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {tables.map((table) => (
        <button
          key={table.table_name}
          onClick={() => onSelectTable(table.table_name)}
          className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
            selectedTable === table.table_name
              ? 'bg-accent-dim text-accent'
              : 'text-foreground hover:bg-surface-hover'
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{table.table_name}</div>
            <div className="mt-0.5 text-xs text-muted">
              {table.row_count.toLocaleString()} rows
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted">{table.total_size}</span>
            <TableSizeBar
              sizeBytes={table.total_size_bytes}
              maxSizeBytes={maxSize}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
