import {
  asText,
  ensureDatabase,
  pool,
  serviceFailure,
} from "@/lib/platform-db";

// Helper function to extract user_id from session cookies
function getUserIdFromSession(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
  return cookies.user_id || null;
}

export async function GET(request: Request) {
  try {
    // Extract userId exclusively from session cookies
    const sessionUserId = getUserIdFromSession(request);

    // Reject requests without valid session
    if (!sessionUserId) {
      return Response.json(
        { ok: false, message: "Unauthorized. Please login." },
        { status: 401 },
      );
    }

    await ensureDatabase();
    const result = await pool.query(
      `SELECT a.id, a.user_id, a.account_number, a.account_name, a.balance, u.username, u.full_name
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
