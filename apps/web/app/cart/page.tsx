import type { Metadata } from 'next';
import { CartView } from '@/components/cart-view';

export const metadata: Metadata = {
  title: 'Bag',
  description: 'Your Jackfruit King bag.',
};

export default function CartPage() {
  return <CartView />;
}
