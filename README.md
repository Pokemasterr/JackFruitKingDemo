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

## Build order

scaffold → home → shop + search → product detail → cart drawer → checkout
review → mock payment + OTP → order success + tracking → build-a-box →
reviews/newsletter/contact → account → polish.
