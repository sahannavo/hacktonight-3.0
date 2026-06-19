import { ensureDatabase, pool, serviceFailure } from '@/lib/platform-db'

export async function GET() {
  try {
    await ensureDatabase()
    const result = await pool.query('SELECT NOW() AS server_time')

    // SECURITY FIX: Removed database name and NODE_ENV from response
    // Only return minimal health status — no internal system details
    return Response.json({
      ok: true,
      status: 'healthy',
      timestamp: result.rows[0]?.server_time ?? null,
    })
  } catch (reason) {
    return serviceFailure(reason)
  }
}
