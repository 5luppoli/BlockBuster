import { Product } from '../models/product.model';
import { ProductFilters, filterProducts, getPriceRangeError } from './product-filter';

const products: Product[] = [
  { id: 1, title: 'Plant Pot', price: 14.99, thumbnail: '', shelf: 'Books', sourceCategory: 'home-decoration' },
  { id: 2, title: 'Spoon', price: 4.99, thumbnail: '', shelf: 'Books', sourceCategory: 'kitchen-accessories' },
  { id: 3, title: 'iPhone X', price: 899.99, thumbnail: '', shelf: 'Films', sourceCategory: 'smartphones' },
  { id: 4, title: 'Apple Airpods', price: 129.99, thumbnail: '', shelf: 'Records', sourceCategory: 'mobile-accessories' },
  { id: 5, title: 'Apple HomePod Mini Cosmic Grey', price: 99.99, thumbnail: '', shelf: 'Records', sourceCategory: 'mobile-accessories' },
];

const noFilters: ProductFilters = { searchTerm: '', shelf: null, minPrice: null, maxPrice: null };

function ids(filters: Partial<ProductFilters>): number[] {
  return filterProducts(products, { ...noFilters, ...filters }).map((p) => p.id);
}

describe('filterProducts', () => {
  it('returns every product when no filter is set', () => {
    expect(ids({})).toEqual([1, 2, 3, 4, 5]);
  });

  describe('name search', () => {
    it('matches a full product name', () => {
      expect(ids({ searchTerm: 'Apple Airpods' })).toEqual([4]);
    });

    it('matches part of a name, ignoring case', () => {
      expect(ids({ searchTerm: 'APPLE' })).toEqual([4, 5]);
      expect(ids({ searchTerm: 'pod' })).toEqual([4, 5]);
    });

    it('ignores surrounding spaces and treats a blank term as no filter', () => {
      expect(ids({ searchTerm: '  spoon  ' })).toEqual([2]);
      expect(ids({ searchTerm: '   ' })).toEqual([1, 2, 3, 4, 5]);
    });
  });

  it('filters by shelf', () => {
    expect(ids({ shelf: 'Films' })).toEqual([3]);
    expect(ids({ shelf: 'Records' })).toEqual([4, 5]);
  });

  describe('price range', () => {
    it('applies a minimum and a maximum, both inclusive', () => {
      expect(ids({ minPrice: 14.99 })).toEqual([1, 3, 4, 5]);
      expect(ids({ maxPrice: 14.99 })).toEqual([1, 2]);
      expect(ids({ minPrice: 10, maxPrice: 130 })).toEqual([1, 4, 5]);
    });

    it('ignores an invalid range (min > max) instead of hiding everything', () => {
      expect(ids({ minPrice: 100, maxPrice: 10 })).toEqual([1, 2, 3, 4, 5]);
    });

    it('treats NaN from a number input as an empty bound', () => {
      expect(ids({ minPrice: NaN })).toEqual([1, 2, 3, 4, 5]);
    });
  });

  it('combines search, shelf and price (logical AND)', () => {
    expect(ids({ searchTerm: 'apple', shelf: 'Records', maxPrice: 100 })).toEqual([5]);
    expect(ids({ searchTerm: 'apple', shelf: 'Books' })).toEqual([]);
  });

  it('does not modify the original array', () => {
    filterProducts(products, { ...noFilters, shelf: 'Films' });
    expect(products.length).toBe(5);
  });
});

describe('getPriceRangeError', () => {
  it('accepts empty, partial and ordered ranges', () => {
    expect(getPriceRangeError(null, null)).toBeNull();
    expect(getPriceRangeError(5, null)).toBeNull();
    expect(getPriceRangeError(null, 5)).toBeNull();
    expect(getPriceRangeError(5, 5)).toBeNull();
    expect(getPriceRangeError(0, 50)).toBeNull();
  });

  it('rejects a minimum above the maximum', () => {
    expect(getPriceRangeError(50, 10)).toContain('cannot be higher');
  });

  it('rejects negative prices', () => {
    expect(getPriceRangeError(-1, null)).toContain('negative');
    expect(getPriceRangeError(null, -5)).toContain('negative');
  });
});
