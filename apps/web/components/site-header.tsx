import Link from 'next/link';
import { CartButton } from './cart-button';
import { SearchButton } from './search-button';
import { MainNav } from './main-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">
          Jackfruit King
        </Link>

        <MainNav />

        <div className="flex items-center gap-1">
          <SearchButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
