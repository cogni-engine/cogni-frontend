// Supabase Edge Function to send push notifications via Expo Push API
// Deploy with: supabase functions deploy send-push-notification

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

interface PushNotification {
  id: number;
  user_id: string;
  title: string;
  body: string;
  data: Record<string, any>;
  status: string;
}

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: string;
  badge?: number;
  priority?: 'default' | 'normal' | 'high';
  channelId?: string;
}

interface ExpoPushTicket {
  status: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: any;
}

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get notification ID from request body
    const { notificationId } = await req.json();

    if (!notificationId) {
      return new Response(
        JSON.stringify({ error: 'Missing notificationId' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the notification
    const { data: notification, error: notifError } = await supabase
      .from('push_notifications')
      .select('*')
      .eq('id', notificationId)
      .single();

    if (notifError || !notification) {
      console.error('Error fetching notification:', notifError);
      return new Response(
        JSON.stringify({ error: 'Notification not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Skip if already sent
    if (notification.status === 'sent') {
      return new Response(
        JSON.stringify({ message: 'Already sent' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch push tokens for the user
    const { data: tokens, error: tokensError } = await supabase
      .from('push_tokens')
      .select('expo_push_token')
      .eq('user_id', notification.user_id);

    if (tokensError) {
      console.error('Error fetching push tokens:', tokensError);
      await updateNotificationStatus(
        supabase,
        notificationId,
        'failed',
        'Error fetching push tokens'
      );
      return new Response(
        JSON.stringify({ error: 'Error fetching push tokens' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!tokens || tokens.length === 0) {
      console.log('No push tokens found for user:', notification.user_id);
      await updateNotificationStatus(
        supabase,
        notificationId,
        'failed',
        'No push tokens registered'
      );
      return new Response(
        JSON.stringify({ message: 'No push tokens found' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Build Expo push messages
    const messages: ExpoPushMessage[] = tokens.map((token) => ({
      to: token.expo_push_token,
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
      sound: 'default',
      priority: 'high',
      channelId: 'default',
    }));

    // Send to Expo Push API
    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Expo Push API error:', result);
      await updateNotificationStatus(
        supabase,
        notificationId,
        'failed',
        JSON.stringify(result.errors || result)
      );
      return new Response(
        JSON.stringify({ error: 'Failed to send push notification' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check for errors in individual tickets
    const tickets: ExpoPushTicket[] = result.data || [];
    const errors = tickets.filter((ticket) => ticket.status === 'error');

    if (errors.length > 0) {
      console.error('Some push notifications failed:', errors);
      
      // Remove invalid tokens
      for (const error of errors) {
        if (
          error.details?.error === 'DeviceNotRegistered' ||
          error.message?.includes('not registered')
        ) {
          // Find and remove the invalid token
          const invalidTokenIndex = tickets.indexOf(error);
          if (invalidTokenIndex >= 0 && invalidTokenIndex < tokens.length) {
            const invalidToken = tokens[invalidTokenIndex].expo_push_token;
            await supabase
              .from('push_tokens')
              .delete()
              .eq('expo_push_token', invalidToken);
            console.log('Removed invalid token:', invalidToken);
          }
        }
      }

      // Still mark as sent if some succeeded
      if (errors.length < tickets.length) {
        await updateNotificationStatus(
          supabase,
          notificationId,
          'sent',
          `Sent to ${tickets.length - errors.length} devices, ${errors.length} failed`
        );
      } else {
        await updateNotificationStatus(
          supabase,
          notificationId,
          'failed',
          'All devices failed'
        );
      }
    } else {
      // All succeeded
      await updateNotificationStatus(supabase, notificationId, 'sent', null);
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: tickets.length - errors.length,
        failed: errors.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

async function updateNotificationStatus(
  supabase: any,
  notificationId: number,
  status: string,
  errorMessage: string | null
) {
  const updateData: any = {
    status,
    sent_at: new Date().toISOString(),
  };

  if (errorMessage) {
    updateData.error_message = errorMessage;
  }

  await supabase
    .from('push_notifications')
    .update(updateData)
    .eq('id', notificationId);
}

