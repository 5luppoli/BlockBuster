import { DummyJsonProduct, MEDIA_SHELVES, MediaShelf, Product } from './product.model';

/**
 * DummyJSON has no books, films or records. This table is the single, documented
 * place where its general categories are assigned to BlockBuster shelves
 * (see PROJECT_SPEC.md §4.3). Categories that are not listed are not sold.
 */
export const SHELF_SOURCE_CATEGORIES: Record<MediaShelf, string[]> = {
  Books: ['home-decoration', 'furniture', 'kitchen-accessories'],
  Films: ['smartphones', 'tablets', 'laptops'],
  Records: ['mobile-accessories'],
};

/** Reverse lookup, DummyJSON category → shelf, built once from the table above. */
const SHELF_BY_CATEGORY = new Map<string, MediaShelf>();
for (const shelf of MEDIA_SHELVES) {
  for (const category of SHELF_SOURCE_CATEGORIES[shelf]) {
    SHELF_BY_CATEGORY.set(category, shelf);
  }
}

/** Returns the shelf for a DummyJSON category, or `undefined` if it is not sold. */
export function shelfForCategory(category: string): MediaShelf | undefined {
  return SHELF_BY_CATEGORY.get(category);
}

/**
 * Converts DummyJSON products into BlockBuster products: keeps only mapped
 * categories, then orders them Books → Films → Records (API order within a shelf).
 */
export function toShelfProducts(apiProducts: DummyJsonProduct[]): Product[] {
  const products: Product[] = [];

  for (const apiProduct of apiProducts) {
    const shelf = shelfForCategory(apiProduct.category);
    if (shelf) {
      products.push({
        id: apiProduct.id,
        title: apiProduct.title,
        price: apiProduct.price,
        thumbnail: apiProduct.thumbnail,
        shelf,
        sourceCategory: apiProduct.category,
      });
    }
  }

  // Array.sort is stable, so products keep the API order inside each shelf.
  return products.sort((a, b) => MEDIA_SHELVES.indexOf(a.shelf) - MEDIA_SHELVES.indexOf(b.shelf));
}
