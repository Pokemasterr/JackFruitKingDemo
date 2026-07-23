import { prisma } from '@jk/db';
import type { DeliveryEstimate, ShippingEstimator } from './types';

/** Fallback range when a pincode isn't in the seeded table. */
const DEFAULT_ESTIMATE = { minDays: 4, maxDays: 7, codAvailable: false };

export class MockShippingEstimator implements ShippingEstimator {
  async estimate(pincode: string): Promise<DeliveryEstimate> {
    const clean = pincode.trim();
    const row = await prisma.pincodeEstimate.findUnique({ where: { pincode: clean } });

    if (!row) {
      return {
        pincode: clean,
        city: null,
        state: null,
        ...DEFAULT_ESTIMATE,
        serviceable: false,
      };
    }

    return {
      pincode: row.pincode,
      city: row.city,
      state: row.state,
      minDays: row.minDays,
      maxDays: row.maxDays,
      codAvailable: row.codAvailable,
      serviceable: true,
    };
  }
}
