'use client';

import * as React from 'react';
import { createClient } from '@/lib/supabase/browserClient';
import { getUserOrganizationsData } from '@/lib/api/organizationApi';
import type { UserOrganizationData } from '@/lib/api/organizationApi';
import type { OrganizationInvitation } from '@/lib/api/organizationInvitationsApi';

// Feature imports
import { OrganizationSelector } from '@/features/organizations/components/OrganizationSelector';
import { MembersList } from '@/features/organizations/components/members/MembersList';
import { PendingInvitationsList } from '@/features/organizations/components/members/PendingInvitationsList';
import { InviteMemberDialog } from '@/features/organizations/components/dialogs/InviteMemberDialog';
import { RemoveMemberDialog } from '@/features/organizations/components/dialogs/RemoveMemberDialog';
import { UpdateMemberRoleDialog } from '@/features/organizations/components/dialogs/UpdateMemberRoleDialog';
import { useOrganizationMembers } from '@/features/organizations/hooks/useOrganizationMembers';
import { useOrganizationInvitations } from '@/features/organizations/hooks/useOrganizationInvitations';
import { useOrganizationPermissions } from '@/features/organizations/hooks/useOrganizationPermissions';
import { useCancelInvitation } from '@/features/organizations/hooks/useOrganizationInvitations';
import type { Member } from '@/features/organizations/types/members';

export default function OrganizationsPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [organizations, setOrganizations] = React.useState<
    UserOrganizationData[]
  >([]);
  const [currentOrg, setCurrentOrg] =
    React.useState<UserOrganizationData | null>(null);

  // Dialog state
  const [showInviteDialog, setShowInviteDialog] = React.useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [showUpdateRoleDialog, setShowUpdateRoleDialog] = React.useState(false);
  const [memberToRemove, setMemberToRemove] = React.useState<Member | null>(
    null
  );
  const [memberToUpdateRole, setMemberToUpdateRole] =
    React.useState<Member | null>(null);

  // Messages
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  // Data hooks
  const { data: members = [] } = useOrganizationMembers(
    currentOrg?.organization.id
  );

  const { data: invitations = [], isLoading: isLoadingInvitations } =
    useOrganizationInvitations(currentOrg?.organization.id);

  const permissions = useOrganizationPermissions(currentOrg, invitations);
  const cancelInvitation = useCancelInvitation();

  // Load organizations data
  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const allOrgs = await getUserOrganizationsData(user.id);
        // Filter to only show Business organizations
        const businessOrgs = allOrgs.filter(
          org => org.organization.plan_type === 'business'
        );
        setOrganizations(businessOrgs);

        // Check if current org is still valid (must be a business org)
        const isCurrentOrgValid =
          currentOrg &&
          businessOrgs.some(
            org => org.organization.id === currentOrg.organization.id
          );

        // If current org is not valid or not set, pick one
        if (!isCurrentOrgValid) {
          if (businessOrgs.length > 0) {
            const orgWithSubscription = businessOrgs.find(
              org => org.organization.stripe_subscription_id
            );
            const selectedOrg = orgWithSubscription || businessOrgs[0];
            setCurrentOrg(selectedOrg);
          } else {
            // No business organizations available
            setCurrentOrg(null);
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

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOrganizationChange = async (orgId: number) => {
    const selectedOrg = organizations.find(o => o.organization.id === orgId);
    if (selectedOrg) {
      setCurrentOrg(selectedOrg);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleInviteSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
    // Reload org data to update seat count
    loadData();
  };

  const handleRemoveSuccess = () => {
    setSuccessMessage('Member removed successfully');
    setTimeout(() => setSuccessMessage(null), 3000);
    // Reload org data to update member count
    loadData();
  };

  const handleUpdateRoleSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleCopyInvitationLink = async (
    invitation: OrganizationInvitation
  ) => {
    try {
      await navigator.clipboard.writeText(invitation.invitation_link);
      setSuccessMessage('Invitation link copied to clipboard!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      setError('Failed to copy link to clipboard');
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    if (!currentOrg) return;

    try {
      await cancelInvitation.mutateAsync({
        invitationId,
        organizationId: currentOrg.organization.id,
      });
      setSuccessMessage('Invitation cancelled successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to cancel invitation'
      );
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
          <h1 className='text-3xl font-bold text-white mb-2'>Organizations</h1>
          <p className='text-white/60'>No organizations found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto px-4 md:px-6'>
      <div className='max-w-7xl mx-auto py-16'>
        <div className='mb-6 flex items-center justify-between relative z-101'>
          {/* Organization Selector */}
          <OrganizationSelector
            organizations={organizations}
            currentOrg={currentOrg}
            onOrganizationChange={handleOrganizationChange}
          />
        </div>

        {/* Members List */}
        <MembersList
          members={members}
          currentUserId={currentOrg.organization_member.user_id}
          permissions={permissions}
          onInvite={() => setShowInviteDialog(true)}
          onUpdateRole={member => {
            setMemberToUpdateRole(member);
            setShowUpdateRoleDialog(true);
          }}
          onRemove={member => {
            setMemberToRemove(member);
            setShowRemoveDialog(true);
          }}
          activeMemberCount={currentOrg.organization.active_member_count}
          totalSeats={currentOrg.organization.seat_count}
        />

        {/* Pending Invitations */}
        {permissions.isAdmin && (
          <PendingInvitationsList
            invitations={invitations}
            isLoading={isLoadingInvitations}
            onCopyLink={handleCopyInvitationLink}
            onCancel={handleCancelInvitation}
          />
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

      {/* Dialogs */}
      <InviteMemberDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        organizationId={currentOrg.organization.id}
        availableSeats={permissions.availableSeats}
        onSuccess={handleInviteSuccess}
      />

      <RemoveMemberDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        member={memberToRemove}
        organizationId={currentOrg.organization.id}
        onSuccess={handleRemoveSuccess}
      />

      <UpdateMemberRoleDialog
        open={showUpdateRoleDialog}
        onOpenChange={setShowUpdateRoleDialog}
        member={memberToUpdateRole}
        organizationId={currentOrg.organization.id}
        onSuccess={handleUpdateRoleSuccess}
      />
    </div>
  );
}
