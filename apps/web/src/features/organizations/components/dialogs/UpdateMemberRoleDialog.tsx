import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import { Shield, Loader2, Info } from 'lucide-react';
import { useUpdateMemberRole } from '../../hooks/useOrganizationMembers';
import { RoleSelector } from '../RoleSelector';
import type { Member } from '../../types/members';
import { getMemberDisplayName } from '../../utils/memberUtils';

interface UpdateMemberRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  organizationId: number | undefined;
  onSuccess?: (message: string) => void;
}

export function UpdateMemberRoleDialog({
  open,
  onOpenChange,
  member,
  organizationId,
  onSuccess,
}: UpdateMemberRoleDialogProps) {
  const [newRoleId, setNewRoleId] = React.useState<number>(3);
  const updateMemberRole = useUpdateMemberRole();

  // Update role ID when member changes
  React.useEffect(() => {
    if (member) {
      setNewRoleId(member.role_id || 3);
    }
  }, [member]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId || !member) return;

    try {
      const result = await updateMemberRole.mutateAsync({
        organizationId,
        memberId: member.id,
        roleId: newRoleId,
      });

      handleClose();
      onSuccess?.(result.message);
    } catch (error) {
      console.error('Failed to update member role:', error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent zIndex={150} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-6 pb-2 pt-0'>
          <DrawerTitle>Update Member Role</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleUpdateRole} className='space-y-6 px-4'>
            {member && (
              <>
                <div className='p-4 bg-surface-primary rounded-xl border border-border-default'>
                  <p className='text-text-primary font-medium'>
                    {getMemberDisplayName(member)}
                  </p>
                  <p className='text-sm text-text-secondary'>{member.email}</p>
                  <p className='text-xs text-text-muted mt-2'>
                    Current role:{' '}
                    <span className='capitalize'>
                      {member.role_name || 'Member'}
                    </span>
                  </p>
                </div>

                <div className='space-y-4'>
                  <RoleSelector
                    value={newRoleId}
                    onChange={setNewRoleId}
                    disabled={updateMemberRole.isPending}
                    label='New Role'
                  />

                  <div className='p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl'>
                    <div className='flex items-start gap-2 text-xs text-blue-200'>
                      <Info className='h-4 w-4 mt-0.5 shrink-0' />
                      <div className='space-y-1.5'>
                        <p className='font-medium text-sm'>Role Permissions:</p>
                        {newRoleId === 2 ? (
                          <ul className='list-disc list-inside space-y-1 text-blue-200/80'>
                            <li>Invite new members</li>
                            <li>Remove members (except owners)</li>
                            <li>Change member roles</li>
                            <li>View all organization data</li>
                          </ul>
                        ) : (
                          <ul className='list-disc list-inside space-y-1 text-blue-200/80'>
                            <li>View organization members</li>
                            <li>Access organization resources</li>
                            <li>Basic member privileges</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </DrawerBody>

        <DrawerFooter className='px-4 pb-6'>
          <div className='flex gap-2 w-full'>
            <GlassButton
              type='button'
              onClick={handleClose}
              disabled={updateMemberRole.isPending}
              className='flex-1 h-12'
            >
              Cancel
            </GlassButton>
            <GlassButton
              type='button'
              onClick={handleUpdateRole}
              disabled={updateMemberRole.isPending}
              className='flex-1 h-12 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50'
            >
              {updateMemberRole.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Updating...
                </>
              ) : (
                <>
                  <Shield className='mr-2 h-4 w-4' />
                  Update Role
                </>
              )}
            </GlassButton>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
