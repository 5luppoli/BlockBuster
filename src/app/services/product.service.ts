import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { DummyJsonProductsResponse, Product } from '../models/product.model';
import { toProducts } from '../models/category-mapping';

/**
 * All products in one request (`limit=0` = no paging), with only the fields
 * the shop uses (`select=`). About 200 small objects, so filtering in the
 * browser is cheap.
 */
export const PRODUCTS_URL =
  'https://dummyjson.com/products?limit=0&select=id,title,price,category,thumbnail';

/** Talks to DummyJSON and returns ready-to-display BlockBuster products. */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<DummyJsonProductsResponse>(PRODUCTS_URL)
      .pipe(map((response) => toProducts(response.products ?? [])));
  }
}
