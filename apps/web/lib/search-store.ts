'use client';

import { create } from 'zustand';

type SearchState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

/** Controls the global ⌘K command palette. */
export const useSearch = create<SearchState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
