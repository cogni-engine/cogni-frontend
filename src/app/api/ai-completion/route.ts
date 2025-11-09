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
            content: `あなたは知的なライティングアシスタントです。ユーザーが構造化された意味のあるノートを書けるよう支援してください。`,
          },
          {
            role: 'user',
            content: `次のテキストの後にユーザーが書きそうな内容を推測し、続きの文章を提案してください。\n\n${context} {{fill in here}} \n\n 
            完成文は次の条件を満たしてください:
- ユーザーの文章の書式に合わせる
- h3 見出し、箇条書き、番号付きリスト、チェックリストなど、異なるマークダウン要素を提案する
- ユーザーがより速く執筆できるよう支援する
- とても短くまとめる（1〜2文のみ）
- すでに書かれている内容を繰り返さず、元のテキストと重複させない

以下は完成文で利用できるマークダウンの例です:

## 見出し3の例
### 主要なポイント

- 箇条書きの例

1. 番号付きリストの例

- [ ] チェックリストの例

**太字の例**

*斜体の例*

~~取り消し線の例~~

これらの書式を組み合わせて、ユーザーのノートに構造化された続きの提案を行ってください。

完成文のみを返し、それ以外の説明や元の文脈の繰り返しは含めないでください。`,
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
