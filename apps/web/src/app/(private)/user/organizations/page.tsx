'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Loader2,
  UserPlus,
  UserMinus,
  Crown,
  Users as UsersIcon,
  Mail,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/browserClient';
import { getUserOrganizationsData } from '@/lib/api/organizationApi';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
import {
  createOrganizationInvitation,
  getOrganizationInvitations,
  cancelOrganizationInvitation,
  type OrganizationInvitation,
} from '@/lib/api/organizationInvitationsApi';

export default function OrganizationsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [organizations, setOrganizations] = React.useState<
    UserOrganizationData[]
  >([]);
  const [currentOrg, setCurrentOrg] =
    React.useState<UserOrganizationData | null>(null);
  const [showInviteDialog, setShowInviteDialog] = React.useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [memberToRemove, setMemberToRemove] = React.useState<any>(null);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [isInviting, setIsInviting] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [members, setMembers] = React.useState<any[]>([]);
  const [invitations, setInvitations] = React.useState<
    OrganizationInvitation[]
  >([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const orgs = await getUserOrganizationsData(user.id);
        setOrganizations(orgs);

        // If we don't have a current org selected, pick one
        // (Prefer one with subscription, or first one)
        if (!currentOrg && orgs.length > 0) {
          const orgWithSubscription = orgs.find(
            org => org.organization.stripe_subscription_id
          );
          const selectedOrg = orgWithSubscription || orgs[0];
          setCurrentOrg(selectedOrg);

          // Load members and invitations for the selected organization
          if (selectedOrg) {
            await loadMembers(selectedOrg.organization.id);
            await loadInvitations(selectedOrg.organization.id);
          }
        }
      }
    } catch (err) {
      console.error('Error loading organization data:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load organization data'
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentOrg]);

  const loadMembers = async (organizationId: number) => {
    try {
      // Call FastAPI backend to get members with full user data
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organizations/${organizationId}/members`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch members');
      }

      const data = await response.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error('Error loading members:', err);
      setError('Failed to load members');
    }
  };

  const loadInvitations = async (organizationId: number) => {
    try {
      setIsLoadingInvitations(true);
      const invites = await getOrganizationInvitations(organizationId);
      setInvitations(invites);
    } catch (err) {
      console.error('Error loading invitations:', err);
    } finally {
      setIsLoadingInvitations(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOrganizationChange = async (orgId: number) => {
    const selectedOrg = organizations.find(o => o.organization.id === orgId);
    if (selectedOrg) {
      setCurrentOrg(selectedOrg);
      setError(null);
      setSuccessMessage(null);

      // Load data for the newly selected organization
      await loadMembers(selectedOrg.organization.id);
      await loadInvitations(selectedOrg.organization.id);
    }
  };

  const handleInviteMember = async () => {
    if (!currentOrg || !inviteEmail.trim()) return;

    setIsInviting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const invitation = await createOrganizationInvitation(
        currentOrg.organization.id,
        inviteEmail
      );

      // Copy link to clipboard
      try {
        await navigator.clipboard.writeText(invitation.invitation_link);
        setSuccessMessage(
          `Invitation sent to ${inviteEmail}! Link copied to clipboard.`
        );
      } catch {
        setSuccessMessage(`Invitation sent to ${inviteEmail}!`);
      }

      setShowInviteDialog(false);
      setInviteEmail('');

      // Reload members and invitations
      await loadMembers(currentOrg.organization.id);
      await loadInvitations(currentOrg.organization.id);
      await loadData(); // Refresh org data to update seat count

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to invite member');
    } finally {
      setIsInviting(false);
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    if (!currentOrg) return;

    try {
      await cancelOrganizationInvitation(invitationId);
      await loadInvitations(currentOrg.organization.id);
      setSuccessMessage('Invitation cancelled successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to cancel invitation'
      );
    }
  };

  const handleRemoveMember = async () => {
    if (!currentOrg || !memberToRemove) return;

    setIsRemoving(true);
    setError(null);

    try {
      const supabase = createClient();

      // Update member status to inactive
      const { error: updateError } = await supabase
        .from('organization_members')
        .update({ status: 'inactive' })
        .eq('id', memberToRemove.id);

      if (updateError) throw updateError;

      setShowRemoveDialog(false);
      setMemberToRemove(null);

      // Reload members
      await loadMembers(currentOrg.organization.id);

      // Reload org data to update member count
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member');
    } finally {
      setIsRemoving(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-white'>Loading organization data...</div>
      </div>
    );
  }

  if (!currentOrg) {
    return (
      <div className='h-full overflow-y-auto pt-20 pb-24 px-4 md:px-6'>
        <div className='max-w-7xl mx-auto py-8'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='text-white/60 hover:text-white mb-4'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <h1 className='text-3xl font-bold text-white mb-2'>Organizations</h1>
          <p className='text-white/60'>No organizations found.</p>
        </div>
      </div>
    );
  }

  // Debug: Log role information
  console.log('🔍 Current Org Data:', {
    orgId: currentOrg.organization.id,
    orgName: currentOrg.organization.name,
    memberRoleId: currentOrg.organization_member.role_id,
    organizationRole: currentOrg.organization_role,
    computedRole: currentOrg.role,
  });

  const isOwner = currentOrg.role === 'owner';
  const isAdmin = currentOrg.role === 'admin' || isOwner;

  console.log('🔍 Permission Check:', {
    isOwner,
    isAdmin,
    role: currentOrg.role,
  });

  return (
    <div className='h-full overflow-y-auto pt-20 pb-24 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto py-8'>
        <div className='mb-6'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='text-white/60 hover:text-white mb-4'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>

          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>
                Organizations
              </h1>
              <p className='text-white/60'>
                Manage your organization members and settings
              </p>
            </div>

            {/* Organization Selector */}
            {organizations.length > 1 && (
              <div className='flex flex-col items-end gap-1'>
                <label className='text-xs text-white/60'>
                  Select Organization
                </label>
                <select
                  value={currentOrg.organization.id}
                  onChange={e =>
                    handleOrganizationChange(Number(e.target.value))
                  }
                  className='px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer'
                >
                  {organizations.map(org => (
                    <option
                      key={org.organization.id}
                      value={org.organization.id}
                      className='bg-gray-900'
                    >
                      {org.organization.name}
                      {org.organization.stripe_subscription_id && ' ⭐'}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Organization Info Card */}
        <div className='mt-8 p-6 bg-white/5 rounded-lg border border-white/10'>
          <div className='flex items-start justify-between mb-6'>
            <div>
              <h2 className='text-2xl font-semibold text-white mb-2'>
                {currentOrg.organization.name}
              </h2>
              <div className='flex items-center gap-4 text-sm text-white/60'>
                <span className='flex items-center gap-1'>
                  <UsersIcon className='h-4 w-4' />
                  {currentOrg.organization.active_member_count} members
                </span>
                {currentOrg.organization.seat_count > 0 && (
                  <span>• {currentOrg.organization.seat_count} seats</span>
                )}
              </div>
            </div>

            {isAdmin && (
              <Button
                onClick={() => setShowInviteDialog(true)}
                className='bg-purple-500 hover:bg-purple-600'
              >
                <UserPlus className='mr-2 h-4 w-4' />
                Invite Member
              </Button>
            )}
          </div>

          {/* Your Role Badge */}
          <div className='inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm text-blue-300'>
            {isOwner ? (
              <>
                <Crown className='h-4 w-4' />
                Owner
              </>
            ) : (
              <>
                <UsersIcon className='h-4 w-4' />
                {currentOrg.role.charAt(0).toUpperCase() +
                  currentOrg.role.slice(1)}
              </>
            )}
          </div>
        </div>

        {/* Members List */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-white mb-4'>Members</h3>

          <div className='space-y-2'>
            {members.length === 0 ? (
              <p className='text-white/40 text-center py-8'>No members found</p>
            ) : (
              members.map((member: any) => {
                const isCurrentUser =
                  member.user_id === currentOrg.organization_member.user_id;
                const memberIsOwner =
                  member.role_name?.toLowerCase() === 'owner';

                return (
                  <div
                    key={member.id}
                    className='p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between'
                  >
                    <div className='flex items-center gap-3'>
                      {/* Avatar */}
                      <div className='h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-medium'>
                        {member.name?.charAt(0).toUpperCase() ||
                          member.email?.charAt(0).toUpperCase() ||
                          '?'}
                      </div>

                      {/* User Info */}
                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='text-white font-medium'>
                            {member.name || member.email || 'Unknown'}
                          </p>
                          {isCurrentUser && (
                            <span className='text-xs text-white/40'>(You)</span>
                          )}
                          {memberIsOwner && (
                            <Crown className='h-3 w-3 text-yellow-400' />
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

                      {isAdmin && !isCurrentUser && !memberIsOwner && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setMemberToRemove(member);
                            setShowRemoveDialog(true);
                          }}
                          className='bg-red-500/10 border-red-500/50 text-red-300 hover:bg-red-500/20'
                        >
                          <UserMinus className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pending Invitations */}
        {isAdmin && (
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-white mb-4'>
              Pending Invitations
            </h3>

            {isLoadingInvitations ? (
              <div className='flex justify-center py-8'>
                <Loader2 className='h-6 w-6 text-white/40 animate-spin' />
              </div>
            ) : invitations.filter(inv => inv.status === 'pending').length ===
              0 ? (
              <p className='text-white/40 text-center py-8'>
                No pending invitations
              </p>
            ) : (
              <div className='space-y-2'>
                {invitations
                  .filter(inv => inv.status === 'pending')
                  .map(invitation => (
                    <div
                      key={invitation.id}
                      className='p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between'
                    >
                      <div>
                        <p className='text-white font-medium'>
                          {invitation.invitee_email}
                        </p>
                        <p className='text-sm text-white/60'>
                          Invited{' '}
                          {new Date(invitation.created_at).toLocaleDateString()}
                          {' • Expires '}
                          {new Date(invitation.expires_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            navigator.clipboard.writeText(
                              invitation.invitation_link
                            );
                            setSuccessMessage(
                              'Invitation link copied to clipboard!'
                            );
                            setTimeout(() => setSuccessMessage(null), 3000);
                          }}
                          className='bg-blue-500/10 border-blue-500/50 text-blue-300 hover:bg-blue-500/20'
                        >
                          Copy Link
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleCancelInvitation(invitation.id)}
                          className='bg-red-500/10 border-red-500/50 text-red-300 hover:bg-red-500/20'
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className='mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg'>
            <p className='text-green-300 text-sm'>{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className='mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg'>
            <p className='text-red-300 text-sm'>{error}</p>
          </div>
        )}
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className='bg-gray-900 border-white/10 text-white'>
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription className='text-white/60'>
              Invite a new member to your organization by email.
            </DialogDescription>
          </DialogHeader>

          <div className='py-4'>
            <label className='text-sm font-medium text-white mb-2 block'>
              Email address
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40' />
              <input
                type='email'
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder='member@example.com'
                className='w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500'
                disabled={isInviting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setShowInviteDialog(false);
                setInviteEmail('');
                setError(null);
              }}
              disabled={isInviting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInviteMember}
              disabled={isInviting || !inviteEmail.trim()}
              className='bg-purple-500 hover:bg-purple-600'
            >
              {isInviting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Inviting...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-4 w-4' />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className='bg-gray-900 border-white/10 text-white'>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription className='text-white/60'>
              Are you sure you want to remove this member from the organization?
              They will lose access to all organization resources.
            </DialogDescription>
          </DialogHeader>

          {memberToRemove && (
            <div className='py-4 px-4 bg-white/5 rounded-lg border border-white/10'>
              <p className='text-white font-medium'>
                {(memberToRemove as any).name ||
                  (memberToRemove as any).email ||
                  'Unknown'}
              </p>
              <p className='text-sm text-white/60'>
                {(memberToRemove as any).email}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setShowRemoveDialog(false);
                setMemberToRemove(null);
                setError(null);
              }}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleRemoveMember}
              disabled={isRemoving}
            >
              {isRemoving ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Removing...
                </>
              ) : (
                <>
                  <UserMinus className='mr-2 h-4 w-4' />
                  Remove Member
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
