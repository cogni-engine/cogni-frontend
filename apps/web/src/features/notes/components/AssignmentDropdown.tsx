import Image from 'next/image';
import { Check } from 'lucide-react';
import { WorkspaceMember } from '@/types/workspace';
import GlassCard from '@/components/glass-design/GlassCard';

interface AssignmentDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  members: WorkspaceMember[];
  assigneeIds: number[];
  onToggleAssignee: (memberId: number) => void;
  onSelectAll?: () => void;
}

export function AssignmentDropdown({
  isOpen,
  onClose,
  members,
  assigneeIds,
  onToggleAssignee,
  onSelectAll,
}: AssignmentDropdownProps) {
  if (!isOpen) return null;

  const allSelected =
    members.length > 0 && assigneeIds.length === members.length;

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-30' onClick={onClose} />
      {/* Dropdown menu */}
      <GlassCard className='absolute right-0 top-full mt-2 w-64 rounded-3xl z-40'>
        <div className='p-2'>
          <div className='px-3 py-2 text-sm font-medium text-white'>
            Assignee
          </div>
          <div className='h-px bg-white/10 mb-2' />

          {/* Select All option */}
          {members.length > 0 && onSelectAll && (
            <>
              <button
                type='button'
                onClick={onSelectAll}
                className='w-full p-2 text-left text-sm hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between'
              >
                <span className='text-white'>Select All</span>
                {allSelected && <Check className='w-4 h-4 text-white' />}
              </button>
              <div className='h-px bg-white/10 my-2' />
            </>
          )}

          <div className='max-h-64 overflow-y-auto'>
            {members.length === 0 ? (
              <div className='px-3 py-2 text-sm text-gray-400'>No members</div>
            ) : (
              members.map(member => {
                const isSelected = assigneeIds.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type='button'
                    onClick={() => onToggleAssignee(member.id)}
                    className='w-full p-2 text-left text-sm hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between'
                  >
                    <div className='flex items-center gap-3'>
                      {member.user_profile?.avatar_url ? (
                        <Image
                          src={member.user_profile.avatar_url}
                          alt={member.user_profile?.name || 'User'}
                          width={24}
                          height={24}
                          className='w-6 h-6 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-medium'>
                          {(member.user_profile?.name || '?')
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                      <span className='text-white'>
                        {member.user_profile?.name || 'Unknown'}
                      </span>
                    </div>
                    {isSelected && <Check className='w-4 h-4 text-white' />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </GlassCard>
    </>
  );
}
