'use client';

/**
 * Client-side order persistence (localStorage). A stand-in for the real
 * `orders` table until the DB is wired — the shape mirrors the Prisma model so
 * the swap to server actions is mechanical.
 */

export type OrderStatus = 'PENDING' | 'PAID' | 'PACKED' | 'SHIPPED' | 'DELIVERED';
export type PaymentMethod = 'UPI' | 'CARD' | 'COD';

export type OrderItem = {
  name: string;
  size: string;
  priceCents: number;
  qty: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  email: string;
  phone: string;
  address: {
    fullName: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  estMinDays: number;
  estMaxDays: number;
};

const KEY = 'jk-orders';

function readAll(): Record<string, Order> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === 'undefined') return;
  const all = readAll();
  all[order.id] = order;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getOrder(id: string): Order | null {
  return readAll()[id] ?? null;
}

/** Human-friendly order number, e.g. JK-2K7F3A. */
export function newOrderNumber(): string {
  const s = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `JK-${s.slice(0, 6)}`;
}
