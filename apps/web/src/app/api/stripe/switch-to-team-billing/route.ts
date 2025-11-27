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

// Map plan IDs to Stripe Price IDs
const PLAN_PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_ID_PRO || '',
  business: process.env.STRIPE_PRICE_ID_BUSINESS || '',
};

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

    // Find the organization to switch
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
        { error: 'Only organization owners/admins can switch billing plans' },
        { status: 403 }
      );
    }

    // Cancel existing subscription if it exists
    if (targetOrg.organization.stripe_subscription_id) {
      try {
        await stripe.subscriptions.update(
          targetOrg.organization.stripe_subscription_id,
          {
            cancel_at_period_end: true,
          }
        );
      } catch (error) {
        console.error('Error canceling existing subscription:', error);
        // Continue anyway - we'll create the new subscription
      }
    }

    // Create a new organization with business plan
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      'create_organization_with_invoker_as_owner',
      {
        p_name: `${user.email}'s Team`,
      }
    );

    if (
      rpcError ||
      !rpcResult ||
      (Array.isArray(rpcResult) && rpcResult.length === 0)
    ) {
      return NextResponse.json(
        {
          error: 'Failed to create organization',
          details: rpcError
            ? {
                message: rpcError.message,
                code: rpcError.code,
              }
            : 'No result returned',
        },
        { status: 500 }
      );
    }

    // Extract organization data
    const orgResult = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;
    const newOrg = {
      id: orgResult.id,
      name: orgResult.name,
      seat_count: orgResult.seat_count,
      active_member_count: orgResult.active_member_count,
      created_at: orgResult.created_at,
      stripe_customer_id: '',
      stripe_subscription_id: null,
      stripe_subscription_item_id: null,
    };

    // Get or create Stripe customer for the new organization
    let customerId = newOrg.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || '',
        metadata: {
          organization_id: newOrg.id.toString(),
        },
      });
      customerId = customer.id;

      // Update organization with Stripe customer ID
      const serviceClient = createServiceClient();
      await serviceClient
        .from('organizations')
        .update({ stripe_customer_id: customerId })
        .eq('id', newOrg.id);
    }

    // Get business plan price ID
    const businessPriceId = PLAN_PRICE_IDS.business;
    if (!businessPriceId) {
      return NextResponse.json(
        { error: 'Business plan price ID not configured' },
        { status: 500 }
      );
    }

    // Create Checkout Session for business plan
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      ui_mode: 'embedded',
      line_items: [
        {
          price: businessPriceId,
          quantity: 1,
        },
      ],
      redirect_on_completion: 'never',
      metadata: {
        organization_id: newOrg.id.toString(),
        plan_id: 'business',
        user_id: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        'New team organization created. Please complete checkout to activate team billing.',
      clientSecret: session.client_secret,
      sessionId: session.id,
      organizationId: newOrg.id,
    });
  } catch (error) {
    console.error('Error switching to team billing:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
