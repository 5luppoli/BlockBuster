import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { StorefrontComponent } from './storefront.component';

const catalogue: Product[] = [
  { id: 1, title: 'Plant Pot', price: 14.99, thumbnail: 'a.webp', shelf: 'Books', sourceCategory: 'home-decoration' },
  { id: 2, title: 'Table Lamp', price: 49.99, thumbnail: 'b.webp', shelf: 'Books', sourceCategory: 'home-decoration' },
  { id: 3, title: 'iPhone X', price: 899.99, thumbnail: 'c.webp', shelf: 'Films', sourceCategory: 'smartphones' },
  { id: 4, title: 'Apple Airpods', price: 129.99, thumbnail: 'd.webp', shelf: 'Records', sourceCategory: 'mobile-accessories' },
];

describe('StorefrontComponent', () => {
  let fixture: ComponentFixture<StorefrontComponent>;
  let page: HTMLElement;
  let response: () => Observable<Product[]>;

  beforeEach(async () => {
    response = () => of(catalogue);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule.forRoot([])],
      declarations: [StorefrontComponent, ProductCardComponent],
      providers: [{ provide: ProductService, useValue: { getProducts: () => response() } }],
    }).compileComponents();
  });

  async function render(): Promise<void> {
    fixture = TestBed.createComponent(StorefrontComponent);
    page = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function cardTitles(): string[] {
    return Array.from(page.querySelectorAll('app-product-card h3')).map((h) => h.textContent?.trim() ?? '');
  }

  it('shows a loading message until the products arrive', async () => {
    const pending = new Subject<Product[]>();
    response = () => pending;
    await render();

    expect(page.textContent).toContain('Loading products…');

    pending.next(catalogue);
    pending.complete();
    fixture.detectChanges();

    expect(page.textContent).not.toContain('Loading products…');
    expect(cardTitles().length).toBe(4);
  });

  it('shows one card per product, in catalogue order', async () => {
    await render();

    expect(cardTitles()).toEqual(['Plant Pot', 'Table Lamp', 'iPhone X', 'Apple Airpods']);
  });

  it('explains the demo shelf mapping', async () => {
    await render();

    const note = (page.querySelector('[role="note"]')?.textContent ?? '').replace(/\s+/g, ' ');
    expect(note).toContain('Demo catalogue');
    expect(note).toContain('Films: smartphones, tablets, laptops');
  });

  it('shows an error with a working "Try again" button when loading fails', async () => {
    response = () => throwError(() => new Error('offline'));
    await render();

    expect(page.querySelector('[role="alert"]')?.textContent).toContain("couldn't load the catalogue");

    response = () => of(catalogue);
    (page.querySelector('[role="alert"] button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(page.querySelector('[role="alert"]')).toBeNull();
    expect(cardTitles().length).toBe(4);
  });

  it('shows an empty-catalogue message when no products are returned', async () => {
    response = () => of([]);
    await render();

    expect(page.textContent).toContain('The catalogue is empty');
  });

  it('adds a product to the shared cart and confirms it', async () => {
    await render();
    const cart = TestBed.inject(CartService);

    (page.querySelector('app-product-card button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(cart.itemCount()).toBe(1);
    expect(cart.lines()[0].product.title).toBe('Plant Pot');
    expect(page.textContent).toContain('Plant Pot added to cart.');
  });
});
