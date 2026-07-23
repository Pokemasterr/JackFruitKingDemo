'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@jk/ui';
import { useCart } from '@/lib/cart-store';

/**
 * Full-screen translucent confirmation shown briefly after an item is added.
 * The auto-dismiss timer lives in the cart store; this component just reflects
 * `justAdded`. We render conditionally (no AnimatePresence) so the overlay
 * unmounts cleanly the instant it clears — no lingering click-blocking layer.
 */
export function AddConfirmation() {
  const justAdded = useCart((s) => s.justAdded);
  const isOpen = useCart((s) => s.isOpen);
  const dismissAdded = useCart((s) => s.dismissAdded);
  const open = useCart((s) => s.open);

  // Never show over the drawer (opening the bag also clears justAdded).
  if (!justAdded || isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-deep/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={dismissAdded}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="mx-4 w-full max-w-sm rounded-tile border border-line bg-cream p-8 text-center shadow-soft"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-cream"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.05 }}
        >
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </motion.div>

        <h2 className="mt-5 font-serif text-2xl text-ink">Added to bag</h2>
        <p className="mt-1.5 text-muted">
          {justAdded.qty > 1 ? `${justAdded.qty} × ` : ''}
          {justAdded.name} is in your bag.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => {
              dismissAdded();
              open();
            }}
          >
            View bag
          </Button>
          <Button variant="secondary" onClick={dismissAdded}>
            Keep shopping
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
