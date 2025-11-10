import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Configure route for streaming
export const maxDuration = 60; // 60 seconds for AI streaming
export const runtime = 'nodejs'; // Use Node.js runtime

const serviceAdapter = new OpenAIAdapter();
const copilotRuntimeInstance = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
  // Verify user is authenticated - create client directly from request (faster than await cookies())
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: () => {}, // No need to set cookies for auth check
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log('user', user);

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: copilotRuntimeInstance,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });

  return handleRequest(req);
};
