import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@jk/ui';
import { PageHero } from '@/components/page-hero';
import { NUTRITION_BY_PART } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Why Jackfruit',
  description:
    'The nutrition and research behind jackfruit — a low-GI, high-fibre crop used whole, with nothing wasted.',
};

const POINTS = [
  {
    title: 'Low glycemic, high fibre',
    body: 'Green jackfruit is naturally rich in dietary fibre and low on the glycemic index — which is why it works as a partial replacement for rice and wheat flour.',
  },
  {
    title: 'Abundant and resilient',
    body: 'A single tree yields a huge harvest with little water. We collected 86 of the 128 varieties known worldwide and grow those best suited to the Konkan.',
  },
  {
    title: 'Used whole, not wasted',
    body: 'Pulp, seeds, peel, core and leaves each have a use. That is the whole point of “Whole Jackfruit. Whole Health, Zero Waste.”',
  },
];

const RESEARCH = [
  {
    finding: 'Green jackfruit flour improved glycemic control in a randomised controlled trial.',
    detail:
      'In a randomised, double-blind, placebo-controlled study, 40 people with type 2 diabetes replaced an equal volume of rice or wheat flour with 30g/day of green jackfruit flour for 12 weeks. The jackfruit group saw a significantly greater reduction in HbA1c, fasting and post-meal glucose.',
    source: 'Nutrition & Diabetes (Nature), 2021;11:18 · CTRI/2019/05/019417',
    note: 'This study tested Jackfruit365™ flour, not a Jackfruit King product.',
  },
  {
    finding: 'Unripe jackfruit flour improved glycemic and cardiovascular markers.',
    detail:
      'A three-month study of 100 people with diabetes at Alappuzha Medical College found that partial dietary substitution with unripe jackfruit flour produced significant improvements in glycemic indices and cardiovascular risk markers compared with routine breakfast intake.',
    source: 'Current Nutrition and Food Science · led by Dr B Padmakumar',
  },
  {
    finding: 'Jackfruit seeds are a serious source of plant protein.',
    detail:
      'Often discarded, jackfruit seeds carry roughly 7–8g of protein per serving alongside dietary fibre, gut-friendly resistant starch and B vitamins — the reason we mill them rather than throw them away.',
    source: 'The Economic Times, June 2026',
  },
];

export default function WhyJackfruitPage() {
  return (
    <>
      <PageHero
        eyebrow="Nutrition & research"
        title="A crop that earns its place"
        intro="Jackfruit isn’t a novelty ingredient. It’s low-GI, high in fibre, abundant in the Konkan — and usable down to the peel."
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title}>
              <h2 className="font-serif text-2xl text-ink">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- zero waste: part → product, with key numbers ---------- */}
      <section className="border-y border-line bg-paper">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Zero waste</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-ink">
            Every part of the fruit goes somewhere
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-muted">
            A jackfruit is mostly thrown away — peel, core, seeds and all. Here is what each
            part contains, and what we turn it into.
          </p>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {NUTRITION_BY_PART.map((r) => (
              <div
                key={r.part}
                className="grid grid-cols-2 items-baseline gap-x-6 gap-y-2 py-5 md:grid-cols-[1.1fr_1.2fr_auto]"
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="font-serif text-lg text-ink">{r.part}</div>
                  <div className="text-sm text-muted">{r.compounds}</div>
                </div>
                <div className="text-sm text-forest">→ {r.becomes}</div>
                <dl className="flex gap-6 text-sm tabular-nums text-muted md:justify-end">
                  <div>
                    <dt className="text-xs uppercase tracking-label text-muted/70">Fibre</dt>
                    <dd className="text-ink">{r.fibre}g</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-muted/70">Protein</dt>
                    <dd className="text-ink">{r.protein}g</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-muted/70">Energy</dt>
                    <dd className="text-ink">{r.kcal}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Per 100g. Energy in kcal.</p>
        </div>
      </section>

      {/* ---------- full table ---------- */}
      <section className="container-page py-14 md:py-20">
        <p className="eyebrow">The full picture</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">Nutrition per 100g</h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[54rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-3 pr-4 font-medium text-ink">Part</th>
                {['Energy', 'Carbs', 'Protein', 'Fat', 'Fibre', 'Vit C', 'K', 'Ca', 'Fe', 'Mg'].map(
                  (h) => (
                    <th key={h} className="px-3 py-3 text-right font-medium text-ink">
                      {h}
                    </th>
                  ),
                )}
              </tr>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="pb-2 pr-4 font-normal" />
                {['kcal', 'g', 'g', 'g', 'g', 'mg', 'mg', 'mg', 'mg', 'mg'].map((u, i) => (
                  <th key={i} className="px-3 pb-2 text-right font-normal">
                    {u}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {NUTRITION_BY_PART.map((r) => (
                <tr key={r.part} className="border-b border-line/60">
                  <td className="py-3 pr-4 text-ink">{r.part}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.kcal}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.carbs}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.protein}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.fat}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.fibre}</td>
                  <td className="px-3 py-3 text-right text-muted">
                    {r.vitC == null ? '—' : r.vitC}
                  </td>
                  <td className="px-3 py-3 text-right text-muted">{r.potassium}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.calcium}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.iron}</td>
                  <td className="px-3 py-3 text-right text-muted">{r.magnesium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted">
          Indicative values per 100g, compiled from Jackfruit King’s nutrition sheet. Actual
          figures vary by variety, season and processing.
        </p>
      </section>

      {/* ---------- research ---------- */}
      <section className="border-t border-line bg-paper">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">The research</p>
          <h2 className="mt-3 font-serif text-3xl text-ink">What the studies say</h2>

          <div className="mt-10 space-y-10">
            {RESEARCH.map((r) => (
              <article key={r.source} className="max-w-prose border-l border-line pl-6">
                <h3 className="font-serif text-xl leading-snug text-ink">{r.finding}</h3>
                <p className="mt-3 leading-relaxed text-muted">{r.detail}</p>
                <p className="mt-3 text-sm text-forest">{r.source}</p>
                {r.note ? <p className="mt-1 text-xs text-muted">{r.note}</p> : null}
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-prose text-xs leading-relaxed text-muted">
            The research above concerns green jackfruit and jackfruit seeds as foods. It is
            shared for information only. Jackfruit King products are foods, not medicines: they
            are not intended to diagnose, treat, cure or prevent any disease. If you are managing
            diabetes, blood pressure or any medical condition, talk to your doctor before
            changing your diet or medication.
          </p>
        </div>
      </section>

      <section className="container-page py-16 text-center md:py-20">
        <h2 className="font-serif text-3xl text-ink">Put it to work</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button size="lg">See the range</Button>
          </Link>
          <Link href="/wholesale">
            <Button size="lg" variant="secondary">
              Bulk supply
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
