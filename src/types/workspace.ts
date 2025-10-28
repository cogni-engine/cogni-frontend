export interface Workspace {
  id: number;
  created_at: string;
  title: string | null;
  type: 'group' | 'personal';
  notes?: Note[];
  members?: WorkspaceMember[];
}

export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  workspace_id: number;
}

export interface WorkspaceMember {
  id: number;
  created_at: string;
  user_id: string;
  workspace_id: number;
  role: 'owner' | 'admin' | 'member';
  user_profile?: {
    id: string;
    user_name: string | null;
  };
}

export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled';
export type InviteLinkStatus = 'active' | 'disabled' | 'expired';

export interface WorkspaceInvitation {
  id: string;
  workspace_id: number;
  inviter_id: string;
  invitee_email: string;
  invitee_id: string | null;
  status: InvitationStatus;
  token: string;
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
}

export interface WorkspaceInviteLink {
  id: string;
  workspace_id: string;
  inviter_id: string | null;
  token: string;
  max_uses: number;
  used_count: number;
  expires_at: string | null;
  status: InviteLinkStatus;
  created_at: string;
}
