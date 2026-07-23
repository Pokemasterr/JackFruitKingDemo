import { prisma } from '@jk/db';
import type { Mailer, SendEmailInput, SendEmailResult } from './types';

/**
 * LogMailer — the mock Mailer. Writes to the `emails` table and echoes to the
 * server console so the flow is observable without a real ESP.
 */
export class LogMailer implements Mailer {
  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const record = await prisma.email.create({
      data: {
        to: input.to,
        subject: input.subject,
        body: input.body,
        template: input.template ?? null,
        meta: (input.meta ?? undefined) as never,
      },
    });

    // eslint-disable-next-line no-console
    console.log(
      `\n📧  [LogMailer] → ${input.to}\n    subject: ${input.subject}\n    ${input.body.replace(/\n/g, '\n    ')}\n`,
    );

    return { id: record.id };
  }
}
