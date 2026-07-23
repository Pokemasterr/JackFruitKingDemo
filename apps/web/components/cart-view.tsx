'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@jk/ui';
import { formatINR, shippingFor, FREE_SHIPPING_THRESHOLD_CENTS } from '@jk/core';
import { useCart, selectSubtotal } from '@/lib/cart-store';
import { useMounted } from '@/lib/use-mounted';

export function CartView() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);
  const mounted = useMounted();

  // Avoid a hydration flash: render nothing definitive until mounted.
  if (!mounted) {
    return <div className="container-page py-24" />;
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center md:py-32">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-stone">
          <ShoppingBag className="h-7 w-7 text-forest" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-ink">Your bag is empty</h1>
        <p className="mt-3 max-w-sm text-muted">
          Nothing here yet. Pick a bestseller or build a box of six and save 15%.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button size="lg">Shop the chips</Button>
          </Link>
          <Link href="/build-a-box">
            <Button size="lg" variant="secondary">
              Build a box
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-serif text-4xl text-ink">Your bag</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="border-t border-line">
          {items.map((item) => (
            <div key={item.id} className="flex gap-5 border-b border-line py-6">
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-tile border border-line font-serif text-forest-deep/70"
                style={{ backgroundColor: item.tint }}
              >
                JK
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <div className="font-serif text-lg text-ink">{item.name}</div>
                    <div className="text-sm text-muted">{item.size}</div>
                  </div>
                  <div className="font-medium text-ink">
                    {formatINR(item.priceCents * item.qty)}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label={`Decrease ${item.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink hover:bg-stone/60"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center tabular-nums">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label={`Increase ${item.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink hover:bg-stone/60"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-muted underline-offset-2 hover:text-forest hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-tile border border-line bg-paper p-6">
          <h2 className="font-serif text-xl text-ink">Order summary</h2>
          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="text-ink">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Shipping</dt>
              <dd className="text-ink">{shipping === 0 ? 'Free' : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd className="font-serif text-lg">{formatINR(total)}</dd>
            </div>
          </dl>

          {remaining > 0 ? (
            <p className="mt-4 text-xs text-muted">
              Add {formatINR(remaining)} more for free shipping.
            </p>
          ) : null}

          <Link href="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full">
              Proceed to checkout
            </Button>
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm text-muted hover:text-forest"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
