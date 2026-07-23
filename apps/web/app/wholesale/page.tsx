import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { QuoteForm } from '@/components/quote-form';

export const metadata: Metadata = {
  title: 'Bulk & Wholesale',
  description:
    'Bulk jackfruit flour, seed powder, chunks and bulbs — supplied to bakeries, plant-based brands, HORECA and nutraceutical manufacturers.',
};

const STRENGTHS = [
  ['600 kg/day', 'Flour processing capacity, and scaling.'],
  ['Year-round', 'Cold and dry storage keeps supply steady off-season.'],
  ['Custom formulation', 'We develop to your spec, format and particle size.'],
];

export default async function WholesalePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="For partners"
        title="Bulk supply & product innovation"
        intro="We supply functional jackfruit ingredients to bakeries, plant-based brands, HORECA kitchens and nutraceutical manufacturers — from a farm-to-processing ecosystem in Lanja, Ratnagiri."
      />

      <section className="container-page grid gap-10 py-14 md:grid-cols-3">
        {STRENGTHS.map(([title, body]) => (
          <div key={title}>
            <h2 className="font-serif text-2xl text-forest">{title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-line bg-paper">
        <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div>
            <h2 className="font-serif text-3xl text-ink">Request a quote</h2>
            <p className="mt-2 text-muted">
              Tell us what you’re building and we’ll come back with specs and pricing.
            </p>
            <div className="mt-8">
              <QuoteForm defaultProduct={product ?? ''} />
            </div>
          </div>

          <aside className="h-fit space-y-6 text-muted">
            <div>
              <h3 className="eyebrow">Talk to us</h3>
              <p className="mt-2 text-ink">+91 8275455176</p>
              <p className="text-ink">jackfruitkingfpo@gmail.com</p>
            </div>
            <div>
              <h3 className="eyebrow">Where we are</h3>
              <p className="mt-2 leading-relaxed">
                Lanja, Ratnagiri
                <br />
                Maharashtra, India
              </p>
            </div>
            <div>
              <h3 className="eyebrow">Open for</h3>
              <p className="mt-2 leading-relaxed">
                Bulk supply, private label, co-development and product innovation.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
