'use client';

import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
import { ChevronRight, Shield, Users, Check } from 'lucide-react';

interface RoleSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
}

const roles = [
  {
    id: 3,
    name: 'Member',
    description: 'Basic access',
    icon: Users,
    color: 'text-gray-400',
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Can manage members and invitations',
    icon: Shield,
    color: 'text-blue-400',
  },
];

export function RoleSelector({
  value,
  onChange,
  disabled = false,
  label,
}: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const selectedRole = roles.find(r => r.id === value) || roles[0];
  const Icon = selectedRole.icon;

  return (
    <div className='space-y-2'>
      {label && (
        <label className='text-sm font-medium text-white/80'>{label}</label>
      )}
      <div className='relative' ref={dropdownRef}>
        {/* Dropdown Button */}
        <GlassCard
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer group'
          }`}
        >
          <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-white/5'>
            <Icon className={`w-4 h-4 ${selectedRole.color}`} />
          </div>
          <div className='flex-1 text-left'>
            <span className='text-sm font-semibold text-white block'>
              {selectedRole.name}
            </span>
            <span className='text-xs text-white/50'>
              {selectedRole.description}
            </span>
          </div>
          <ChevronRight
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              disabled ? '' : 'group-hover:text-white'
            } ${isOpen ? 'rotate-90' : ''}`}
          />
        </GlassCard>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className='absolute z-50 w-full mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200'>
            <GlassCard className='rounded-xl p-2 bg-white/8 backdrop-blur-xl border border-white/10'>
              <div className='space-y-1'>
                {roles.map(role => {
                  const RoleIcon = role.icon;
                  const isSelected = role.id === value;

                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        onChange(role.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-blue-500/20 hover:bg-blue-500/25'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          isSelected ? 'bg-blue-500/20' : 'bg-white/5'
                        }`}
                      >
                        <RoleIcon className={`w-4 h-4 ${role.color}`} />
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='text-sm font-semibold text-white'>
                          {role.name}
                        </div>
                        <div className='text-xs text-white/50'>
                          {role.description}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className='w-4 h-4 text-blue-400' />
                      )}
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
