/**
 * Jackfruit King catalogue — sourced from the company's own product catalogue
 * (Lanja, Ratnagiri). Two commerce tracks:
 *   - track 'retail'     → consumer packs, priced, add-to-bag
 *   - track 'ingredient' → B2B bulk supply, no public price, quote request
 *
 * PRICES ARE PLACEHOLDERS pending confirmation from the client. They live only
 * here, so they can be corrected in one place.
 */
export type BadgeTone = 'forest' | 'mustard' | 'neutral';
export type Track = 'retail' | 'ingredient';

export type FeaturedProduct = {
  slug: string;
  name: string;
  /** One-line positioning straight from the catalogue. */
  positioning: string;
  description: string;
  track: Track;
  /** Retail price in paise. null for ingredient/B2B lines. */
  priceCents: number | null;
  compareAtCents?: number;
  size: string;
  /** Muted tint used behind the photo while it loads / as a fallback. */
  tint: string;
  nutrition: string[];
  applications: string[];
  supply: string[];
  flag?: string;
  flagTone?: BadgeTone;
};

export const PRODUCTS: FeaturedProduct[] = [
  {
    slug: 'raw-jackfruit-flour',
    name: 'Raw Jackfruit Flour',
    positioning: 'India’s Low-GI Functional Super Flour',
    description:
      'Green jackfruit, dried and milled into a fine, low-glycemic flour. Blends into atta, batters and bakes without changing how you cook.',
    track: 'retail',
    priceCents: 34900,
    size: '500g',
    tint: '#EFE2C2',
    nutrition: [
      'High dietary fibre',
      'Supports healthy blood sugar levels*',
      'Slows glucose absorption*',
      'Gluten-free',
      'Supports satiety',
    ],
    applications: [
      'Bakery — atta blends, biscuits',
      'Diabetic-friendly foods',
      'Functional nutrition mixes',
      'Clinical & nutraceutical foods',
    ],
    supply: [
      '600 kg/day capacity',
      'Bulk supply ready',
      'Year-round availability (cold + dry storage)',
      'Consistent quality & scalability',
    ],
    flag: 'Flagship',
    flagTone: 'forest',
  },
  {
    slug: 'jackfruit-chips',
    name: 'Jackfruit Chips',
    positioning: 'Better-for-you Snack',
    description:
      'Vacuum-fried jackfruit with a clean, light crunch — lower in fat than conventional frying, with no artificial additives.',
    track: 'retail',
    priceCents: 14900,
    size: '100g',
    tint: '#ECDCC6',
    nutrition: ['High fibre', 'Lower fat (vacuum fried)', 'No artificial additives'],
    applications: ['Everyday snacking', 'Retail & gifting packs', 'Office & travel packs'],
    supply: ['Bulk packs available', 'Custom flavour development', 'Year-round supply'],
    flag: 'Bestseller',
    flagTone: 'forest',
  },
  {
    slug: 'jackfruit-fries',
    name: 'Jackfruit Fries',
    positioning: 'Healthy Snack Alternative',
    description:
      'Crisp, light and guilt-free — a plant-based, gluten-free fry with meaningfully less fat than traditional potato fries.',
    track: 'retail',
    priceCents: 19900,
    size: '400g (frozen)',
    tint: '#EFE2C2',
    nutrition: ['High fibre', 'Lower fat than traditional fries', 'Plant-based & gluten-free'],
    applications: ['Air-fryer & oven snacking', 'QSR & café menus', 'Frozen retail'],
    supply: ['Frozen format', 'Bulk foodservice packs', 'Year-round supply'],
  },
  {
    slug: 'jackfruit-pattie',
    name: 'Jackfruit Pattie',
    positioning: 'Plant-Based Meat Alternative',
    description:
      'Flavorsome, fibrous, wholesome. A clean-label patty built on whole jackfruit rather than isolates and fillers.',
    track: 'retail',
    priceCents: 24900,
    size: '4 × 100g (frozen)',
    tint: '#E9D9CE',
    nutrition: [
      'Clean-label formulation',
      'High fibre',
      'Low fat',
      'Plant-based protein potential',
    ],
    applications: ['Burgers & wraps', 'RTE / RTC meals', 'HORECA & QSR menus'],
    supply: ['Bulk frozen patties ready', 'Custom formulation capability', 'Scalable production'],
    flag: 'New',
    flagTone: 'mustard',
  },
  {
    slug: 'jackfruit-seeds-powder',
    name: 'Jackfruit Seeds + Seed Powder',
    positioning: 'Gut-Health Powered Plant Ingredient',
    description:
      'The part most people throw away — rich in plant protein, resistant starch and minerals. Supplied whole or milled to a fine powder.',
    track: 'ingredient',
    priceCents: null,
    size: 'whole seed or milled powder',
    tint: '#E7EAE0',
    nutrition: ['Gut health', 'Plant-based protein', 'Prebiotic properties', 'Iron & mineral rich'],
    applications: [
      'Protein blends',
      'Functional flours',
      'Coffee alternatives (Jackfee)',
      'Nutraceuticals',
    ],
    supply: [
      'Bulk seed + powder ready',
      'Year-round supply',
      'Consistent quality',
      'Ideal for nutraceuticals',
    ],
  },
  {
    slug: 'jackfruit-chunks',
    name: 'Jackfruit Chunks',
    positioning: 'Clean-Label Vegan Meat Base',
    description:
      'Cubed green jackfruit with a naturally meaty, fibrous bite — the base layer for plant-based meat without a long ingredient list.',
    track: 'ingredient',
    priceCents: null,
    size: 'frozen & processed formats',
    tint: '#DCE4D5',
    nutrition: ['High fibre', 'Lower fat', 'No artificial additives'],
    applications: ['Vegan meat products', 'RTE / RTC meals', 'HORECA & QSR'],
    supply: ['Bulk cubed chunks ready', 'Frozen & processed formats', 'Year-round supply'],
  },
  {
    slug: 'jackfruit-bulbs',
    name: 'Jackfruit Bulbs',
    positioning: 'Natural Energy Fruit',
    description:
      'Ripe golden bulbs, hand-separated and graded — naturally sweet, potassium-rich and ready for fresh, frozen or pulp applications.',
    track: 'ingredient',
    priceCents: null,
    size: 'fresh or frozen, graded',
    tint: '#EFE2C2',
    nutrition: ['Natural energy', 'Rich in potassium', 'Carotenoids & flavonoids'],
    applications: ['Fresh & frozen retail', 'Pulp, juices & desserts', 'Bakery fillings'],
    supply: ['Graded & hand-separated', 'Seasonal peak supply', 'Cold-chain despatch'],
  },
];

export const RETAIL_PRODUCTS = PRODUCTS.filter((p) => p.track === 'retail');
export const INGREDIENT_PRODUCTS = PRODUCTS.filter((p) => p.track === 'ingredient');

export function productBySlug(slug: string): FeaturedProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Kept for the home page's featured strip. */
export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

/* -------------------------------------------------------------------------- */
/* Whole-fruit nutrition — per 100g, by part of the fruit.                     */
/* Source: company nutrition sheet. Underpins the "Zero Waste" story.          */
/* -------------------------------------------------------------------------- */

export type NutritionRow = {
  part: string;
  /** What Jackfruit King turns this part into. */
  becomes: string;
  kcal: number;
  carbs: number;
  protein: number;
  fat: number;
  fibre: number;
  vitC: number | null;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  compounds: string;
};

export const NUTRITION_BY_PART: NutritionRow[] = [
  { part: 'Ripe jackfruit pulp', becomes: 'Jackfruit Bulbs', kcal: 95, carbs: 23, protein: 1.7, fat: 0.6, fibre: 1.5, vitC: 14, potassium: 448, calcium: 24, iron: 0.2, magnesium: 29, compounds: 'Carotenoids, flavonoids' },
  { part: 'Raw (green) jackfruit', becomes: 'Flour, chunks, chips, fries', kcal: 70, carbs: 17, protein: 1.5, fat: 0.5, fibre: 3, vitC: 13, potassium: 303, calcium: 20, iron: 0.5, magnesium: 37, compounds: 'Polyphenols' },
  { part: 'Jackfruit seeds', becomes: 'Seed powder, protein blends', kcal: 184, carbs: 38, protein: 7, fat: 0.5, fibre: 1.5, vitC: 11, potassium: 246, calcium: 50, iron: 1.5, magnesium: 54, compounds: 'Resistant starch, phenolics' },
  { part: 'Seed flour', becomes: 'Functional flours', kcal: 350, carbs: 70, protein: 12, fat: 1.5, fibre: 5, vitC: null, potassium: 300, calcium: 60, iron: 2, magnesium: 60, compounds: 'Functional proteins, fibre' },
  { part: 'Seed starch', becomes: 'Clean-label thickener', kcal: 350, carbs: 85, protein: 1, fat: 0.2, fibre: 1, vitC: 0, potassium: 50, calcium: 10, iron: 0.2, magnesium: 10, compounds: 'Pure starch' },
  { part: 'Peel', becomes: 'Pectin & fibre recovery', kcal: 60, carbs: 15, protein: 2, fat: 0.5, fibre: 10, vitC: 5, potassium: 200, calcium: 40, iron: 1, magnesium: 30, compounds: 'Pectin, cellulose' },
  { part: 'Core / rag', becomes: 'Dietary fibre', kcal: 50, carbs: 12, protein: 1, fat: 0.3, fibre: 8, vitC: 5, potassium: 150, calcium: 30, iron: 0.8, magnesium: 25, compounds: 'Fibrous biomass' },
  { part: 'Leaves', becomes: 'Fodder & extracts', kcal: 80, carbs: 10, protein: 5, fat: 1, fibre: 5, vitC: 0, potassium: 100, calcium: 140, iron: 2, magnesium: 80, compounds: 'Chlorophyll, antioxidants' },
];

/** Slim value row on the home page. */
export const VALUES = ['Low GI', 'High fibre', 'Gluten free', 'Zero waste'];

export const HOME_REVIEWS = [
  {
    body: 'The flour goes straight into our atta blend — our diabetic customers ask for it by name.',
    author: 'Bakery partner',
    context: 'Pune',
    initial: 'B',
  },
  {
    body: 'Consistent supply and a clean spec sheet. That’s rare with a novel ingredient.',
    author: 'Product developer',
    context: 'Plant-based foods',
    initial: 'P',
  },
  {
    body: 'The chunks hold texture through retort. They became our vegan base.',
    author: 'QSR chain',
    context: 'Mumbai',
    initial: 'Q',
  },
];

export const BUILD_A_BOX_FLAVORS = RETAIL_PRODUCTS.map((p) => p.name);
