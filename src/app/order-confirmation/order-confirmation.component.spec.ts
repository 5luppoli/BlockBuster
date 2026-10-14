import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { OrderConfirmationComponent } from './order-confirmation.component';

const lamp: Product = { id: 1, title: 'Lamp', price: 10, thumbnail: 'a.webp', shelf: 'Books', sourceCategory: 'home-decoration' };

describe('OrderConfirmationComponent', () => {
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let cart: CartService;
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [OrderConfirmationComponent],
    }).compileComponents();

    cart = TestBed.inject(CartService);
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    page = fixture.nativeElement as HTMLElement;
  });

  it('shows "No recent purchase" (not a success message) when opened directly', () => {
    fixture.detectChanges();

    expect(page.textContent).toContain('No recent purchase');
    expect(page.textContent).not.toContain('successful');
    expect(page.querySelector('a[href="/"]')?.textContent).toContain('Back to the shop');
  });

  it('confirms a completed Buy All with item count, total and a simulated-purchase notice', () => {
    cart.addProduct(lamp);
    cart.addProduct(lamp);
    cart.purchaseAll();
    fixture.detectChanges();

    expect(page.querySelector('h1')?.textContent).toContain('Your simulated purchase was successful');
    expect(page.textContent).toContain('no payment was taken');
    expect(page.querySelector('[data-testid="order-count"]')?.textContent?.trim()).toBe('2 items');
    expect(page.querySelector('[data-testid="order-total"]')?.textContent?.trim()).toBe('$20.00');
    expect(page.querySelector('a[href="/"]')?.textContent).toContain('Back to the shop');
  });
});
