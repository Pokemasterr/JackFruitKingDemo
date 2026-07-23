'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@jk/ui';
import { formatINR } from '@jk/core';
import { getOrder, type Order } from '@/lib/orders';
import { useMounted } from '@/lib/use-mounted';

const CONFETTI_COLORS = ['#2E5A43', '#C79A3E', '#8FBAA4', '#DCE4D5'];

export function OrderSuccess({ id }: { id: string }) {
  const mounted = useMounted();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrder(getOrder(id));
  }, [id]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 6,
      })),
    [],
  );

  if (!mounted) return <div className="container-page py-24" />;

  if (!order) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">Order not found</h1>
        <p className="mt-3 text-muted">We couldn’t find that order on this device.</p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button size="lg">Back to shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-[2px]"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 1.6,
              backgroundColor: c.color,
              animation: `confetti-fall ${c.duration}s linear ${c.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative py-16 text-center md:py-20">
        <motion.div
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-cream"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </motion.div>

        <h1 className="mt-6 font-serif text-4xl text-ink sm:text-5xl">Thank you!</h1>
        <p className="mt-3 text-muted">
          Order <span className="font-medium text-ink">{order.orderNumber}</span> is confirmed
          {order.paymentMethod === 'COD' ? ' (cash on delivery)' : ''}. A receipt is on its way to{' '}
          {order.email}.
        </p>
        <p className="mt-1 text-sm text-muted">
          Estimated delivery in {order.estMinDays}–{order.estMaxDays} working days.
        </p>

        {/* summary card */}
        <div className="mx-auto mt-10 max-w-md rounded-tile border border-line bg-paper p-6 text-left">
          <ul className="space-y-3 border-b border-line pb-4">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-3 text-sm">
                <span className="text-ink">
                  {it.name} <span className="text-muted">× {it.qty}</span>
                </span>
                <span className="text-ink">{formatINR(it.priceCents * it.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="text-ink">{formatINR(order.subtotalCents)}</dd>
            </div>
            {order.discountCents > 0 ? (
              <div className="flex justify-between text-forest">
                <dt>Discount ({order.couponCode})</dt>
                <dd>−{formatINR(order.discountCents)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-muted">
              <dt>Shipping</dt>
              <dd className="text-ink">
                {order.shippingCents === 0 ? 'Free' : formatINR(order.shippingCents)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 font-medium text-ink">
              <dt>Total paid</dt>
              <dd className="font-serif text-base">{formatINR(order.totalCents)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-muted">
            Shipping to {order.address.fullName}, {order.address.city} {order.address.pincode}.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={`/order/track/${order.id}`}>
            <Button size="lg">Track order</Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="secondary">
              Continue shopping
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted">
          <Link href="/" className="text-forest hover:text-forest-deep">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
