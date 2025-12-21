'use client';

import FolderDropdown from '@/components/FolderDropdown';
import SortDropdown from '@/components/SortDropdown';
import { useNotesContext } from '../NotesProvider';

export function NotesPageHeader() {
  const {
    folders,
    createFolder,
    updateFolder,
    deleteFolder,
    selectedFolder,
    setSelectedFolder,
    noteCounts,
    sortBy,
    setSortBy,
  } = useNotesContext();

  return (
    <div className='absolute top-16 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3'>
      <FolderDropdown
        folders={folders}
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
        onCreateFolder={createFolder}
        onUpdateFolder={updateFolder}
        onDeleteFolder={deleteFolder}
        noteCounts={noteCounts}
      />
      {selectedFolder === 'all' && (
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      )}
    </div>
  );
}
