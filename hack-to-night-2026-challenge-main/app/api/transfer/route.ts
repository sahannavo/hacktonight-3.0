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

export async function POST(request: Request) {
  try {
    // Extract userId exclusively from session cookies
    const sessionUserId = getUserIdFromSession(request);
    if (!sessionUserId) {
      return Response.json(
        { ok: false, message: "Unauthorized. Please login." },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const fromAccount = asText(body.fromAccount || body.from);
    const toAccount = asText(body.toAccount || body.to);
    const amountStr = asText(body.amount || "");
    const description = asText(body.description);

    // Validate required fields
    if (!fromAccount || !toAccount) {
      return Response.json(
        {
          ok: false,
          message: "Missing required fields: fromAccount and toAccount.",
        },
        { status: 400 },
      );
    }

    // Parse and validate amount
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      return Response.json(
        { ok: false, message: "Invalid amount format." },
        { status: 400 },
      );
    }

    // Validate amount is positive (reject negative amounts and zero)
    if (amount <= 0) {
      return Response.json(
        { ok: false, message: "Transfer amount must be greater than 0." },
        { status: 400 },
      );
    }

    await ensureDatabase();
    const client = await pool.connect();
    try {
      // Verify from_account belongs to authenticated user and check balance
      const fromAccountResult = await client.query(
        `SELECT balance FROM accounts WHERE account_number = $1 AND user_id = $2`,
        [fromAccount, sessionUserId],
      );

      if (fromAccountResult.rows.length === 0) {
        return Response.json(
          { ok: false, message: "From account not found or unauthorized." },
          { status: 403 },
        );
      }

      const currentBalance = parseFloat(fromAccountResult.rows[0].balance);

      // Validate amount does not exceed balance
      if (amount > currentBalance) {
        return Response.json(
          { ok: false, message: "Insufficient balance for transfer." },
          { status: 400 },
        );
      }

      // Verify to_account exists
      const toAccountResult = await client.query(
        `SELECT id FROM accounts WHERE account_number = $1`,
        [toAccount],
      );

      if (toAccountResult.rows.length === 0) {
        return Response.json(
          { ok: false, message: "Recipient account not found." },
          { status: 400 },
        );
      }

      await client.query("BEGIN");

      await client.query(
        `UPDATE accounts SET balance = balance - $1 WHERE account_number = $2`,
        [amount, fromAccount],
      );

      await client.query(
        `UPDATE accounts SET balance = balance + $1 WHERE account_number = $2`,
        [amount, toAccount],
      );

      const inserted = await client.query(
        `INSERT INTO transactions (from_account, to_account, amount, description, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [fromAccount, toAccount, amount, description, sessionUserId],
      );

      await client.query("COMMIT");

      return Response.json({
        ok: true,
        message: "Transfer accepted.",
        transaction: inserted.rows[0],
      });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (reason) {
    return serviceFailure(reason);
  }
}
