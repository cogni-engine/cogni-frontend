import { NextRequest } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

export async function POST(req: NextRequest) {
  try {
    // Get cookies from the request
    const currentUserId = req.cookies.get('current_user_id')?.value;
    const personalWorkspaceId = req.cookies.get('personal_workspace_id')?.value;

    console.log('🍪 Cookies:', { currentUserId, personalWorkspaceId });

    // Parse the request body
    const body = await req.json();

    console.log('📨 Request body:', {
      thread_id: body.thread_id,
      messages_count: body.messages?.length,
      notification_id: body.notification_id,
      timer_completed: body.timer_completed,
    });
    console.log('💬 Messages:', body.messages);

    // Build Cookie header
    const cookieHeader = [
      currentUserId && `current_user_id=${currentUserId}`,
      personalWorkspaceId && `personal_workspace_id=${personalWorkspaceId}`,
    ]
      .filter(Boolean)
      .join('; ');

    // Forward the request to the backend
    const response = await fetch(
      `${API_BASE_URL}/api/cogno/conversations/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(body),
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

    // Stream the response back to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
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
