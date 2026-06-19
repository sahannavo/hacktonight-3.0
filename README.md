# HTN26 Challenge — Nova Bank

A full-stack banking simulation built for Hack to Night 3.0. Features account management, bank transfers, bill payments, e-statements, and smart spending analytics with role-based access control.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4 |
| Backend | Next.js Route Handlers (API Routes) |
| Database | PostgreSQL 17 |
| Runtime | Bun (Docker) / Node.js (local) |
| Auth | scrypt password hashing, HMAC-signed session tokens |
| Linting | Biome |

## Project Structure

```
app/
├── (accounts)/          # Auth pages (login, sign-up, reset-password)
├── api/
│   ├── auth/login       # POST — authenticate & issue session
│   ├── accounts          # GET — list user accounts
│   ├── transfer          # POST — transfer between accounts
│   ├── transactions      # GET — transaction history
│   ├── search            # GET — search users/accounts/transactions
│   ├── admin/system      # GET — admin system overview
│   ├── setup             # GET — admin DB setup check
│   └── health            # GET — health check
├── dashboard/            # Main dashboard
├── bank-accounts/        # Account list view
├── bank-transfer/        # Transfer form
├── pay-bills/            # Bill payment
├── smart-spend/          # Spending analytics
└── e-statement/          # Account statements

lib/
├── platform-db.ts        # DB pool, schema, seed data, helpers
└── security.ts           # Auth, RBAC, cookies, PII redaction

middleware.ts             # Route-level access control
```

## Prerequisites

- **Docker** with [WSL2 backend](https://docs.docker.com/desktop/features/wsl) (Windows) or native Docker (Linux/macOS)
- **Git**

## Setup

```bash
git clone https://github.com/fossnsbm/hack-to-night-2026-challenge.git
cd hack-to-night-2026-challenge
```

### 1. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your values:

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | Database user | `postgres` |
| `POSTGRES_PASSWORD` | Database password | `mysecretpassword` |
| `POSTGRES_DB` | Database name | `htn26db` |
| `DATABASE_URL` | Full connection string | `postgresql://postgres:mysecretpassword@db:5432/htn26db` |
| `NODE_ENV` | Environment | `development` |
| `SESSION_MAX_AGE` | Cookie max age (seconds) | `604800` (7 days) |

> **Docker Compose** uses `db` as the hostname. For **local dev** without Docker, use `localhost`.

### 2. Run with Docker Compose (recommended)

```bash
docker compose up --build --watch
```

The app starts at **http://localhost:3000** with hot-reload enabled.

### 3. Run locally (without Docker)

Start PostgreSQL separately, then:

```bash
# Update DATABASE_URL in .env.local to use localhost instead of db
npm install
npm run dev
```

The app starts at **http://localhost:3000**.

## Seed Accounts

The database auto-seeds on first boot with these accounts:

| Username | Password | Role | Accounts |
|----------|----------|------|----------|
| `dilara` | `password123` | customer | Dilara Savings (Rs. 100,000), Dilara Expenses (Rs. 42,000) |
| `kasun` | `kasun` | customer | Kasun Current (Rs. 9,870) |
| `admin` | `admin` | admin | Admin Vault (Rs. 9,999,999.99) |

> Passwords are hashed with scrypt before insertion — no plaintext is stored.

## API Reference

### `POST /api/auth/login`
Authenticate a user. Returns a session token and sets HTTP-only cookies.

**Request:**
```json
{ "username": "dilara", "password": "password123" }
```

**Response:**
```json
{
  "ok": true,
  "token": "<session-token>",
  "user": { "id": 1, "username": "dilara", "role": "customer", "full_name": "Dilara Perera", "email": "dilara@example.test" }
}
```

### `GET /api/accounts?userId=1`
List accounts for a user. Requires authentication.

### `POST /api/transfer`
Transfer between accounts. Requires authentication.

**Request:**
```json
{ "fromAccount": "1000003423", "toAccount": "2000006754", "amount": 500, "description": "Lunch" }
```

### `GET /api/transactions?account=1000003423`
Get transaction history for an account.

### `GET /api/search?q=dilara`
Search across users, accounts, and transactions.

### `GET /api/health`
Health check — returns database connectivity status.

### `GET /api/admin/system` *(admin only)*
System overview — users, accounts, audit logs.

## Security Features

- **Password hashing** — scrypt with random salt, timing-safe comparison
- **Session tokens** — cryptographically secure with random nonce
- **Secure cookies** — HttpOnly, SameSite=Lax, Secure (production)
- **RBAC middleware** — role-based route protection (admin/customer)
- **Parameterized queries** — all SQL uses `$1`, `$2` placeholders (no string interpolation)
- **PII redaction** — passwords, PINs, NICs never exposed in responses
- **Error sanitization** — stack traces and SQL fragments hidden in production

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Auto-format with Biome |

## License

This project was built for the Hack to Night 3.0 hackathon challenge.
