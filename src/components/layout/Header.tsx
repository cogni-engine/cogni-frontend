"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useThreads } from '@/hooks/useThreads';
import { useThreadContext } from '@/contexts/ThreadContext';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/home';
  const { threads, createThread, updateThread, deleteThread, loading } = useThreads();
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingThreadId, setEditingThreadId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Get the selected thread object
  const selectedThread = threads.find(t => t.id === selectedThreadId);

  const handleCreateThread = async () => {
    try {
      // Generate date/time title: e.g., "Oct 12, 2025 3:45 PM"
      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      await createThread(dateTimeTitle);
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };

  const handleUpdateThread = async (id: number) => {
    if (!editingTitle.trim()) return;
    
    try {
      await updateThread(id, editingTitle.trim());
      setEditingThreadId(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Failed to update thread:', error);
    }
  };

  const handleDeleteThread = async (id: number) => {
    if (!confirm('Are you sure you want to delete this thread?')) return;
    
    try {
      await deleteThread(id);
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  const startEditing = (id: number, title: string) => {
    setEditingThreadId(id);
    setEditingTitle(title);
  };

  const cancelEditing = () => {
    setEditingThreadId(null);
    setEditingTitle('');
  };

  const handleSelectThread = (threadId: number) => {
    setSelectedThreadId(threadId);
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md relative z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white">Cogno</h1>
        {isHomePage && selectedThread && (
          <div className="flex items-center gap-2">
            <span className="text-white/40">|</span>
            <span className="text-sm text-white/60">{selectedThread.title}</span>
          </div>
        )}
      </div>
      
      {/* Thread Dropdown - Only on Home Page */}
      {isHomePage && (
      <div className="relative">
        <div className="flex items-center gap-2">
          {/* Create New Thread Button (Pencil Icon) */}
          <button
            onClick={handleCreateThread}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Create new thread"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          {/* Thread Dropdown Toggle */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="View threads"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white/8 border border-white/10 rounded-lg shadow-xl z-[100] max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white/80">Threads</h3>
            </div>
            
            <div className="p-2">
              {loading && threads.length === 0 ? (
                <div className="text-center py-4 text-white/60 text-sm">Loading...</div>
              ) : threads.length === 0 ? (
                <div className="text-center py-4 text-white/60 text-sm">No threads yet</div>
              ) : (
                <div className="space-y-1">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedThreadId === thread.id 
                          ? 'bg-blue-600/20 border border-blue-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {editingThreadId === thread.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateThread(thread.id);
                              } else if (e.key === 'Escape') {
                                cancelEditing();
                              }
                            }}
                            className="flex-1 px-2 py-1 bg-gray-800 text-white/80 text-sm rounded border border-white/20 focus:outline-none focus:border-white/40"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdateThread(thread.id)}
                            className="p-1 text-green-400 hover:text-green-300"
                            title="Save"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Cancel"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleSelectThread(thread.id)}
                            className="text-white/80 text-sm flex-1 truncate text-left hover:text-white transition-colors"
                          >
                            {thread.title}
                          </button>
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(thread.id, thread.title);
                              }}
                              className="p-1 text-blue-400 hover:text-blue-300"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13L2.25 21.75l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteThread(thread.id);
                              }}
                              className="p-1 text-red-400 hover:text-red-300"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}

      {/* Original comet decoration */}
      <div className={`absolute ${isHomePage ? 'right-20' : 'right-4'} top-1/2 transform -translate-y-1/2`}>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        {/* アシンメトリーな彗星の尾 */}
        <div className="absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/50 via-white/20 to-transparent transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/30 via-white/10 to-transparent transform -translate-y-1/2 translate-y-1.5"></div>
        <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/20 via-white/5 to-transparent transform -translate-y-1/2 -translate-y-1.5"></div>
        <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-white/15 via-white/3 to-transparent transform -translate-y-1/2 translate-y-2.5"></div>
      </div>
    </header>
  );
}

