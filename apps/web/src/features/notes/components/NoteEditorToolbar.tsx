'use client';

import { useState, useMemo, createElement } from 'react';
import { Editor } from '@tiptap/react';
import {
  ToolbarExternalActions,
  ExpandedGroupId,
  isExpandableButton,
} from '../types';
import { ToolbarButton } from './tool-bar/ToolBarButton';
import { ExpandableButtonGroup } from './tool-bar/ExpandableButtonGroup';
import { scrollableToolbarItems } from './tool-bar/toolbarConfig';
import GlassCard from '@/components/glass-design/GlassCard';

interface NoteEditorToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  canUploadImage: boolean;
  onImageUpload: () => void;
  onToggleTaskList: () => void;
  isGroupNote: boolean;
}

export function NoteEditorToolbar({
  editor,
  uploadingImage,
  canUploadImage,
  onImageUpload,
  onToggleTaskList,
  isGroupNote,
}: NoteEditorToolbarProps) {
  const [expandedGroup, setExpandedGroup] = useState<ExpandedGroupId>(null);

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

  // Filter items based on showWhen and isDisabled
  const visibleItems = useMemo(() => {
    if (!editor) return [];

    return scrollableToolbarItems
      .filter(item => {
        if ('showWhen' in item && item.showWhen) {
          return item.showWhen(actions);
        }
        return true;
      })
      .filter(item => {
        // Filter out disabled buttons
        if ('isDisabled' in item && item.isDisabled) {
          return !item.isDisabled(editor, actions);
        }
        return true;
      });
  }, [editor, actions]);

  if (!editor) return null;

  return (
    <div className='sticky top-0 z-18 mx-6' data-shepherd-target='note-toolbar'>
      <GlassCard className='px-6 py-1 rounded-3xl'>
        <div className='flex gap-1 flex-wrap'>
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
            const icon = createElement(item.icon, {
              className: 'w-5 h-5',
            });

            return (
              <ToolbarButton
                key={item.id}
                onClick={() => item.command(editor, actions)}
                isActive={isActive}
                disabled={isDisabled}
                icon={icon}
                title={item.title}
              />
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
