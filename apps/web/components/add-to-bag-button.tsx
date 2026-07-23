'use client';

import { Minus, Plus } from 'lucide-react';
import { Button, cn, type ButtonProps } from '@jk/ui';
import { useCart } from '@/lib/cart-store';
import { useMounted } from '@/lib/use-mounted';
import type { FeaturedProduct } from '@/lib/catalog';

type Props = {
  product: FeaturedProduct;
  qty?: number;
  label?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
};

/**
 * Shows "Add" until the product is in the bag, then swaps to a − / qty / +
 * stepper. Dropping to 0 removes the line and restores the Add button.
 */
export function AddToBagButton({
  product,
  qty = 1,
  label = 'Add',
  variant = 'secondary',
  size = 'sm',
  className,
}: Props) {
  const mounted = useMounted();
  const inCart = useCart((s) => s.items.find((i) => i.id === product.slug)?.qty ?? 0);
  const addItem = useCart((s) => s.addItem);
  const setQty = useCart((s) => s.setQty);

  const large = size === 'lg';

  // Bulk/ingredient lines have no public price — they use a quote request.
  if (product.priceCents == null) return null;

  // Until mounted, render the Add button so SSR and first client paint agree.
  if (!mounted || inCart === 0) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() =>
          addItem(
            {
              id: product.slug,
              slug: product.slug,
              name: product.name,
              priceCents: product.priceCents ?? 0,
              size: product.size,
              tint: product.tint,
            },
            qty,
          )
        }
      >
        {label}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-between rounded-full border border-line bg-paper',
        large ? 'h-12 min-w-[9rem] px-1' : 'h-9 min-w-[6.5rem] px-0.5',
        className,
      )}
    >
      <button
        onClick={() => setQty(product.slug, inCart - 1)}
        aria-label={`Remove one ${product.name}`}
        className={cn(
          'grid place-items-center rounded-full text-ink transition-colors hover:bg-stone/70',
          large ? 'h-10 w-10' : 'h-8 w-8',
        )}
      >
        <Minus className={large ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      </button>

      <span
        aria-live="polite"
        className={cn('tabular-nums text-ink', large ? 'text-base' : 'text-sm')}
      >
        {inCart}
      </span>

      <button
        onClick={() => setQty(product.slug, inCart + 1)}
        aria-label={`Add one more ${product.name}`}
        className={cn(
          'grid place-items-center rounded-full text-ink transition-colors hover:bg-stone/70',
          large ? 'h-10 w-10' : 'h-8 w-8',
        )}
      >
        <Plus className={large ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      </button>
    </div>
  );
}
