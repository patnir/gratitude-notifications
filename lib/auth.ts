import { verifyToken } from '@clerk/backend';

export interface AuthResult {
  userId: string;
}

/**
 * Verifies the Clerk JWT token from the Authorization header.
 * Returns the userId if valid, null if invalid or missing.
 * 
 * During migration period, set `required: false` to allow unauthenticated requests.
 */
export async function verifyAuth(request: Request): Promise<AuthResult | null> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    
    // Handle userId migration (externalId stored in userId claim, or fall back to sub)
    const userId = (payload.userId as string) || payload.sub;
    
    if (!userId) {
      console.error('Token verified but no userId found in payload');
      return null;
    }
    
    return { userId };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Helper to check auth and return appropriate response.
 * Set `required: false` during migration to allow unauthenticated requests.
 */
export async function requireAuth(
  request: Request,
  options: { required: boolean } = { required: true }
): Promise<{ auth: AuthResult | null; errorResponse: Response | null }> {
  const auth = await verifyAuth(request);
  
  if (!auth && options.required) {
    return {
      auth: null,
      errorResponse: new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ),
    };
  }
  
  return { auth, errorResponse: null };
}
