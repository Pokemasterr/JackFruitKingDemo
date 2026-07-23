# 🍈 Jackfruit King

Bold, punchy e-commerce for absurdly good jackfruit chips. Turborepo + pnpm
monorepo, Next.js App Router, Prisma/Postgres. Everything that touches the
outside world is **mocked behind a clean interface** swap in the real provider
by implementing that interface, without touching the app.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **App:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **DB:** PostgreSQL via Prisma
- **Design tokens:** shared Tailwind preset in `@jk/config` (jackfruit yellow +
  forest green; Anton / Archivo / Space Grotesk)

## Layout

```
apps/web            Next.js app (pages, server actions, route handlers)
packages/db         Prisma schema, seed, client singleton  (@jk/db)
packages/core       provider interfaces + mock adapters     (@jk/core)
packages/ui         shared components                       (@jk/ui)
packages/config     tsconfig bases + Tailwind preset        (@jk/config)
```

## Provider seams (mock → real)

| Interface | Mock shipped | Real drop-in |
|---|---|---|
| `PaymentProvider` | `MockPaymentProvider` (card `4242…`, OTP `123456`) | Razorpay / Stripe |
| `OtpProvider` | `MockOtpProvider` (always `123456`) | MSG91 / Twilio |
| `Mailer` | `LogMailer` (console + `emails` table) | Resend / SendGrid |
| `ShippingEstimator` | `MockShippingEstimator` (pincode table) | Shiprocket / Delhivery |
| `SearchProvider` | `PostgresSearch` (real, no external dep) | Algolia / Meilisearch |

All are wired in one place: `packages/core/src/providers.ts`.

## Getting started

```bash
# 1. Install
pnpm install

# 2. Start Postgres (needs Docker) — or point DATABASE_URL at Neon/Supabase
pnpm db:up

# 3. Generate client, create tables, seed catalog
pnpm db:generate
pnpm db:push
pnpm db:seed

# 4. Run the app
pnpm dev            # → http://localhost:3000
```

Copy `.env.example` to `.env` (already present for local dev). Seed data
includes 6 jackfruit-chip flavors and the `WELCOME10` coupon.

## Handy scripts

| Command | What |
|---|---|
| `pnpm dev` | Run all dev servers via Turbo |
| `pnpm build` | Build everything |
| `pnpm typecheck` | Type-check every package |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:reset` | Drop, re-push, re-seed |

## Build order

scaffold → home → shop + search → product detail → cart drawer → checkout
review → mock payment + OTP → order success + tracking → build-a-box →
reviews/newsletter/contact → account → polish.
