import type { Metadata } from 'next';
import { PaymentFlow } from '@/components/payment-flow';

export const metadata: Metadata = {
  title: 'Payment',
  description: 'Choose a payment method and confirm your order.',
};

export default function PaymentPage() {
  return <PaymentFlow />;
}
