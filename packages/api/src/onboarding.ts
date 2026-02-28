const API_BASE_URL = process.env.NEXT_PUBLIC_COGNO_CORE_URL || 'http://localhost:8001';

export interface GenerateFirstNoteRequest {
  primary_role?: string[];
  ai_relationship?: string[];
  use_case?: string[];
  user_id: string;
  workspace_id: number;
  onboarding_session_id: string;
  locale: string;
}

export interface GenerateFirstNoteResponse {
  title: string;
  content: string;
}

export async function generateFirstNote(
  request: GenerateFirstNoteRequest
): Promise<GenerateFirstNoteResponse> {
  const response = await fetch(`${API_BASE_URL}/api/onboarding/generate-first-note`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(30000), // 30 second timeout
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate first note: ${response.status} ${errorText}`);
  }
  
  return response.json();
}
