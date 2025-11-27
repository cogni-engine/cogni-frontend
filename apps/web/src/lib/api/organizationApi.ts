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
  cancel_at_period_end: boolean | null;
  current_period_end: string | null;
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
  role: string; // Computed from organization_role.name, defaults to 'member'
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

  // Fetch all organization_members for the user with joined organizations
  const { data: orgMembers, error: memberError } = await supabase
    .from('organization_members')
    .select('*, organizations:organization_id(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  console.log('orgMembers with join', orgMembers);

  if (memberError) {
    console.error('Error fetching organization members:', memberError);
    return [];
  }

  if (!orgMembers || orgMembers.length === 0) {
    return [];
  }

  // Fetch all roles in parallel
  const roleIds = orgMembers
    .map(m => m.role_id)
    .filter((id): id is number => id !== null);

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

  // Create map for role lookup
  const roleMap = new Map(roles.map(role => [role.id, role]));

  // Combine the data using joined organizations
  const result: UserOrganizationsData = orgMembers
    .map(member => {
      // Access the joined organization data
      // Supabase returns it as an object (not array) for foreign key relationships
      const org = (member as any).organizations as Organization | null;

      if (!org) {
        console.warn(
          'Organization is null for member:',
          member.id,
          'organization_id:',
          member.organization_id
        );
        return null;
      }

      const role = member.role_id ? roleMap.get(member.role_id) || null : null;

      return {
        organization_member: member as OrganizationMember,
        organization: org,
        organization_role: role,
        role: role?.name?.toLowerCase() || 'member', // Default to 'member' if no role
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
