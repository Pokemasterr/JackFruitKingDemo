import { prisma } from '@jk/db';
import type { ProductSearchHit, SearchOptions, SearchProvider } from './types';

/**
 * PostgresSearch — a real, dependency-free search over the catalog. Uses
 * case-insensitive matching across name / tagline / flavor / description and
 * returns the default variant's price. Swap for Algolia/Meilisearch later by
 * implementing SearchProvider.
 */
export class PostgresSearch implements SearchProvider {
  async search(query: string, options: SearchOptions = {}): Promise<ProductSearchHit[]> {
    const q = query.trim();
    if (!q) return [];
    const limit = options.limit ?? 8;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { tagline: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { variants: { some: { flavor: { contains: q, mode: 'insensitive' } } } },
        ],
      },
      take: limit,
      include: {
        variants: { orderBy: { isDefault: 'desc' }, take: 1 },
      },
    });

    return products.map((p) => {
      const variant = p.variants[0];
      return {
        productId: p.id,
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        flavor: variant?.flavor ?? null,
        priceCents: variant?.priceCents ?? null,
        imageUrl: p.imageUrl,
      };
    });
  }
}
