import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Hash,
  AtSign,
  ChevronDown,
  IndentIncrease,
  IndentDecrease,
} from 'lucide-react';
import {
  ToolbarButtonConfig,
  StrikeChain,
  ExpandableToolbarButton,
  DirectToolbarButton,
  MainToolbarItem,
} from '../../types';

// ============================================
// EXPANDABLE GROUP: Text (Aa)
// Contains: H1, H2, H3, Quote, Bold, Italic, Strikethrough
// ============================================

const textChildButtons: ToolbarButtonConfig[] = [
  {
    id: 'heading1',
    icon: Heading1,
    title: 'Heading 1',
    command: editor => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor => editor.isActive('heading', { level: 1 }),
  },
  {
    id: 'heading2',
    icon: Heading2,
    title: 'Heading 2',
    command: editor => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor => editor.isActive('heading', { level: 2 }),
  },
  {
    id: 'heading3',
    icon: Heading3,
    title: 'Heading 3',
    command: editor => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor => editor.isActive('heading', { level: 3 }),
  },
  {
    id: 'blockquote',
    icon: Quote,
    title: 'Quote',
    command: editor => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote'),
  },
  {
    id: 'bold',
    icon: Bold,
    title: 'Bold',
    command: editor => editor.chain().focus().toggleBold().run(),
    isActive: editor => editor.isActive('bold'),
  },
  {
    id: 'italic',
    icon: Italic,
    title: 'Italic',
    command: editor => editor.chain().focus().toggleItalic().run(),
    isActive: editor => editor.isActive('italic'),
  },
  {
    id: 'strikethrough',
    icon: Strikethrough,
    title: 'Strikethrough',
    command: editor => {
      const chain = editor.chain().focus() as StrikeChain;
      if (chain.toggleStrike) {
        chain.toggleStrike().run();
      }
    },
    isActive: editor => editor.isActive('strike'),
  },
];

// ============================================
// EXPANDABLE GROUP: Lists
// Contains: Bullet list, Numbered list
// ============================================

const listsChildButtons: ToolbarButtonConfig[] = [
  {
    id: 'bulletList',
    icon: List,
    title: 'Bullet list',
    command: editor => editor.chain().focus().toggleBulletList().run(),
    isActive: editor => editor.isActive('bulletList'),
  },
  {
    id: 'orderedList',
    icon: ListOrdered,
    title: 'Numbered list',
    command: editor => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor => editor.isActive('orderedList'),
  },
];

// ============================================
// MAIN TOOLBAR ITEMS
// ============================================

export const textExpandableButton: ExpandableToolbarButton = {
  id: 'text',
  icon: Type,
  title: 'Text formatting',
  children: textChildButtons,
  isActive: editor =>
    editor.isActive('heading') ||
    editor.isActive('blockquote') ||
    editor.isActive('bold') ||
    editor.isActive('italic') ||
    editor.isActive('strike'),
};

export const listsExpandableButton: ExpandableToolbarButton = {
  id: 'lists',
  icon: List,
  title: 'Lists',
  children: listsChildButtons,
  isActive: editor =>
    editor.isActive('bulletList') || editor.isActive('orderedList'),
};

export const checkboxButton: DirectToolbarButton = {
  id: 'checkbox',
  icon: CheckSquare,
  title: 'Task list',
  command: (_editor, actions) => actions.onToggleTaskList(),
  isActive: editor => editor.isActive('taskList'),
};

export const indentButton: DirectToolbarButton = {
  id: 'indent',
  icon: IndentIncrease,
  title: 'Indent (Tab)',
  command: editor => editor.chain().focus().sinkListItem('listItem').run(),
  isDisabled: editor => !editor.can().sinkListItem('listItem'),
};

export const outdentButton: DirectToolbarButton = {
  id: 'outdent',
  icon: IndentDecrease,
  title: 'Outdent (Shift+Tab)',
  command: editor => editor.chain().focus().liftListItem('listItem').run(),
  isDisabled: editor => !editor.can().liftListItem('listItem'),
};

export const noteMentionButton: DirectToolbarButton = {
  id: 'noteMention',
  icon: Hash,
  title: 'Link to note',
  command: editor => {
    // Insert # to trigger note mention suggestion
    editor.chain().focus().insertContent('#').run();
  },
};

export const memberMentionButton: DirectToolbarButton = {
  id: 'memberMention',
  icon: AtSign,
  title: 'Mention member',
  command: editor => {
    // Insert @ to trigger member mention suggestion
    editor.chain().focus().insertContent('@').run();
  },
  // Only show in group notes
  showWhen: actions => actions.isGroupNote,
};

export const undoButton: DirectToolbarButton = {
  id: 'undo',
  icon: Undo,
  title: 'Undo',
  command: editor => editor.chain().focus().undo().run(),
  isDisabled: editor => !editor.can().undo(),
};

export const closeKeyboardButton: DirectToolbarButton = {
  id: 'closeKeyboard',
  icon: ChevronDown,
  title: 'Close keyboard',
  command: editor => {
    // Blur the editor to close the keyboard
    editor.commands.blur();
  },
};

// Main toolbar items in order
export const mainToolbarItems: MainToolbarItem[] = [
  textExpandableButton,
  listsExpandableButton,
  checkboxButton,
  indentButton,
  outdentButton,
  noteMentionButton,
  memberMentionButton,
  undoButton,
  closeKeyboardButton,
];
