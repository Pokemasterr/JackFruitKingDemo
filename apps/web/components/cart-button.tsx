'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart, selectCount } from '@/lib/cart-store';
import { useMounted } from '@/lib/use-mounted';

export function CartButton() {
  const open = useCart((s) => s.open);
  const count = useCart(selectCount);
  const mounted = useMounted();

  return (
    <button
      onClick={open}
      aria-label={`Open bag${mounted && count ? `, ${count} items` : ''}`}
      className="relative grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-stone/60"
    >
      <ShoppingBag className="h-[18px] w-[18px]" />
      {mounted && count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[10px] font-medium text-cream">
          {count}
        </span>
      ) : null}
    </button>
  );
}
