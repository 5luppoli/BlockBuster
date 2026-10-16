import { TestBed } from '@angular/core/testing';

import { Product } from '../models/product.model';
import { CartService, roundToCents } from './cart.service';

function makeProduct(id: number, price: number): Product {
  return {
    id,
    title: `Product ${id}`,
    price,
    thumbnail: `p${id}.webp`,
    category: 'Furniture',
  };
}

describe('CartService', () => {
  let cart: CartService;
  const productA = makeProduct(1, 10);
  const productB = makeProduct(2, 5);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('starts empty', () => {
    expect(cart.isEmpty()).toBe(true);
    expect(cart.itemCount()).toBe(0);
    expect(cart.total()).toBe(0);
  });

  it('adds a new product with quantity 1', () => {
    cart.addProduct(productA);

    expect(cart.lines().length).toBe(1);
    expect(cart.lines()[0].quantity).toBe(1);
    expect(cart.itemCount()).toBe(1);
  });

  it('increases the quantity instead of duplicating a product added twice', () => {
    cart.addProduct(productA);
    cart.addProduct(productA);

    expect(cart.lines().length).toBe(1);
    expect(cart.lines()[0].quantity).toBe(2);
    expect(cart.itemCount()).toBe(2);
  });

  it('increases the quantity by one with increaseQuantity', () => {
    cart.addProduct(productA);
    cart.increaseQuantity(productA.id);

    expect(cart.lines()[0].quantity).toBe(2);
  });

  it('ignores increaseQuantity for a product that is not in the cart', () => {
    cart.increaseQuantity(99);

    expect(cart.isEmpty()).toBe(true);
  });

  it('decreases the quantity by one with decreaseQuantity, but never below 1', () => {
    cart.addProduct(productA);
    cart.addProduct(productA);
    cart.addProduct(productA);

    cart.decreaseQuantity(productA.id);
    expect(cart.lines()[0].quantity).toBe(2);

    // Repeated clicks stop at 1 instead of removing the line.
    cart.decreaseQuantity(productA.id);
    cart.decreaseQuantity(productA.id);
    cart.decreaseQuantity(productA.id);
    expect(cart.lines()[0].quantity).toBe(1);
    expect(cart.itemCount()).toBe(1);
  });

  it('ignores decreaseQuantity for a product that is not in the cart', () => {
    cart.addProduct(productA);
    cart.decreaseQuantity(99);

    expect(cart.lines()[0].quantity).toBe(1);
  });

  it('removes a line completely', () => {
    cart.addProduct(productA);
    cart.addProduct(productB);
    cart.removeItem(productA.id);

    expect(cart.lines().map((l) => l.product.id)).toEqual([productB.id]);
  });

  it('calculates subtotals and the total (A $10 × 2 + B $5 × 1 = $25)', () => {
    cart.addProduct(productA);
    cart.addProduct(productA);
    cart.addProduct(productB);

    expect(cart.lines().map((l) => l.subtotal)).toEqual([20, 5]);
    expect(cart.total()).toBe(25);
    expect(cart.itemCount()).toBe(3);
  });

  it('rounds totals to whole cents', () => {
    cart.addProduct(makeProduct(3, 0.1));
    cart.addProduct(makeProduct(4, 0.2));

    expect(cart.total()).toBe(0.3);
    expect(roundToCents(19.99 * 3)).toBe(59.97);
  });

  describe('purchaseItem', () => {
    it('buys one line at its quantity and keeps the other lines', () => {
      cart.addProduct(productA);
      cart.addProduct(productA);
      cart.addProduct(productB);

      const summary = cart.purchaseItem(productA.id);

      expect(summary?.itemCount).toBe(2);
      expect(summary?.total).toBe(20);
      expect(summary?.lines[0].product.id).toBe(productA.id);
      expect(cart.lines().map((l) => l.product.id)).toEqual([productB.id]);
      expect(cart.total()).toBe(5);
    });

    it('returns null for a product that is not in the cart', () => {
      expect(cart.purchaseItem(42)).toBeNull();
    });
  });

  describe('purchaseAll', () => {
    it('returns null and records nothing when the cart is empty', () => {
      expect(cart.purchaseAll()).toBeNull();
      expect(cart.lastOrder()).toBeNull();
    });

    it('records the order and empties the cart', () => {
      cart.addProduct(productA);
      cart.addProduct(productB);

      const summary = cart.purchaseAll();

      expect(summary).toEqual(cart.lastOrder());
      expect(summary?.itemCount).toBe(2);
      expect(summary?.total).toBe(15);
      expect(summary?.lines.length).toBe(2);
      expect(cart.isEmpty()).toBe(true);
      expect(cart.total()).toBe(0);
    });
  });
});
