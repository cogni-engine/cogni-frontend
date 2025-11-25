import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import {
  getUserOrganizationsDataServer,
  type Organization,
} from '@/lib/api/organizationApiServer';

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

// Map plan IDs to Stripe Price IDs (set these in your environment variables)
const PLAN_PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_ID_PRO || '',
  business: process.env.STRIPE_PRICE_ID_BUSINESS || '',
};

async function getOrCreateStripeCustomer(
  organization: Organization,
  userEmail: string
): Promise<string> {
  // If organization already has a Stripe customer ID, return it
  if (organization.stripe_customer_id) {
    return organization.stripe_customer_id;
  }

  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email: userEmail,
    metadata: {
      organization_id: organization.id.toString(),
    },
  });

  // Update organization with the new Stripe customer ID using service role key
  const serviceClient = createServiceClient();
  const { error } = await serviceClient
    .from('organizations')
    .update({ stripe_customer_id: customer.id })
    .eq('id', organization.id);

  if (error) {
    console.error('Error updating organization with Stripe customer ID:', error);
    throw new Error('Failed to save Stripe customer ID');
  }

  return customer.id;
}

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

    if (!body.planId) {
      return NextResponse.json(
        { error: 'planId is required' },
        { status: 400 }
      );
    }

    const planId = body.planId as string;
    const priceId = PLAN_PRICE_IDS[planId];

    if (!priceId) {
      return NextResponse.json(
        { error: `Invalid planId: ${planId}` },
        { status: 400 }
      );
    }

    // Always create a new organization using RPC
    // Note: RPC function uses auth.uid() to identify the invoker, so we use authenticated client
    // Business plan allows multiple organizations, Pro plan allows only 1 (checked above)
    // Create organization using RPC function with authenticated client
    // The function returns: { id, name, seat_count, active_member_count, created_at, members }
    
    // Debug: Log user info and parameters
    console.log('DEBUG: Creating organization with params:', {
      user_id: user.id,
      user_email: user.email,
      p_name: `${user.email}'s Organization`,
    });
    
    // ERROR DEBUGGING:
    // If you see "invalid input syntax for type uuid: '9'" error, the database function
    // is likely trying to use role_id (a number) where a UUID is expected.
    // Common causes in the database function:
    // 1. Inserting role_id into a UUID column (should be user_id)
    // 2. JOIN condition mixing role_id (number) with UUID column
    // 3. Using role_id where user_id is expected
    // To debug: Check the function definition in Supabase Dashboard → Database → Functions
    // Look for places where role_id or numeric IDs are used with UUID columns
    
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      'create_organization_with_invoker_as_owner',
      {
        p_name: `${user.email}'s Organization`,
      }
    );

    // Debug: Log full error details
    if (rpcError) {
      console.error('Error creating organization via RPC:', {
        message: rpcError.message,
        code: rpcError.code,
        details: rpcError.details,
        hint: rpcError.hint,
        fullError: JSON.stringify(rpcError, null, 2),
      });
    }

    // Debug: Log RPC result
    if (rpcResult) {
      console.log('DEBUG: RPC result:', {
        isArray: Array.isArray(rpcResult),
        length: Array.isArray(rpcResult) ? rpcResult.length : 'N/A',
        result: JSON.stringify(rpcResult, null, 2),
      });
    }

    if (rpcError || !rpcResult || (Array.isArray(rpcResult) && rpcResult.length === 0)) {
      return NextResponse.json(
        { 
          error: 'Failed to create organization',
          details: rpcError ? {
            message: rpcError.message,
            code: rpcError.code,
            details: rpcError.details,
            hint: rpcError.hint,
          } : 'No result returned',
        },
        { status: 500 }
      );
    }

    // RPC function returns an array with one row containing organization and members data
    const orgResult = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;

    // Extract organization data
    const newOrg: Organization = {
      id: orgResult.id,
      name: orgResult.name,
      seat_count: orgResult.seat_count,
      active_member_count: orgResult.active_member_count,
      created_at: orgResult.created_at,
      stripe_customer_id: '', // Will be set when Stripe customer is created
      stripe_subscription_id: null,
      stripe_subscription_item_id: null,
    };

    // Extract organization member data from the members JSONB array
    // Find the member that matches the current user
    const members = orgResult.members || [];
    const orgMember = Array.isArray(members)
      ? members.find((m: any) => m.user_id === user.id)
      : null;

    if (!orgMember) {
      console.error('Organization member not found in RPC result');
      return NextResponse.json(
        { error: 'Failed to find organization member' },
        { status: 500 }
      );
    }

    const orgData = {
      organization_member: {
        id: orgMember.id,
        user_id: orgMember.user_id,
        organization_id: newOrg.id,
        status: orgMember.status,
        role_id: orgMember.role_id,
        created_at: orgMember.created_at,
      },
      organization: newOrg,
      organization_role: orgMember.role_name
        ? {
            id: orgMember.role_id,
            name: orgMember.role_name,
            created_at: new Date().toISOString(), // RPC doesn't return role created_at, use current time
          }
        : null,
    };

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      orgData.organization,
      user.email || ''
    );

    // Create Checkout Session with embedded UI mode
    // Note: When redirect_on_completion is 'never', return_url should not be provided
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      redirect_on_completion: 'never', // Use onComplete callback instead of redirect
      metadata: {
        organization_id: orgData.organization.id.toString(),
        plan_id: planId,
        user_id: user.id,
      },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
      organizationId: orgData.organization.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
