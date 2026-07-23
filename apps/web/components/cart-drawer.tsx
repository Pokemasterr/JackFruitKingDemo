'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@jk/ui';
import { formatINR, FREE_SHIPPING_THRESHOLD_CENTS } from '@jk/core';
import { useCart, selectSubtotal } from '@/lib/cart-store';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100);

  // Conditional render (no AnimatePresence) so closing fully unmounts the panel
  // and its backdrop — no lingering invisible layer that would eat clicks.
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-forest-deep/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={close}
      />
      <motion.aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-cream"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        role="dialog"
        aria-label="Shopping bag"
      >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-serif text-xl text-ink">Your bag</h2>
              <button
                onClick={close}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-stone/60"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-stone">
                  <ShoppingBag className="h-6 w-6 text-forest" />
                </div>
                <p className="text-muted">Your bag is empty.</p>
                <Button onClick={close}>Keep shopping</Button>
              </div>
            ) : (
              <>
                {/* free-shipping progress */}
                <div className="border-b border-line px-6 py-4">
                  <p className="text-sm text-muted">
                    {remaining > 0 ? (
                      <>
                        You’re <span className="font-medium text-ink">{formatINR(remaining)}</span>{' '}
                        away from free shipping.
                      </>
                    ) : (
                      <span className="font-medium text-forest">
                        You’ve unlocked free shipping.
                      </span>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone">
                    <div
                      className="h-full rounded-full bg-forest transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-line py-4">
                      <div
                        className="grid h-16 w-16 shrink-0 place-items-center rounded-tile border border-line font-serif text-sm text-forest-deep/70"
                        style={{ backgroundColor: item.tint }}
                      >
                        JK
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <div className="font-serif text-ink">{item.name}</div>
                            <div className="text-xs text-muted">{item.size}</div>
                          </div>
                          <div className="text-sm font-medium text-ink">
                            {formatINR(item.priceCents * item.qty)}
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              aria-label={`Decrease ${item.name}`}
                              className="grid h-7 w-7 place-items-center rounded-full border border-line text-ink hover:bg-stone/60"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm tabular-nums">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              aria-label={`Increase ${item.name}`}
                              className="grid h-7 w-7 place-items-center rounded-full border border-line text-ink hover:bg-stone/60"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-muted underline-offset-2 hover:text-forest hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-serif text-xl text-ink">{formatINR(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Shipping &amp; taxes calculated at checkout.
                  </p>
                  <Link href="/checkout" onClick={close} className="mt-4 block">
                    <Button size="lg" className="w-full">
                      Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="mt-3 block text-center text-sm text-muted hover:text-forest"
                  >
                    View full bag
                  </Link>
                </footer>
              </>
            )}
      </motion.aside>
    </>
  );
}
