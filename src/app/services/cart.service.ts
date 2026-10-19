import { Injectable } from '@angular/core';

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
 * State is held in private fields. Components read it through getters and
 * change it only through the methods below. A getter recalculates on every
 * read, so the derived values (subtotals, count, total) are never out of date.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private lastOrderValue: PurchaseSummary | null = null;

  /** Cart lines with their subtotal, calculated from the current items. */
  get lines(): CartLine[] {
    return this.items.map((item) => ({
      ...item,
      subtotal: roundToCents(item.product.price * item.quantity),
    }));
  }

  /** Total number of units (shown in the header badge). */
  get itemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /** Sum of all subtotals. */
  get total(): number {
    return roundToCents(this.lines.reduce((sum, line) => sum + line.subtotal, 0));
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** The last successful Buy All, read by the confirmation page. No setter, so it is read-only outside. */
  get lastOrder(): PurchaseSummary | null {
    return this.lastOrderValue;
  }

  /** Adds one unit. A product already in the cart gets +1 instead of a second line. */
  addProduct(product: Product): void {
    const alreadyInCart = this.items.some((item) => item.product.id === product.id);

    if (alreadyInCart) {
      this.increaseQuantity(product.id);
    } else {
      this.items = [...this.items, { product, quantity: 1 }];
    }
  }

  increaseQuantity(productId: number): void {
    this.items = this.items.map((item) =>
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  /**
   * Removes one unit, but never goes below 1: a line is only deleted by removeItem,
   * so repeated clicks on "−1" cannot empty the cart by accident.
   */
  decreaseQuantity(productId: number): void {
    this.items = this.items.map((item) =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
  }

  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  /**
   * Simulates buying one line at its current quantity and removes it from the cart.
   * Returns what was bought, or `null` if the product is not in the cart.
   */
  purchaseItem(productId: number): PurchaseSummary | null {
    const line = this.lines.find((l) => l.product.id === productId);
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
    if (this.isEmpty) {
      return null;
    }

    const summary: PurchaseSummary = {
      lines: this.lines,
      itemCount: this.itemCount,
      total: this.total,
    };

    this.lastOrderValue = summary;
    this.items = [];
    return summary;
  }
}
