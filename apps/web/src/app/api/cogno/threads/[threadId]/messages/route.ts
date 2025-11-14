import { NextRequest } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { threadId } = await params;

    // Get cookies from the request
    const currentUserId = req.cookies.get('current_user_id')?.value;
    const personalWorkspaceId = req.cookies.get('personal_workspace_id')?.value;

    console.log('currentUserId', currentUserId);
    console.log('personalWorkspaceId', personalWorkspaceId);

    // Build Cookie header
    const cookieHeader = [
      currentUserId && `current_user_id=${currentUserId}`,
      personalWorkspaceId && `personal_workspace_id=${personalWorkspaceId}`,
    ]
      .filter(Boolean)
      .join('; ');

    // Forward the request to the backend
    const response = await fetch(
      `${API_BASE_URL}/api/cogno/threads/${threadId}/messages`,
      {
        method: 'GET',
        headers: {
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      return new Response(errorText, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
