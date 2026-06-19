/**
 * RBAC Middleware — Enforces role-based access control across all routes.
 *
 * - Public routes: /, /login, /sign-up, /reset-password, /api/auth/login, /api/health
 * - Customer routes: /dashboard, /bank-accounts, /bank-transfer, etc. (requires any authenticated user)
 * - Admin routes: /api/admin/*, /api/setup (requires admin role)
 *
 * Unauthenticated users hitting protected routes are redirected to /login.
 * Unauthorized API requests receive 403 JSON responses.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { RBAC_MATRIX, type Role } from '@/lib/security'

const PUBLIC_ROUTES = ['/', '/login', '/sign-up', '/reset-password', '/api/auth/login', '/api/health']

// ─── Edge-compatible HMAC validation (Web Crypto API) ──────────────

interface SessionPayload {
  uid: number;
  role: string;
  ts: number;
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET || 'dev-fallback-secret-change-me';
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function validateSessionTokenEdge(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [nonce, payloadB64, signature] = parts;
    if (!nonce || !payloadB64 || !signature) return null;

    // Verify HMAC signature using Web Crypto
    const key = await getSigningKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(`${nonce}.${payloadB64}`);

    // Convert hex signature to ArrayBuffer
    const sigBytes = new Uint8Array(signature.length / 2);
    for (let i = 0; i < signature.length; i += 2) {
      sigBytes[i / 2] = parseInt(signature.substring(i, i + 2), 16);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes.buffer, data);
    if (!isValid) return null;

    // Decode payload
    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson) as SessionPayload;

    if (!payload.uid || !payload.role || !payload.ts) return null;

    return payload;
  } catch {
    return null;
  }
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
}

function getMatchingRoute(pathname: string): string | null {
  return Object.keys(RBAC_MATRIX)
    .filter((route) => pathname === route || pathname.startsWith(route + '/'))
    .sort((a, b) => b.length - a.length)[0] ?? null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without auth
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Read session cookie and validate HMAC signature
  const sessionToken = request.cookies.get('session')?.value || null

  // No session token → unauthenticated
  if (!sessionToken) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { ok: false, message: 'Authentication required.' },
        { status: 401 }
      )
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Validate HMAC-signed session token
  const session = await validateSessionTokenEdge(sessionToken)
  if (!session) {
    // Invalid or tampered token — clear cookies and redirect to login
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { ok: false, message: 'Invalid or expired session.' },
        { status: 401 }
      )
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    const response = NextResponse.redirect(loginUrl)
    // Expire stale cookies
    response.cookies.delete('session')
    response.cookies.delete('user_id')
    response.cookies.delete('role')
    return response
  }

  // Use validated session data — not raw cookies
  const userId = session.uid
  const role = session.role

  // Check RBAC matrix
  const matchingRoute = getMatchingRoute(pathname)
  if (!matchingRoute) {
    // Unknown route — allow Next.js to handle 404
    return NextResponse.next()
  }

  const allowedRoles = RBAC_MATRIX[matchingRoute] as Role[]
  if (!allowedRoles.includes(role as Role)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { ok: false, message: 'Forbidden: insufficient permissions.' },
        { status: 403 }
      )
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2)$).*)',
  ],
}
