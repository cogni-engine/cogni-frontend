interface TableSizeBarProps {
  sizeBytes: number;
  maxSizeBytes: number;
}

export function TableSizeBar({ sizeBytes, maxSizeBytes }: TableSizeBarProps) {
  const pct = maxSizeBytes > 0 ? (sizeBytes / maxSizeBytes) * 100 : 0;

  return (
    <div className='h-1.5 w-20 overflow-hidden rounded-full bg-border'>
      <div
        className='h-full rounded-full bg-accent transition-all'
        style={{ width: `${Math.max(pct, 2)}%` }}
      />
    </div>
  );
}
