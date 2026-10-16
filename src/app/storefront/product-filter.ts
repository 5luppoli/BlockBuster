import { Product } from '../models/product.model';

/** A preset price range. `min` is inclusive, `max` is exclusive; `null` = no bound. */
export interface PriceBand {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
}

/** Preset ranges, chosen so each one holds a useful share of the catalogue. */
export const PRICE_BANDS: PriceBand[] = [
  { id: 'under-10', label: 'Under $10', min: null, max: 10 },
  { id: '10-25', label: '$10 – $25', min: 10, max: 25 },
  { id: '25-50', label: '$25 – $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 – $100', min: 50, max: 100 },
  { id: '100-500', label: '$100 – $500', min: 100, max: 500 },
  { id: '500-1000', label: '$500 – $1,000', min: 500, max: 1000 },
  { id: 'over-1000', label: '$1,000 and over', min: 1000, max: null },
];

/**
 * The value of the single "Price" dropdown: no price option, a sort order,
 * or the `id` of one of the PRICE_BANDS.
 */
export type PriceOption = 'none' | 'price-asc' | 'price-desc' | string;

/** Everything the user can filter by. `null` means "no restriction". */
export interface ProductFilters {
  searchTerm: string;
  category: string | null;
  price: PriceOption;
}

/**
 * Applies all filters together (logical AND), then the sort order if one is chosen.
 * A pure function: same input, same output, and the original array is never changed.
 */
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const term = filters.searchTerm.trim().toLowerCase();
  const band = PRICE_BANDS.find((b) => b.id === filters.price);

  const result = products.filter((product) => {
    if (term && !product.title.toLowerCase().includes(term)) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (band?.min != null && product.price < band.min) {
      return false;
    }
    if (band?.max != null && product.price >= band.max) {
      return false;
    }
    return true;
  });

  // filter() already returned a new array, so sorting it in place is safe.
  if (filters.price === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.price === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }
  return result;
}
