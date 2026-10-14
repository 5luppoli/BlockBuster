import { Component, OnInit, computed, signal } from '@angular/core';

import { MEDIA_SHELVES, MediaShelf, Product } from '../models/product.model';
import { SHELF_SOURCE_CATEGORIES } from '../models/shelf-mapping';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { filterProducts, getPriceRangeError } from './product-filter';

/** Where the catalogue request is: a literal union instead of several booleans. */
export type LoadState = 'loading' | 'loaded' | 'error';

/** Dropdown value: `null` = placeholder (nothing chosen yet), 'all' = "All shelves". Both show everything. */
export type ShelfChoice = MediaShelf | 'all' | null;

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

  // Filter inputs, bound to the form with [(ngModel)]. `null` = nothing chosen.
  readonly searchTerm = signal('');
  readonly selectedShelf = signal<ShelfChoice>(null);
  readonly minPrice = signal<number | null>(null);
  readonly maxPrice = signal<number | null>(null);

  /** Re-evaluated automatically whenever minPrice or maxPrice changes. */
  readonly priceRangeError = computed(() => getPriceRangeError(this.minPrice(), this.maxPrice()));

  /** The products on screen: always consistent with the catalogue and every filter. */
  readonly visibleProducts = computed(() => {
    const shelf = this.selectedShelf();

    return filterProducts(this.products(), {
      searchTerm: this.searchTerm(),
      shelf: shelf === 'all' ? null : shelf,
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice(),
    });
  });

  readonly hasActiveFilters = computed(
    () =>
      this.searchTerm().trim() !== '' ||
      (this.selectedShelf() ?? 'all') !== 'all' ||
      this.minPrice() !== null ||
      this.maxPrice() !== null,
  );

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

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedShelf.set(null);
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.lastAddedTitle.set(product.title);
  }
}
