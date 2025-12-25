import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';

type GroupedNotes = Record<string, FormattedNote[]>;

// Time group labels
const TIME_GROUPS = {
  TODAY: '今日',
  THIS_WEEK: '今週',
  THIS_MONTH: '今月',
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
    return `${date.getMonth() + 1}月`;
  }

  return `${date.getFullYear()}年`;
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

    // Month comparison (e.g., "10月", "11月")
    const aMonth = a.match(/^(\d+)月$/);
    const bMonth = b.match(/^(\d+)月$/);
    if (aMonth && bMonth) {
      return parseInt(bMonth[1]) - parseInt(aMonth[1]);
    }

    // Year comparison (e.g., "2024年", "2023年")
    const aYear = a.match(/^(\d+)年$/);
    const bYear = b.match(/^(\d+)年$/);
    if (aYear && bYear) {
      return parseInt(bYear[1]) - parseInt(aYear[1]);
    }

    // Months before years
    if (aMonth) return -1;
    if (bMonth) return 1;

    return 0;
  });
}

/**
 * Groups notes by folder
 * Always shows all folders, even if they have no notes
 */
export function groupNotesByFolder(
  notes: FormattedNote[],
  folders: NoteFolder[]
): GroupedNotes {
  const grouped: GroupedNotes = {};

  // Sort folders alphabetically by title
  const sortedFolders = [...folders].sort((a, b) =>
    a.title.localeCompare(b.title, 'ja')
  );

  // Initialize groups for each folder (always show all folders)
  sortedFolders.forEach(folder => {
    grouped[folder.title] = [];
  });

  // Add "Notes" group for notes without folder
  grouped['Notes'] = [];

  // Group notes
  notes.forEach(note => {
    if (!note.note_folder_id) {
      grouped['Notes'].push(note);
    } else {
      const folder = folders.find(f => f.id === note.note_folder_id);
      if (folder && grouped[folder.title]) {
        grouped[folder.title].push(note);
      }
    }
  });

  return grouped;
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
): { groups: GroupedNotes; sortedKeys: string[] } {
  const groups =
    groupBy === 'folder'
      ? groupNotesByFolder(notes, folders)
      : groupNotesByTime(notes);

  const sortedKeys =
    groupBy === 'folder'
      ? sortFolderGroupKeys(Object.keys(groups))
      : sortTimeGroupKeys(Object.keys(groups));

  return { groups, sortedKeys };
}
