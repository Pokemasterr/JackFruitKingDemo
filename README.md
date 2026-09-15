# 🍈 Jackfruit King

E-commerce storefront for Jackfruit King's retail and B2B ingredient lines.
Turborepo + pnpm monorepo, Next.js App Router, Prisma/Postgres. Everything
that touches the outside world is **mocked behind a clean interface** — swap
in the real provider by implementing that interface, without touching the app.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **App:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **DB:** PostgreSQL via Prisma (schema ready; the storefront itself currently
  runs on static catalogue data + browser `localStorage`, see [Status](#status))
- **Design tokens:** shared Tailwind preset in `@jk/config` — editorial & serif
  direction: cream canvas, forest green primary, mustard accent, Fraunces
  (headings) + Inter (body)

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

## Running the site

**Prerequisites:** Node ≥ 20 and pnpm (`npm install -g pnpm` if you don't have
it). Docker is only needed if you want the database — see below.

### Fastest path (no database needed)

The storefront's product catalogue is static (`apps/web/lib/catalog.ts`) and
cart/checkout/orders run on browser `localStorage`, so the whole site —
browsing, cart, checkout, mock payment + OTP, order confirmation, ⌘K search —
works end to end with just:

```bash
pnpm install
pnpm dev            # → http://localhost:3000
```

Stop it with `Ctrl+C`. First page load compiles on demand and takes a few
seconds; it's fast after that.

### With the database (optional, for Prisma/Postgres work)

Only needed if you're working on the `@jk/db` schema itself or wiring a real
provider — the storefront doesn't currently read from it.

```bash
# 1. Install
pnpm install

# 2. Start Postgres (needs Docker) — or point DATABASE_URL at Neon/Supabase instead
pnpm db:up

# 3. Generate client, create tables, seed catalog
pnpm db:generate
pnpm db:push
pnpm db:seed

# 4. Run the app
pnpm dev            # → http://localhost:3000
```

Copy `.env.example` to `.env` (already present for local dev). Seed data
includes the jackfruit-chip flavors and the `WELCOME10` coupon.

### Trying the mock checkout flow

Add something to the bag → **Checkout** → fill in an address → **Pay**. The
payment step accepts test card `4242 4242 4242 4242` with any future expiry/CVV,
then a static OTP of `123456` (these values aren't shown on screen anymore —
keep them in mind when demoing). Cash on delivery skips the OTP step entirely.

## Handy scripts

| Command | What |
|---|---|
| `pnpm dev` | Run all dev servers via Turbo |
| `pnpm build` | Build everything |
| `pnpm typecheck` | Type-check every package |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:reset` | Drop, re-push, re-seed |

## Status

**Live routes:** home, shop, product detail, cart, checkout + payment + OTP,
order success, build-a-box, about, why-jackfruit, contact, wholesale, reviews.

**Real:** cart, checkout math, coupons, delivery-estimate lookup, global ⌘K
search, the retail + B2B ("ingredient") catalogue split, address book, order
history — all real logic, currently persisted in browser `localStorage`
rather than Postgres.

**Mocked at the seam only:** payment capture, OTP delivery, outbound email,
shipping estimates — see "Provider seams" above.
