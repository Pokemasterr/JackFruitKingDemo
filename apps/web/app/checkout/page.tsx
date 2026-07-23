import type { Metadata } from 'next';
import { CheckoutReview } from '@/components/checkout-review';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Review your order and continue to payment.',
};

export default function CheckoutPage() {
  return <CheckoutReview />;
}
