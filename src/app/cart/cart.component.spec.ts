import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { CartComponent } from './cart.component';

const productA: Product = { id: 1, title: 'Lamp', price: 10, thumbnail: 'a.webp', shelf: 'Books', sourceCategory: 'home-decoration' };
const productB: Product = { id: 2, title: 'Spoon', price: 5, thumbnail: 'b.webp', shelf: 'Books', sourceCategory: 'kitchen-accessories' };

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let cart: CartService;
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [CartComponent],
    }).compileComponents();

    cart = TestBed.inject(CartService);
    fixture = TestBed.createComponent(CartComponent);
    page = fixture.nativeElement as HTMLElement;
  });

  function text(testId: string): string[] {
    return Array.from(page.querySelectorAll(`[data-testid="${testId}"]`)).map((e) => e.textContent?.trim() ?? '');
  }

  function clickButton(label: string): void {
    (page.querySelector(`button[aria-label="${label}"]`) as HTMLButtonElement).click();
    fixture.detectChanges();
  }

  it('shows the empty state with a link back to the shop', () => {
    fixture.detectChanges();

    expect(page.textContent).toContain('Your cart is empty.');
    expect(page.querySelector('a[href="/"]')).not.toBeNull();
  });

  it('lists lines with quantity, subtotal and total (A $10 × 2 + B $5 × 1 = $25)', () => {
    cart.addProduct(productA);
    cart.addProduct(productA);
    cart.addProduct(productB);
    fixture.detectChanges();

    expect(text('quantity')).toEqual(['2', '1']);
    expect(text('subtotal')).toEqual(['$20.00', '$5.00']);
    expect(text('total')).toEqual(['$25.00']);
    expect(text('item-count')).toEqual(['3']);
  });

  it('+1 increases the quantity, subtotal and total', () => {
    cart.addProduct(productA);
    fixture.detectChanges();

    clickButton('Add one more Lamp');

    expect(text('quantity')).toEqual(['2']);
    expect(text('subtotal')).toEqual(['$20.00']);
    expect(text('total')).toEqual(['$20.00']);
  });

  it('Remove deletes the line, and removing the last line shows the empty state', () => {
    cart.addProduct(productA);
    cart.addProduct(productB);
    fixture.detectChanges();

    clickButton('Remove Lamp');
    expect(text('total')).toEqual(['$5.00']);
    expect(page.textContent).not.toContain('Lamp');

    clickButton('Remove Spoon');
    expect(page.textContent).toContain('Your cart is empty.');
  });

  it('Buy purchases one line, keeps the others and shows a simulated-purchase message', () => {
    cart.addProduct(productA);
    cart.addProduct(productA);
    cart.addProduct(productB);
    fixture.detectChanges();

    clickButton('Buy Lamp');

    const message = page.querySelector('[data-testid="item-purchase-message"]')?.textContent?.replace(/\s+/g, ' ');
    expect(message).toContain('Simulated purchase complete: 2 × Lamp ($20.00)');
    expect(message).toContain('no payment was taken');
    expect(cart.lines().map((l) => l.product.title)).toEqual(['Spoon']);
    expect(text('total')).toEqual(['$5.00']);
  });

  it('Buy All empties the cart and navigates to the confirmation page', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    cart.addProduct(productA);
    fixture.detectChanges();

    (Array.from(page.querySelectorAll('button')).find((b) => b.textContent?.trim() === 'Buy All') as HTMLButtonElement).click();

    expect(cart.isEmpty()).toBe(true);
    expect(cart.lastOrder()?.total).toBe(10);
    expect(navigate).toHaveBeenCalledWith(['/order-confirmation']);
  });

  it('Buy All does nothing for an empty cart', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    fixture.detectChanges();

    fixture.componentInstance.buyAll();

    expect(navigate).not.toHaveBeenCalled();
    expect(cart.lastOrder()).toBeNull();
    expect(Array.from(page.querySelectorAll('button')).some((b) => b.textContent?.trim() === 'Buy All')).toBe(false);
  });
});
