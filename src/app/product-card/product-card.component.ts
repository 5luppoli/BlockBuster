import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../models/product.model';

/**
 * Presentational card for one product. It only displays data and reports the
 * click. The parent decides what "add to cart" means (@Input/@Output, L3 s.18–20).
 */
@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}
