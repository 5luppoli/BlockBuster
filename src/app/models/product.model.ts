/** The three BlockBuster shelves. A literal union type (course L2 s.10). */
export type MediaShelf = 'Books' | 'Films' | 'Records';

/** Shelves in display order: books first, then films, then records. */
export const MEDIA_SHELVES: MediaShelf[] = ['Books', 'Films', 'Records'];

/** A product as the BlockBuster app uses it, after mapping the DummyJSON data. */
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  shelf: MediaShelf;
  /** The original DummyJSON category, always shown to the user for transparency. */
  sourceCategory: string;
}

/** One product exactly as DummyJSON returns it with `select=id,title,price,category,thumbnail`. */
export interface DummyJsonProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

/** The envelope DummyJSON wraps around the product list. */
export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}
