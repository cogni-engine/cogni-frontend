import * as React from 'react';
import { Plus, Users as UsersIcon } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import { MemberCard } from './MemberCard';
import type { Member } from '../../types/members';
import type { OrganizationPermissions } from '../../types/members';

interface MembersListProps {
  members: Member[];
  currentUserId: string | undefined;
  permissions: OrganizationPermissions;
  onUpdateRole: (member: Member) => void;
  onRemove: (member: Member) => void;
  onInvite: () => void;
  activeMemberCount: number;
  totalSeats: number;
}

export function MembersList({
  members,
  currentUserId,
  permissions,
  onUpdateRole,
  onRemove,
  onInvite,
  activeMemberCount,
  totalSeats,
}: MembersListProps) {
  return (
    <div className='mt-8'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <h3 className='text-lg font-semibold text-text-primary'>Members</h3>
          <div className='flex items-center gap-3 text-sm text-text-secondary'>
            <span className='flex items-center gap-1.5'>
              <UsersIcon className='h-4 w-4' />
              {activeMemberCount} members
            </span>
            {totalSeats > 0 && (
              <span className='text-text-muted'>• {totalSeats} seats</span>
            )}
          </div>
        </div>
        {permissions.isAdmin && (
          <GlassButton
            onClick={onInvite}
            disabled={!permissions.canInvite}
            size='icon'
            className='size-10'
            title={
              !permissions.canInvite
                ? `No available seats. ${permissions.usedSeats}/${permissions.usedSeats + permissions.availableSeats} seats used (${permissions.usedSeats - permissions.pendingInvitationsCount} members + ${permissions.pendingInvitationsCount} pending invitations)`
                : 'Invite Member'
            }
          >
            <Plus className='h-5 w-5' />
          </GlassButton>
        )}
      </div>

      <div className='space-y-2'>
        {members.length === 0 ? (
          <p className='text-text-muted text-center py-8'>No members found</p>
        ) : (
          members.map(member => {
            const isCurrentUser = member.user_id === currentUserId;
            return (
              <MemberCard
                key={member.id}
                member={member}
                isCurrentUser={isCurrentUser}
                canManage={permissions.isAdmin}
                onUpdateRole={onUpdateRole}
                onRemove={onRemove}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
