import { NextRequest, NextResponse } from 'next/server';
import { workspaceNotifications } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const workspaceId = searchParams.get('workspace_id');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!workspaceId || !from || !to) {
    return NextResponse.json(
      { error: 'Missing required parameters: workspace_id, from, to' },
      { status: 400 }
    );
  }

  const id = parseInt(workspaceId, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid workspace_id' },
      { status: 400 }
    );
  }

  try {
    const rows = await workspaceNotifications(id, from, to);
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
