'use client';

interface TableFilterProps {
  tables: string[];
  selectedTable: string | null;
  onSelect: (table: string | null) => void;
}

export function TableFilter({
  tables,
  selectedTable,
  onSelect,
}: TableFilterProps) {
  return (
    <select
      value={selectedTable ?? ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
    >
      <option value="">All tables</option>
      {tables.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
