'use client';

import { useState, useCallback } from 'react';
import { PenSquare } from 'lucide-react';
import { useThreadContext } from '@/features/cogno/contexts/ThreadContext';
import { useThreadSidebar } from '@/stores/useHomeUIStore';

export default function ThreadSidebar() {
  const {
    threads,
    updateThread,
    deleteThread,
    selectedThreadId,
    setSelectedThreadId,
  } = useThreadContext();
  const { isOpen: isThreadSidebarOpen, close: closeThreadSidebar } =
    useThreadSidebar();

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleNewChat = useCallback(() => {
    setSelectedThreadId('new');
    closeThreadSidebar();
  }, [setSelectedThreadId, closeThreadSidebar]);

  const handleSelectThread = useCallback(
    (threadId: number) => {
      setSelectedThreadId(threadId);
      closeThreadSidebar();
    },
    [setSelectedThreadId, closeThreadSidebar]
  );

  const handleRename = useCallback(
    async (threadId: number) => {
      if (!renameValue.trim()) return;

      try {
        await updateThread(threadId, renameValue.trim());
        setRenamingId(null);
        setRenameValue('');
        setMenuOpenId(null);
      } catch (error) {
        console.error('Failed to rename thread:', error);
      }
    },
    [renameValue, updateThread]
  );

  const handleDelete = useCallback(
    async (threadId: number) => {
      if (!confirm('Are you sure you want to delete this thread?')) return;

      try {
        await deleteThread(threadId);
        setMenuOpenId(null);
      } catch (error) {
        console.error('Failed to delete thread:', error);
      }
    },
    [deleteThread]
  );

  const startRename = useCallback((thread: { id: number; title: string }) => {
    setRenamingId(thread.id);
    setRenameValue(thread.title);
    setMenuOpenId(null);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black/80 backdrop-blur-xl transition-all duration-300 ease-in-out z-40 overflow-hidden ${
        isThreadSidebarOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full overflow-hidden pb-30 pl-4'>
        {/* Header */}
        <div className='flex items-center justify-between p-4'>
          <h2 className='text-lg font-semibold text-white'></h2>
          <div className='w-5 h-5'></div>
        </div>

        {/* Thread List */}
        <div className='flex-1 overflow-y-auto px-2 pt-5 pb-5'>
          <div className='space-y-1'>
            {/* New Chat Button */}
            <div className='relative group'>
              <div className='flex items-center justify-between py-2'>
                <button
                  onClick={handleNewChat}
                  className='flex-1 text-left text-sm transition-colors text-white hover:text-white'
                >
                  New Chat
                </button>
                <button
                  onClick={handleNewChat}
                  className='p-1 text-white hover:text-white transition-colors'
                >
                  <PenSquare className='w-4 h-4' />
                </button>
              </div>
            </div>

            {threads.length === 0 ? (
              <div className='text-center py-8 text-white/40 text-sm'>
                No threads
              </div>
            ) : (
              <>
                {threads.map(thread => (
                  <div key={thread.id} className='relative group'>
                    {renamingId === thread.id ? (
                      // Rename Mode
                      <div className='p-2'>
                        <input
                          type='text'
                          value={renameValue}
                          onChange={e => setRenameValue(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleRename(thread.id);
                            if (e.key === 'Escape') {
                              setRenamingId(null);
                              setRenameValue('');
                            }
                          }}
                          className='w-full bg-black/30 text-white text-sm px-2 py-1 rounded border border-black focus:outline-none focus:border-black'
                          autoFocus
                        />
                        <div className='flex gap-2 mt-2'>
                          <button
                            onClick={() => handleRename(thread.id)}
                            className='flex-1 text-xs bg-white/10 hover:bg-white/20 text-white py-1 rounded transition-colors'
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setRenamingId(null);
                              setRenameValue('');
                            }}
                            className='flex-1 text-xs bg-white/5 hover:bg-white/10 text-white py-1 rounded transition-colors'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Normal Mode
                      <div className='flex items-center justify-between py-2'>
                        <button
                          onClick={() => handleSelectThread(thread.id)}
                          className={`flex-1 text-left text-sm transition-colors truncate ${
                            selectedThreadId === thread.id
                              ? 'text-white hover:text-white'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {thread.title}
                        </button>

                        {/* Three Dots Menu */}
                        <div className='relative'>
                          <button
                            onClick={() =>
                              setMenuOpenId(
                                menuOpenId === thread.id ? null : thread.id
                              )
                            }
                            className='p-1 text-white/40 hover:text-white/80 transition-colors'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={2}
                              stroke='currentColor'
                              className='w-4 h-4'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                              />
                            </svg>
                          </button>

                          {/* Menu Dropdown */}
                          {menuOpenId === thread.id && (
                            <div className='absolute right-0 mt-1 w-32 bg-black/90 backdrop-blur-xl border border-black rounded-lg shadow-xl z-100'>
                              <button
                                onClick={() => startRename(thread)}
                                className='w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-t-lg'
                              >
                                Rename
                              </button>
                              <button
                                onClick={() => handleDelete(thread.id)}
                                className='w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors rounded-b-lg'
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
