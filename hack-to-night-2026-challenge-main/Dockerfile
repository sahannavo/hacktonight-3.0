# ─── Stage 1: Dependencies ──────────────────────────────────────────
FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# ─── Stage 2: Build ─────────────────────────────────────────────────
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bun run build

# ─── Stage 3: Production ────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

# ─── Dev override (used by docker compose) ──────────────────────────
# For local dev with hot-reload, use:
#   docker compose up --build --watch
# which overrides CMD with "bun run dev" and mounts source as volume.
