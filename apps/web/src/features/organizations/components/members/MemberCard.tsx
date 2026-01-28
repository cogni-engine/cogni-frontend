import * as React from 'react';
import { Button } from '@/components/ui/button';
import { UserMinus, Edit } from 'lucide-react';
import type { Member } from '../../types/members';
import {
  getMemberInitials,
  getMemberDisplayName,
  isMemberOwner,
} from '../../utils/memberUtils';

interface MemberCardProps {
  member: Member;
  isCurrentUser: boolean;
  canManage: boolean;
  onUpdateRole: (member: Member) => void;
  onRemove: (member: Member) => void;
}

export function MemberCard({
  member,
  isCurrentUser,
  canManage,
  onUpdateRole,
  onRemove,
}: MemberCardProps) {
  const memberIsOwner = isMemberOwner(member.role_name);
  const showActions = canManage && !isCurrentUser && !memberIsOwner;

  return (
    <div className='p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        {/* Avatar */}
        <div className='h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-medium'>
          {getMemberInitials(member)}
        </div>

        {/* User Info */}
        <div>
          <div className='flex items-center gap-2'>
            <p className='text-white font-medium'>
              {getMemberDisplayName(member)}
            </p>
            {isCurrentUser && (
              <span className='text-xs text-white/40'>(You)</span>
            )}
          </div>
          <p className='text-sm text-white/60'>{member.email}</p>
        </div>
      </div>

      {/* Role & Actions */}
      <div className='flex items-center gap-3'>
        <span className='text-sm text-white/60 capitalize'>
          {member.role_name || 'Member'}
        </span>

        {showActions && (
          <>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onUpdateRole(member)}
              className='bg-blue-500/10 border-blue-500/50 text-blue-300 hover:bg-blue-500/20'
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onRemove(member)}
              className='bg-red-500/10 border-red-500/50 text-red-300 hover:bg-red-500/20'
            >
              <UserMinus className='h-4 w-4' />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
