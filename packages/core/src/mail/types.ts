export interface SendEmailInput {
  to: string;
  subject: string;
  body: string;
  template?: string;
  meta?: Record<string, unknown>;
}

export interface SendEmailResult {
  id: string;
}

/**
 * The seam for transactional email (Resend / SendGrid). The mock logs to the
 * console and persists to the `emails` outbox table.
 */
export interface Mailer {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}
