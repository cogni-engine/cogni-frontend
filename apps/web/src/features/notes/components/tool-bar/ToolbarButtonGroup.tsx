'use client';

import { createElement } from 'react';
import { Editor } from '@tiptap/react';
import {
  ToolbarGroup,
  ToolbarContext,
  ToolbarExternalActions,
} from '../../types';
import { ToolbarButton } from './ToolBarButton';

interface ToolbarButtonGroupProps {
  group: ToolbarGroup;
  editor: Editor;
  context: ToolbarContext;
  actions: ToolbarExternalActions;
}

export function ToolbarButtonGroup({
  group,
  editor,
  context,
  actions,
}: ToolbarButtonGroupProps) {
  // Don't render if group shouldn't be shown
  if (!group.showWhen(context)) {
    return null;
  }

  return (
    <>
      {group.buttons.map(button => {
        const isActive = button.isActive?.(editor) ?? false;
        const isDisabled =
          button.isDisabled?.(editor, context, actions) ?? false;

        // Use custom icon renderer if provided, otherwise use the icon component
        const icon = button.renderIcon
          ? button.renderIcon(actions)
          : createElement(button.icon, { className: 'w-5 h-5' });

        return (
          <ToolbarButton
            key={button.id}
            onClick={() => button.command(editor, actions)}
            isActive={isActive}
            disabled={isDisabled}
            icon={icon}
            title={button.title}
          />
        );
      })}
    </>
  );
}
