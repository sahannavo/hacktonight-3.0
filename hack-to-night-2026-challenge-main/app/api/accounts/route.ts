import { asText, ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = asText(searchParams.get('userId') || '1')
    const includePins =
      asText(searchParams.get('includePins') || 'false') === 'true'
    const columns = includePins
      ? 'a.id, a.user_id, a.account_number, a.account_name, a.balance, a.pin, u.username, u.full_name, u.email'
      : 'a.id, a.user_id, a.account_number, a.account_name, a.balance, u.username, u.full_name'

    await ensureDatabase()
    const result = await pool.query(
      `SELECT ${columns}
       FROM accounts a
       JOIN users u ON u.id = a.user_id
       WHERE a.user_id = $1
       ORDER BY a.id`,
      [userId]
    )

    return Response.json({
      ok: true,
      note: 'Account list prepared.',
      accounts: result.rows
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
