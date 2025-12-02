import { createClient } from '@/lib/supabase/browserClient';

export type OrganizationMember = {
  id: number;
  user_id: string;
  organization_id: number;
  status: string;
  role_id: number | null;
  created_at: string;
};

export type Organization = {
  id: number;
  name: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_subscription_item_id: string | null;
  seat_count: number;
  active_member_count: number;
  created_at: string;
};

export type OrganizationMemberRole = {
  id: number;
  name: string;
  created_at: string;
};

export type UserOrganizationData = {
  organization_member: OrganizationMember;
  organization: Organization;
  organization_role: OrganizationMemberRole | null;
};

export type UserOrganizationsData = UserOrganizationData[];

/**
 * Fetch all organization data for the current user (client-side)
 * A user can be part of multiple organizations, so this returns an array
 */
export async function getUserOrganizationsData(
  userId: string
): Promise<UserOrganizationsData> {
  const supabase = createClient();

  // Fetch all organization_members for the user
  const { data: orgMembers, error: memberError } = await supabase
    .from('organization_members')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (memberError) {
    console.error('Error fetching organization members:', memberError);
    return [];
  }

  if (!orgMembers || orgMembers.length === 0) {
    return [];
  }

  // Fetch all organizations and roles in parallel
  const organizationIds = orgMembers.map(m => m.organization_id);
  const roleIds = orgMembers
    .map(m => m.role_id)
    .filter((id): id is number => id !== null);

  // Fetch all organizations
  const { data: organizations, error: orgError } = await supabase
    .from('organizations')
    .select('*')
    .in('id', organizationIds);

  if (orgError) {
    console.error('Error fetching organizations:', orgError);
    return [];
  }

  // Fetch all roles if any exist
  let roles: OrganizationMemberRole[] = [];
  if (roleIds.length > 0) {
    const { data: rolesData, error: rolesError } = await supabase
      .from('organization_member_roles')
      .select('*')
      .in('id', roleIds);

    if (rolesError) {
      console.error('Error fetching organization roles:', rolesError);
    } else {
      roles = (rolesData || []) as OrganizationMemberRole[];
    }
  }

  // Create maps for quick lookup
  const orgMap = new Map(
    (organizations || []).map(org => [org.id, org as Organization])
  );
  const roleMap = new Map(roles.map(role => [role.id, role]));

  // Combine the data
  const result: UserOrganizationsData = orgMembers
    .map(member => {
      const org = orgMap.get(member.organization_id);
      if (!org) return null;

      const role = member.role_id ? roleMap.get(member.role_id) || null : null;

      return {
        organization_member: member as OrganizationMember,
        organization: org,
        organization_role: role,
      };
    })
    .filter((item): item is UserOrganizationData => item !== null);

  return result;
}

/**
 * Get the primary organization (first/most recent) for a user (client-side)
 */
export async function getPrimaryUserOrganizationData(
  userId: string
): Promise<UserOrganizationData | null> {
  const allOrgs = await getUserOrganizationsData(userId);
  return allOrgs.length > 0 ? allOrgs[0] : null;
}
