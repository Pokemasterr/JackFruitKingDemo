'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, CornerDownLeft, Package, FileText } from 'lucide-react';
import { cn } from '@jk/ui';
import { formatINR } from '@jk/core';
import { useSearch } from '@/lib/search-store';
import { PRODUCTS } from '@/lib/catalog';

type Group = 'Products' | 'Pages';
type Item = {
  id: string;
  group: Group;
  label: string;
  sub?: string;
  href: string;
  priceCents?: number;
  keywords?: string[];
};

const PAGES: Item[] = [
  { id: 'p-shop', group: 'Pages', label: 'Shop all chips', href: '/shop', keywords: ['shop', 'products', 'flavours'] },
  { id: 'p-box', group: 'Pages', label: 'Build a box', href: '/build-a-box', keywords: ['bundle', 'mix', 'custom'] },
  { id: 'p-why', group: 'Pages', label: 'Why jackfruit', href: '/why-jackfruit', keywords: ['nutrition', 'fibre', 'health'] },
  { id: 'p-about', group: 'Pages', label: 'Our story', href: '/about', keywords: ['founder', 'farm', 'about'] },
  { id: 'p-reviews', group: 'Pages', label: 'Reviews', href: '/reviews', keywords: ['ratings', 'testimonials'] },
  { id: 'p-wholesale', group: 'Pages', label: 'Wholesale', href: '/wholesale', keywords: ['stockist', 'bulk', 'partner'] },
  { id: 'p-contact', group: 'Pages', label: 'Contact', href: '/contact', keywords: ['help', 'support', 'email'] },
  { id: 'p-cart', group: 'Pages', label: 'Your bag', href: '/cart', keywords: ['cart', 'checkout'] },
];

const PRODUCT_ITEMS: Item[] = PRODUCTS.map((p) => ({
  id: `prod-${p.slug}`,
  group: 'Products',
  label: p.name,
  sub: p.positioning,
  href: `/product/${p.slug}`,
  priceCents: p.priceCents ?? undefined,
  keywords: [...p.applications, p.track === 'ingredient' ? 'bulk b2b wholesale' : 'buy pack'],
}));

const ALL: Item[] = [...PRODUCT_ITEMS, ...PAGES];

export function CommandPalette() {
  const { isOpen, close, toggle } = useSearch();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K / Ctrl+K to toggle, Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle, close]);

  // Reset + focus when opened.
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL;
    return ALL.filter((it) =>
      [it.label, it.sub, ...(it.keywords ?? [])]
        .filter(Boolean)
        .some((s) => (s as string).toLowerCase().includes(q)),
    );
  }, [query]);

  useEffect(() => setActive(0), [query]);

  if (!isOpen) return null;

  function select(it?: Item) {
    if (!it) return;
    close();
    router.push(it.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      select(results[active]);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-forest-deep/30 px-4 pt-[12vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      onClick={close}
    >
      <motion.div
        className="w-full max-w-xl overflow-hidden rounded-tile border border-line bg-cream shadow-soft"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search products & pages…"
            className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/60"
            aria-label="Search products and pages"
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 text-[11px] text-muted sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              No matches. Try “masala”, “box”, or “story”.
            </p>
          ) : (
            results.map((it, i) => {
              const prev = results[i - 1];
              const showHeader = !prev || prev.group !== it.group;
              const isActive = i === active;
              return (
                <Fragment key={it.id}>
                  {showHeader ? (
                    <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-label text-muted">
                      {it.group}
                    </div>
                  ) : null}
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(it)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left',
                      isActive ? 'bg-forest-soft/50' : 'hover:bg-stone/50',
                    )}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-paper text-forest">
                      {it.group === 'Products' ? (
                        <Package className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-ink">{it.label}</span>
                      {it.sub ? (
                        <span className="block truncate text-xs text-muted">{it.sub}</span>
                      ) : null}
                    </span>
                    {it.priceCents != null ? (
                      <span className="shrink-0 text-sm text-muted">{formatINR(it.priceCents)}</span>
                    ) : null}
                    {isActive ? (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted" />
                    ) : null}
                  </button>
                </Fragment>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
