import type {
  ConfirmPaymentResult,
  CreatePaymentInput,
  PaymentIntent,
  PaymentProvider,
} from './types';

/** The only card the mock gateway accepts. */
export const MOCK_TEST_CARD = '4242 4242 4242 4242';
/** The only OTP the mock gateway accepts. */
export const MOCK_OTP = '123456';

/**
 * Razorpay-shaped mock. UPI/CARD require an OTP step; COD is confirmed
 * immediately. Nothing leaves the process — state lives in memory keyed by ref.
 */
export class MockPaymentProvider implements PaymentProvider {
  private intents = new Map<string, PaymentIntent>();

  async createPayment(input: CreatePaymentInput): Promise<PaymentIntent> {
    const providerRef = `mock_pay_${Math.random().toString(36).slice(2, 10)}`;
    const requiresOtp = input.method !== 'COD';
    const intent: PaymentIntent = {
      providerRef,
      orderId: input.orderId,
      amountCents: input.amountCents,
      method: input.method,
      status: requiresOtp ? 'REQUIRES_OTP' : 'PAID',
      requiresOtp,
    };
    this.intents.set(providerRef, intent);
    return intent;
  }

  async confirmPayment(providerRef: string, otp: string): Promise<ConfirmPaymentResult> {
    const intent = this.intents.get(providerRef);
    if (!intent) {
      return { providerRef, status: 'FAILED', message: 'Unknown payment reference.' };
    }
    if (otp !== MOCK_OTP) {
      return { providerRef, status: 'FAILED', message: 'Incorrect OTP. Try 123456.' };
    }
    intent.status = 'PAID';
    return { providerRef, status: 'PAID' };
  }
}
