import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';

/** Brand and main navigation, with a live cart counter. */
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(readonly cart: CartService) {}
}
