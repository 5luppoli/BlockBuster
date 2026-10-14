import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { routes } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { Product } from './models/product.model';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from './services/product.service';
import { StorefrontComponent } from './storefront/storefront.component';

const catalogue: Product[] = [
  { id: 1, title: 'Plant Pot', price: 14.99, thumbnail: 'a.webp', shelf: 'Books', sourceCategory: 'home-decoration' },
  { id: 3, title: 'iPhone X', price: 899.99, thumbnail: 'c.webp', shelf: 'Films', sourceCategory: 'smartphones' },
];

/**
 * The full user journey through the real routes:
 * shop → add to cart → cart → back to shop → cart again → Buy All → confirmation.
 */
describe('Shopping journey (routing + shared cart)', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule.forRoot(routes)],
      declarations: [StorefrontComponent, ProductCardComponent, CartComponent, OrderConfirmationComponent],
      providers: [{ provide: ProductService, useValue: { getProducts: () => of(catalogue) } }],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  function page(): HTMLElement {
    return harness.routeNativeElement as HTMLElement;
  }

  function clickButtonWithText(text: string, index = 0): void {
    const buttons = Array.from(page().querySelectorAll('button')).filter((b) => b.textContent?.trim() === text);
    buttons[index].click();
    harness.detectChanges();
  }

  it('keeps the cart across navigation and ends on the confirmation page', async () => {
    await harness.navigateByUrl('/');
    clickButtonWithText('Add to cart', 0);
    clickButtonWithText('Add to cart', 0);
    clickButtonWithText('Add to cart', 1);

    await harness.navigateByUrl('/cart');
    expect(page().textContent).toContain('Plant Pot');
    expect(page().querySelector('[data-testid="total"]')?.textContent?.trim()).toBe('$929.97');

    await harness.navigateByUrl('/');
    await harness.navigateByUrl('/cart');
    expect(page().querySelector('[data-testid="item-count"]')?.textContent?.trim()).toBe('3');

    clickButtonWithText('Buy All');
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/order-confirmation');
    expect(page().textContent).toContain('Your simulated purchase was successful');
    expect(page().querySelector('[data-testid="order-total"]')?.textContent?.trim()).toBe('$929.97');

    await harness.navigateByUrl('/cart');
    expect(page().textContent).toContain('Your cart is empty.');
  });

  it('redirects unknown URLs to the shop', async () => {
    await harness.navigateByUrl('/does-not-exist');

    expect(TestBed.inject(Router).url).toBe('/');
    expect(page().textContent).toContain('Books, films and records');
  });
});
