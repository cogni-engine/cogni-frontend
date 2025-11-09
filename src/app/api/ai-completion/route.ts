import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () =>
            req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
          setAll: () => {},
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { context, noteTitle } = await req.json();

    if (!context || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'Context is required' },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast and cost-effective model for completions
        messages: [
          {
            role: 'system',
            content: `You are an intelligent writing assistant. Help the user write well structured meaningful notes.

The completion should:
- write markdown so as to prompt the user to write in a certain format
- Match the writing style and tone
- you should propose different markdown components such as the h1, h2, bullet, numbered, checklist, etc 
- the completions should aid the user in writing faster

Only return the completion text, nothing else. Do not include explanations or repeat the context.`,
          },
          {
            role: 'user',
            content: `Guess what the user might write after this text:\n\n${context} \n\n dont repeat what is already written`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate completion' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const completion = data.choices?.[0]?.message?.content?.trim() || '';

    return NextResponse.json({ completion });
  } catch (error) {
    console.error('Error in AI completion endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
