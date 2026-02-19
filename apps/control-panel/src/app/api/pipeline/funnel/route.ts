import { NextRequest, NextResponse } from 'next/server';
import { pipelineFunnel, pipelineTotals } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return NextResponse.json(
      { error: 'Missing required parameters: from, to' },
      { status: 400 }
    );
  }

  try {
    const [workspaces, totalsRows] = await Promise.all([
      pipelineFunnel(from, to),
      pipelineTotals(from, to),
    ]);

    return NextResponse.json({
      workspaces,
      totals: totalsRows[0] ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
