import { createClient } from '@/lib/supabase/browserClient';
import type {
  WorkspaceInvitation,
  WorkspaceInviteLink,
} from '@/types/workspace';

const supabase = createClient();

export async function createInvitation(
  workspaceId: number,
  inviteeEmail: string,
  inviteeId?: string
): Promise<WorkspaceInvitation> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Generate a unique token for the invitation
  const token = crypto.randomUUID();

  // Set expiration to 7 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { data, error } = await supabase
    .from('workspace_invitations')
    .insert({
      workspace_id: workspaceId,
      inviter_id: user.id,
      invitee_email: inviteeEmail,
      invitee_id: inviteeId || null,
      token,
      expires_at: expiresAt.toISOString(),
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createInviteLink(
  workspaceId: number
): Promise<WorkspaceInviteLink> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Generate a unique token for the invite link
  const token = crypto.randomUUID();

  // Set expiration to 30 days from now (longer for invite links)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const { data, error } = await supabase
    .from('workspace_invite_links')
    .insert({
      workspace_id: workspaceId.toString(),
      inviter_id: user.id,
      token,
      max_uses: 400,
      used_count: 0,
      expires_at: expiresAt.toISOString(),
      status: 'active',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWorkspaceInvitations(
  workspaceId: number
): Promise<WorkspaceInvitation[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify user has permission to view invitations for this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single();

  if (memberError || !memberData) {
    throw new Error('Access denied or workspace not found');
  }

  const { data, error } = await supabase
    .from('workspace_invitations')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getWorkspaceInviteLinks(
  workspaceId: number
): Promise<WorkspaceInviteLink[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify user has permission to view invite links for this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single();

  if (memberError || !memberData) {
    throw new Error('Access denied or workspace not found');
  }

  const { data, error } = await supabase
    .from('workspace_invite_links')
    .select('*')
    .eq('workspace_id', workspaceId.toString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function acceptInvitation(token: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // First try to find in workspace_invitations (email invitations)
  const { data: invitation, error: invitationError } = await supabase
    .from('workspace_invitations')
    .select('*')
    .eq('token', token)
    .eq('status', 'pending')
    .single();

  if (!invitationError && invitation) {
    // Handle email invitation
    const now = new Date();
    const expiresAt = new Date(invitation.expires_at);
    if (now > expiresAt) {
      throw new Error('Invitation has expired');
    }

    // Update invitation status
    const { error: updateError } = await supabase
      .from('workspace_invitations')
      .update({
        status: 'accepted',
        accepted_at: now.toISOString(),
        invitee_id: user.id,
      })
      .eq('id', invitation.id);

    if (updateError) throw updateError;

    // Add user to workspace as member
    const { error: memberError } = await supabase
      .from('workspace_member')
      .insert({
        workspace_id: invitation.workspace_id,
        user_id: user.id,
        role: 'member',
      });

    if (memberError) throw memberError;
    return;
  }

  // If not found in invitations, try workspace_invite_links
  const { data: inviteLink, error: linkError } = await supabase
    .from('workspace_invite_links')
    .select('*')
    .eq('token', token)
    .eq('status', 'active')
    .single();

  if (linkError || !inviteLink) {
    throw new Error('Invalid or expired invitation');
  }

  // Check if invite link is expired
  if (inviteLink.expires_at) {
    const now = new Date();
    const expiresAt = new Date(inviteLink.expires_at);
    if (now > expiresAt) {
      throw new Error('Invitation link has expired');
    }
  }

  // Check if max uses reached
  if (inviteLink.used_count >= inviteLink.max_uses) {
    throw new Error('Invitation link has reached maximum uses');
  }

  // Increment used count
  const { error: updateError } = await supabase
    .from('workspace_invite_links')
    .update({
      used_count: inviteLink.used_count + 1,
    })
    .eq('id', inviteLink.id);

  if (updateError) throw updateError;

  // Add user to workspace as member
  const { error: memberError } = await supabase
    .from('workspace_member')
    .insert({
      workspace_id: parseInt(inviteLink.workspace_id),
      user_id: user.id,
      role: 'member',
    });

  if (memberError) throw memberError;
}

export async function cancelInvitation(invitationId: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // First, fetch the invitation to get the workspace_id
  const { data: invitation, error: fetchError } = await supabase
    .from('workspace_invitations')
    .select('workspace_id')
    .eq('id', invitationId)
    .single();

  if (fetchError || !invitation) {
    throw new Error('Invitation not found');
  }

  // Verify user is a member of this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('role')
    .eq('workspace_id', invitation.workspace_id)
    .eq('user_id', user.id)
    .single();

  if (memberError || !memberData) {
    throw new Error('Access denied or workspace not found');
  }

  // Cancel the invitation
  const { error } = await supabase
    .from('workspace_invitations')
    .update({ status: 'cancelled' })
    .eq('id', invitationId);

  if (error) throw error;
}

export async function disableInviteLink(inviteLinkId: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // First, fetch the invite link to get the workspace_id
  const { data: inviteLink, error: fetchError } = await supabase
    .from('workspace_invite_links')
    .select('workspace_id')
    .eq('id', inviteLinkId)
    .single();

  if (fetchError || !inviteLink) {
    throw new Error('Invite link not found');
  }

  // Verify user is a member of this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('role')
    .eq('workspace_id', parseInt(inviteLink.workspace_id))
    .eq('user_id', user.id)
    .single();

  if (memberError || !memberData) {
    throw new Error('Access denied or workspace not found');
  }

  // Disable the invite link
  const { error } = await supabase
    .from('workspace_invite_links')
    .update({ status: 'disabled' })
    .eq('id', inviteLinkId);

  if (error) throw error;
}

export async function getInvitationByToken(
  token: string
): Promise<WorkspaceInvitation | WorkspaceInviteLink | null> {
  // First try to find in workspace_invitations (email invitations)
  const { data: invitation, error: invitationError } = await supabase
    .from('workspace_invitations')
    .select('*')
    .eq('token', token)
    .eq('status', 'pending')
    .single();

  // If found an email invitation, check if expired
  if (!invitationError && invitation) {
    // Check if invitation is expired
    const now = new Date();
    const expiresAt = new Date(invitation.expires_at);
    if (now > expiresAt) {
      // Mark as expired
      await supabase
        .from('workspace_invitations')
        .update({ status: 'expired' })
        .eq('id', invitation.id);

      return null;
    }

    return invitation;
  }

  // If PGRST116 error (not found), continue to check invite links
  // Otherwise, if it's a different error, throw it
  if (invitationError && invitationError.code !== 'PGRST116') {
    throw invitationError;
  }

  // If not found in invitations, try workspace_invite_links
  const { data: inviteLink, error: linkError } = await supabase
    .from('workspace_invite_links')
    .select('*')
    .eq('token', token)
    .eq('status', 'active')
    .single();

  if (linkError) {
    if (linkError.code === 'PGRST116') {
      return null; // No invitation found
    }
    throw linkError;
  }

  if (!inviteLink) {
    return null;
  }

  // Check if invite link is expired
  if (inviteLink.expires_at) {
    const now = new Date();
    const expiresAt = new Date(inviteLink.expires_at);
    if (now > expiresAt) {
      // Mark as expired
      await supabase
        .from('workspace_invite_links')
        .update({ status: 'expired' })
        .eq('id', inviteLink.id);

      return null;
    }
  }

  return inviteLink;
}

export function generateInvitationLink(token: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/invite/${token}`;
}
