import Link from 'next/link';
import { NewsletterForm } from './newsletter-form';

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Products',
    links: [
      ['/shop', 'The full range'],
      ['/product/raw-jackfruit-flour', 'Raw jackfruit flour'],
      ['/product/jackfruit-chips', 'Jackfruit chips'],
      ['/wholesale', 'Bulk ingredients'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/about', 'Our story'],
      ['/why-jackfruit', 'Why jackfruit'],
      ['/reviews', 'Reviews'],
      ['/contact', 'Contact'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['/order/track', 'Track order'],
      ['/contact', 'Shipping & returns'],
      ['/wholesale', 'Wholesale'],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-serif text-xl text-ink">
            Jackfruit King
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Whole jackfruit. Whole health. Zero waste. Farm-to-functional ingredients from
            Lanja, Ratnagiri.
          </p>
          <p className="mt-3 text-sm text-muted">
            +91 8275455176
            <br />
            jackfruitkingfpo@gmail.com
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted hover:text-forest">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Jackfruit King. All rights reserved.</span>
          <span>Made with care, not machines.</span>
        </div>
      </div>
    </footer>
  );
}
