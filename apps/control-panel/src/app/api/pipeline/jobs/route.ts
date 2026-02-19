import { NextRequest, NextResponse } from 'next/server';
import { jobStatusSummary, recentFailedJobs } from '@/lib/queries';

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
    const [summary, failedJobs] = await Promise.all([
      jobStatusSummary(from, to),
      recentFailedJobs(20),
    ]);

    return NextResponse.json({ summary, failedJobs });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
