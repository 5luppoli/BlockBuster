import { Component, OnInit } from '@angular/core';

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

  products: Product[] = [];
  loadState: LoadState = 'loading';
  lastAddedTitle: string | null = null;

  // Filter inputs, bound to the form with [(ngModel)].
  searchTerm = '';
  selectedCategory: CategoryChoice = null;
  priceOption: PriceOption = 'none';

  /** The categories actually present in the catalogue, A → Z. */
  get categories(): string[] {
    return categoriesOf(this.products);
  }

  /**
   * The products on screen. A getter recalculates on every read, so the list is
   * always consistent with the catalogue and every filter.
   */
  get visibleProducts(): Product[] {
    const category = this.selectedCategory;

    return filterProducts(this.products, {
      searchTerm: this.searchTerm,
      category: category === 'all' ? null : category,
      price: this.priceOption,
    });
  }

  get hasActiveFilters(): boolean {
    return (
      this.searchTerm.trim() !== '' ||
      (this.selectedCategory ?? 'all') !== 'all' ||
      this.priceOption !== 'none'
    );
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /** Called on start and by the "Try again" button. */
  loadProducts(): void {
    this.loadState = 'loading';

    // The HTTP Observable completes by itself, so no unsubscribe is needed (L5 s.4).
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loadState = 'loaded';
      },
      error: () => {
        this.loadState = 'error';
      },
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.priceOption = 'none';
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.lastAddedTitle = product.title;
  }
}
