'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Banknote, ShieldCheck } from 'lucide-react';
import { Button, cn } from '@jk/ui';
import { formatINR, MOCK_TEST_CARD, MOCK_OTP } from '@jk/core';
import { useCart, selectSubtotal } from '@/lib/cart-store';
import { useCheckout } from '@/lib/checkout-store';
import { useAddresses, selectSelectedAddress } from '@/lib/address-store';
import { useMounted } from '@/lib/use-mounted';
import { shippingCost, validateCoupon, estimateDelivery } from '@/lib/checkout';
import { saveOrder, newOrderNumber, type Order, type PaymentMethod } from '@/lib/orders';

const TEST_CARD_DIGITS = MOCK_TEST_CARD.replace(/\s/g, '');

const field =
  'h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink outline-none placeholder:text-muted/50 focus:border-forest';

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: 'UPI', label: 'UPI', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'CARD', label: 'Card', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'COD', label: 'Cash on Delivery', icon: <Banknote className="h-4 w-4" /> },
];

export function PaymentFlow() {
  const router = useRouter();
  const mounted = useMounted();

  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const { data, reset: resetCheckout } = useCheckout();
  const address = useAddresses(selectSelectedAddress);

  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [step, setStep] = useState<'method' | 'otp'>('method');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upi, setUpi] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const discount = useMemo(() => {
    if (!data.couponCode) return 0;
    const r = validateCoupon(data.couponCode, subtotal);
    return r.ok ? r.discountCents : 0;
  }, [data.couponCode, subtotal]);

  const shipping = shippingCost(data.shippingMethod, subtotal);
  const total = subtotal - discount + shipping;

  if (!mounted) return <div className="container-page py-24" />;

  if (items.length === 0 || !data.email || !address) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">Nothing to pay for yet</h1>
        <p className="mt-3 text-muted">Add items and complete the checkout details first.</p>
        <Link href="/checkout" className="mt-6 inline-block">
          <Button size="lg">Go to checkout</Button>
        </Link>
      </div>
    );
  }

  function placeOrder(pm: PaymentMethod) {
    if (!address) return;
    const est = estimateDelivery(address.pincode);
    const orderNumber = newOrderNumber();
    const order: Order = {
      id: orderNumber,
      orderNumber,
      createdAt: new Date().toISOString(),
      email: data.email,
      phone: address.phone,
      address: {
        fullName: address.fullName,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      items: items.map((i) => ({ name: i.name, size: i.size, priceCents: i.priceCents, qty: i.qty })),
      subtotalCents: subtotal,
      discountCents: discount,
      shippingCents: shipping,
      totalCents: total,
      couponCode: data.couponCode,
      paymentMethod: pm,
      status: pm === 'COD' ? 'PENDING' : 'PAID',
      estMinDays: est?.serviceable ? est.minDays : data.shippingMethod === 'express' ? 1 : 2,
      estMaxDays: est?.serviceable ? est.maxDays : data.shippingMethod === 'express' ? 2 : 5,
    };
    saveOrder(order);
    useCart.getState().clear();
    resetCheckout();
    router.push(`/order/success/${order.id}`);
  }

  function onPay() {
    setError('');
    if (method === 'COD') {
      placeOrder('COD');
      return;
    }
    if (method === 'CARD') {
      if (card.number.replace(/\s/g, '') !== TEST_CARD_DIGITS) {
        setError('Your card was declined. Please check the details and try again.');
        return;
      }
      if (!card.expiry.trim() || !card.cvv.trim() || !card.name.trim()) {
        setError('Complete the card details.');
        return;
      }
    }
    if (method === 'UPI' && !/^[\w.\-]{2,}@[\w.\-]{2,}$/.test(upi.trim())) {
      setError('Enter a valid UPI ID (e.g. name@bank).');
      return;
    }
    setStep('otp'); // mock provider "sends" an OTP
  }

  function onVerify() {
    if (otp.trim() !== MOCK_OTP) {
      setError('That code doesn’t match. Please try again.');
      return;
    }
    placeOrder(method);
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-serif text-4xl text-ink">Payment</h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <ShieldCheck className="h-4 w-4 text-forest" /> Your payment details are encrypted and
        secure.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {step === 'method' ? (
            <>
              {/* method tabs */}
              <div className="grid grid-cols-3 gap-2">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMethod(m.id);
                      setError('');
                    }}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm',
                      method === m.id
                        ? 'border-forest bg-forest-soft/40 text-ink'
                        : 'border-line text-muted hover:bg-stone/50',
                    )}
                  >
                    {m.icon}
                    <span className="hidden sm:inline">{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-tile border border-line bg-paper p-6">
                {method === 'CARD' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm text-muted">Card number</label>
                      <input
                        className={field}
                        inputMode="numeric"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-muted">Expiry</label>
                        <input
                          className={field}
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-muted">CVV</label>
                        <input
                          className={field}
                          inputMode="numeric"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm text-muted">Name on card</label>
                      <input
                        className={field}
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                  </div>
                ) : method === 'UPI' ? (
                  <div className="space-y-3">
                    <label className="block text-sm text-muted">UPI ID</label>
                    <input
                      className={field}
                      value={upi}
                      onChange={(e) => setUpi(e.target.value)}
                      placeholder="name@bank"
                    />
                    <p className="text-xs text-muted">
                      You’ll confirm the payment with a one-time code sent to your phone.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted">
                    Pay in cash when your order arrives. No online confirmation needed.
                  </p>
                )}
              </div>

              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

              <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={onPay}>
                {method === 'COD' ? 'Place order' : `Pay ${formatINR(total)}`}
              </Button>
            </>
          ) : (
            /* -------- OTP step -------- */
            <div className="max-w-sm rounded-tile border border-line bg-paper p-6">
              <h2 className="font-serif text-xl text-ink">Enter OTP</h2>
              <p className="mt-1.5 text-sm text-muted">
                We sent a one-time code to {address.phone}. Enter it below to confirm your
                payment.
              </p>
              <input
                className={cn(field, 'mt-4 text-center text-lg tracking-[0.4em]')}
                type="password"
                autoComplete="one-time-code"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                placeholder="••••••"
              />
              {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
              <Button size="lg" className="mt-5 w-full" onClick={onVerify}>
                Verify &amp; pay {formatINR(total)}
              </Button>
              <button
                onClick={() => {
                  setStep('method');
                  setOtp('');
                  setError('');
                }}
                className="mt-3 w-full text-center text-sm text-muted hover:text-forest"
              >
                Back to payment options
              </button>
            </div>
          )}
        </div>

        {/* -------- summary -------- */}
        <aside className="h-fit rounded-tile border border-line bg-paper p-6">
          <h2 className="font-serif text-xl text-ink">Summary</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="text-ink">{formatINR(subtotal)}</dd>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between text-forest">
                <dt>Discount ({data.couponCode})</dt>
                <dd>−{formatINR(discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-muted">
              <dt>Shipping</dt>
              <dd className="text-ink">{shipping === 0 ? 'Free' : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd className="font-serif text-lg">{formatINR(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-5 block text-center text-sm text-muted hover:text-forest"
          >
            Back to review
          </Link>
        </aside>
      </div>
    </div>
  );
}

function formatCard(v: string): string {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
