import { Product } from '../models/product.model';
import { PRICE_BANDS, ProductFilters, filterProducts } from './product-filter';

const products: Product[] = [
  { id: 1, title: 'Plant Pot', price: 14.99, thumbnail: '', category: 'Home Decoration' },
  { id: 2, title: 'Spoon', price: 4.99, thumbnail: '', category: 'Kitchen Accessories' },
  { id: 3, title: 'iPhone X', price: 899.99, thumbnail: '', category: 'Smartphones' },
  { id: 4, title: 'Apple Airpods', price: 129.99, thumbnail: '', category: 'Mobile Accessories' },
  { id: 5, title: 'Apple HomePod Mini Cosmic Grey', price: 99.99, thumbnail: '', category: 'Mobile Accessories' },
  { id: 6, title: 'Gaming Laptop', price: 1000, thumbnail: '', category: 'Laptops' },
];

const noFilters: ProductFilters = { searchTerm: '', category: null, price: 'none' };

function ids(filters: Partial<ProductFilters>): number[] {
  return filterProducts(products, { ...noFilters, ...filters }).map((p) => p.id);
}

describe('filterProducts', () => {
  it('returns every product, in the original order, when no filter is set', () => {
    expect(ids({})).toEqual([1, 2, 3, 4, 5, 6]);
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
      expect(ids({ searchTerm: '   ' })).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  it('filters by category', () => {
    expect(ids({ category: 'Smartphones' })).toEqual([3]);
    expect(ids({ category: 'Mobile Accessories' })).toEqual([4, 5]);
  });

  describe('price option', () => {
    it('sorts by lowest or highest price first', () => {
      expect(ids({ price: 'price-asc' })).toEqual([2, 1, 5, 4, 3, 6]);
      expect(ids({ price: 'price-desc' })).toEqual([6, 3, 4, 5, 1, 2]);
    });

    it('keeps a preset band: minimum inclusive, maximum exclusive', () => {
      expect(ids({ price: 'under-10' })).toEqual([2]);
      expect(ids({ price: '10-25' })).toEqual([1]);
      expect(ids({ price: '50-100' })).toEqual([5]);
      expect(ids({ price: '500-1000' })).toEqual([3]);
      expect(ids({ price: 'over-1000' })).toEqual([6]);
    });

    it('has bands that cover every price exactly once', () => {
      for (const price of [0, 9.99, 10, 25, 99.99, 500, 1000, 50000]) {
        const matches = PRICE_BANDS.filter((b) => (b.min ?? -Infinity) <= price && price < (b.max ?? Infinity));
        expect(matches.length).toBe(1);
      }
    });

    it('treats an unknown option as no price filter', () => {
      expect(ids({ price: 'nonsense' })).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  it('combines search, category and price (logical AND)', () => {
    expect(ids({ searchTerm: 'apple', category: 'Mobile Accessories', price: '50-100' })).toEqual([5]);
    expect(ids({ searchTerm: 'apple', category: 'Mobile Accessories', price: 'price-desc' })).toEqual([4, 5]);
    expect(ids({ searchTerm: 'apple', category: 'Laptops' })).toEqual([]);
  });

  it('does not modify the original array', () => {
    filterProducts(products, { ...noFilters, price: 'price-desc' });
    expect(products.map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
