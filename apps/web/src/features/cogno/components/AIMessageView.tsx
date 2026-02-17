'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { Components } from 'react-markdown';
import { Copy, Check } from 'lucide-react';
import { isInMobileWebView, sendToNativeApp } from '@/lib/webview';

type AIMessageViewProps = {
  content: string;
  className?: string;
};

// Extracted component to satisfy React Hooks rule (component names must be Capitalized)
const PreBlock = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) => {
  const [copied, setCopied] = useState(false);

  const extractCodeText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (React.isValidElement(node)) {
      if (node.type === 'code') {
        const props = node.props as { children?: React.ReactNode };
        return extractCodeText(props.children || '');
      }
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return React.Children.toArray(props.children)
          .map(child => extractCodeText(child))
          .join('');
      }
    }
    if (Array.isArray(node)) {
      return node.map(child => extractCodeText(child)).join('');
    }
    return '';
  };

  const codeText = extractCodeText(children);

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='my-3 relative'>
      <pre
        className='overflow-x-auto rounded-2xl border border-border-default p-5 text-sm text-text-muted'
        style={{ overscrollBehaviorX: 'contain', overscrollBehaviorY: 'auto' }}
        {...rest}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className='absolute top-1 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-border-default text-text-secondary text-sm transition-colors'
      >
        {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
};

export const AIMessageView = ({ content, className }: AIMessageViewProps) => {
  const customComponents: Components = {
    h1: ({ children }) => (
      <h1 className='my-3 text-lg font-semibold text-text-primary'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='my-2 text-base font-semibold text-text-primary'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='my-2 text-sm font-semibold text-text-primary'>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className='my-2 text-sm leading-7 text-text-secondary'>{children}</p>
    ),
    code: ({ children, className }) => {
      const isCodeBlock = className?.startsWith('language-');

      if (isCodeBlock) {
        return (
          <code className={`${className} text-text-muted`}>{children}</code>
        );
      }

      return (
        <code className='rounded bg-surface-secondary px-1.5 py-0.5 text-sm text-text-secondary'>
          {children}
        </code>
      );
    },
    pre: PreBlock,
    a: ({ children, href }) => {
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (
          href &&
          (href.startsWith('http://') || href.startsWith('https://')) &&
          isInMobileWebView()
        ) {
          e.preventDefault();
          sendToNativeApp({ type: 'OPEN_EXTERNAL_URL', url: href });
        }
      };
      return (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
          onClick={handleClick}
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className='my-3 ml-6 list-disc space-y-1 text-text-secondary'>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className='my-3 ml-6 list-decimal space-y-1 text-text-secondary'>
        {children}
      </ol>
    ),
    li: ({ children }) => <li className='text-text-secondary'>{children}</li>,
    strong: ({ children }) => (
      <strong className='font-semibold text-text-primary'>{children}</strong>
    ),
    em: ({ children }) => (
      <em className='italic text-text-primary'>{children}</em>
    ),
  };

  if (!content) return null;

  return (
    <div className={cn('w-full text-sm md:text-base', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
