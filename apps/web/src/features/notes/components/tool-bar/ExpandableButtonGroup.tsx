'use client';

import { createElement } from 'react';
import { Editor } from '@tiptap/react';
import { ChevronLeft } from 'lucide-react';
import {
  ExpandableToolbarButton,
  ToolbarExternalActions,
  ExpandedGroupId,
} from '../../types';
import { ToolbarButton } from './ToolBarButton';

interface ExpandableButtonGroupProps {
  config: ExpandableToolbarButton;
  editor: Editor;
  actions: ToolbarExternalActions;
  isExpanded: boolean;
  onToggle: (id: ExpandedGroupId) => void;
}

export function ExpandableButtonGroup({
  config,
  editor,
  actions,
  isExpanded,
  onToggle,
}: ExpandableButtonGroupProps) {
  const isAnyChildActive = config.isActive?.(editor) ?? false;

  if (!isExpanded) {
    // Collapsed state - show parent button only
    return (
      <ToolbarButton
        onClick={() => onToggle(config.id)}
        isActive={isAnyChildActive}
        icon={createElement(config.icon, { className: 'w-5 h-5' })}
        title={config.title}
      />
    );
  }

  // Expanded state - show back button + children with gooey animation
  return (
    <div className='flex items-center gap-1'>
      {/* Back button (transforms from parent) */}
      <ToolbarButton
        onClick={() => onToggle(null)}
        icon={<ChevronLeft className='w-5 h-5' />}
        title='Back'
      />

      {/* Child buttons with staggered animation */}
      {config.children.map((button, index) => {
        const isActive = button.isActive?.(editor) ?? false;
        const icon = createElement(button.icon, { className: 'w-5 h-5' });

        return (
          <div
            key={button.id}
            className='animate-gooey-emerge'
            style={{
              animationDelay: `${index * 30}ms`,
            }}
          >
            <ToolbarButton
              onClick={() => button.command(editor, actions)}
              isActive={isActive}
              icon={icon}
              title={button.title}
            />
          </div>
        );
      })}
    </div>
  );
}
