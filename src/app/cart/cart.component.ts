import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PurchaseSummary } from '../models/cart.model';
import { CartService } from '../services/cart.service';

/** The cart page. All cart data and rules live in CartService; this component only displays them. */
@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  /** The last single-item purchase, shown as a success message. */
  readonly lastItemPurchase = signal<PurchaseSummary | null>(null);

  constructor(
    readonly cart: CartService,
    private router: Router,
  ) {}

  /** Simulated purchase of one line. The other lines stay in the cart. */
  buy(productId: number): void {
    const purchase = this.cart.purchaseItem(productId);
    if (purchase) {
      this.lastItemPurchase.set(purchase);
    }
  }

  /** Simulated purchase of the whole cart, then go to the confirmation page. */
  buyAll(): void {
    const order = this.cart.purchaseAll();
    // purchaseAll() returns null for an empty cart: no navigation, no false success.
    if (order) {
      this.router.navigate(['/order-confirmation']);
    }
  }
}
