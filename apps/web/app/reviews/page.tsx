import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'What snackers say about Jackfruit King chips.',
};

const REVIEWS = [
  { body: 'These quietly replaced my crisp habit. The chilli one is the pick.', author: 'Aarav M.', flavor: 'Chilli Kick', rating: 5 },
  { body: 'Build-your-own-box is genius — everyone at home picks their own.', author: 'Priya S.', flavor: 'Variety box', rating: 5 },
  { body: 'Actually healthy and actually good. A rare combination. Reordered twice.', author: 'Karan D.', flavor: 'Sea Salt', rating: 5 },
  { body: 'The honey glaze is dangerous. Gone in one sitting, no regrets.', author: 'Meera R.', flavor: 'Honey Glaze', rating: 5 },
  { body: 'Proper pepper heat without being a gimmick. My desk-drawer staple now.', author: 'Vikram T.', flavor: 'Pepper Crush', rating: 4 },
  { body: 'Tastes just like the masala from my college canteen. Instant nostalgia.', author: 'Neha D.', flavor: 'Tangy Masala', rating: 5 },
];

export default function ReviewsPage() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <>
      <PageHero
        eyebrow="Kind words"
        title="Snackers said it"
        intro="Real reviews from real orders. Leave your own after your next box lands."
      />

      <div className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-baseline gap-3 border-b border-line pb-8">
          <span className="font-serif text-5xl text-ink">{avg}</span>
          <span className="text-mustard">★★★★★</span>
          <span className="text-muted">based on {REVIEWS.length} verified reviews</span>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="border-l border-line pl-6">
              <div className="text-mustard" aria-label={`${r.rating} of 5`}>
                {'★'.repeat(r.rating)}
                <span className="text-line">{'★'.repeat(5 - r.rating)}</span>
              </div>
              <blockquote className="mt-3 font-serif text-lg leading-relaxed text-ink">
                “{r.body}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">
                {r.author} · {r.flavor}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-14 text-center text-muted">
          Ordered already?{' '}
          <Link href="/shop" className="font-medium text-forest hover:text-forest-deep">
            Find your flavour
          </Link>{' '}
          and leave a review.
        </p>
      </div>
    </>
  );
}
