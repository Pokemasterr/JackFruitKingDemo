export interface OtpChallenge {
  /** Reference id to pass back to verify(). */
  ref: string;
  phone: string;
  /** Present only in mock/dev so the UI can prefill / hint the code. */
  devCode?: string;
}

/**
 * The seam for SMS OTP (MSG91 / Twilio). The mock never sends an SMS.
 */
export interface OtpProvider {
  send(phone: string): Promise<OtpChallenge>;
  verify(ref: string, code: string): Promise<boolean>;
}
