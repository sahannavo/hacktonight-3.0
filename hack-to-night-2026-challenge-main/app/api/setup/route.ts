import { ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'
import { getRoleFromRequest } from '@/lib/security'

export async function GET(request: Request) {
  try {
    // SECURITY FIX: Setup endpoint now requires admin authentication
    // Previously was public and exposed internal table structure
    const role = getRoleFromRequest(request)

    if (role !== 'admin') {
      return Response.json(
        { ok: false, message: 'Forbidden: admin access required.' },
        { status: 403 }
      )
    }

    await ensureDatabase()
    const tables = await pool.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
       ORDER BY table_name`
    )

    // SECURITY FIX: Only return table names — no internal details
    return Response.json({
      ok: true,
      message: 'Database initialized.',
      tables: tables.rows,
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
