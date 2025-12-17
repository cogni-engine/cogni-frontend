'use client';

import { useState, useMemo, createElement } from 'react';
import { Editor } from '@tiptap/react';
import {
  ToolbarExternalActions,
  ExpandedGroupId,
  isExpandableButton,
} from '../../types';
import { useMobileToolbarPosition } from '../../hooks/useMobileToolbarPosition';
import { useToolbarVisibility } from '../../hooks/useToolbarVisibility';
import GlassCard from '@/components/glass-design/GlassCard';
import { ToolbarButton } from './ToolBarButton';
import { ExpandableButtonGroup } from './ExpandableButtonGroup';
import { mainToolbarItems } from './toolbarConfig';

interface MobileFloatingToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  canUploadImage: boolean;
  onImageUpload: () => void;
  onToggleTaskList: () => void;
  isGroupNote: boolean;
}

export function MobileFloatingToolbar({
  editor,
  uploadingImage,
  canUploadImage,
  onImageUpload,
  onToggleTaskList,
  isGroupNote,
}: MobileFloatingToolbarProps) {
  const [expandedGroup, setExpandedGroup] = useState<ExpandedGroupId>(null);

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

  if (!editor || !isVisible) return null;

  // Filter items based on showWhen
  const visibleItems = mainToolbarItems.filter(item => {
    if ('showWhen' in item && item.showWhen) {
      return item.showWhen(actions);
    }
    return true;
  });

  return (
    <>
      {/* CSS for gooey animation */}
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

        @keyframes slide-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(var(--slide-amount, 0px));
          }
        }

        .animate-gooey-emerge {
          animation: gooey-emerge 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          opacity: 0;
        }

        .animate-slide-right {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div
        ref={toolbarRef}
        className='fixed w-full md:hidden left-0 right-0 z-50 pointer-events-none'
        style={{
          top: toolbarTop !== null ? `${toolbarTop}px` : 'auto',
          bottom: toolbarTop === null ? '0px' : 'auto',
        }}
      >
        <GlassCard className='pointer-events-auto p-2 mx-[11px] rounded-2xl'>
          <div className='flex gap-1 overflow-x-auto scrollbar-hide touch-pan-x w-full'>
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
              const isDisabled = item.isDisabled?.(editor, actions) ?? false;
              const icon = createElement(item.icon, { className: 'w-5 h-5' });

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
        </GlassCard>
      </div>
    </>
  );
}
