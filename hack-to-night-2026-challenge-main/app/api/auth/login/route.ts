import { asText, ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'

export async function GET() {
  try {
    await ensureDatabase()
    const result = await pool.query(
      'SELECT id, username, role, full_name, nic, email FROM users ORDER BY id'
    )

    return Response.json({
      ok: true,
      note: 'Login reference data.',
      users: result.rows
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

    const result = await pool.query(
      `SELECT id, username, role, full_name, email
       FROM users
       WHERE username = $1 AND password = $2
       LIMIT 1`,
      [username, password]
    )

    if (!result.rows[0]) {
      return Response.json(
        { ok: false, message: 'Invalid login.' },
        { status: 401 }
      )
    }

    const user = result.rows[0]
    const headers = new Headers()
    headers.append(
      'set-cookie',
      `user_id=${user.id}; Path=/; HttpOnly; SameSite=Lax`
    )
    headers.append(
      'set-cookie',
      `role=${user.role}; Path=/; HttpOnly; SameSite=Lax`
    )

    return Response.json(
      {
        ok: true,
        token: btoa(`${user.id}:${user.role}:session-token`),
        user
      },
      { headers }
    )
  } catch (reason) {
    return serviceFailure(reason)
  }
}
