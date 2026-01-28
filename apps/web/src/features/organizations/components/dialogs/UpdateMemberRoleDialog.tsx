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
                <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                  <p className='text-white font-medium'>
                    {getMemberDisplayName(member)}
                  </p>
                  <p className='text-sm text-white/60'>{member.email}</p>
                  <p className='text-xs text-white/40 mt-2'>
                    Current role:{' '}
                    <span className='capitalize'>
                      {member.role_name || 'Member'}
                    </span>
                  </p>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='new-role'
                    className='text-sm font-medium text-white/80'
                  >
                    New Role
                  </label>
                  <select
                    id='new-role'
                    value={newRoleId}
                    onChange={e => setNewRoleId(Number(e.target.value))}
                    className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 transition-all'
                    disabled={updateMemberRole.isPending}
                    autoFocus
                  >
                    <option value={3} className='bg-gray-900'>
                      Member - Basic access
                    </option>
                    <option value={2} className='bg-gray-900'>
                      Admin - Can manage members and invitations
                    </option>
                  </select>

                  <div className='mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl'>
                    <div className='flex items-start gap-2 text-xs text-blue-200'>
                      <Info className='h-4 w-4 mt-0.5 shrink-0' />
                      <div className='space-y-1'>
                        <p className='font-medium'>Role Permissions:</p>
                        {newRoleId === 2 ? (
                          <ul className='list-disc list-inside space-y-0.5 text-blue-200/80'>
                            <li>Invite new members</li>
                            <li>Remove members (except owners)</li>
                            <li>Change member roles</li>
                            <li>View all organization data</li>
                          </ul>
                        ) : (
                          <ul className='list-disc list-inside space-y-0.5 text-blue-200/80'>
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
