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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without auth
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Read session cookies
  const userId = request.cookies.get('user_id')?.value || null
  const role = request.cookies.get('role')?.value || null

  // Not authenticated → redirect to login (pages) or 401 (API)
  if (!userId || !role) {
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
