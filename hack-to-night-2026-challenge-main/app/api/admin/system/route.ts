import { runStatement, serviceFailure } from '@/lib/platform-db'

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get('cookie') || ''

    const roleCookie = cookies
      .split(';')
      .find((cookie) => cookie.trim().startsWith('role='))

    const role = roleCookie?.split('=')[1]

    if (role !== 'admin') {
      return Response.json(
        {
          ok: false,
          message: 'Forbidden'
        },
        { status: 403 }
      )
    }

    const users = await runStatement('SELECT * FROM users ORDER BY id')
    const accounts = await runStatement('SELECT * FROM accounts ORDER BY id')
    const logs = await runStatement(
      'SELECT * FROM audit_logs ORDER BY id DESC LIMIT 10'
    )

    return Response.json({
  ok: true,
  message: 'System overview.',
  users: users.rows,
  accounts: accounts.rows,
  auditLogs: logs.rows
})
  } catch (reason) {
    return serviceFailure(reason)
  }
}