'use client';

import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { Check, X } from 'lucide-react';
import type {
  DiffSuggestionBlockOptions,
  DiffSuggestionBlockAttributes,
} from './DiffSuggestionBlockNode';

export function DiffSuggestionBlockNodeView({
  node,
  extension,
  editor,
}: NodeViewProps) {
  const { type, suggestionId, userId } =
    node.attrs as DiffSuggestionBlockAttributes;
  const { currentUserId } = extension.options as DiffSuggestionBlockOptions;
  const isOwner = userId === currentUserId;

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use editor commands directly
    editor.commands.acceptBlockDiff(suggestionId);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use editor commands directly
    editor.commands.rejectBlockDiff(suggestionId);
  };

  // Determine styling based on type and ownership
  const baseClasses = 'diff-block-wrapper relative my-2 rounded-lg';
  const typeClasses =
    type === 'deleted' ? 'diff-block-deleted-view' : 'diff-block-added-view';
  const ownerClasses = isOwner
    ? 'diff-block-owner-view'
    : 'diff-block-other-view';

  return (
    <NodeViewWrapper
      className={`${baseClasses} ${typeClasses} ${ownerClasses}`}
      style={{ position: 'relative' }}
      data-diff-block-type={type}
      data-suggestion-id={suggestionId}
      data-user-id={userId}
    >
      {/* Diff type indicator */}
      <div className='diff-block-indicator'>
        {type === 'added' ? (
          <span className='diff-block-indicator-added'>+ Added</span>
        ) : (
          <span className='diff-block-indicator-deleted'>− Removed</span>
        )}
        {!isOwner && (
          <span className='diff-block-other-user-label'>(by another user)</span>
        )}
      </div>

      {/* Content */}
      <div className='diff-block-content'>
        <NodeViewContent className='diff-block-inner-content' />
      </div>

      {/* Accept/Reject buttons - only for owner */}
      {isOwner && (
        <div
          className='diff-block-actions'
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
          }}
        >
          <button
            type='button'
            onClick={handleReject}
            className='diff-action-btn diff-action-reject'
            title='Reject this change'
          >
            <X className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={handleAccept}
            className='diff-action-btn diff-action-accept'
            title='Accept this change'
          >
            <Check className='w-4 h-4' />
          </button>
        </div>
      )}
    </NodeViewWrapper>
  );
}

/**
 * Inline mark view component for inline diff suggestions with accept/reject buttons
 * This is rendered via CSS pseudo-elements and data attributes for performance
 */
export function InlineDiffButtons({
  suggestionId,
  isOwner,
  onAccept,
  onReject,
}: {
  suggestionId: string;
  isOwner: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (!isOwner) return null;

  return (
    <span
      className='inline-diff-buttons'
      contentEditable={false}
      data-suggestion-id={suggestionId}
    >
      <button
        type='button'
        onClick={() => onAccept(suggestionId)}
        className='inline-diff-btn inline-diff-accept'
        title='Accept'
      >
        <Check className='w-3 h-3' />
      </button>
      <button
        type='button'
        onClick={() => onReject(suggestionId)}
        className='inline-diff-btn inline-diff-reject'
        title='Reject'
      >
        <X className='w-3 h-3' />
      </button>
    </span>
  );
}
