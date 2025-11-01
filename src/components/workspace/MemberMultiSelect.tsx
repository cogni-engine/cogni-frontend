import type { WorkspaceMember } from '@/types/workspace';

type MemberMultiSelectProps = {
  label: string;
  members: WorkspaceMember[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
};

export function MemberMultiSelect({
  label,
  members,
  selectedIds,
  onChange,
}: MemberMultiSelectProps) {
  const toggleMember = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(sid => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div>
      <label className='text-sm text-gray-400 mb-2 block'>{label}</label>
      <div className='flex flex-wrap gap-2'>
        {members.length === 0 ? (
          <span className='text-sm text-gray-500'>No members available</span>
        ) : (
          members.map(member => (
            <button
              key={member.id}
              type='button'
              onClick={() => toggleMember(member.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedIds.includes(member.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {member.user_profile?.name || 'Unknown'}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
