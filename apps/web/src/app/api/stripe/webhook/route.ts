import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(supabase, session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(supabase, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(supabase, invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(supabase, invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(
  supabase: ReturnType<typeof createServiceClient>,
  session: Stripe.Checkout.Session
) {
  const organizationId = session.metadata?.organization_id;
  if (!organizationId) {
    console.error('No organization_id in session metadata');
    return;
  }

  // Retrieve the subscription from the session
  if (session.subscription && typeof session.subscription === 'string') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription,
      {
        expand: ['items.data.price.product'],
      }
    );

    await updateOrganizationSubscription(
      supabase,
      parseInt(organizationId),
      subscription
    );
  }
}

async function handleSubscriptionUpdate(
  supabase: ReturnType<typeof createServiceClient>,
  subscription: Stripe.Subscription
) {
  // Get organization ID from customer metadata or subscription metadata
  const customerId = subscription.customer as string;
  const customer = await stripe.customers.retrieve(customerId);

  if (typeof customer === 'string' || customer.deleted) {
    console.error('Invalid customer');
    return;
  }

  const organizationId = customer.metadata?.organization_id;
  if (!organizationId) {
    console.error('No organization_id in customer metadata');
    return;
  }

  await updateOrganizationSubscription(
    supabase,
    parseInt(organizationId),
    subscription
  );
}

async function handleSubscriptionDeleted(
  supabase: ReturnType<typeof createServiceClient>,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;
  const customer = await stripe.customers.retrieve(customerId);

  if (typeof customer === 'string' || customer.deleted) {
    console.error('Invalid customer');
    return;
  }

  const organizationId = customer.metadata?.organization_id;
  if (!organizationId) {
    console.error('No organization_id in customer metadata');
    return;
  }

  // Clear subscription info
  const { error } = await supabase
    .from('organizations')
    .update({
      stripe_subscription_id: null,
      stripe_subscription_item_id: null,
    })
    .eq('id', parseInt(organizationId));

  if (error) {
    console.error('Error clearing subscription:', error);
  }

  // Note: You may want to update the user's subscription plan in JWT here
  // This would require calling your backend API to refresh the JWT
}

async function handleInvoicePaymentSucceeded(
  supabase: ReturnType<typeof createServiceClient>,
  invoice: Stripe.Invoice
) {
  if (invoice.subscription && typeof invoice.subscription === 'string') {
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription
    );
    await handleSubscriptionUpdate(supabase, subscription);
  }
}

async function handleInvoicePaymentFailed(
  supabase: ReturnType<typeof createServiceClient>,
  invoice: Stripe.Invoice
) {
  console.log('Payment failed for invoice:', invoice.id);
  // You may want to notify the user or update subscription status
}

async function updateOrganizationSubscription(
  supabase: ReturnType<typeof createServiceClient>,
  organizationId: number,
  subscription: Stripe.Subscription
) {
  const subscriptionItem = subscription.items.data[0];
  if (!subscriptionItem) {
    console.error('No subscription items found');
    return;
  }

  const { error } = await supabase
    .from('organizations')
    .update({
      stripe_subscription_id: subscription.id,
      stripe_subscription_item_id: subscriptionItem.id,
    })
    .eq('id', organizationId);

  if (error) {
    console.error('Error updating organization subscription:', error);
    throw error;
  }

  // Note: You may want to update the user's subscription plan in JWT here
  // This would require calling your backend API to refresh the JWT
  // For now, the JWT will be updated on the next login/refresh
}
