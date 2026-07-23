'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@jk/ui';

const NAV: { href: string; label: string; match?: string[] }[] = [
  // Product detail pages count as "Shop".
  { href: '/shop', label: 'Shop', match: ['/shop', '/product'] },
  { href: '/build-a-box', label: 'Build a Box' },
  { href: '/why-jackfruit', label: 'Why Jackfruit' },
  { href: '/about', label: 'Our Story' },
  { href: '/reviews', label: 'Reviews' },
];

export function MainNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="hidden items-center gap-7 md:flex">
      {NAV.map((item) => {
        const prefixes = item.match ?? [item.href];
        const active = prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative py-1 text-sm transition-colors',
              active ? 'font-medium text-ink' : 'text-muted hover:text-forest',
            )}
          >
            {item.label}
            {active ? (
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-forest" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
