'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WorkspaceMember } from '@/types/workspace';
import { User, Crown, Shield, Plus } from 'lucide-react';

interface MemberListProps {
  members: WorkspaceMember[];
  loading?: boolean;
  onInviteClick?: () => void;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'owner':
      return <Crown className='w-4 h-4 text-white/60' />;
    case 'admin':
      return <Shield className='w-4 h-4 text-white/60' />;
    default:
      return <User className='w-4 h-4 text-white/40' />;
  }
};

const getRoleBadgeStyles = () => {
  return 'bg-white/10 text-white/70';
};

export default function MemberList({
  members,
  loading,
  onInviteClick,
}: MemberListProps) {
  if (loading) {
    return (
      <div className='flex justify-center py-4'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
      </div>
    );
  }

  return (
    <div className='space-y-1'>
      {/* Invite Button Row */}
      {onInviteClick && (
        <button
          type='button'
          onClick={onInviteClick}
          className='w-full flex items-center gap-3 py-4 px-2 hover:bg-white/5 transition-colors rounded-lg'
        >
          <div className='h-10 w-10 rounded-full border border-dashed border-white/30 flex items-center justify-center'>
            <Plus className='w-5 h-5 text-white/60' />
          </div>
          <p className='text-white/70 font-medium'>Invite</p>
        </button>
      )}

      {/* Member List */}
      {members.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-white/40'>No members yet</p>
        </div>
      ) : (
        members.map(member => {
          const profile = member.user_profile ?? member.agent_profile ?? null;

          return (
            <div
              key={member.id}
              className='flex items-center justify-between py-4 px-2 hover:bg-white/5 transition-colors rounded-lg'
            >
              <div className='flex items-center gap-3'>
                <Avatar className='h-10 w-10 border border-white/10'>
                  {profile?.avatar_url ? (
                    <AvatarImage
                      src={profile.avatar_url}
                      alt={profile.name ?? 'Workspace member'}
                    />
                  ) : (
                    <AvatarFallback className='bg-white/5'>
                      <User className='w-4 h-4 text-white/40' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className='text-white font-medium'>
                    {profile?.name ?? 'Unknown'}
                  </p>
                  <p className='text-sm text-white/40'>
                    Joined {new Date(member.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {getRoleIcon(member.role)}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyles()}`}
                >
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
