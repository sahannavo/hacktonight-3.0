import { asText, ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'
import {
  buildSecureCookie,
  generateSessionToken,
  verifyPassword,
} from '@/lib/security'

export async function GET() {
  /**
   * SECURITY FIX: The GET endpoint previously returned all users with their
   * data. Now it only returns a minimal public-safe status message.
   */
  try {
    await ensureDatabase()
    const result = await pool.query(
      'SELECT COUNT(*)::int AS user_count FROM users'
    )
    return Response.json({
      ok: true,
      message: 'Login service is operational.',
      registeredUsers: result.rows[0]?.user_count ?? 0,
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const username = asText(body.username)
    const password = asText(body.password)

    if (!username || !password) {
      return Response.json(
        { ok: false, message: 'Username and password are required.' },
        { status: 400 }
      )
    }

    await ensureDatabase()

    // SECURITY FIX: Parameterized query — no SQL injection
    const result = await pool.query(
      `SELECT id, username, role, full_name, email, password
       FROM users
       WHERE username = $1
       LIMIT 1`,
      [username]
    )

    const user = result.rows[0]

    // SECURITY FIX: Timing-safe hashed password verification
    const isValid = !!user && verifyPassword(password, user.password)

    if (!isValid) {
      return Response.json(
        { ok: false, message: 'Invalid username or password.' },
        { status: 401 }
      )
    }

    // SECURITY FIX: Secure cookies with HttpOnly, SameSite, Secure (prod)
    // SECURITY FIX: Cryptographically secure session token
    const token = generateSessionToken(user.id, user.role)
    const headers = new Headers()
    headers.append(
      'set-cookie',
      buildSecureCookie({ name: 'user_id', value: String(user.id), sameSite: 'Lax' })
    )
    headers.append(
      'set-cookie',
      buildSecureCookie({ name: 'role', value: user.role, sameSite: 'Lax' })
    )
    headers.append(
      'set-cookie',
      buildSecureCookie({ name: 'session', value: token, sameSite: 'Lax' })
    )

    // SECURITY FIX: No SQL, password hash, or sensitive internals in response
    return Response.json(
      {
        ok: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          full_name: user.full_name,
          email: user.email,
        },
      },
      { headers }
    )
  } catch (reason) {
    return serviceFailure(reason)
  }
}
