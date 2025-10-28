'use client';

import { WorkspaceMember } from '@/types/workspace';
import { User, Crown, Shield } from 'lucide-react';

interface MemberListProps {
  members: WorkspaceMember[];
  loading?: boolean;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'owner':
      return <Crown className='w-4 h-4 text-yellow-400' />;
    case 'admin':
      return <Shield className='w-4 h-4 text-blue-400' />;
    default:
      return <User className='w-4 h-4 text-gray-400' />;
  }
};

const getRoleBadgeStyles = (role: string) => {
  switch (role) {
    case 'owner':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'admin':
      return 'bg-blue-500/20 text-blue-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};

export default function MemberList({ members, loading }: MemberListProps) {
  if (loading) {
    return (
      <div className='flex justify-center py-4'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className='text-center py-8'>
        <User className='w-12 h-12 text-gray-400 mx-auto mb-3' />
        <p className='text-gray-400'>No members in this workspace</p>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {members.map(member => (
        <div
          key={member.id}
          className='flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors'
        >
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
              <User className='w-5 h-5 text-white' />
            </div>
            <div>
              <p className='text-white font-medium'>
                {member.user_profile?.user_name || 'Unknown User'}
              </p>
              <p className='text-sm text-gray-400'>
                Joined {new Date(member.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {getRoleIcon(member.role)}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyles(member.role)}`}
            >
              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
