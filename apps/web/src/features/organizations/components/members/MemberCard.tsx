import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassCard from '@/components/glass-design/GlassCard';
import { UserMinus, Edit, MoreVertical } from 'lucide-react';
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
    <div className='p-4 bg-surface-primary rounded-lg border border-border-default flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        {/* Avatar */}
        <Avatar className='h-10 w-10'>
          {member.avatar_url ? (
            <AvatarImage
              src={member.avatar_url}
              alt={getMemberDisplayName(member)}
            />
          ) : (
            <AvatarFallback className='bg-purple-500/20 text-purple-300'>
              {getMemberInitials(member)}
            </AvatarFallback>
          )}
        </Avatar>

        {/* User Info */}
        <div>
          <div className='flex items-center gap-2'>
            <p className='text-text-primary font-medium'>
              {getMemberDisplayName(member)}
            </p>
            {isCurrentUser && (
              <span className='text-xs text-text-muted'>(You)</span>
            )}
          </div>
          <p className='text-sm text-text-secondary'>{member.email}</p>
        </div>
      </div>

      {/* Role & Actions */}
      <div className='flex items-center gap-3'>
        <span className='text-sm text-text-secondary capitalize'>
          {member.role_name || 'Member'}
        </span>

        {showActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='h-8 w-8 flex items-center justify-center rounded-lg hover:bg-interactive-hover transition-colors text-text-secondary hover:text-text-primary'>
                <MoreVertical className='h-4 w-4' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              sideOffset={8}
              className='w-48 z-110 p-0 border-0 bg-transparent shadow-none'
            >
              <GlassCard className='rounded-3xl p-2 bg-surface-primary'>
                <DropdownMenuItem
                  onClick={() => onUpdateRole(member)}
                  className='cursor-pointer flex items-center gap-2 rounded-full'
                >
                  <Edit className='h-4 w-4' />
                  <span>Update Role</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onRemove(member)}
                  className='cursor-pointer flex items-center gap-2 text-red-300 hover:text-red-200 rounded-full'
                >
                  <UserMinus className='h-4 w-4' />
                  <span>Remove Member</span>
                </DropdownMenuItem>
              </GlassCard>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
