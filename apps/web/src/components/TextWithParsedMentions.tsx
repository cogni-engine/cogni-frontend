'use client';

import React from 'react';

interface TextWithParsedMentionsProps {
  text: string;
  /**
   * 最大表示文字数。メンションは表示文字数（例: "@Yuki" = 5文字）でカウント。
   * 指定するとメンションマークアップの途中で切れることなく安全に切り詰める。
   */
  maxLength?: number;
}

/**
 * メンション記法・Markdownリンクをパースしてプレビュー用テキストに変換する。
 * - メンバーメンション [@ id="..." label="..." workspaceMemberId="..."] → @label
 * - ノートメンション   [# id="..." label="..." noteId="..."]             → #label
 * - Markdownリンク     [text](url)                                        → リンク表示
 *
 * maxLength を指定すると、表示文字数ベースで切り詰めを行う。
 */
export function TextWithParsedMentions({
  text,
  maxLength,
}: TextWithParsedMentionsProps) {
  // 統合正規表現: メンバーメンション | ノートメンション | Markdownリンク
  const regex =
    /\[@\s+id="[^"]*"\s+label="([^"]*)"(?:\s+workspaceMemberId="[^"]*")?\]|\[#\s+id="[^"]*"\s+label="([^"]*)"(?:\s+noteId="[^"]*")?\]|\[([^\]]*)\]\(([^)]*)\)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let visibleLen = 0;
  let truncated = false;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (truncated) break;

    // テキスト部分を追加
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      if (maxLength !== undefined && visibleLen + plain.length > maxLength) {
        const remaining = maxLength - visibleLen;
        parts.push(plain.slice(0, remaining) + '...');
        truncated = true;
        lastIndex = regex.lastIndex;
        break;
      }
      parts.push(plain);
      visibleLen += plain.length;
    }

    if (match[1] !== undefined) {
      // メンバーメンション → @label
      const displayLen = match[1].length + 1; // +1 for "@"
      if (maxLength !== undefined && visibleLen + displayLen > maxLength) {
        parts.push('...');
        truncated = true;
        lastIndex = regex.lastIndex;
        break;
      }
      parts.push(
        <span
          key={match.index}
          className='font-semibold'
          style={{ color: 'rgb(96, 165, 250)' }}
        >
          @{match[1]}
        </span>
      );
      visibleLen += displayLen;
    } else if (match[2] !== undefined) {
      // ノートメンション → #label
      const displayLen = match[2].length + 1; // +1 for "#"
      if (maxLength !== undefined && visibleLen + displayLen > maxLength) {
        parts.push('...');
        truncated = true;
        lastIndex = regex.lastIndex;
        break;
      }
      parts.push(
        <span
          key={match.index}
          className='font-semibold'
          style={{ color: 'rgb(0, 201, 44)' }}
        >
          #{match[2]}
        </span>
      );
      visibleLen += displayLen;
    } else if (match[3] !== undefined) {
      // Markdownリンク
      const displayLen = match[3].length;
      if (maxLength !== undefined && visibleLen + displayLen > maxLength) {
        parts.push('...');
        truncated = true;
        lastIndex = regex.lastIndex;
        break;
      }
      parts.push(
        <a
          key={match.index}
          href={match[4]}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300'
          onClick={e => e.stopPropagation()}
        >
          {match[3]}
        </a>
      );
      visibleLen += displayLen;
    }

    lastIndex = regex.lastIndex;
  }

  // 残りのテキスト
  if (!truncated && lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (maxLength !== undefined && visibleLen + remaining.length > maxLength) {
      const left = maxLength - visibleLen;
      parts.push(remaining.slice(0, left) + '...');
    } else {
      parts.push(remaining);
    }
  }

  return <>{parts}</>;
}
