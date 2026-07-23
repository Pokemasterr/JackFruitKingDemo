import Link from 'next/link';
import { Button } from '@jk/ui';
import { ArrowRight } from 'lucide-react';

import { ProductCard } from '@/components/product-card';
import { ProductImage } from '@/components/product-image';
import { FounderPortrait } from '@/components/founder-portrait';
import { RETAIL_PRODUCTS, INGREDIENT_PRODUCTS, HOME_REVIEWS, VALUES } from '@/lib/catalog';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Lineup />
      <TwoTracks />
      <StoryTeaser />
      <ResearchTeaser />
      <Reviews />
      <ClosingCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Farm to functional ingredients</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">
            Whole jackfruit.
            <br />
            Whole health.
            <br />
            Zero waste.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Low-GI flour, plant protein, vegan meat bases and better-for-you snacks — all from
            one abundant crop, grown and processed in Maharashtra’s Konkan belt.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/shop">
              <Button size="lg">See the range</Button>
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-forest hover:text-forest-deep"
            >
              Bulk supply & partnerships <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted">
            Grown with <span className="text-ink">1,077 farmers</span> across{' '}
            <span className="text-ink">1,700 acres</span> in Lanja, Ratnagiri.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <ProductImage tint="#EFE2C2" name="Raw Jackfruit Flour" size="500g" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-sm text-muted">
          {VALUES.map((v, i) => (
            <span key={v} className="flex items-center gap-8">
              {i > 0 ? <span className="hidden text-line sm:inline">·</span> : null}
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lineup() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Consumer packs</p>
          <h2 className="mt-3 font-serif text-4xl text-ink">Eat it yourself</h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-deep"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {RETAIL_PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function TwoTracks() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="container-page py-16 md:py-20">
        <p className="eyebrow">Bulk ingredients</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-ink">
          Or build with it
        </h2>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          Bakeries, plant-based brands, cloud kitchens and nutraceutical makers use our
          ingredients as a base. Supplied bulk, year-round, to your specification.
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENT_PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-12">
          <Link href="/wholesale">
            <Button size="lg">Request bulk pricing</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StoryTeaser() {
  return (
    <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-20">
      <div className="order-2 md:order-1">
        <p className="eyebrow">Our story</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">
          From the Konkan to your kitchen
        </h2>
        <p className="mt-6 max-w-prose leading-relaxed text-muted">
          Jackfruit King began as a mission to revive farming in Maharashtra’s Konkan belt.
          Today we work with 1,077 farmers across 1,700 acres, turning an abundant — and too
          often wasted — fruit into food worth staying on the land for.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-forest hover:text-forest-deep"
        >
          Read our story <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="order-1 mx-auto w-full max-w-md md:order-2">
        <FounderPortrait />
      </div>
    </section>
  );
}

function ResearchTeaser() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="container-page py-16 text-center md:py-20">
        <p className="eyebrow">Nutrition & research</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink">
          Green jackfruit flour has been studied as a partial replacement for rice and wheat
        </h2>
        <p className="mx-auto mt-5 max-w-prose leading-relaxed text-muted">
          Published trials have looked at what happens when green jackfruit flour replaces part
          of the staple grain in a daily meal. We’ve summarised the findings — and what each
          part of the fruit actually contains.
        </p>
        <Link href="/why-jackfruit" className="mt-8 inline-block">
          <Button size="lg" variant="secondary">
            Read the research
          </Button>
        </Link>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mb-10">
        <p className="eyebrow">From our partners</p>
        <h2 className="mt-3 font-serif text-4xl text-ink">Working with us</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {HOME_REVIEWS.map((r) => (
          <figure key={r.author}>
            <blockquote className="font-serif text-lg leading-relaxed text-ink">
              “{r.body}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              {r.author} · {r.context}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="border-t border-line">
      <div className="container-page py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          One fruit. Endless possibilities.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Buy a pack, or build a product line with us.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button size="lg">Shop the range</Button>
          </Link>
          <Link href="/wholesale">
            <Button size="lg" variant="secondary">
              Bulk enquiries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
