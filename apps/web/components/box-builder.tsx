'use client';

import { useMemo, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@jk/ui';
import { formatINR } from '@jk/core';
import { RETAIL_PRODUCTS, BUILD_A_BOX_FLAVORS } from '@/lib/catalog';
import { useCart } from '@/lib/cart-store';

const BOX_SIZE = 6;
const DISCOUNT = 0.15;

const PRICE_BY_NAME = new Map(RETAIL_PRODUCTS.map((p) => [p.name, p.priceCents]));
const SIZE_BY_NAME = new Map(RETAIL_PRODUCTS.map((p) => [p.name, p.size]));

const EMPTY = Object.fromEntries(BUILD_A_BOX_FLAVORS.map((f) => [f, 0]));

export function BoxBuilder() {
  const addItem = useCart((s) => s.addItem);
  const [counts, setCounts] = useState<Record<string, number>>({ ...EMPTY });

  const total = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts],
  );

  const subtotal = useMemo(
    () =>
      Object.entries(counts).reduce(
        (sum, [name, n]) => sum + (PRICE_BY_NAME.get(name) ?? 0) * n,
        0,
      ),
    [counts],
  );

  const discount = Math.round(subtotal * DISCOUNT);
  const complete = total === BOX_SIZE;
  const remaining = BOX_SIZE - total;

  function addBox() {
    if (!complete) return;
    const contents = BUILD_A_BOX_FLAVORS.filter((f) => (counts[f] ?? 0) > 0)
      .map((f) => `${counts[f]}× ${f}`)
      .join(', ');
    addItem(
      {
        id: `box-${Date.now()}`,
        slug: 'build-a-box',
        name: 'Build-a-box (6 bags)',
        priceCents: subtotal - discount,
        size: contents,
        tint: '#DCE4D5',
      },
      1,
    );
    setCounts({ ...EMPTY });
  }

  function change(name: string, delta: number) {
    setCounts((prev) => {
      const next = Math.max(0, (prev[name] ?? 0) + delta);
      const others = total - (prev[name] ?? 0);
      if (others + next > BOX_SIZE) return prev; // don't exceed the box
      return { ...prev, [name]: next };
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="divide-y divide-line border-y border-line">
        {BUILD_A_BOX_FLAVORS.map((name) => {
          const price = PRICE_BY_NAME.get(name) ?? 0;
          const n = counts[name] ?? 0;
          return (
            <div key={name} className="flex items-center justify-between gap-4 py-4">
              <div>
                <div className="font-serif text-lg text-ink">{name}</div>
                <div className="text-sm text-muted">
                  {formatINR(price)} · {SIZE_BY_NAME.get(name)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => change(name, -1)}
                  disabled={n === 0}
                  aria-label={`Remove ${name}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink disabled:opacity-40 hover:enabled:bg-stone/60"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-medium tabular-nums">{n}</span>
                <button
                  onClick={() => change(name, 1)}
                  disabled={complete}
                  aria-label={`Add ${name}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink disabled:opacity-40 hover:enabled:bg-stone/60"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded-tile border border-line bg-paper p-6">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">Your box</span>
          <span className="text-sm text-muted">
            {total} / {BOX_SIZE}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone">
          <div
            className="h-full bg-forest transition-all"
            style={{ width: `${(total / BOX_SIZE) * 100}%` }}
          />
        </div>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd>{formatINR(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-forest">
            <dt>Box discount (15%)</dt>
            <dd>−{formatINR(discount)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 font-medium text-ink">
            <dt>Total</dt>
            <dd className="font-serif text-lg">{formatINR(subtotal - discount)}</dd>
          </div>
        </dl>

        <Button className="mt-6 w-full" size="lg" disabled={!complete} onClick={addBox}>
          {complete ? 'Add box to cart' : `Add ${remaining} more`}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">
          Mix any six bags and save 15%.
        </p>
      </aside>
    </div>
  );
}
