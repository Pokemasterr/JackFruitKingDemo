import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@jk/ui';
import { formatINR } from '@jk/core';
import type { FeaturedProduct } from '@/lib/catalog';
import { ProductImage } from './product-image';
import { AddToBagButton } from './add-to-bag-button';

export function ProductCard({ product }: { product: FeaturedProduct }) {
  const isRetail = product.track === 'retail' && product.priceCents != null;

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="relative block">
        <ProductImage tint={product.tint} name={product.name} size={product.size} />
        {product.flag ? (
          <Badge tone={product.flagTone ?? 'forest'} className="absolute left-3 top-3">
            {product.flag}
          </Badge>
        ) : null}
        {!isRetail ? (
          <Badge tone="neutral" className="absolute right-3 top-3">
            Bulk supply
          </Badge>
        ) : null}
      </Link>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg text-ink">
            <Link href={`/product/${product.slug}`} className="hover:text-forest">
              {product.name}
            </Link>
          </h3>
          {isRetail ? (
            <div className="shrink-0 font-sans text-[15px] font-medium text-ink">
              {formatINR(product.priceCents!)}
            </div>
          ) : null}
        </div>

        <p className="mt-0.5 text-sm text-forest">{product.positioning}</p>
        <p className="mt-1.5 text-sm leading-snug text-muted">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted">{product.size}</span>
          {isRetail ? (
            <AddToBagButton product={product} />
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-deep"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
