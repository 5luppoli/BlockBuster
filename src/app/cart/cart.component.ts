import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';

/** The cart page. All cart data and rules live in CartService; this component only displays them. */
@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(readonly cart: CartService) {}
}
