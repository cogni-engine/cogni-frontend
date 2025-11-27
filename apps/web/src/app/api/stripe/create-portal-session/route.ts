import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { getUserOrganizationsDataServer } from '@/lib/api/organizationApiServer';

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

    // Find the organization
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
        {
          error:
            'Only organization owners/admins can access the customer portal',
        },
        { status: 403 }
      );
    }

    // Check if organization has a Stripe customer ID
    if (!targetOrg.organization.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer found for this organization' },
        { status: 400 }
      );
    }

    // Get the origin for the return URL
    const origin = req.headers.get('origin') || req.nextUrl.origin;
    const returnUrl = `${origin}/user/subscription`;

    // Create Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: targetOrg.organization.stripe_customer_id,
      return_url: returnUrl,
    });

    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
