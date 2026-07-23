/** Money helpers. All amounts are integer paise (₹1 = 100 paise). */

export const FREE_SHIPPING_THRESHOLD_CENTS = 49900; // ₹499
export const FLAT_SHIPPING_CENTS = 4900; // ₹49

/** Format paise as an INR string, e.g. 14900 → "₹149". */
export function formatINR(paise: number): string {
  const rupees = paise / 100;
  const hasFraction = paise % 100 !== 0;
  return `₹${rupees.toLocaleString('en-IN', {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function shippingFor(subtotalCents: number): number {
  if (subtotalCents <= 0) return 0;
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;
}

/** Discount in paise for a percent/fixed coupon against a subtotal. */
export function discountFor(
  subtotalCents: number,
  coupon: { type: 'PERCENT' | 'FIXED'; value: number; minSubtotalCents: number },
): number {
  if (subtotalCents < coupon.minSubtotalCents) return 0;
  const raw =
    coupon.type === 'PERCENT'
      ? Math.round((subtotalCents * coupon.value) / 100)
      : coupon.value;
  return Math.min(raw, subtotalCents);
}
