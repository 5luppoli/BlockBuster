import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { HeaderComponent } from './header.component';

const product: Product = {
  id: 1,
  title: 'Plant Pot',
  price: 14.99,
  thumbnail: 'pot.webp',
  category: 'Home Decoration',
};

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let cart: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    cart = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  function badgeText(): string {
    const badge = (fixture.nativeElement as HTMLElement).querySelector('[data-testid="cart-count"]');
    return badge?.textContent?.trim() ?? '';
  }

  it('shows 0 items for an empty cart', () => {
    expect(badgeText()).toBe('0');
  });

  it('updates the badge with the total quantity when the cart changes', () => {
    cart.addProduct(product);
    cart.addProduct(product);
    fixture.detectChanges();

    expect(badgeText()).toBe('2');
  });
});
