import { Product } from './product.model';

/** One cart line: a product and how many units of it the user wants. */
export interface CartItem {
  product: Product;
  /** Always a whole number ≥ 1. A line with 0 units is removed instead. */
  quantity: number;
}

/** A cart line plus its derived subtotal (price × quantity). */
export type CartLine = CartItem & { subtotal: number };

/** What a simulated purchase bought: used for feedback and the confirmation page. */
export interface PurchaseSummary {
  lines: CartLine[];
  itemCount: number;
  total: number;
}
