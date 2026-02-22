'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import { Send, Loader2, Trash2, Reply } from 'lucide-react';

const COGNO_CORE_URL =
  process.env.NEXT_PUBLIC_COGNO_CORE_URL || 'http://localhost:8001';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface PostMessageEntry {
  id: number | null;
  timestamp: string;
  data: unknown;
  replied: boolean;
}

export default function IframeDemoPage() {
  const [instruction, setInstruction] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingCode, setStreamingCode] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [postMessages, setPostMessages] = useState<PostMessageEntry[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, streamingCode]);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [postMessages]);

  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});

  // Listen for messages from iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'fromSandbox') {
        setPostMessages(prev => [
          ...prev,
          {
            id: event.data.id ?? null,
            timestamp: new Date().toLocaleTimeString(),
            data: event.data.data,
            replied: false,
          },
        ]);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleReply = useCallback(
    (msgIndex: number, msgId: number) => {
      const replyText = replyInputs[msgIndex]?.trim();
      if (!replyText) return;

      iframeRef.current?.contentWindow?.postMessage(
        { type: 'toSandbox', id: msgId, data: replyText },
        '*'
      );

      setPostMessages(prev =>
        prev.map((m, i) => (i === msgIndex ? { ...m, replied: true } : m))
      );
      setReplyInputs(prev => {
        const next = { ...prev };
        delete next[msgIndex];
        return next;
      });
    },
    [replyInputs]
  );

  const handleSubmit = useCallback(async () => {
    const trimmed = instruction.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    setChatHistory(prev => [...prev, userMessage]);
    setInstruction('');
    setIsStreaming(true);
    setStreamingCode('');

    try {
      const history = chatHistory.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${COGNO_CORE_URL}/api/generate-ui`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: trimmed, history }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Parse SSE lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              accumulated += JSON.parse(data);
            } catch {
              accumulated += data;
            }
            setStreamingCode(accumulated);
          }
        }
      }

      // Strip markdown fences if the LLM wraps them
      let finalCode = accumulated;
      const fenceMatch = finalCode.match(
        /^```(?:jsx|tsx|javascript|typescript|react)?\s*\n([\s\S]*?)\n```\s*$/
      );
      if (fenceMatch) {
        finalCode = fenceMatch[1];
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: finalCode,
      };
      setChatHistory(prev => [...prev, assistantMessage]);
      setStreamingCode('');

      // Send to iframe
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'render', code: finalCode },
        '*'
      );
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${errorMsg}` },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, [instruction, isStreaming, chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='flex h-screen bg-background text-foreground'>
      {/* Left Panel */}
      <div className='w-[40%] flex flex-col border-r border-border-default'>
        {/* Chat History */}
        <div className='flex-1 overflow-y-auto p-4 space-y-3'>
          <h2 className='text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2'>
            Chat
          </h2>
          {chatHistory.length === 0 && !isStreaming && (
            <p className='text-text-muted text-sm'>
              Describe the UI component you want to create.
            </p>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div className='flex justify-end'>
                  <GlassCard className='p-3 max-w-[85%]'>
                    <p className='text-sm text-text-primary whitespace-pre-wrap'>
                      {msg.content}
                    </p>
                  </GlassCard>
                </div>
              ) : (
                <div>
                  <p className='text-xs text-text-muted mb-1'>Generated Code</p>
                  <pre className='text-xs bg-surface-primary rounded-lg p-3 overflow-x-auto border border-border-subtle'>
                    <code className='text-text-secondary'>{msg.content}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
          {isStreaming && streamingCode && (
            <div>
              <p className='text-xs text-text-muted mb-1 flex items-center gap-1'>
                <Loader2 className='w-3 h-3 animate-spin' />
                Generating...
              </p>
              <pre className='text-xs bg-surface-primary rounded-lg p-3 overflow-x-auto border border-border-subtle'>
                <code className='text-text-secondary'>{streamingCode}</code>
              </pre>
            </div>
          )}
          {isStreaming && !streamingCode && (
            <div className='flex items-center gap-2 text-text-muted text-sm'>
              <Loader2 className='w-4 h-4 animate-spin' />
              Thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className='p-4 border-t border-border-default'>
          <div className='flex gap-2'>
            <textarea
              ref={textareaRef}
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Describe a UI component...'
              rows={2}
              className='flex-1 resize-none rounded-lg bg-input-bg border border-input-border px-3 py-2 text-sm text-text-primary placeholder:text-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200'
              disabled={isStreaming}
            />
            <GlassButton
              onClick={handleSubmit}
              disabled={isStreaming || !instruction.trim()}
              size='icon'
              className='self-end'
            >
              {isStreaming ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Send className='w-4 h-4' />
              )}
            </GlassButton>
          </div>
        </div>

        {/* PostMessage Log */}
        <div className='h-[200px] border-t border-border-default overflow-y-auto p-4'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-sm font-semibold text-text-secondary uppercase tracking-wider'>
              PostMessage Log
            </h2>
            {postMessages.length > 0 && (
              <button
                onClick={() => setPostMessages([])}
                className='text-text-muted hover:text-text-secondary transition-colors'
              >
                <Trash2 className='w-3 h-3' />
              </button>
            )}
          </div>
          {postMessages.length === 0 ? (
            <p className='text-text-muted text-xs'>
              Messages from the iframe will appear here.
            </p>
          ) : (
            <div className='space-y-2'>
              {postMessages.map((msg, i) => (
                <div
                  key={i}
                  className='text-xs font-mono bg-surface-primary rounded px-2 py-1.5 border border-border-subtle'
                >
                  <div className='flex items-start justify-between gap-2'>
                    <div className='min-w-0 flex-1'>
                      <span className='text-text-muted'>{msg.timestamp}</span>{' '}
                      <span className='text-text-secondary break-all'>
                        {JSON.stringify(msg.data)}
                      </span>
                    </div>
                    {msg.id !== null && !msg.replied && (
                      <button
                        onClick={() =>
                          setReplyInputs(prev =>
                            prev[i] !== undefined
                              ? (() => {
                                  const next = { ...prev };
                                  delete next[i];
                                  return next;
                                })()
                              : { ...prev, [i]: '' }
                          )
                        }
                        className='text-text-muted hover:text-purple-400 transition-colors shrink-0'
                        title='Reply'
                      >
                        <Reply className='w-3 h-3' />
                      </button>
                    )}
                    {msg.replied && (
                      <span className='text-green-400/70 text-[10px] shrink-0'>
                        replied
                      </span>
                    )}
                  </div>
                  {replyInputs[i] !== undefined && msg.id !== null && (
                    <div className='flex gap-1 mt-1.5'>
                      <input
                        value={replyInputs[i]}
                        onChange={e =>
                          setReplyInputs(prev => ({
                            ...prev,
                            [i]: e.target.value,
                          }))
                        }
                        onKeyDown={e => {
                          if (e.key === 'Enter' && msg.id !== null) {
                            handleReply(i, msg.id);
                          }
                        }}
                        placeholder='Reply...'
                        className='flex-1 bg-background border border-border-subtle rounded px-1.5 py-0.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/50'
                        autoFocus
                      />
                      <button
                        onClick={() => msg.id !== null && handleReply(i, msg.id)}
                        className='text-purple-400 hover:text-purple-300 transition-colors'
                      >
                        <Send className='w-3 h-3' />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Right Panel — Iframe */}
      <div className='flex-1'>
        <iframe
          ref={iframeRef}
          src='/iframe-sandbox'
          className='w-full h-full border-0'
          title='UI Sandbox'
        />
      </div>
    </div>
  );
}
