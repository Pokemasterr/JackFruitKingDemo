import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@jk/ui';
import { PageHero } from '@/components/page-hero';
import { ProductImage } from '@/components/product-image';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Jackfruit King is reviving farming in Maharashtra’s Konkan belt — working with 1,077 farmers to turn an abundant, often-wasted fruit into food worth staying on the land for.',
};

const STATS = [
  { value: '1,077', label: 'Farmers in the value chain' },
  { value: '1,700', label: 'Acres under jackfruit' },
  { value: '86', label: 'Varieties collected, of 128 worldwide' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Reviving farming in the Konkan"
        intro="Jackfruit King — Jackfruitking Agro Producer Company Limited — was founded to bring agriculture, and its people, back to Maharashtra’s Konkan belt."
      />

      {/* the problem */}
      <section className="container-page grid gap-12 py-14 md:grid-cols-2 md:py-20">
        <div className="max-w-prose">
          <h2 className="font-serif text-2xl text-ink">A region in distress</h2>
          <p className="mt-4 leading-relaxed text-muted">
            For years the Konkan belt has faced deep economic distress. Persistent losses
            drove families to abandon their fields, and the region’s youth left for Mumbai
            and Pune in search of work. We started with a simple question: what could make
            farming here worth staying for?
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The answer was already growing everywhere — jackfruit. Abundant, resilient and
            remarkably versatile, yet most of the harvest went to waste for want of
            organised harvesting, processing and a route to market.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <ProductImage tint="#DCE4D5" name="The Konkan" />
        </div>
      </section>

      {/* the crop / research */}
      <section className="border-y border-line bg-paper">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2 md:py-20">
          <div className="order-2 mx-auto w-full max-w-md md:order-1">
            <ProductImage tint="#EFE2C2" name="86 varieties" />
          </div>
          <div className="order-1 max-w-prose md:order-2">
            <h2 className="font-serif text-2xl text-ink">Choosing the right fruit</h2>
            <p className="mt-4 leading-relaxed text-muted">
              We began by collecting and studying jackfruit from around the world —
              gathering 86 of the 128 varieties known globally. Working with agricultural
              experts, we selected the strains best suited to the Konkan for their
              resilience, nutrition and commercial potential.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Then came the harder part: turning that fruit into things people actually
              reach for — chips, flour, ready-to-eat meals and plant-based meat
              alternatives — through modern processing units that cut waste and return a
              fairer price to the farmer.
            </p>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="container-page py-14 md:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-line pl-5">
              <div className="font-serif text-5xl text-forest">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* founder */}
      <section className="border-t border-line bg-paper">
        <div className="container-page py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The founder</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              Mithilesh Desai — the Jackfruit King of India
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-prose">
            <p className="leading-relaxed text-muted">
              An agricultural engineer from Lanja, Ratnagiri, Mithilesh Desai has built the
              company’s farm-to-processing ecosystem from the ground up — establishing
              nurseries, identifying high-yield varieties, and training farmers in sustainable
              cultivation and processing so they sit inside the jackfruit value chain rather
              than at the edge of it.
            </p>
            <blockquote className="my-8 border-l-2 border-forest pl-6 font-serif text-2xl leading-snug text-ink">
              Whole jackfruit. Whole health. Zero waste.
            </blockquote>
            <p className="leading-relaxed text-muted">
              The aim is simple: rural prosperity, a reason for the next generation to stay in
              farming, and a lasting agricultural ecosystem in the Konkan.
            </p>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="container-page py-16 text-center md:py-20">
        <h2 className="font-serif text-3xl text-ink">Snack for a cause worth backing</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Every bag supports a farmer in the Konkan. Taste it, or stock it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button size="lg">Shop the chips</Button>
          </Link>
          <Link href="/wholesale">
            <Button size="lg" variant="secondary">
              Wholesale enquiries
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
