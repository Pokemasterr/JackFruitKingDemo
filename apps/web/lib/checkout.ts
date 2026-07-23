import { shippingFor, discountFor } from '@jk/core';

/**
 * Client-side checkout helpers. These mirror the seeded coupon / pincode data
 * and the `@jk/core` money rules so the flow is real today; they move behind
 * server actions + Postgres once the DB is wired.
 */

export type Coupon = {
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  minSubtotalCents: number;
};

// Mirrors the seeded WELCOME10 coupon (packages/db seed).
export const COUPONS: Record<string, Coupon> = {
  WELCOME10: { code: 'WELCOME10', type: 'PERCENT', value: 10, minSubtotalCents: 0 },
};

export function validateCoupon(
  raw: string,
  subtotalCents: number,
): { ok: true; coupon: Coupon; discountCents: number } | { ok: false; reason: string } {
  const code = raw.trim().toUpperCase();
  if (!code) return { ok: false, reason: 'Enter a code.' };
  const coupon = COUPONS[code];
  if (!coupon) return { ok: false, reason: 'That code isn’t valid.' };
  if (subtotalCents < coupon.minSubtotalCents) {
    return { ok: false, reason: 'Order total too low for this code.' };
  }
  return { ok: true, coupon, discountCents: discountFor(subtotalCents, coupon) };
}

export type ShippingMethodId = 'standard' | 'express';

export type ShippingMethod = {
  id: ShippingMethodId;
  label: string;
  eta: string;
  /** Cost in paise given the current subtotal (free-shipping applies to standard). */
  cost: (subtotalCents: number) => number;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    label: 'Standard',
    eta: '2–5 working days',
    cost: (subtotal) => shippingFor(subtotal),
  },
  {
    id: 'express',
    label: 'Express',
    eta: '1–2 working days',
    cost: () => 9900,
  },
];

export function shippingCost(methodId: ShippingMethodId, subtotalCents: number): number {
  const m = SHIPPING_METHODS.find((x) => x.id === methodId) ?? SHIPPING_METHODS[0]!;
  return m.cost(subtotalCents);
}

// Mirrors packages/db seed pincode_estimates; default range for unknown pincodes.
const PINCODES: Record<string, { city: string; state: string; min: number; max: number; cod: boolean }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', min: 2, max: 4, cod: true },
  '400001': { city: 'Mumbai', state: 'Maharashtra', min: 2, max: 4, cod: true },
  '560001': { city: 'Bengaluru', state: 'Karnataka', min: 1, max: 3, cod: true },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', min: 2, max: 4, cod: true },
  '700001': { city: 'Kolkata', state: 'West Bengal', min: 3, max: 5, cod: true },
  '500001': { city: 'Hyderabad', state: 'Telangana', min: 2, max: 4, cod: true },
  '682001': { city: 'Kochi', state: 'Kerala', min: 1, max: 2, cod: true },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', min: 3, max: 5, cod: false },
};

export type DeliveryEstimate = {
  serviceable: boolean;
  city?: string;
  state?: string;
  minDays: number;
  maxDays: number;
  codAvailable: boolean;
};

export function estimateDelivery(pincode: string): DeliveryEstimate | null {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) return null;
  const row = PINCODES[clean];
  if (!row) {
    return { serviceable: false, minDays: 4, maxDays: 7, codAvailable: false };
  }
  return {
    serviceable: true,
    city: row.city,
    state: row.state,
    minDays: row.min,
    maxDays: row.max,
    codAvailable: row.cod,
  };
}
