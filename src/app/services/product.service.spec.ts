import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DummyJsonProduct, DummyJsonProductsResponse, Product } from '../models/product.model';
import { PRODUCTS_URL, ProductService } from './product.service';

function apiProduct(id: number, category: string): DummyJsonProduct {
  return { id, title: `Item ${id}`, price: id * 10, category, thumbnail: `t${id}.webp` };
}

function response(products: DummyJsonProduct[]): DummyJsonProductsResponse {
  return { products, total: products.length, skip: 0, limit: products.length };
}

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests all products with only the fields the shop needs', () => {
    service.getProducts().subscribe();

    const request = http.expectOne(PRODUCTS_URL);
    expect(request.request.method).toBe('GET');
    expect(PRODUCTS_URL).toContain('limit=0');
    expect(PRODUCTS_URL).toContain('select=id,title,price,category,thumbnail');
    request.flush(response([]));
  });

  it('keeps every product in API order and turns category slugs into readable names', () => {
    let result: Product[] = [];
    service.getProducts().subscribe((products) => (result = products));

    http.expectOne(PRODUCTS_URL).flush(
      response([
        apiProduct(1, 'mobile-accessories'),
        apiProduct(2, 'beauty'),
        apiProduct(3, 'womens-jewellery'),
        apiProduct(4, 'vehicle'),
        apiProduct(5, 'pet-supplies'),
      ]),
    );

    expect(result.map((p) => [p.id, p.category])).toEqual([
      [1, 'Mobile Accessories'],
      [2, 'Beauty'],
      [3, "Women's Jewellery"],
      [4, 'Vehicles'],
      [5, 'Pet Supplies'],
    ]);
    expect(result[0]).toEqual({
      id: 1,
      title: 'Item 1',
      price: 10,
      thumbnail: 't1.webp',
      category: 'Mobile Accessories',
    });
  });

  it('returns an empty list when the response has no products array', () => {
    let result: Product[] | undefined;
    service.getProducts().subscribe((products) => (result = products));

    http.expectOne(PRODUCTS_URL).flush({});

    expect(result).toEqual([]);
  });

  it('passes HTTP errors to the subscriber', () => {
    let failed = false;
    service.getProducts().subscribe({ error: () => (failed = true) });

    http.expectOne(PRODUCTS_URL).flush('down', { status: 500, statusText: 'Server Error' });

    expect(failed).toBe(true);
  });
});
