'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@jk/ui';
import { formatINR } from '@jk/core';
import { useCart, selectSubtotal } from '@/lib/cart-store';
import { useCheckout } from '@/lib/checkout-store';
import { useAddresses, selectSelectedAddress } from '@/lib/address-store';
import { useMounted } from '@/lib/use-mounted';
import { AddressBook } from './address-book';
import {
  SHIPPING_METHODS,
  shippingCost,
  validateCoupon,
  estimateDelivery,
} from '@/lib/checkout';

const field =
  'h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink outline-none placeholder:text-muted/50 focus:border-forest';

export function CheckoutReview() {
  const router = useRouter();
  const mounted = useMounted();

  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const { data, setData } = useCheckout();
  const address = useAddresses(selectSelectedAddress);

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [touched, setTouched] = useState(false);

  const estimate = useMemo(
    () => (address ? estimateDelivery(address.pincode) : null),
    [address],
  );

  const discount = useMemo(() => {
    if (!data.couponCode) return 0;
    const r = validateCoupon(data.couponCode, subtotal);
    return r.ok ? r.discountCents : 0;
  }, [data.couponCode, subtotal]);

  const shipping = shippingCost(data.shippingMethod, subtotal);
  const total = subtotal - discount + shipping;

  const emailError = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) ? '' : 'Enter a valid email.';
  const valid = !emailError && !!address;

  if (!mounted) return <div className="container-page py-24" />;

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">Your bag is empty</h1>
        <p className="mt-3 text-muted">Add a few chips before checking out.</p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button size="lg">Shop the chips</Button>
        </Link>
      </div>
    );
  }

  function applyCoupon() {
    const r = validateCoupon(couponInput, subtotal);
    if (r.ok) {
      setData({ couponCode: r.coupon.code });
      setCouponMsg({
        ok: true,
        text: `${r.coupon.code} applied — you saved ${formatINR(r.discountCents)}.`,
      });
    } else {
      setData({ couponCode: null });
      setCouponMsg({ ok: false, text: r.reason });
    }
  }

  function continueToPayment() {
    setTouched(true);
    if (!valid) return;
    router.push('/checkout/payment');
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-serif text-4xl text-ink">Checkout</h1>
      <p className="mt-2 text-muted">Review your details, then continue to payment.</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl text-ink">Contact</h2>
            <div className="mt-4 max-w-sm">
              <label className="mb-1.5 block text-sm text-muted">Email</label>
              <input
                className={field}
                type="email"
                value={data.email}
                onChange={(e) => setData({ email: e.target.value })}
                placeholder="you@email.com"
              />
              {touched && emailError ? (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              ) : null}
              <p className="mt-1.5 text-xs text-muted">
                We’ll send your order confirmation here.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">Delivery address</h2>
            <p className="mt-1 text-sm text-muted">
              Choose a saved address or add a new one.
            </p>
            <div className="mt-4">
              <AddressBook />
            </div>

            {estimate ? (
              <p className="mt-4 text-sm text-forest">
                {estimate.serviceable
                  ? `Delivers to ${estimate.city} in ${estimate.minDays}–${estimate.maxDays} days${
                      estimate.codAvailable ? ' · COD available' : ''
                    }.`
                  : 'We can ship here in 4–7 days (COD unavailable).'}
              </p>
            ) : null}
            {touched && !address ? (
              <p className="mt-2 text-xs text-red-600">Select a delivery address.</p>
            ) : null}
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">Shipping method</h2>
            <div className="mt-4 space-y-3">
              {SHIPPING_METHODS.map((m) => {
                const cost = m.cost(subtotal);
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 ${
                      data.shippingMethod === m.id
                        ? 'border-forest bg-forest-soft/40'
                        : 'border-line'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={data.shippingMethod === m.id}
                        onChange={() => setData({ shippingMethod: m.id })}
                        className="accent-forest"
                      />
                      <span>
                        <span className="block text-ink">{m.label}</span>
                        <span className="block text-sm text-muted">{m.eta}</span>
                      </span>
                    </span>
                    <span className="text-ink">{cost === 0 ? 'Free' : formatINR(cost)}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* -------- summary -------- */}
        <aside className="h-fit rounded-tile border border-line bg-paper p-6">
          <h2 className="font-serif text-xl text-ink">Order summary</h2>

          <ul className="mt-4 space-y-3 border-b border-line pb-4">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3 text-sm">
                <span className="text-ink">
                  {i.name} <span className="text-muted">× {i.qty}</span>
                </span>
                <span className="text-ink">{formatINR(i.priceCents * i.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="flex gap-2">
              <input
                className={field}
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
              />
              <Button variant="secondary" size="md" onClick={applyCoupon} className="shrink-0">
                Apply
              </Button>
            </div>
            {couponMsg ? (
              <p className={`mt-2 text-xs ${couponMsg.ok ? 'text-forest' : 'text-red-600'}`}>
                {couponMsg.text}
              </p>
            ) : null}
          </div>

          <dl className="mt-5 space-y-2.5 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            {discount > 0 ? (
              <Row label={`Discount (${data.couponCode})`} value={`−${formatINR(discount)}`} accent />
            ) : null}
            <Row label="Shipping" value={shipping === 0 ? 'Free' : formatINR(shipping)} />
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd className="font-serif text-lg">{formatINR(total)}</dd>
            </div>
          </dl>

          <Button size="lg" className="mt-6 w-full" onClick={continueToPayment}>
            Continue to payment
          </Button>
          {touched && !valid ? (
            <p className="mt-2 text-center text-xs text-red-600">
              Please complete the highlighted fields.
            </p>
          ) : null}
          <Link
            href="/cart"
            className="mt-3 block text-center text-sm text-muted hover:text-forest"
          >
            Back to bag
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${accent ? 'text-forest' : 'text-muted'}`}>
      <dt>{label}</dt>
      <dd className={accent ? '' : 'text-ink'}>{value}</dd>
    </div>
  );
}
