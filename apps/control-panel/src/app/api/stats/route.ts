import { NextResponse } from 'next/server';
import { aggregateStats } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await aggregateStats();
    return NextResponse.json(rows[0] ?? {});
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
