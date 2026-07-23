'use client';

import { Search } from 'lucide-react';
import { useSearch } from '@/lib/search-store';

export function SearchButton() {
  const open = useSearch((s) => s.open);
  return (
    <button
      onClick={open}
      aria-label="Search (Ctrl+K)"
      className="grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-stone/60"
    >
      <Search className="h-[18px] w-[18px]" />
    </button>
  );
}
