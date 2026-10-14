import { Injectable, computed, signal } from '@angular/core';

import { CartItem, CartLine, PurchaseSummary } from '../models/cart.model';
import { Product } from '../models/product.model';

/** Rounds to whole cents so sums like 0.1 + 0.2 display and compare correctly. */
export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * The single source of truth for the shopping cart.
 *
 * `providedIn: 'root'` makes one shared instance for the whole app, so the
 * storefront, header and cart page all see the same cart, and it survives
 * navigation between routes (it is lost on a full page reload).
 *
 * State is held in a private writable signal. Components read it through
 * read-only signals and change it only through the methods below.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsState = signal<CartItem[]>([]);
  private readonly lastOrderState = signal<PurchaseSummary | null>(null);

  /** Cart lines with their subtotal, recalculated whenever the items change. */
  readonly lines = computed<CartLine[]>(() =>
    this.itemsState().map((item) => ({
      ...item,
      subtotal: roundToCents(item.product.price * item.quantity),
    })),
  );

  /** Total number of units (shown in the header badge). */
  readonly itemCount = computed(() =>
    this.itemsState().reduce((count, item) => count + item.quantity, 0),
  );

  /** Sum of all subtotals. */
  readonly total = computed(() =>
    roundToCents(this.lines().reduce((sum, line) => sum + line.subtotal, 0)),
  );

  readonly isEmpty = computed(() => this.itemsState().length === 0);

  /** The last successful Buy All, read by the confirmation page. */
  readonly lastOrder = this.lastOrderState.asReadonly();

  /** Adds one unit. A product already in the cart gets +1 instead of a second line. */
  addProduct(product: Product): void {
    const alreadyInCart = this.itemsState().some((item) => item.product.id === product.id);

    if (alreadyInCart) {
      this.increaseQuantity(product.id);
    } else {
      this.itemsState.update((items) => [...items, { product, quantity: 1 }]);
    }
  }

  increaseQuantity(productId: number): void {
    this.itemsState.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  removeItem(productId: number): void {
    this.itemsState.update((items) => items.filter((item) => item.product.id !== productId));
  }

  /**
   * Simulates buying one line at its current quantity and removes it from the cart.
   * Returns what was bought, or `null` if the product is not in the cart.
   */
  purchaseItem(productId: number): PurchaseSummary | null {
    const line = this.lines().find((l) => l.product.id === productId);
    if (!line) {
      return null;
    }

    this.removeItem(productId);
    return { lines: [line], itemCount: line.quantity, total: line.subtotal };
  }

  /**
   * Simulates buying the whole cart, then empties it.
   * Returns `null` (and changes nothing) if the cart is empty.
   */
  purchaseAll(): PurchaseSummary | null {
    if (this.isEmpty()) {
      return null;
    }

    const summary: PurchaseSummary = {
      lines: this.lines(),
      itemCount: this.itemCount(),
      total: this.total(),
    };

    this.lastOrderState.set(summary);
    this.itemsState.set([]);
    return summary;
  }
}
