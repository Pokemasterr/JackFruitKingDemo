import type { PaymentMethod } from '@jk/db';

export interface CreatePaymentInput {
  orderId: string;
  /** Amount in paise (INR minor unit). */
  amountCents: number;
  method: PaymentMethod;
  email: string;
  phone?: string | null;
}

export type PaymentIntentStatus = 'REQUIRES_OTP' | 'PAID' | 'FAILED';

export interface PaymentIntent {
  /** Provider-side reference id; we persist this on the order. */
  providerRef: string;
  orderId: string;
  amountCents: number;
  method: PaymentMethod;
  status: PaymentIntentStatus;
  /** True when the caller must collect an OTP and call confirmPayment(). */
  requiresOtp: boolean;
}

export interface ConfirmPaymentResult {
  providerRef: string;
  status: 'PAID' | 'FAILED';
  message?: string;
}

/**
 * The seam between our real checkout flow and an external gateway
 * (Razorpay / Stripe). Swap the mock for a real adapter by implementing this.
 */
export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<PaymentIntent>;
  confirmPayment(providerRef: string, otp: string): Promise<ConfirmPaymentResult>;
}
