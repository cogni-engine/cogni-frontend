import { REACTION_EMOJIS } from '@/types/workspace';

const RECENT_STORAGE_KEY = 'reaction-picker-recent';
const RECENT_MAX = 8;
const EMOJI_SET = new Set<string>(REACTION_EMOJIS);

export function getRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((e): e is string => typeof e === 'string' && EMOJI_SET.has(e))
      .slice(0, RECENT_MAX);
  } catch {
    return [];
  }
}

export function pushRecent(emoji: string): void {
  if (!EMOJI_SET.has(emoji)) return;
  const prev = getRecent();
  const next = [emoji, ...prev.filter(e => e !== emoji)].slice(0, RECENT_MAX);
  try {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getInitialEmojis(): string[] {
  const recent = getRecent();
  if (recent.length >= RECENT_MAX) return recent;
  const rest = REACTION_EMOJIS.filter(e => !recent.includes(e));
  return [...recent, ...rest].slice(0, RECENT_MAX);
}
