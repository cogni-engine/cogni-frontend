'use client';

import { useState, useMemo, createElement } from 'react';
import { Editor } from '@tiptap/react';
import { Sparkles, Loader2, ArrowUp, X, ChevronDown } from 'lucide-react';
import {
  ToolbarExternalActions,
  ExpandedGroupId,
  isExpandableButton,
} from '../../types';
import { useMobileToolbarPosition } from '../../hooks/useMobileToolbarPosition';
import { useToolbarVisibility } from '../../hooks/useToolbarVisibility';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { ToolbarButton } from './ToolBarButton';
import { ExpandableButtonGroup } from './ExpandableButtonGroup';
import { scrollableToolbarItems, closeKeyboardButton } from './toolbarConfig';

interface MobileFloatingToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  canUploadImage: boolean;
  onImageUpload: () => void;
  onToggleTaskList: () => void;
  isGroupNote: boolean;
  isEditorFocused: boolean;
  aiInstruction: string;
  aiLoading: boolean;
  aiError: string | null;
  onInstructionChange: (value: string) => void;
  onSuggest: () => void;
}

export function MobileFloatingToolbar({
  editor,
  uploadingImage,
  canUploadImage,
  onImageUpload,
  onToggleTaskList,
  isGroupNote,
  isEditorFocused,
  aiInstruction,
  aiLoading,
  aiError,
  onInstructionChange,
  onSuggest,
}: MobileFloatingToolbarProps) {
  const [expandedGroup, setExpandedGroup] = useState<ExpandedGroupId>(null);
  const [showAIInput, setShowAIInput] = useState(false);

  const { viewportHeight, toolbarTop, toolbarRef } = useMobileToolbarPosition();
  const { isVisible, editorUpdateKey } = useToolbarVisibility(
    editor,
    toolbarRef,
    viewportHeight
  );
  void editorUpdateKey;

  const actions: ToolbarExternalActions = useMemo(
    () => ({
      onImageUpload,
      onToggleTaskList,
      uploadingImage,
      canUploadImage,
      isGroupNote,
    }),
    [
      onImageUpload,
      onToggleTaskList,
      uploadingImage,
      canUploadImage,
      isGroupNote,
    ]
  );

  const handleToggleExpand = (id: ExpandedGroupId) => {
    setExpandedGroup(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSuggest();
    }
  };

  const handleAIButtonClick = () => {
    setShowAIInput(!showAIInput);
  };

  if (!editor) return null;

  // Show at bottom when not focused (AI input mode)
  // Show with dynamic positioning when focused (toolbar mode)
  const shouldShowAtBottom = !isEditorFocused;
  const shouldShow = shouldShowAtBottom || isVisible;

  // Filter items based on showWhen and isDisabled
  const visibleItems = scrollableToolbarItems
    .filter(item => {
      if ('showWhen' in item && item.showWhen) {
        return item.showWhen(actions);
      }
      return true;
    })
    .filter(item => {
      // Filter out disabled buttons (outdent when not applicable, undo/redo when no history)
      // Note: indent button is always available (inserts tab in regular content)
      if ('isDisabled' in item && item.isDisabled) {
        return !item.isDisabled(editor, actions);
      }
      return true;
    });

  if (!shouldShow) return null;

  return (
    <>
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gooey-emerge {
          0% {
            opacity: 0;
            transform: scale(0.3) translateX(-10px);
          }
          50% {
            transform: scale(1.1) translateX(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }

        .animate-gooey-emerge {
          animation: gooey-emerge 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          opacity: 0;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        ref={toolbarRef}
        className='fixed w-full md:hidden left-0 right-0 z-100 pointer-events-none'
        style={{
          top: shouldShowAtBottom
            ? 'auto'
            : toolbarTop !== null
              ? `${toolbarTop}px`
              : 'auto',
          bottom: shouldShowAtBottom
            ? '0px'
            : toolbarTop === null
              ? '0px'
              : 'auto',
        }}
      >
        <div className='mx-[8px] mb-[11px]'>
          {/* AI Input Overlay - When AI button is clicked */}
          {showAIInput && isEditorFocused && (
            <GlassCard className='pointer-events-auto p-2 rounded-3xl mb-2'>
              <div className='flex items-center gap-2 pl-2'>
                <Sparkles className='w-4 h-4 text-purple-400 shrink-0' />
                <input
                  type='text'
                  value={aiInstruction}
                  onChange={e => onInstructionChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Ask AI to edit this note...'
                  className='flex-1 bg-transparent text-white py-2 focus:outline-none placeholder-white/40 text-base'
                  disabled={aiLoading}
                  autoFocus
                />
                <GlassButton
                  onClick={onSuggest}
                  disabled={aiLoading || !aiInstruction.trim()}
                  aria-label='Send AI instruction'
                >
                  {aiLoading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <ArrowUp className='w-4 h-4' />
                  )}
                </GlassButton>
                <GlassButton
                  onClick={() => setShowAIInput(false)}
                  aria-label='Close AI input'
                >
                  <X className='w-4 h-4' />
                </GlassButton>
              </div>
            </GlassCard>
          )}

          <GlassCard className='pointer-events-auto p-2 rounded-full'>
            {!isEditorFocused ? (
              // AI Input Mode (when keyboard is not shown)
              <div className='flex items-center gap-2 pl-2'>
                <Sparkles className='w-4 h-4 text-purple-400 shrink-0' />
                <input
                  type='text'
                  value={aiInstruction}
                  onChange={e => onInstructionChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Ask AI to edit this note...'
                  className='flex-1 bg-transparent text-white py-2 focus:outline-none placeholder-white/40 text-base'
                  disabled={aiLoading}
                />
                <GlassButton
                  onClick={onSuggest}
                  disabled={aiLoading || !aiInstruction.trim()}
                  aria-label='Send AI instruction'
                >
                  {aiLoading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <ArrowUp className='w-4 h-4' />
                  )}
                </GlassButton>
              </div>
            ) : (
              // Three-Section Toolbar Mode (when keyboard is shown)
              <div className='flex items-center'>
                {/* LEFT: AI Button (Fixed) */}
                <div className='shrink-0'>
                  <ToolbarButton
                    onClick={handleAIButtonClick}
                    isActive={showAIInput}
                    disabled={false}
                    icon={createElement(Sparkles, {
                      className:
                        'w-5 h-5 text-purple-400 hover:text-purple-300 transition-colors',
                    })}
                    title='AI Assistant'
                    variant='minimal'
                  />
                </div>

                {/* Divider */}
                <div className='w-px h-6 bg-white/20 shrink-0 mr-1' />

                {/* CENTER: Scrollable Toolbar Items */}
                <div className='flex-1 overflow-x-auto scrollbar-hide touch-pan-x'>
                  <div className='flex gap-1'>
                    {visibleItems.map(item => {
                      if (isExpandableButton(item)) {
                        const isThisExpanded = expandedGroup === item.id;

                        return (
                          <ExpandableButtonGroup
                            key={item.id}
                            config={item}
                            editor={editor}
                            actions={actions}
                            isExpanded={isThisExpanded}
                            onToggle={handleToggleExpand}
                          />
                        );
                      }

                      // Direct button
                      const isActive = item.isActive?.(editor) ?? false;
                      const isDisabled =
                        item.isDisabled?.(editor, actions) ?? false;
                      const icon = createElement(item.icon, {
                        className: 'w-5 h-5',
                      });

                      // When a group is expanded, slide other items with animation
                      const shouldSlide = expandedGroup !== null;

                      return (
                        <div
                          key={item.id}
                          className={`shrink-0 transition-all duration-300 ${
                            shouldSlide
                              ? 'opacity-60 scale-90'
                              : 'opacity-100 scale-100'
                          }`}
                        >
                          <ToolbarButton
                            onClick={() => item.command(editor, actions)}
                            isActive={isActive}
                            disabled={isDisabled}
                            icon={icon}
                            title={item.title}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className='w-px h-6 bg-white/20 shrink-0' />

                {/* RIGHT: Close Button (Fixed) */}
                <div className='shrink-0'>
                  <ToolbarButton
                    onClick={() => closeKeyboardButton.command(editor, actions)}
                    isActive={false}
                    disabled={false}
                    icon={createElement(ChevronDown, {
                      className: 'w-5 h-5',
                    })}
                    title='Close keyboard'
                    variant='minimal'
                  />
                </div>
              </div>
            )}
          </GlassCard>

          {/* Error message for AI */}
          {aiError && (
            <div className='mt-2 px-4 text-xs text-red-400 flex items-center gap-2'>
              <X className='w-3 h-3' />
              {aiError}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
