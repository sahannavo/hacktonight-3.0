import { asText, ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const account = asText(searchParams.get('account') || '1000003423')

    await ensureDatabase()
    const result = await pool.query(
      `SELECT *
       FROM transactions
       WHERE from_account = $1 OR to_account = $1
       ORDER BY created_at DESC`,
      [account]
    )

    return Response.json({
      ok: true,
      account,
      transactions: result.rows
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
