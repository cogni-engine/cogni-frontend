'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { TableList } from '@/components/tables/TableList';
import { TableDetail } from '@/components/tables/TableDetail';
import { useTableStats } from '@/hooks/useTableStats';

export default function TablesPage() {
  const { tables, isLoading, refresh } = useTableStats();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Tables"
        description={`${tables.length} tables in public schema`}
        actions={
          <button
            onClick={() => refresh()}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        }
      />

      {isLoading && tables.length === 0 ? (
        <div className="flex h-60 items-center justify-center text-sm text-muted">
          Loading tables...
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="w-80 shrink-0 overflow-auto rounded-lg border border-border bg-surface p-2">
            <TableList
              tables={tables}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
            />
          </div>

          <div className="min-w-0 flex-1">
            {selectedTable ? (
              <div className="rounded-lg border border-border bg-surface p-4">
                <h3 className="mb-4 text-base font-semibold text-accent">
                  {selectedTable}
                </h3>
                <TableDetail tableName={selectedTable} />
              </div>
            ) : (
              <div className="flex h-60 items-center justify-center rounded-lg border border-border text-sm text-muted">
                Select a table to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
