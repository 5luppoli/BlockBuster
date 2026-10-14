import { MediaShelf, Product } from '../models/product.model';

/** Everything the user can filter by. `null` means "no restriction". */
export interface ProductFilters {
  searchTerm: string;
  shelf: MediaShelf | null;
  minPrice: number | null;
  maxPrice: number | null;
}

/** A number input can produce `null` (empty) or, rarely, `NaN`; both mean "no bound". */
function toBound(value: number | null): number | null {
  return value !== null && Number.isFinite(value) ? value : null;
}

/** Explains why a price range is invalid, or returns `null` if it is valid. */
export function getPriceRangeError(minPrice: number | null, maxPrice: number | null): string | null {
  const min = toBound(minPrice);
  const max = toBound(maxPrice);

  if ((min !== null && min < 0) || (max !== null && max < 0)) {
    return 'Prices cannot be negative.';
  }
  if (min !== null && max !== null && min > max) {
    return 'The minimum price cannot be higher than the maximum price.';
  }
  return null;
}

/**
 * Applies all filters together (logical AND). A pure function: same input,
 * same output, no side effects, which makes it easy to unit test.
 * An invalid price range is ignored so the other filters keep working.
 */
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const term = filters.searchTerm.trim().toLowerCase();
  const priceRangeIsValid = getPriceRangeError(filters.minPrice, filters.maxPrice) === null;
  const min = priceRangeIsValid ? toBound(filters.minPrice) : null;
  const max = priceRangeIsValid ? toBound(filters.maxPrice) : null;

  return products.filter((product) => {
    if (term && !product.title.toLowerCase().includes(term)) {
      return false;
    }
    if (filters.shelf && product.shelf !== filters.shelf) {
      return false;
    }
    if (min !== null && product.price < min) {
      return false;
    }
    if (max !== null && product.price > max) {
      return false;
    }
    return true;
  });
}
