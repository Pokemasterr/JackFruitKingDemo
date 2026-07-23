import type { Metadata } from 'next';
import { OrderSuccess } from '@/components/order-success';

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
};

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderSuccess id={id} />;
}
