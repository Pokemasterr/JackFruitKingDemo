import type { OtpChallenge, OtpProvider } from './types';

/** The only OTP the mock accepts. */
export const MOCK_OTP_CODE = '123456';

export class MockOtpProvider implements OtpProvider {
  private challenges = new Map<string, string>();

  async send(phone: string): Promise<OtpChallenge> {
    const ref = `mock_otp_${Math.random().toString(36).slice(2, 10)}`;
    this.challenges.set(ref, phone);
    return { ref, phone, devCode: MOCK_OTP_CODE };
  }

  async verify(ref: string, code: string): Promise<boolean> {
    if (!this.challenges.has(ref)) return false;
    return code === MOCK_OTP_CODE;
  }
}
