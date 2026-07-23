export interface DeliveryEstimate {
  pincode: string;
  city?: string | null;
  state?: string | null;
  minDays: number;
  maxDays: number;
  codAvailable: boolean;
  /** False when we have no data for the pincode (a default range is returned). */
  serviceable: boolean;
}

/**
 * The seam for carrier delivery estimates (Shiprocket / Delhivery). The mock
 * reads a seeded pincode lookup table.
 */
export interface ShippingEstimator {
  estimate(pincode: string): Promise<DeliveryEstimate>;
}
