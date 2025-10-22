"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type AIMessageViewProps = {
  content: string;
  className?: string;
};

export const AIMessageView = ({ content, className }: AIMessageViewProps) => {
  const customComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="my-3 text-2xl font-semibold text-white">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="my-3 text-xl font-semibold text-white">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="my-2 text-lg font-semibold text-white">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="my-2 text-base leading-7 text-gray-200">{children}</p>
    ),
    code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
      const isCodeBlock = className?.startsWith('language-');
      
      if (isCodeBlock) {
        return <code className={className}>{children}</code>;
      }
      
      return (
        <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-gray-200">
          {children}
        </code>
      );
    },
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className="my-3 overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm text-gray-100">
        {children}
      </pre>
    ),
    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline hover:text-blue-300"
      >
        {children}
      </a>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="my-3 ml-6 list-disc space-y-1 text-gray-200">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="my-3 ml-6 list-decimal space-y-1 text-gray-200">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-gray-200">{children}</li>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-gray-100">{children}</em>
    ),
  };

  if (!content) return null;

  return (
    <div className={cn("w-full text-lg md:text-xl", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
