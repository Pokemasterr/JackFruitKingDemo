'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@jk/ui';
import type { FeaturedProduct, Track } from '@/lib/catalog';
import { ProductCard } from './product-card';

type Sort = 'featured' | 'price-asc' | 'price-desc';
type Filter = 'all' | Track;

const FILTERS: { value: Filter; label: string; hint: string }[] = [
  { value: 'all', label: 'Everything', hint: 'The full range' },
  { value: 'retail', label: 'Shop packs', hint: 'Consumer packs, ready to buy' },
  { value: 'ingredient', label: 'Bulk ingredients', hint: 'B2B supply, quote on request' },
];

const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

export function ShopBrowser({ products }: { products: FeaturedProduct[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('featured');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;

    if (filter !== 'all') list = list.filter((p) => p.track === filter);

    if (q) {
      list = list.filter((p) =>
        [p.name, p.positioning, p.description, ...p.applications].some((s) =>
          s.toLowerCase().includes(q),
        ),
      );
    }

    const sorted = [...list];
    if (sort !== 'featured') {
      // Unpriced (bulk) lines always sort last.
      sorted.sort((a, b) => {
        if (a.priceCents == null) return 1;
        if (b.priceCents == null) return -1;
        return sort === 'price-asc'
          ? a.priceCents - b.priceCents
          : b.priceCents - a.priceCents;
      });
    }
    return sorted;
  }, [products, query, filter, sort]);

  const activeHint = FILTERS.find((f) => f.value === filter)?.hint;

  return (
    <div>
      {/* track tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm transition-colors',
              filter === f.value
                ? 'border-forest bg-forest text-cream'
                : 'border-line text-muted hover:bg-stone/50',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {activeHint ? <p className="mt-3 text-sm text-muted">{activeHint}</p> : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products & applications…"
            className="h-11 w-full rounded-full border border-line bg-paper pl-10 pr-4 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-forest"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none focus:border-forest"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? 'product' : 'products'}
        {query ? ` matching “${query}”` : ''}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">
          Nothing matches that — try “flour”, “vegan” or “bakery”.
        </p>
      )}
    </div>
  );
}
