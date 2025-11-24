'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpDown, Check, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';

interface SortDropdownProps {
  sortBy: 'time' | 'folder';
  onSortChange: (sortBy: 'time' | 'folder') => void;
}

export default function SortDropdown({
  sortBy,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const getSelectedLabel = () => {
    if (sortBy === 'time') return 'time';
    if (sortBy === 'folder') return 'folder';
    return 'sort';
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Button */}
      <GlassCard
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 px-3 rounded-3xl transition-all duration-200 min-w-[140px] group'
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-transparent transition-colors'>
          <ArrowUpDown className='w-4 h-4 text-blue-400' />
        </div>
        <span className='flex-1 text-left text-sm font-semibold text-white truncate transition-colors group-hover:text-white group-focus-visible:text-white'>
          {getSelectedLabel()}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-white ${isOpen ? 'rotate-90' : ''}`}
        />
      </GlassCard>

      {/* Dropdown Menu */}
      {isOpen && (
        <GlassCard className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[200px] rounded-3xl z-50'>
          <div className='p-3'>
            {/* Time Sort */}
            <button
              onClick={() => {
                onSortChange('time');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                sortBy === 'time' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    sortBy === 'time'
                      ? 'bg-white/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                </div>
                <span className='text-sm font-medium text-white'>by time</span>
              </div>
              {sortBy === 'time' && <Check className='w-5 h-5 text-white' />}
            </button>

            {/* Folder Sort */}
            <button
              onClick={() => {
                onSortChange('folder');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group mt-1 ${
                sortBy === 'folder' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    sortBy === 'folder'
                      ? 'bg-white/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                </div>
                <span className='text-sm font-medium text-white'>
                  by folder
                </span>
              </div>
              {sortBy === 'folder' && <Check className='w-5 h-5 text-white' />}
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

