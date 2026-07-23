'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ShippingMethodId } from './checkout';

/**
 * Review-step data. The delivery address lives in the address book
 * (`lib/address-store.ts`) — only its selection matters here.
 */
export type CheckoutData = {
  email: string;
  shippingMethod: ShippingMethodId;
  couponCode: string | null;
};

const EMPTY: CheckoutData = {
  email: '',
  shippingMethod: 'standard',
  couponCode: null,
};

type CheckoutState = {
  data: CheckoutData;
  setData: (patch: Partial<CheckoutData>) => void;
  reset: () => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      data: EMPTY,
      setData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      reset: () => set({ data: EMPTY }),
    }),
    {
      // v2: shape changed when the address book landed.
      name: 'jk-checkout-v2',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.sessionStorage
          : { getItem: () => null, setItem: () => undefined, removeItem: () => undefined },
      ),
    },
  ),
);
