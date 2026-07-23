import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ShopBrowser } from '@/components/shop-browser';
import { PRODUCTS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Jackfruit King’s full range — consumer packs and bulk functional ingredients, from flour and seed powder to chips, fries and patties.',
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The range"
        title="From whole fruit to finished food"
        intro="Seven products from one crop — consumer packs you can buy today, and bulk functional ingredients supplied to bakeries, brands and kitchens."
      />
      <div className="container-page py-12 md:py-16">
        <ShopBrowser products={PRODUCTS} />
      </div>
    </>
  );
}
