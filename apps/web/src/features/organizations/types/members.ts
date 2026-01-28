export interface Member {
  id: number;
  user_id: string;
  name: string | null;
  email: string;
  role_id: number;
  role_name: string;
}

export interface MemberWithActions extends Member {
  canEdit: boolean;
  canRemove: boolean;
}

export interface OrganizationPermissions {
  isOwner: boolean;
  isAdmin: boolean;
  canInvite: boolean;
  availableSeats: number;
  usedSeats: number;
  pendingInvitationsCount: number;
}

export interface SeatUsage {
  activeMemberCount: number;
  pendingInvitationsCount: number;
  usedSeats: number;
  totalSeats: number;
  availableSeats: number;
}
