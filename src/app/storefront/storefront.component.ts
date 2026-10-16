import { Component, OnInit, computed, signal } from '@angular/core';

import { categoriesOf } from '../models/category-mapping';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { PRICE_BANDS, PriceBand, PriceOption, filterProducts } from './product-filter';

/** Where the catalogue request is: a literal union instead of several booleans. */
export type LoadState = 'loading' | 'loaded' | 'error';

/** Dropdown value: `null` = placeholder (nothing chosen yet), 'all' = "All categories". Both show everything. */
export type CategoryChoice = string | 'all' | null;

/** The shop page: loads the catalogue and lets the user add products to the cart. */
@Component({
  selector: 'app-storefront',
  standalone: false,
  templateUrl: './storefront.component.html',
  styleUrl: './storefront.component.css',
})
export class StorefrontComponent implements OnInit {
  // A getter rather than a field: in the Vitest build, fields copied from
  // imported constants were undefined (see IMPLEMENTATION_GUIDE.md §12).
  get priceBands(): PriceBand[] {
    return PRICE_BANDS;
  }

  readonly products = signal<Product[]>([]);
  readonly loadState = signal<LoadState>('loading');
  readonly lastAddedTitle = signal<string | null>(null);

  /** The categories actually present in the catalogue, A → Z. */
  readonly categories = computed(() => categoriesOf(this.products()));

  // Filter inputs, bound to the form with [(ngModel)].
  readonly searchTerm = signal('');
  readonly selectedCategory = signal<CategoryChoice>(null);
  readonly priceOption = signal<PriceOption>('none');

  /** The products on screen: always consistent with the catalogue and every filter. */
  readonly visibleProducts = computed(() => {
    const category = this.selectedCategory();

    return filterProducts(this.products(), {
      searchTerm: this.searchTerm(),
      category: category === 'all' ? null : category,
      price: this.priceOption(),
    });
  });

  readonly hasActiveFilters = computed(
    () =>
      this.searchTerm().trim() !== '' ||
      (this.selectedCategory() ?? 'all') !== 'all' ||
      this.priceOption() !== 'none',
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
    this.selectedCategory.set(null);
    this.priceOption.set('none');
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.lastAddedTitle.set(product.title);
  }
}
