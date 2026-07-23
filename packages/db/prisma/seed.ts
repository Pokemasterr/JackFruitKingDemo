import { PrismaClient, CouponType } from '@prisma/client';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Catalog: 6 jackfruit-chip SKUs matched to the approved mockup. Prices are in
// paise (₹1 = 100 paise). Each single flavor ships a default 70g variant; the
// variety box is a 6-pack SKU.
// ---------------------------------------------------------------------------

type SeedVariant = {
  size: string;
  priceCents: number;
  compareAtCents?: number;
  stock: number;
  isDefault?: boolean;
};

type SeedProduct = {
  slug: string;
  name: string;
  flavor: string;
  tagline: string;
  description: string;
  story?: string;
  heroColor: string;
  spiceLevel: number;
  isFeatured: boolean;
  variants: SeedVariant[];
};

const PRODUCTS: SeedProduct[] = [
  {
    slug: 'sea-salt',
    name: 'Sea Salt Jackfruit Chips',
    flavor: 'Sea Salt',
    tagline: 'The classic. Lightly salted, dangerously crunchy.',
    description:
      'Ripe jackfruit, slow-crisped and finished with flaky sea salt. No potatoes, no nonsense — just addictive golden crunch.',
    story: 'The very first flavor off the farm. Still the one people fight over.',
    heroColor: '#FFD400',
    spiceLevel: 0,
    isFeatured: true,
    variants: [{ size: '70g', priceCents: 12000, compareAtCents: 15000, stock: 240, isDefault: true }],
  },
  {
    slug: 'chilli-kick',
    name: 'Chilli Kick Chips',
    flavor: 'Chilli Kick',
    tagline: 'Bold heat for people who like a fight.',
    description:
      'A punch of red chilli and roasted garlic over crisp jackfruit. For snackers who read the spice level as a dare.',
    heroColor: '#FF4B26',
    spiceLevel: 3,
    isFeatured: true,
    variants: [{ size: '70g', priceCents: 14000, compareAtCents: 16000, stock: 200, isDefault: true }],
  },
  {
    slug: 'honey-glaze',
    name: 'Honey Glaze Chips',
    flavor: 'Honey Glaze',
    tagline: 'Sweet-savory gourmet crunch.',
    description:
      'A delicate honey glaze over sea-salted jackfruit — the sweet-savory bag that disappears first at every party.',
    heroColor: '#B7E92C',
    spiceLevel: 0,
    isFeatured: true,
    variants: [{ size: '70g', priceCents: 16000, compareAtCents: 18000, stock: 160, isDefault: true }],
  },
  {
    slug: 'pepper-crush',
    name: 'Pepper Crush Chips',
    flavor: 'Pepper Crush',
    tagline: 'Cracked black pepper, slow crisped.',
    description:
      'Coarse-cracked Malabar black pepper over crisp jackfruit. Sharp, warming and dangerously moreish with a cold drink.',
    heroColor: '#12351F',
    spiceLevel: 1,
    isFeatured: false,
    variants: [{ size: '70g', priceCents: 13000, compareAtCents: 15000, stock: 140, isDefault: true }],
  },
  {
    slug: 'tangy-masala',
    name: 'Tangy Masala Chips',
    flavor: 'Tangy Masala',
    tagline: 'Street-style spice, farm-grown fruit.',
    description:
      'Our house chaat masala — amchur, cumin, black salt and a hint of chilli — tumbled over crisp jackfruit. Nostalgia in a bag.',
    heroColor: '#E6BF00',
    spiceLevel: 2,
    isFeatured: true,
    variants: [{ size: '70g', priceCents: 14000, compareAtCents: 16000, stock: 220, isDefault: true }],
  },
  {
    slug: 'the-whole-court',
    name: 'The Whole Court (Variety)',
    flavor: 'Variety',
    tagline: 'Every flavor in one big value box.',
    description:
      'One of each: Sea Salt, Chilli Kick, Honey Glaze, Pepper Crush, Tangy Masala and a bonus bag. The whole royal court, boxed and 20% off.',
    story: 'The easiest way to find your favourite — get them all.',
    heroColor: '#B7E92C',
    spiceLevel: 0,
    isFeatured: false,
    variants: [{ size: '6x70g', priceCents: 64000, compareAtCents: 80000, stock: 80, isDefault: true }],
  },
];

const REVIEWS: Record<string, { authorName: string; rating: number; title: string; body: string }[]> = {
  'sea-salt': [
    { authorName: 'Aarav M.', rating: 5, title: 'Chip habit, replaced', body: 'These replaced my chip habit entirely. That crunch is unreal.' },
    { authorName: 'Priya S.', rating: 5, title: 'Better than potato', body: 'Guilt-free and actually tastes better than potato chips. Whole family is hooked.' },
  ],
  'chilli-kick': [
    { authorName: 'Rohit K.', rating: 4, title: 'Proper heat', body: 'Not a marketing gimmick — this genuinely brings the fire. Loved it.' },
  ],
  'tangy-masala': [
    { authorName: 'Neha D.', rating: 5, title: 'Chaat vibes', body: 'Tastes exactly like the masala from my college canteen. Instant nostalgia.' },
  ],
  'the-whole-court': [
    { authorName: 'Karan D.', rating: 5, title: 'Buy the box', body: 'Actually healthy AND actually tasty. Rare combo. Reordered twice.' },
  ],
};

const PINCODES = [
  { pincode: '110001', city: 'New Delhi', state: 'Delhi', minDays: 2, maxDays: 4, codAvailable: true },
  { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', minDays: 2, maxDays: 4, codAvailable: true },
  { pincode: '560001', city: 'Bengaluru', state: 'Karnataka', minDays: 1, maxDays: 3, codAvailable: true },
  { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', minDays: 2, maxDays: 4, codAvailable: true },
  { pincode: '700001', city: 'Kolkata', state: 'West Bengal', minDays: 3, maxDays: 5, codAvailable: true },
  { pincode: '500001', city: 'Hyderabad', state: 'Telangana', minDays: 2, maxDays: 4, codAvailable: true },
  { pincode: '682001', city: 'Kochi', state: 'Kerala', minDays: 1, maxDays: 2, codAvailable: true },
  { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat', minDays: 3, maxDays: 5, codAvailable: false },
];

function skuFor(slug: string, size: string): string {
  return `JK-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}-${size.toUpperCase().replace(/[^A-Z0-9]+/g, '')}`;
}

async function main() {
  console.log('🌱  Seeding Jackfruit King…');

  // Products + variants + reviews ------------------------------------------
  for (const p of PRODUCTS) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        story: p.story,
        heroColor: p.heroColor,
        spiceLevel: p.spiceLevel,
        isFeatured: p.isFeatured,
      },
      create: {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        story: p.story,
        category: 'chips',
        heroColor: p.heroColor,
        spiceLevel: p.spiceLevel,
        isFeatured: p.isFeatured,
      },
    });

    for (const v of p.variants) {
      const sku = skuFor(p.slug, v.size);
      await prisma.productVariant.upsert({
        where: { sku },
        update: {
          priceCents: v.priceCents,
          compareAtCents: v.compareAtCents ?? null,
          stock: v.stock,
        },
        create: {
          productId: product.id,
          name: `${p.name} — ${v.size}`,
          flavor: p.flavor,
          size: v.size,
          sku,
          priceCents: v.priceCents,
          compareAtCents: v.compareAtCents ?? null,
          stock: v.stock,
          isDefault: v.isDefault ?? false,
        },
      });
    }

    // Replace seed reviews idempotently.
    const seedReviews = REVIEWS[p.slug];
    if (seedReviews) {
      await prisma.review.deleteMany({ where: { productId: product.id, userId: null } });
      for (const r of seedReviews) {
        await prisma.review.create({
          data: {
            productId: product.id,
            authorName: r.authorName,
            rating: r.rating,
            title: r.title,
            body: r.body,
          },
        });
      }
    }
  }

  // WELCOME10 coupon --------------------------------------------------------
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: { active: true, value: 10, type: CouponType.PERCENT },
    create: {
      code: 'WELCOME10',
      type: CouponType.PERCENT,
      value: 10,
      minSubtotalCents: 0,
      active: true,
    },
  });

  // Pincode delivery estimates ---------------------------------------------
  for (const pc of PINCODES) {
    await prisma.pincodeEstimate.upsert({
      where: { pincode: pc.pincode },
      update: pc,
      create: pc,
    });
  }

  // A demo account for local testing (password handling wired later by auth).
  await prisma.user.upsert({
    where: { email: 'demo@jackfruitking.test' },
    update: {},
    create: { email: 'demo@jackfruitking.test', name: 'Demo Muncher', phone: '9000000000' },
  });

  const counts = {
    products: await prisma.product.count(),
    variants: await prisma.productVariant.count(),
    coupons: await prisma.coupon.count(),
    pincodes: await prisma.pincodeEstimate.count(),
    reviews: await prisma.review.count(),
  };
  console.log('✅  Seed complete:', counts);
}

main()
  .catch((e) => {
    console.error('❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
