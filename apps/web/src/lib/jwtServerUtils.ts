/**
 * Server-side JWT utilities
 */

/**
 * Decode JWT payload without verification (for reading custom claims)
 */
export function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode base64url (JWT uses base64url, not standard base64)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Log JWT contents when a new JWT is issued
 * Only logs if ENABLE_JWT_DEBUG_LOGGING environment variable is set to 'true'
 */
export function logJWTIssuance(
  token: string,
  context: string = 'BACKEND'
): void {
  // Only log if explicitly enabled via environment variable
  if (process.env.ENABLE_JWT_DEBUG_LOGGING !== 'true') {
    return;
  }

  const payload = decodeJWT(token);
  if (!payload) {
    console.error(`❌ Failed to decode JWT in context: ${context}`);
    return;
  }

  console.log(`🔄 NEW JWT ISSUED BY ${context}`);
  console.log('JWT Contents:', JSON.stringify(payload, null, 2));
  console.log('JWT Token (first 50 chars):', token.substring(0, 50) + '...');
  console.log('User ID:', payload.sub || payload.user_id || 'N/A');
  console.log('Issued At:', payload.iat ? new Date((payload.iat as number) * 1000).toISOString() : 'N/A');
  console.log('Expires At:', payload.exp ? new Date((payload.exp as number) * 1000).toISOString() : 'N/A');
  if (payload.orgs) {
    console.log('Organizations:', payload.orgs);
  }
  if (payload.subscription_plan) {
    console.log('Subscription Plan:', payload.subscription_plan);
  }
}

