import { Message } from '@/types/chat';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:8000';

// メッセージ一覧取得
export async function getAIMessages(threadId: number): Promise<Message[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/cogno/threads/${threadId}/messages`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch messages: ${response.status}`);
  }
  const data = await response.json();
  return data.messages;
}

// AIチャットストリーム（ストリーミングレスポンス）
export async function sendAIMessage(threadId: number, message: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/cogno/conversations/stream`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thread_id: threadId, message }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.status}`);
  }

  return response;
}
