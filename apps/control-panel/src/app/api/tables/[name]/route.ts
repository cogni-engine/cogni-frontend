import { NextRequest, NextResponse } from 'next/server';
import { tableColumns, tableStats } from '@/lib/queries';

export const dynamic = 'force-dynamic';

const TABLE_NAME_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  if (!TABLE_NAME_RE.test(name)) {
    return NextResponse.json(
      { error: 'Invalid table name' },
      { status: 400 }
    );
  }

  try {
    const [columns, stats] = await Promise.all([
      tableColumns(name),
      tableStats(name),
    ]);

    return NextResponse.json({
      table_name: name,
      columns,
      stats: stats[0] ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
