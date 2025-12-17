import { Editor } from '@tiptap/react';
import { ComponentType } from 'react';

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
}

export type ToggleCommand = {
  run: () => void;
};

export type TaskListChain = {
  toggleTaskList?: () => ToggleCommand;
};

export type StrikeChain = {
  toggleStrike?: () => ToggleCommand;
};

// Toolbar context for determining button visibility
export interface ToolbarContext {
  isInParagraph: boolean;
  isInHeading: boolean;
  isInListItem: boolean;
  isInTaskItem: boolean;
  isInBlockquote: boolean;
  isOnImage: boolean;
  hasSelection: boolean;
  canIndent: boolean;
  canOutdent: boolean;
}

// External actions passed to the toolbar
export interface ToolbarExternalActions {
  onImageUpload: () => void;
  onToggleTaskList: () => void;
  uploadingImage: boolean;
  canUploadImage: boolean;
  isGroupNote: boolean;
}

// Configuration for a single toolbar button
export interface ToolbarButtonConfig {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  command: (editor: Editor, actions: ToolbarExternalActions) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (
    editor: Editor,
    context: ToolbarContext,
    actions: ToolbarExternalActions
  ) => boolean;
  // Custom icon renderer for dynamic icons (e.g., loading state)
  renderIcon?: (actions: ToolbarExternalActions) => React.ReactNode;
}

// Configuration for a group of toolbar buttons
export interface ToolbarGroup {
  id: string;
  buttons: ToolbarButtonConfig[];
  showWhen: (context: ToolbarContext) => boolean;
}

// State for tracking which expandable group is open
export type ExpandedGroupId = 'text' | 'lists' | null;

// Configuration for an expandable toolbar button (has children)
export interface ExpandableToolbarButton {
  id: 'text' | 'lists';
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ToolbarButtonConfig[];
  // Whether any child is currently active
  isActive?: (editor: Editor) => boolean;
  // Whether to show this expandable button
  showWhen?: (actions: ToolbarExternalActions) => boolean;
}

// Configuration for a direct-action toolbar button (no children)
export interface DirectToolbarButton {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  command: (editor: Editor, actions: ToolbarExternalActions) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor, actions: ToolbarExternalActions) => boolean;
  // Whether to show this button
  showWhen?: (actions: ToolbarExternalActions) => boolean;
}

// Union type for main toolbar items
export type MainToolbarItem = ExpandableToolbarButton | DirectToolbarButton;

// Type guard to check if item is expandable
export function isExpandableButton(
  item: MainToolbarItem
): item is ExpandableToolbarButton {
  return 'children' in item;
}
