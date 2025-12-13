'use client';

import { useState, useEffect } from 'react';
import { useThreads } from '@/hooks/useThreads';
import { useThreadContext } from '@/contexts/ThreadContext';
import { useHomeUI } from '@/contexts/HomeUIContext';
import { onHeaderEvent, HEADER_EVENTS } from '@/lib/headerEvents';

export default function ThreadSidebar() {
  const { threads, updateThread, deleteThread, refetch } = useThreads();
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const { isThreadSidebarOpen, closeThreadSidebar } = useHomeUI();
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Listen for thread refresh events
  useEffect(() => {
    const unsubscribe = onHeaderEvent(HEADER_EVENTS.REFRESH_THREADS, refetch);
    return unsubscribe;
  }, [refetch]);

  const handleSelectThread = (threadId: number) => {
    setSelectedThreadId(threadId);
    closeThreadSidebar();
  };

  const handleRename = async (threadId: number) => {
    if (!renameValue.trim()) return;

    try {
      await updateThread(threadId, renameValue.trim());
      setRenamingId(null);
      setRenameValue('');
      setMenuOpenId(null);
    } catch (error) {
      console.error('Failed to rename thread:', error);
    }
  };

  const handleDelete = async (threadId: number) => {
    if (!confirm('このスレッドを削除してもよろしいですか？')) return;

    try {
      await deleteThread(threadId);
      setMenuOpenId(null);
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  const startRename = (thread: { id: number; title: string }) => {
    setRenamingId(thread.id);
    setRenameValue(thread.title);
    setMenuOpenId(null);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out z-40 ${
        isThreadSidebarOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full overflow-hidden pb-17'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-white/10'>
          <h2 className='text-lg font-semibold text-white'></h2>
          <div className='w-5 h-5'></div>
        </div>

        {/* Thread List */}
        <div className='flex-1 overflow-y-auto px-2 pt-5 pb-5'>
          {threads.length === 0 ? (
            <div className='text-center py-8 text-white/40 text-sm'>
              スレッドがありません
            </div>
          ) : (
            <div className='space-y-1.5'>
              {threads.map(thread => (
                <div
                  key={thread.id}
                  className={`relative group rounded-lg transition-all duration-300 ${
                    selectedThreadId === thread.id
                      ? 'bg-white/15 border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'bg-white/3 border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
                  }`}
                >
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
                    <div className='flex items-center justify-between px-2 py-2.5'>
                      <button
                        onClick={() => handleSelectThread(thread.id)}
                        className={`flex-1 text-left text-sm transition-colors truncate ${
                          selectedThreadId === thread.id
                            ? 'text-white/80 hover:text-white'
                            : 'text-white/50 hover:text-white/70'
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
                          <div className='absolute right-0 mt-1 w-32 bg-black/90 backdrop-blur-xl border border-black rounded-lg shadow-xl z-[100]'>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
