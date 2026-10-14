import { Component, OnInit, signal } from '@angular/core';

import { MEDIA_SHELVES, MediaShelf, Product } from '../models/product.model';
import { SHELF_SOURCE_CATEGORIES } from '../models/shelf-mapping';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

/** Where the catalogue request is: a literal union instead of several booleans. */
export type LoadState = 'loading' | 'loaded' | 'error';

/** The shop page: loads the catalogue and lets the user add products to the cart. */
@Component({
  selector: 'app-storefront',
  standalone: false,
  templateUrl: './storefront.component.html',
  styleUrl: './storefront.component.css',
})
export class StorefrontComponent implements OnInit {
  // Getters rather than fields: in the Vitest build, fields copied from these
  // imported constants were undefined (see IMPLEMENTATION_GUIDE.md §12).
  get shelves(): MediaShelf[] {
    return MEDIA_SHELVES;
  }

  get shelfSources(): Record<MediaShelf, string[]> {
    return SHELF_SOURCE_CATEGORIES;
  }

  readonly products = signal<Product[]>([]);
  readonly loadState = signal<LoadState>('loading');
  readonly lastAddedTitle = signal<string | null>(null);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /** Called on start and by the "Try again" button. */
  loadProducts(): void {
    this.loadState.set('loading');

    // The HTTP Observable completes by itself, so no unsubscribe is needed (L5 s.4).
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loadState.set('loaded');
      },
      error: () => this.loadState.set('error'),
    });
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.lastAddedTitle.set(product.title);
  }
}
