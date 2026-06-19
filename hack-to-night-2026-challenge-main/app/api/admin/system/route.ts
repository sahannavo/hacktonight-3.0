import { ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'
import { getRoleFromRequest } from '@/lib/security'

export async function GET(request: Request) {
  try {
    // SECURITY FIX: Use proper cookie parsing from security module
    const role = getRoleFromRequest(request)

    if (role !== 'admin') {
      return Response.json(
        { ok: false, message: 'Forbidden: admin access required.' },
        { status: 403 }
      )
    }

    await ensureDatabase()

    // SECURITY FIX: Parameterized queries (no string interpolation)
    // SECURITY FIX: Exclude password and PIN columns from results
    const users = await pool.query(
      `SELECT id, username, role, full_name, email, created_at
       FROM users ORDER BY id`
    )
    const accounts = await pool.query(
      `SELECT id, user_id, account_number, account_name, balance
       FROM accounts ORDER BY id`
    )
    const logs = await pool.query(
      `SELECT id, event, created_at
       FROM audit_logs ORDER BY id DESC LIMIT 10`
    )

    return Response.json({
      ok: true,
      message: 'System overview.',
      users: users.rows,
      accounts: accounts.rows,
      auditLogs: logs.rows,
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
