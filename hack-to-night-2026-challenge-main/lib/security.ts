/**
 * Security Module — Password hashing, RBAC, cookie management, PII redaction
 *
 * Implements organization-wide password complexity, secure session cookies,
 * a role-based access control matrix, and PII protection utilities.
 */

import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

// ─── Password Policy ────────────────────────────────────────────────

export const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
  requireSpecialChar: true,
  rotationDays: 90,
} as const

export interface PasswordValidationResult {
  valid: boolean
  errors: string[]
}

export function validatePasswordComplexity(password: string): PasswordValidationResult {
  const errors: string[] = []

  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(`Password must be at least ${PASSWORD_POLICY.minLength} characters long`)
  }
  if (PASSWORD_POLICY.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (PASSWORD_POLICY.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (PASSWORD_POLICY.requireDigit && !/\d/.test(password)) {
    errors.push('Password must contain at least one digit')
  }
  if (PASSWORD_POLICY.requireSpecialChar && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return { valid: errors.length === 0, errors }
}

// ─── Password Hashing (scrypt) ──────────────────────────────────────

const SCRYPT_KEYLEN = 64
const SCRYPT_SALTLEN = 16
const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 }

export function hashPassword(password: string): string {
  const salt = randomBytes(SCRYPT_SALTLEN)
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS)
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [algorithm, saltHex, hashHex] = stored.split('$')
    if (algorithm !== 'scrypt' || !saltHex || !hashHex) return false

    const salt = Buffer.from(saltHex, 'hex')
    const storedHash = Buffer.from(hashHex, 'hex')
    const derived = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS)

    return derived.length === storedHash.length &&
      timingSafeEqual(derived, storedHash)
  } catch {
    return false
  }
}

// ─── PIN Hashing ────────────────────────────────────────────────────

export function hashPin(pin: string): string {
  return hashPassword(pin)
}

export function verifyPin(pin: string, stored: string): boolean {
  return verifyPassword(pin, stored)
}

// ─── Secure Cookie Builder ──────────────────────────────────────────

export interface SecureCookieOptions {
  name: string
  value: string
  maxAgeSeconds?: number
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export function buildSecureCookie(opts: SecureCookieOptions): string {
  const { name, value, maxAgeSeconds = 7 * 24 * 60 * 60, sameSite = 'Strict' } = opts
  const isProduction = process.env.NODE_ENV === 'production'

  const parts = [
    `${name}=${value}`,
    'Path=/',
    `Max-Age=${maxAgeSeconds}`,
    'HttpOnly',
    `SameSite=${sameSite}`,
  ]

  // Secure flag only in production (HTTPS). Local dev over HTTP needs Secure omitted.
  if (isProduction) {
    parts.push('Secure')
  }

  return parts.join('; ')
}

export function buildLogoutCookie(name: string): string {
  const isProduction = process.env.NODE_ENV === 'production'
  const parts = [`${name}=`, 'Path=/', 'Max-Age=0', 'HttpOnly', 'SameSite=Strict']
  if (isProduction) parts.push('Secure')
  return parts.join('; ')
}

// ─── RBAC Matrix ───────────────────────────────────────────────────

export type Role = 'admin' | 'customer'

export const RBAC_MATRIX: Record<string, Role[]> = {
  // Public routes — no auth required
  '/': ['admin', 'customer'],
  '/login': ['admin', 'customer'],
  '/sign-up': ['admin', 'customer'],
  '/reset-password': ['admin', 'customer'],
  '/api/auth/login': ['admin', 'customer'],
  '/api/health': ['admin', 'customer'],

  // Customer routes — any authenticated user
  '/dashboard': ['admin', 'customer'],
  '/bank-accounts': ['admin', 'customer'],
  '/bank-transfer': ['admin', 'customer'],
  '/pay-bills': ['admin', 'customer'],
  '/smart-spend': ['admin', 'customer'],
  '/e-statement': ['admin', 'customer'],
  '/api/accounts': ['admin', 'customer'],
  '/api/transactions': ['admin', 'customer'],
  '/api/transfer': ['admin', 'customer'],
  '/api/search': ['admin', 'customer'],

  // Admin-only routes
  '/api/admin/system': ['admin'],
  '/api/setup': ['admin'],
} as const

export function isRouteAllowed(pathname: string, role: string | null): boolean {
  // Find the matching route pattern (longest prefix match)
  const matchingRoute = Object.keys(RBAC_MATRIX)
    .filter((route) => pathname === route || pathname.startsWith(route + '/'))
    .sort((a, b) => b.length - a.length)[0]

  if (!matchingRoute) {
    // Unknown route — deny by default
    return false
  }

  const allowedRoles = RBAC_MATRIX[matchingRoute]
  if (!role) return false
  return (allowedRoles as string[]).includes(role)
}

// ─── Session Token (cryptographically secure) ──────────────────────

export function generateSessionToken(userId: number, role: string): string {
  const payload = JSON.stringify({ uid: userId, role, ts: Date.now() })
  const nonce = randomBytes(16).toString('hex')
  return `${nonce}.${Buffer.from(payload).toString('base64url')}`
}

// ─── PII Redaction ──────────────────────────────────────────────────

const PII_FIELDS = ['password', 'pin', 'nic', 'email', 'full_name', 'token', 'secret']

export function redactPii(data: unknown): unknown {
  if (data === null || data === undefined) return data
  if (typeof data === 'string') return data
  if (Array.isArray(data)) return data.map(redactPii)
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>
    const redacted: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      if (PII_FIELDS.includes(key.toLowerCase())) {
        redacted[key] = '[REDACTED]'
      } else {
        redacted[key] = redactPii(value)
      }
    }
    return redacted
  }
  return data
}

// ─── Cookie Parsing Helper ──────────────────────────────────────────

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {}
  const cookies: Record<string, string> = {}
  for (const pair of cookieHeader.split(';')) {
    const [name, ...rest] = pair.trim().split('=')
    if (name) {
      cookies[name.trim()] = decodeURIComponent(rest.join('=').trim())
    }
  }
  return cookies
}

export function getRoleFromRequest(request: Request): string | null {
  const cookies = parseCookies(request.headers.get('cookie'))
  return cookies.role || null
}

export function getUserIdFromRequest(request: Request): string | null {
  const cookies = parseCookies(request.headers.get('cookie'))
  return cookies.user_id || null
}
