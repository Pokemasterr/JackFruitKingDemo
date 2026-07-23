'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartLine = {
  /** Stable id — the product/variant slug for now. */
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  size: string;
  tint: string;
  qty: number;
};

export type AddInput = Omit<CartLine, 'qty'>;

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  /** Set briefly after an add so the full-screen confirmation can show. */
  justAdded: { name: string; qty: number } | null;

  addItem: (input: AddInput, qty?: number) => void;
  addMany: (entries: { input: AddInput; qty: number }[], label?: string) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  dismissAdded: () => void;
};

/** How long the full-screen "Added to bag" confirmation stays up. */
const AUTO_DISMISS_MS = 2600;

// The auto-dismiss timer is owned by the store (not a React effect) so it
// fires reliably regardless of component re-renders / fast-refresh churn.
let dismissTimer: ReturnType<typeof setTimeout> | undefined;

function clearAutoDismiss() {
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = undefined;
  }
}

function scheduleAutoDismiss() {
  if (typeof window === 'undefined') return;
  clearAutoDismiss();
  dismissTimer = setTimeout(() => {
    dismissTimer = undefined;
    useCart.getState().dismissAdded();
  }, AUTO_DISMISS_MS);
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      justAdded: null,

      addItem: (input, qty = 1) => {
        set((state) => ({
          items: upsert(state.items, input, qty),
          justAdded: { name: input.name, qty },
        }));
        scheduleAutoDismiss();
      },

      addMany: (entries, label) => {
        set((state) => {
          let items = state.items;
          let total = 0;
          for (const e of entries) {
            if (e.qty <= 0) continue;
            items = upsert(items, e.input, e.qty);
            total += e.qty;
          }
          return {
            items,
            justAdded: total > 0 ? { name: label ?? 'Your box', qty: total } : state.justAdded,
          };
        });
        scheduleAutoDismiss();
      },

      setQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clear: () => set({ items: [] }),

      // Opening the bag also clears any pending "added" confirmation so the
      // full-screen overlay and the drawer can never overlap.
      open: () => {
        clearAutoDismiss();
        set({ isOpen: true, justAdded: null });
      },
      close: () => set({ isOpen: false }),
      dismissAdded: () => {
        clearAutoDismiss();
        set({ justAdded: null });
      },
    }),
    {
      name: 'jk-cart',
      // Guard against SSR: on the server there is no localStorage.
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : { getItem: () => null, setItem: () => undefined, removeItem: () => undefined },
      ),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

function upsert(items: CartLine[], input: AddInput, qty: number): CartLine[] {
  const existing = items.find((i) => i.id === input.id);
  if (existing) {
    return items.map((i) => (i.id === input.id ? { ...i, qty: i.qty + qty } : i));
  }
  return [...items, { ...input, qty }];
}

export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.qty, 0);
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
