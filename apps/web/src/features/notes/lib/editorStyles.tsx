export function EditorStyles() {
  return (
    <style jsx global>{`
      .ProseMirror {
        outline: none;
        min-height: 100%;
        padding: 0;
      }
      .ProseMirror p {
        margin: 0.9em 0;
      }
      .ProseMirror p:first-child {
        margin-top: 0;
      }
      .ProseMirror p:last-child {
        margin-bottom: 0;
      }
      .ProseMirror h1,
      .ProseMirror h2,
      .ProseMirror h3,
      .ProseMirror h4,
      .ProseMirror h5,
      .ProseMirror h6 {
        margin-top: 0.5em;
        margin-bottom: 1.5em;
        font-weight: 700;
        line-height: 1.3;
        color: rgba(255, 255, 255, 0.95);
      }
      .ProseMirror h1 {
        font-size: 2.25em;
        letter-spacing: -0.02em;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 0.3em;
      }
      .ProseMirror h2 {
        font-size: 1.75em;
        letter-spacing: -0.01em;
      }
      .ProseMirror h3 {
        font-size: 1.4em;
      }
      .ProseMirror h4 {
        font-size: 1.2em;
      }
      .ProseMirror h5 {
        font-size: 1.1em;
      }
      .ProseMirror h6 {
        font-size: 1em;
        color: rgba(255, 255, 255, 0.8);
      }
      .ProseMirror ul,
      .ProseMirror ol {
        margin: 0.75em 0;
        padding-left: 1.5em !important;
        list-style-position: outside !important;
      }
      .ProseMirror ul {
        list-style-type: disc !important;
      }
      .ProseMirror ul li {
        display: list-item !important;
        list-style-type: disc !important;
      }
      .ProseMirror ol {
        list-style-type: decimal !important;
      }
      .ProseMirror ol li {
        display: list-item !important;
        list-style-type: decimal !important;
      }
      .ProseMirror li {
        margin: 0.25em 0;
      }
      .ProseMirror ul.task-list,
      .ProseMirror ul[data-type='taskList'] {
        list-style: none !important;
        padding-left: 0 !important;
        margin: 0.75em 0;
      }
      .ProseMirror ul.task-list > li,
      .ProseMirror ul[data-type='taskList'] > li {
        list-style: none !important;
        display: flex !important;
        align-items: flex-start;
        gap: 0.6em;
        margin: 0.3em 0;
      }
      .ProseMirror ul.task-list > li::marker,
      .ProseMirror ul[data-type='taskList'] > li::marker {
        content: '';
      }
      .ProseMirror li.task-item,
      .ProseMirror li[data-type='taskItem'] {
        display: flex;
        align-items: flex-start;
        gap: 0.6em;
      }
      .ProseMirror li.task-item > label,
      .ProseMirror li[data-type='taskItem'] > label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
      }
      .ProseMirror li.task-item > label input[type='checkbox'],
      .ProseMirror li[data-type='taskItem'] > label input[type='checkbox'] {
        width: 1.5em;
        height: 1.5em;
        cursor: pointer;
        accent-color: rgba(59, 130, 246, 0.8);
        border-radius: 0.25em;
        margin: 0;
        border-radius: 100%;
      }
      .ProseMirror li.task-item > div,
      .ProseMirror li[data-type='taskItem'] > div {
        flex: 1;
        min-width: 0;
      }
      .ProseMirror li.task-item[data-checked='true'] > div,
      .ProseMirror li[data-type='taskItem'][data-checked='true'] > div {
        text-decoration: line-through;
        opacity: 0.7;
        color: rgba(255, 255, 255, 0.5);
      }
      .ProseMirror blockquote {
        border-left: 3px solid rgba(255, 255, 255, 0.2);
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
        color: rgba(255, 255, 255, 0.7);
      }
      .ProseMirror strong {
        font-weight: 600;
      }
      .ProseMirror em {
        font-style: italic;
      }
      .ProseMirror s {
        text-decoration: line-through;
      }
      .ProseMirror p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: rgba(156, 163, 175, 0.6);
        pointer-events: none;
        height: 0;
      }
      .ProseMirror img.editor-image {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1em 0;
        display: block;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .ProseMirror img.editor-image:hover {
        border-color: rgba(255, 255, 255, 0.2);
      }
      .ProseMirror img.editor-image.ProseMirror-selectednode {
        outline: 2px solid rgba(59, 130, 246, 0.5);
        outline-offset: 2px;
      }
      /* Member mention styles */
      .ProseMirror .mention {
        color: rgb(96, 165, 250);
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s;
      }
      .ProseMirror .mention:hover {
        color: rgb(147, 197, 253);
      }
      /* Note mention styles */
      .ProseMirror .note-mention {
        color: rgb(22, 163, 74);
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s;
      }
      .ProseMirror .note-mention:hover {
        color: rgb(34, 197, 94);
      }
      /* AI Completion ghost text styles */
      .ProseMirror .ai-completion-ghost-text {
        color: rgb(156, 163, 175);
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
        font-style: italic;
      }
      /* Hide scrollbar but keep functionality */
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      /* Diff suggestion mark styles - Monochrome */
      .ProseMirror .diff-added {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 3px;
        padding: 1px 4px;
        margin: 0 1px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.95);
        position: relative;
        font-weight: 500;
      }
      .ProseMirror .diff-added::before {
        content: '+';
        position: absolute;
        left: -12px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 9px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .ProseMirror .diff-added:hover::before {
        opacity: 1;
      }
      .ProseMirror .diff-deleted {
        background: transparent;
        border-radius: 3px;
        padding: 1px 4px;
        margin: 0 1px;
        text-decoration: line-through;
        text-decoration-thickness: 1.5px;
        text-decoration-color: rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.4);
        position: relative;
      }
      .ProseMirror .diff-deleted::before {
        content: '−';
        position: absolute;
        left: -12px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 9px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.3);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .ProseMirror .diff-deleted:hover::before {
        opacity: 1;
      }
      /* Diff suggestion transitions and hover effects */
      .ProseMirror [data-diff-suggestion] {
        transition: all 0.2s ease;
        cursor: default;
      }
      .ProseMirror [data-diff-suggestion]:hover {
        filter: brightness(1.15);
        transform: translateY(-1px);
      }
      /* Animation for newly inserted suggestions */
      @keyframes diffPulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
      .ProseMirror .diff-added,
      .ProseMirror .diff-deleted {
        animation: diffPulse 2s ease-in-out 1;
      }

      /* ========== Per-User Ownership Styles ========== */

      /* Owner styles - full color, interactive */
      .ProseMirror .diff-owner {
        cursor: pointer;
      }

      /* Other user styles - muted, read-only appearance */
      .ProseMirror .diff-other-user {
        opacity: 0.6;
        filter: saturate(0.5);
        cursor: not-allowed;
      }
      .ProseMirror .diff-other-user::before {
        display: none;
      }

      /* ========== Block-Level Diff Styles ========== */

      /* Block wrapper - NodeView container */
      .diff-block-wrapper {
        position: relative;
        margin: 0.75em 0;
        border-radius: 8px;
        padding: 12px 16px 20px 32px;
      }

      /* Block added styles - Monochrome */
      .diff-block-added-view {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 3px solid rgba(255, 255, 255, 0.5);
      }

      /* Block deleted styles - Monochrome */
      .diff-block-deleted-view {
        background: transparent;
        border: 1px dashed rgba(255, 255, 255, 0.15);
        border-left: 3px solid rgba(255, 255, 255, 0.25);
      }
      .diff-block-deleted-view .diff-block-inner-content {
        text-decoration: line-through;
        text-decoration-color: rgba(255, 255, 255, 0.4);
        opacity: 0.5;
      }

      /* Block ownership styles */
      .diff-block-owner-view {
        opacity: 1;
      }
      .diff-block-other-view {
        opacity: 0.6;
        filter: saturate(0.5);
      }
      .diff-block-other-view .diff-block-actions {
        display: none;
      }

      /* Block indicator label */
      .diff-block-indicator {
        position: absolute;
        top: -10px;
        left: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .diff-block-indicator-added {
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
      }
      .diff-block-indicator-deleted {
        color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.05);
        padding: 2px 8px;
        border-radius: 4px;
      }
      .diff-block-other-user-label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 10px;
        font-weight: 400;
        text-transform: none;
      }

      /* Block content area */
      .diff-block-content {
        min-height: 1em;
      }
      .diff-block-inner-content {
        outline: none;
      }
      .diff-block-inner-content p {
        margin: 0;
      }

      /* Block action buttons (Bottom Right Style) */
      .diff-block-actions {
        position: absolute;
        bottom: 8px;
        right: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        z-index: 10;
      }
      .diff-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;
      }
      .diff-action-accept {
        color: rgba(34, 197, 94, 0.8);
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.25);
      }
      .diff-action-accept:hover {
        background: rgba(34, 197, 94, 0.25);
        color: rgb(34, 197, 94);
        border-color: rgba(34, 197, 94, 0.5);
        transform: scale(1.05);
      }
      .diff-action-reject {
        color: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .diff-action-reject:hover {
        background: rgba(239, 68, 68, 0.2);
        color: rgb(239, 68, 68);
        border-color: rgba(239, 68, 68, 0.4);
        transform: scale(1.05);
      }

      /* ========== Inline Diff Buttons ========== */
      .inline-diff-button-wrapper {
        display: inline;
        vertical-align: baseline;
      }
      .inline-diff-buttons {
        display: inline-flex;
        align-items: center;
        margin-left: 4px;
        gap: 2px;
        vertical-align: middle;
      }
      .inline-diff-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.12s ease;
        font-size: 11px;
        font-weight: 700;
        line-height: 1;
      }
      .inline-diff-accept {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
      }
      .inline-diff-accept:hover {
        background: rgba(255, 255, 255, 0.9);
        color: rgba(0, 0, 0, 0.8);
      }
      .inline-diff-reject {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.5);
      }
      .inline-diff-reject:hover {
        background: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.9);
      }
    `}</style>
  );
}
