import { NextResponse } from 'next/server';
import { listTables } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await listTables();
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
