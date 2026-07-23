import { MockPaymentProvider } from './payments/mock';
import { MockOtpProvider } from './otp/mock';
import { LogMailer } from './mail/log-mailer';
import { MockShippingEstimator } from './shipping/mock';
import { PostgresSearch } from './search/postgres';

import type { PaymentProvider } from './payments/types';
import type { OtpProvider } from './otp/types';
import type { Mailer } from './mail/types';
import type { ShippingEstimator } from './shipping/types';
import type { SearchProvider } from './search/types';

export interface Providers {
  payments: PaymentProvider;
  otp: OtpProvider;
  mailer: Mailer;
  shipping: ShippingEstimator;
  search: SearchProvider;
}

/**
 * The single place the app resolves external-facing capabilities. Today every
 * seam is a mock. To go live, a team swaps a line here for the real adapter
 * (e.g. `payments: new RazorpayProvider(...)`) — nothing else changes.
 */
export const providers: Providers = {
  payments: new MockPaymentProvider(),
  otp: new MockOtpProvider(),
  mailer: new LogMailer(),
  shipping: new MockShippingEstimator(),
  search: new PostgresSearch(),
};
