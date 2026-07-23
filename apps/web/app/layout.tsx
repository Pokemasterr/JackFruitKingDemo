import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CartDrawer } from '@/components/cart-drawer';
import { AddConfirmation } from '@/components/add-confirmation';
import { CommandPalette } from '@/components/command-palette';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jackfruit King — Farm to functional ingredients',
    template: '%s · Jackfruit King',
  },
  description:
    'Whole jackfruit. Whole health. Zero waste. Low-GI jackfruit flour, seed powder, vegan meat bases and better-for-you snacks from Lanja, Ratnagiri.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CartDrawer />
        <AddConfirmation />
        <CommandPalette />
      </body>
    </html>
  );
}
