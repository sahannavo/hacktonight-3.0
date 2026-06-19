import {
  asText,
  ensureDatabase,
  pool,
  serviceFailure,
} from "@/lib/platform-db";
import {
  parseCookies,
  validateSessionToken,
} from "@/lib/security";

// Extract validated user ID from session token
function getUserIdFromSession(request: Request): string | null {
  const cookies = parseCookies(request.headers.get("cookie"));
  const token = cookies.session || null;
  if (!token) return null;
  const session = validateSessionToken(token);
  return session ? String(session.uid) : null;
}

export async function GET(request: Request) {
  try {
    // SECURITY FIX: Authenticate via session token, not query param
    const sessionUserId = getUserIdFromSession(request);
    if (!sessionUserId) {
      return Response.json(
        { ok: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }

    // SECURITY FIX: Removed includePins backdoor — PINs are never exposed via API
    // Only safe columns are selected; password and pin are never queried
    await ensureDatabase();
    const result = await pool.query(
      `SELECT a.id, a.user_id, a.account_number, a.account_name, a.balance,
              u.username, u.full_name
       FROM accounts a
       JOIN users u ON u.id = a.user_id
       WHERE a.user_id = $1
       ORDER BY a.id`,
      [sessionUserId],
    );

    return Response.json({
      ok: true,
      note: "Account list prepared.",
      accounts: result.rows,
    });
  } catch (reason) {
    return serviceFailure(reason);
  }
}
