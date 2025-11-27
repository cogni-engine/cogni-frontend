import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getUserOrganizationsDataServer } from '@/lib/api/organizationApiServer';

// Create Supabase client with service role key for database operations
function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () =>
            req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
          setAll: () => {},
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const organizationId = body.organizationId as number | undefined;

    // Get user's organizations
    const userOrgs = await getUserOrganizationsDataServer(supabase, user.id);

    if (!userOrgs || userOrgs.length === 0) {
      return NextResponse.json(
        { error: 'No organizations found' },
        { status: 404 }
      );
    }

    // Find the organization to cancel subscription for
    let targetOrg = userOrgs[0]; // Default to first org
    if (organizationId) {
      const found = userOrgs.find(
        org => org.organization.id === organizationId
      );
      if (!found) {
        return NextResponse.json(
          { error: 'Organization not found or access denied' },
          { status: 404 }
        );
      }
      targetOrg = found;
    }

    // Check if user is owner/admin of the organization
    // Also allow if user is the only member (de facto owner)
    const roleName = targetOrg.organization_role?.name?.toLowerCase();
    const isOwner = roleName === 'owner' || roleName === 'admin';
    const isOnlyMember = targetOrg.organization.active_member_count === 1;

    if (!isOwner && !isOnlyMember) {
      return NextResponse.json(
        { error: 'Only organization owners/admins can cancel subscriptions' },
        { status: 403 }
      );
    }

    // Check if organization has an active subscription
    if (!targetOrg.organization.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found for this organization' },
        { status: 400 }
      );
    }

    // Cancel the subscription in Stripe
    // Using cancel_at_period_end to allow access until the end of the billing period
    const subscription = await stripe.subscriptions.update(
      targetOrg.organization.stripe_subscription_id,
      {
        cancel_at_period_end: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period',
      subscription: {
        id: subscription.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: subscription.current_period_end,
      },
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
