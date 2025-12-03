import { WorkspaceMember } from '@/types/workspace';

interface AssignmentDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  members: WorkspaceMember[];
  assigneeIds: number[];
  onToggleAssignee: (memberId: number) => void;
}

export function AssignmentDropdown({
  isOpen,
  onClose,
  members,
  assigneeIds,
  onToggleAssignee,
}: AssignmentDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-30' onClick={onClose} />
      {/* Dropdown menu */}
      <div className='absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-xl border border-black rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] z-40 overflow-hidden'>
        <div className='px-4 py-3 border-b border-black'>
          <div className='text-sm font-medium text-white'>担当者</div>
        </div>
        <div className='max-h-64 overflow-y-auto'>
          {members.length === 0 ? (
            <div className='px-4 py-3 text-sm text-gray-400'>
              メンバーがいません
            </div>
          ) : (
            members.map(member => (
              <button
                key={member.id}
                type='button'
                onClick={() => onToggleAssignee(member.id)}
                className='w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-3'
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 ${
                    assigneeIds.includes(member.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-600'
                  }`}
                >
                  {assigneeIds.includes(member.id) && (
                    <svg
                      className='w-3.5 h-3.5 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-300'>
                  {member.user_profile?.name || 'Unknown'}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
