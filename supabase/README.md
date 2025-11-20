# Supabase Migrations and Functions

This directory contains database migrations and edge functions for the push notification system.

## Setup Instructions

### 1. Install Supabase CLI

```bash
npm install -g supabase
# or
brew install supabase/tap/supabase
```

### 2. Link to Your Supabase Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 3. Enable Required Extensions

Run this in your Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS pg_net;
```

### 4. Run Migrations

Run the migrations in order:

```bash
# In Supabase SQL Editor, run each migration file:
# 1. 20250119_create_push_tokens.sql
# 2. 20250119_create_push_notifications.sql
# 3. 20250119_create_message_notification_trigger.sql
# 4. 20250119_create_notification_send_trigger.sql (after deploying edge function)
```

Or use Supabase CLI:

```bash
supabase db push
```

### 5. Deploy Edge Function

```bash
cd supabase/functions
supabase functions deploy send-push-notification
```

### 6. Configure Edge Function URL

After deploying, get your Edge Function URL from Supabase dashboard and update the `notify_push_notification()` function in `20250119_create_notification_send_trigger.sql`.

The URL format is:
```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-push-notification
```

### 7. Set Service Role Key

You need to provide the service role key to the trigger. Options:

**Option A: Using Supabase Vault (Recommended)**

```sql
-- Store in vault
SELECT vault.create_secret('service_role_key', 'your-service-role-key-here');

-- Update function to read from vault
```

**Option B: Using Database Webhooks (Easier Alternative)**

Instead of using `pg_net`, you can use Supabase Database Webhooks:

1. Go to Supabase Dashboard → Database → Webhooks
2. Create a new webhook:
   - Table: `push_notifications`
   - Events: `INSERT`
   - Type: `HTTP Request`
   - HTTP Request:
     - Method: POST
     - URL: Your edge function URL
     - Headers: `Authorization: Bearer YOUR_SERVICE_ROLE_KEY`
     - Payload: `{"notificationId": "{{ record.id }}"}`

This approach doesn't require pg_net or modifying the trigger function.

## Testing

### Test Token Registration

1. Run the mobile app and log in
2. Check if token is stored in `push_tokens` table:

```sql
SELECT * FROM push_tokens;
```

### Test Notification Creation

1. Send a workspace message from one user
2. Check if notification was created:

```sql
SELECT * FROM push_notifications ORDER BY created_at DESC LIMIT 10;
```

### Test Notification Sending

1. Check if notification status changed to 'sent':

```sql
SELECT * FROM push_notifications WHERE status = 'sent' ORDER BY created_at DESC LIMIT 10;
```

2. Check Edge Function logs in Supabase dashboard

## Troubleshooting

### Notifications not being created

- Check if workspace_messages trigger is active
- Check Supabase logs for errors

### Notifications not being sent

- Verify Edge Function is deployed
- Check Edge Function logs
- Verify pg_net extension is enabled
- Verify service role key is configured correctly

### Invalid tokens

The system automatically removes invalid tokens when Expo returns `DeviceNotRegistered` errors.

## Alternative: Using Database Webhooks

If you prefer not to use `pg_net` and triggers, you can use Supabase Database Webhooks instead:

1. Skip the `20250119_create_notification_send_trigger.sql` migration
2. Set up a Database Webhook in Supabase Dashboard as described above
3. The webhook will call your Edge Function automatically on INSERT

This is often simpler and more reliable for production use.

