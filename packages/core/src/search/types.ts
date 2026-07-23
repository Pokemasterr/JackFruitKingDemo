export interface ProductSearchHit {
  productId: string;
  slug: string;
  name: string;
  tagline: string | null;
  flavor: string | null;
  priceCents: number | null;
  imageUrl: string | null;
}

export interface SearchOptions {
  limit?: number;
}

/**
 * The seam for product search. Ships a real Postgres implementation (no
 * external dependency); an Algolia / Meilisearch adapter can replace it later.
 */
export interface SearchProvider {
  search(query: string, options?: SearchOptions): Promise<ProductSearchHit[]>;
}
