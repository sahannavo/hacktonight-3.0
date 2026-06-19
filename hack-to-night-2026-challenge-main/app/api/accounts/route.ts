import { asText, ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // SECURITY FIX: No longer default to userId=1 — require explicit param
    const userId = asText(searchParams.get('userId'))
    if (!userId) {
      return Response.json(
        { ok: false, message: 'userId parameter is required.' },
        { status: 400 }
      )
    }

    // SECURITY FIX: Removed includePins backdoor — PINs are never exposed via API
    // Only safe columns are selected; password and pin are never queried
    await ensureDatabase()
    const result = await pool.query(
      `SELECT a.id, a.user_id, a.account_number, a.account_name, a.balance,
              u.username, u.full_name
       FROM accounts a
       JOIN users u ON u.id = a.user_id
       WHERE a.user_id = $1
       ORDER BY a.id`,
      [userId]
    )

    return Response.json({
      ok: true,
      note: 'Account list prepared.',
      accounts: result.rows,
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
