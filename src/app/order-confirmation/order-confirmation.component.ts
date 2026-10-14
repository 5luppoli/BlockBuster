import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';

/**
 * Shown after Buy All. It reads the recorded order from CartService, so opening
 * the URL directly (without a purchase) cannot show a false success message.
 */
@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent {
  constructor(readonly cart: CartService) {}
}
