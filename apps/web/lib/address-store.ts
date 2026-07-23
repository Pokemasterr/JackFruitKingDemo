'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

export type NewAddress = Omit<Address, 'id'>;

/**
 * Seeded address book. Stands in for the `addresses` table until the DB is
 * wired — the shape mirrors the Prisma model.
 */
const SEED: Address[] = [
  {
    id: 'addr-home',
    label: 'Home',
    fullName: 'Aarav Mehta',
    phone: '9820011223',
    line1: '12 Marine Drive',
    line2: 'Churchgate',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  },
  {
    id: 'addr-work',
    label: 'Work',
    fullName: 'Aarav Mehta',
    phone: '9820011223',
    line1: 'Prestige Tower, 4th Floor',
    line2: 'MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  },
  {
    id: 'addr-family',
    label: 'Family',
    fullName: 'Sunita Mehta',
    phone: '9833044556',
    line1: '22 Rose Villa',
    line2: 'Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
  },
];

type AddressState = {
  addresses: Address[];
  selectedId: string | null;
  select: (id: string) => void;
  addAddress: (input: NewAddress) => string;
  removeAddress: (id: string) => void;
};

export const useAddresses = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: SEED,
      selectedId: SEED[0]?.id ?? null,

      select: (id) => set({ selectedId: id }),

      addAddress: (input) => {
        const id = `addr-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
        set((s) => ({ addresses: [...s.addresses, { ...input, id }], selectedId: id }));
        return id;
      },

      removeAddress: (id) =>
        set((s) => {
          const addresses = s.addresses.filter((a) => a.id !== id);
          const selectedId =
            s.selectedId === id ? (addresses[0]?.id ?? null) : s.selectedId;
          return { addresses, selectedId };
        }),
    }),
    {
      name: 'jk-addresses',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : { getItem: () => null, setItem: () => undefined, removeItem: () => undefined },
      ),
    },
  ),
);

/** Convenience selector: the currently chosen address (or null). */
export function selectSelectedAddress(s: AddressState): Address | null {
  return s.addresses.find((a) => a.id === s.selectedId) ?? null;
}
