/** A product as the BlockBuster app uses it, after mapping the API data. */
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  /** Human-readable category shown to the user, e.g. "Laptops" or "Women's Shoes". */
  category: string;
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
