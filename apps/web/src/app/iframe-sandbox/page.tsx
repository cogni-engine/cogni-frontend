'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useRunner } from 'react-runner';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassInput from '@/components/glass-design/GlassInput';
import {
  Check,
  X,
  Star,
  Heart,
  Settings,
  User,
  Search,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Home,
  Bell,
  Mail,
  Calendar,
  Clock,
  Trash2,
  Edit,
  Send,
  Loader2,
} from 'lucide-react';

// Request/response message system
let _msgId = 0;
const _pending = new Map<
  number,
  { resolve: (value: unknown) => void }
>();

function sendMessage(data: unknown): Promise<unknown> {
  const id = ++_msgId;
  return new Promise(resolve => {
    _pending.set(id, { resolve });
    window.parent.postMessage({ type: 'fromSandbox', id, data }, '*');
  });
}

// Listen for responses from host
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data?.type === 'toSandbox' && typeof event.data.id === 'number') {
      const entry = _pending.get(event.data.id);
      if (entry) {
        _pending.delete(event.data.id);
        entry.resolve(event.data.data);
      }
    }
  });
}

const scope = {
  // React
  React,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  // Glass components
  GlassButton,
  GlassCard,
  GlassInput,
  // Lucide icons
  Check,
  X,
  Star,
  Heart,
  Settings,
  User,
  Search,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Home,
  Bell,
  Mail,
  Calendar,
  Clock,
  Trash2,
  Edit,
  Send,
  Loader2,
  // Communication
  sendMessage,
};

const PLACEHOLDER_CODE = `export default function Placeholder() {
  return (
    <div className="flex items-center justify-center h-full text-text-secondary">
      <p className="text-lg">Waiting for component code...</p>
    </div>
  );
}`;

export default function IframeSandboxPage() {
  const [code, setCode] = useState(PLACEHOLDER_CODE);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.data?.type === 'render' &&
        typeof event.data.code === 'string'
      ) {
        setCode(event.data.code);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const { element, error } = useRunner({ code, scope });

  // Send errors back to host for visibility
  useEffect(() => {
    if (error) {
      window.parent.postMessage(
        { type: 'fromSandbox', data: { type: 'error', message: String(error) } },
        '*'
      );
    }
  }, [error]);

  return (
    <div className='min-h-screen bg-background text-foreground p-4'>
      {error ? (
        <div className='rounded-lg border border-red-500/30 bg-red-500/10 p-4 space-y-3'>
          <h3 className='text-red-400 font-semibold'>Render Error</h3>

          {/* Error message */}
          <pre className='text-red-300 text-sm whitespace-pre-wrap font-mono bg-red-500/5 rounded p-3'>
            {String(error)}
          </pre>

          {/* Raw code that failed */}
          <details>
            <summary className='text-red-400/70 text-xs cursor-pointer hover:text-red-400'>
              Code that failed ({code.length} chars)
            </summary>
            <pre className='text-red-300/60 text-xs whitespace-pre-wrap font-mono mt-1 bg-red-500/5 rounded p-2 max-h-[300px] overflow-y-auto'>
              {code}
            </pre>
          </details>

          {/* Scope keys for debugging */}
          <details>
            <summary className='text-red-400/70 text-xs cursor-pointer hover:text-red-400'>
              Available scope keys
            </summary>
            <pre className='text-red-300/60 text-xs whitespace-pre-wrap font-mono mt-1 bg-red-500/5 rounded p-2'>
              {Object.keys(scope).join(', ')}
            </pre>
          </details>
        </div>
      ) : (
        <>
          {element}
          {/* Toggle to inspect current code */}
          {code !== PLACEHOLDER_CODE && (
            <div className='fixed bottom-2 right-2'>
              <button
                onClick={() => setShowCode(v => !v)}
                className='text-[10px] text-text-muted bg-surface-primary border border-border-subtle rounded px-2 py-1 opacity-40 hover:opacity-100 transition-opacity'
              >
                {showCode ? 'hide code' : 'show code'}
              </button>
              {showCode && (
                <pre className='absolute bottom-8 right-0 w-[500px] max-h-[300px] overflow-auto text-xs font-mono bg-surface-primary border border-border-subtle rounded p-3 text-text-secondary'>
                  {code}
                </pre>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
