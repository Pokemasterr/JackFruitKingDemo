import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { Badge, Button } from '@jk/ui';
import { formatINR } from '@jk/core';
import { ProductImage } from '@/components/product-image';
import { AddToBagButton } from '@/components/add-to-bag-button';
import { PRODUCTS, productBySlug } from '@/lib/catalog';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: 'Not found' };
  return { title: product.name, description: product.positioning };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const isRetail = product.track === 'retail' && product.priceCents != null;

  return (
    <div className="container-page py-10 md:py-16">
      <nav className="mb-8 text-sm text-muted">
        <Link href="/shop" className="hover:text-forest">
          Products
        </Link>{' '}
        <span className="text-line">/</span> <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="mx-auto w-full max-w-md">
          <ProductImage tint={product.tint} name={product.name} size={product.size} />
        </div>

        <div>
          {product.flag ? (
            <Badge tone={product.flagTone ?? 'forest'}>{product.flag}</Badge>
          ) : null}
          <h1 className="mt-3 font-serif text-4xl text-ink">{product.name}</h1>
          <p className="mt-2 text-lg text-forest">{product.positioning}</p>

          <p className="mt-6 max-w-prose leading-relaxed text-muted">{product.description}</p>

          {isRetail ? (
            <>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-3xl text-ink">
                  {formatINR(product.priceCents!)}
                </span>
                <span className="text-sm text-muted">· {product.size}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <AddToBagButton
                  product={product}
                  variant="primary"
                  size="lg"
                  label={`Add to bag · ${formatINR(product.priceCents!)}`}
                />
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-tile border border-line bg-paper p-5">
              <p className="text-sm text-muted">Supplied in bulk — {product.size}.</p>
              <p className="mt-1 text-sm text-muted">
                Pricing depends on volume, format and specification.
              </p>
              <Link href={`/wholesale?product=${product.slug}`} className="mt-4 inline-block">
                <Button size="lg">Request a quote</Button>
              </Link>
            </div>
          )}

          {/* nutrition highlights */}
          <div className="mt-10">
            <h2 className="eyebrow">Nutrition highlights</h2>
            <ul className="mt-3 space-y-2">
              {product.nutrition.map((n) => (
                <li key={n} className="flex items-start gap-2 text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* applications + supply */}
      <section className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">Applications</h2>
          <ul className="mt-4 space-y-2.5">
            {product.applications.map((a) => (
              <li key={a} className="flex items-start gap-2 text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-ink">Supply</h2>
          <ul className="mt-4 space-y-2.5">
            {product.supply.map((s) => (
              <li key={s} className="flex items-start gap-2 text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mustard" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-10 max-w-prose text-xs leading-relaxed text-muted">
        *Nutrition statements describe the ingredient as part of a balanced diet and are not
        intended to diagnose, treat, cure or prevent any disease.{' '}
        <Link href="/why-jackfruit" className="text-forest hover:text-forest-deep">
          See the research <ArrowRight className="inline h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}
