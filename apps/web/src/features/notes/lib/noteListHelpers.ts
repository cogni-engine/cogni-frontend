import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';

export type GroupedNotes = Record<string, FormattedNote[]>;

export type WorkspaceGroupInfo = {
  notes: FormattedNote[];
  iconUrl?: string | null;
};

// Time group labels
const TIME_GROUPS = {
  TODAY: 'Today',
  THIS_WEEK: 'This Week',
  THIS_MONTH: 'This Month',
} as const;

/**
 * Determines which time group a note belongs to based on its updated_at date
 */
function getTimeGroup(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const noteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (noteDate.getTime() === today.getTime()) {
    return TIME_GROUPS.TODAY;
  }

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (noteDate > weekAgo) {
    return TIME_GROUPS.THIS_WEEK;
  }

  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return TIME_GROUPS.THIS_MONTH;
  }

  if (date.getFullYear() === now.getFullYear()) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[date.getMonth()];
  }

  return `${date.getFullYear()}`;
}

/**
 * Groups notes by time period (today, this week, this month, etc.)
 */
export function groupNotesByTime(notes: FormattedNote[]): GroupedNotes {
  return notes.reduce<GroupedNotes>((groups, note) => {
    const group = getTimeGroup(note.updated_at);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(note);
    return groups;
  }, {});
}

/**
 * Sorts time group keys in chronological order (today first, then older)
 */
export function sortTimeGroupKeys(keys: string[]): string[] {
  const priorityOrder = [
    TIME_GROUPS.TODAY,
    TIME_GROUPS.THIS_WEEK,
    TIME_GROUPS.THIS_MONTH,
  ];

  return [...keys].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a as (typeof priorityOrder)[number]);
    const bIndex = priorityOrder.indexOf(b as (typeof priorityOrder)[number]);

    // Both in priority list
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Month comparison (e.g., "October", "November")
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const aMonthIndex = monthNames.indexOf(a);
    const bMonthIndex = monthNames.indexOf(b);
    if (aMonthIndex !== -1 && bMonthIndex !== -1) {
      return bMonthIndex - aMonthIndex;
    }

    // Year comparison (e.g., "2024", "2023")
    const aYear = a.match(/^(\d{4})$/);
    const bYear = b.match(/^(\d{4})$/);
    if (aYear && bYear) {
      return parseInt(bYear[1]) - parseInt(aYear[1]);
    }

    // Months before years
    if (aMonthIndex !== -1) return -1;
    if (bMonthIndex !== -1) return 1;

    return 0;
  });
}

/**
 * Groups notes by folder
 * Always shows all folders, even if they have no notes
 * Separates workspace notes into their own groups
 */
export function groupNotesByFolder(
  notes: FormattedNote[],
  folders: NoteFolder[]
): {
  groups: GroupedNotes;
  workspaceGroups: Record<string, WorkspaceGroupInfo>;
} {
  const groups: GroupedNotes = {};
  const workspaceGroups: Record<string, WorkspaceGroupInfo> = {};

  // Sort folders alphabetically by title
  const sortedFolders = [...folders].sort((a, b) =>
    a.title.localeCompare(b.title, 'ja')
  );

  // Initialize groups for each folder (always show all folders)
  sortedFolders.forEach(folder => {
    groups[folder.title] = [];
  });

  // Add "Notes" group for notes without folder
  groups['Notes'] = [];

  // Group notes
  notes.forEach(note => {
    if (note.isGroupNote && note.workspace?.title) {
      // Workspace note -> workspace group
      const wsTitle = note.workspace.title;
      if (!workspaceGroups[wsTitle]) {
        workspaceGroups[wsTitle] = {
          notes: [],
          iconUrl: note.workspace.icon_url,
        };
      }
      workspaceGroups[wsTitle].notes.push(note);
    } else if (!note.note_folder_id) {
      // Personal note without folder -> "Notes"
      groups['Notes'].push(note);
    } else {
      // Personal note with folder
      const folder = folders.find(f => f.id === note.note_folder_id);
      if (folder && groups[folder.title]) {
        groups[folder.title].push(note);
      } else {
        // Note has a folder from another workspace - show in "Notes" group
        groups['Notes'].push(note);
      }
    }
  });

  return { groups, workspaceGroups };
}

/**
 * Sorts folder group keys alphabetically with "Notes" first
 */
export function sortFolderGroupKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    if (a === 'Notes') return -1;
    if (b === 'Notes') return 1;
    return a.localeCompare(b, 'ja');
  });
}

/**
 * Groups and sorts notes based on the groupBy mode
 */
export function groupAndSortNotes(
  notes: FormattedNote[],
  groupBy: 'time' | 'folder',
  folders: NoteFolder[] = []
): {
  groups: GroupedNotes;
  sortedKeys: string[];
  workspaceGroups: Record<string, WorkspaceGroupInfo>;
  sortedWorkspaceKeys: string[];
} {
  if (groupBy === 'folder') {
    const { groups, workspaceGroups } = groupNotesByFolder(notes, folders);
    const sortedKeys = sortFolderGroupKeys(Object.keys(groups));
    const sortedWorkspaceKeys = Object.keys(workspaceGroups).sort((a, b) =>
      a.localeCompare(b, 'ja')
    );
    return { groups, sortedKeys, workspaceGroups, sortedWorkspaceKeys };
  }

  const groups = groupNotesByTime(notes);
  const sortedKeys = sortTimeGroupKeys(Object.keys(groups));
  return { groups, sortedKeys, workspaceGroups: {}, sortedWorkspaceKeys: [] };
}
