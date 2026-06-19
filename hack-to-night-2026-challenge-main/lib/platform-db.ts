import { Pool } from 'pg'
import { hashPassword, hashPin } from '@/lib/security'

/**
 * SECURITY FIX: No hardcoded connection string.
 * DATABASE_URL must be provided via environment variable.
 * The app will refuse to boot without it.
 */
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'FATAL: DATABASE_URL environment variable is not set. ' +
    'Copy .env.example to .env.local and configure your database credentials.'
  )
}

export const pool = new Pool({
  connectionString,
  max: 3,
})

let booted = false

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  full_name TEXT NOT NULL,
  nic TEXT,
  email TEXT,
  password_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  account_number TEXT UNIQUE NOT NULL,
  account_name TEXT NOT NULL,
  balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
  pin TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  from_account TEXT NOT NULL,
  to_account TEXT NOT NULL,
  amount NUMERIC(14, 2) NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'SUCCESS',
  created_by INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  event TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`

/**
 * SECURITY FIX: Seed data now uses hashed passwords and PINs.
 * No plaintext credentials are stored in the database.
 */
async function buildSeed() {
  return `
INSERT INTO users (id, username, password, role, full_name, nic, email) VALUES
  (1, 'dilara', '${hashPassword('password123').replace(/'/g, "''")}', 'customer', 'Dilara Perera', '200112345678', 'dilara@example.test'),
  (2, 'kasun', '${hashPassword('kasun').replace(/'/g, "''")}', 'customer', 'Kasun Wickramanayake', '199812345678', 'kasun@example.test'),
  (3, 'admin', '${hashPassword('admin').replace(/'/g, "''")}', 'admin', 'Platform Administrator', '000000000000', 'root@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO accounts (user_id, account_number, account_name, balance, pin) VALUES
  (1, '1000003423', 'Dilara Savings', 100000.00, '${hashPin('1234').replace(/'/g, "''")}'),
  (1, '1000004876', 'Dilara Expenses', 42000.00, '${hashPin('1234').replace(/'/g, "''")}'),
  (2, '2000006754', 'Kasun Current', 9870.00, '${hashPin('0000').replace(/'/g, "''")}'),
  (3, '9999999999', 'Admin Vault', 9999999.99, '${hashPin('9999').replace(/'/g, "''")}')
ON CONFLICT (account_number) DO NOTHING;

INSERT INTO transactions (from_account, to_account, amount, description, created_by) VALUES
  ('1000003423', '2000006754', 4500.00, 'Lunch money', 1),
  ('1000004876', '9999999999', 10000.00, 'Totally normal fee', 1),
  ('2000006754', '1000003423', 9870.00, 'Refund maybe', 2)
ON CONFLICT DO NOTHING;
`
}

export async function runStatement(sql: string, params?: unknown[]) {
  await ensureDatabase()
  // SECURITY FIX: Removed SQL logging — was leaking queries to stdout
  if (params && params.length > 0) {
    return pool.query(sql, params)
  }
  return pool.query(sql)
}

export async function ensureDatabase() {
  if (booted) return
  await pool.query(schema)
  const seedSql = await buildSeed()
  await pool.query(seedSql)
  booted = true
}

export function asText(value: unknown) {
  if (value === undefined || value === null) return ''
  return String(value)
}

/**
 * SECURITY FIX: Error responses no longer leak stack traces,
 * internal detail, or SQL fragments to the client.
 */
export function serviceFailure(reason: unknown) {
  const issue = reason as {
    message?: string
    code?: string
    detail?: string
    stack?: string
  }

  // Log full error server-side only
  console.error('[bank-error]', {
    message: issue?.message,
    code: issue?.code,
    detail: issue?.detail,
    stack: issue?.stack,
    timestamp: new Date().toISOString(),
  })

  // Return sanitized error to client — no internal details
  const isProduction = process.env.NODE_ENV === 'production'
  return Response.json(
    {
      ok: false,
      message: isProduction
        ? 'An internal error occurred. Please try again later.'
        : issue?.message || 'Unknown error',
      code: isProduction ? undefined : issue?.code,
    },
    { status: 500 }
  )
}

