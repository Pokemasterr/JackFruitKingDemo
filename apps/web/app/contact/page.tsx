import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions, orders, wholesale — get in touch with Jackfruit King.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Get in touch"
        intro="Questions about an order, a flavour, or stocking us? Drop us a line and a real person will reply."
      />
      <div className="container-page grid gap-12 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
        <ContactForm />
        <div className="space-y-6 text-muted">
          <div>
            <h2 className="eyebrow">Talk to us</h2>
            <p className="mt-2 text-ink">+91 8275455176</p>
            <p className="text-ink">jackfruitkingfpo@gmail.com</p>
          </div>
          <div>
            <h2 className="eyebrow">Where we are</h2>
            <p className="mt-2 leading-relaxed">
              Jackfruitking Agro Producer Company Limited
              <br />
              Lanja, Ratnagiri, Maharashtra, India
            </p>
          </div>
          <div>
            <h2 className="eyebrow">Bulk &amp; B2B</h2>
            <p className="mt-2 leading-relaxed">
              For bulk ingredients, private label or co-development, use the{' '}
              <Link href="/wholesale" className="text-forest hover:text-forest-deep">
                quote request
              </Link>{' '}
              — it reaches the right team faster.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
