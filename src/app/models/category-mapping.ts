import { DummyJsonProduct, Product } from './product.model';

/**
 * Display names for the DummyJSON category slugs (checked against
 * `/products/category-list`). The slugs stay in the code only: the page
 * always shows the readable name.
 */
export const CATEGORY_LABELS: Record<string, string> = {
  beauty: 'Beauty',
  fragrances: 'Fragrances',
  furniture: 'Furniture',
  groceries: 'Groceries',
  'home-decoration': 'Home Decoration',
  'kitchen-accessories': 'Kitchen Accessories',
  laptops: 'Laptops',
  'mens-shirts': "Men's Shirts",
  'mens-shoes': "Men's Shoes",
  'mens-watches': "Men's Watches",
  'mobile-accessories': 'Mobile Accessories',
  motorcycle: 'Motorcycles',
  'skin-care': 'Skin Care',
  smartphones: 'Smartphones',
  'sports-accessories': 'Sports Accessories',
  sunglasses: 'Sunglasses',
  tablets: 'Tablets',
  tops: 'Tops',
  vehicle: 'Vehicles',
  'womens-bags': "Women's Bags",
  'womens-dresses': "Women's Dresses",
  'womens-jewellery': "Women's Jewellery",
  'womens-shoes': "Women's Shoes",
  'womens-watches': "Women's Watches",
};

/**
 * Returns the display name for a category slug. A slug the table does not know
 * (a category added to the API later) is still readable: "pet-supplies" → "Pet Supplies".
 */
export function categoryLabel(slug: string): string {
  return (
    CATEGORY_LABELS[slug] ??
    slug
      .split('-')
      .filter((word) => word !== '')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  );
}

/** Converts API products into BlockBuster products, keeping the API order. */
export function toProducts(apiProducts: DummyJsonProduct[]): Product[] {
  return apiProducts.map((apiProduct) => ({
    id: apiProduct.id,
    title: apiProduct.title,
    price: apiProduct.price,
    thumbnail: apiProduct.thumbnail,
    category: categoryLabel(apiProduct.category),
  }));
}

/** The distinct categories of a product list, sorted A → Z, for the filter dropdown. */
export function categoriesOf(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
}
