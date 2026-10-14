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

  describe('filters', () => {
    async function type(selector: string, value: string): Promise<void> {
      const input = page.querySelector(selector) as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    async function chooseShelf(label: string): Promise<void> {
      const select = page.querySelector('#shelf') as HTMLSelectElement;
      const option = Array.from(select.options).find((o) => o.textContent?.trim() === label);
      select.value = option?.value ?? '';
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    function resultCount(): string {
      return (page.querySelector('[data-testid="result-count"]')?.textContent ?? '').replace(/\s+/g, ' ').trim();
    }

    beforeEach(render);

    it('starts with the shelf placeholder selected and every product visible', () => {
      const select = page.querySelector('#shelf') as HTMLSelectElement;

      expect(select.options[select.selectedIndex].textContent?.trim()).toBe('Select a shelf…');
      expect(resultCount()).toBe('Showing 4 of 4 products');
    });

    it('filters by partial name as the user types', async () => {
      await type('#search', 'ta');

      expect(cardTitles()).toEqual(['Table Lamp']);
    });

    it('filters by shelf, and "All shelves" shows everything again', async () => {
      await chooseShelf('Films');
      expect(cardTitles()).toEqual(['iPhone X']);

      await chooseShelf('All shelves');
      expect(cardTitles().length).toBe(4);
    });

    it('combines search, shelf and price without clearing each other', async () => {
      await chooseShelf('Books');
      await type('#max-price', '20');
      expect(cardTitles()).toEqual(['Plant Pot']);

      await type('#search', 'lamp');
      expect(cardTitles()).toEqual([]);
      expect((page.querySelector('#max-price') as HTMLInputElement).value).toBe('20');
      expect(fixture.componentInstance.selectedShelf()).toBe('Books');
    });

    it('explains an invalid price range and ignores it', async () => {
      await type('#min-price', '100');
      await type('#max-price', '10');

      expect(page.querySelector('#price-error')?.textContent).toContain('cannot be higher');
      expect(cardTitles().length).toBe(4);
    });

    it('shows a no-match message, and Reset filters restores the full catalogue', async () => {
      await type('#search', 'zzzz');
      expect(page.textContent).toContain('No products match your filters.');

      const reset = Array.from(page.querySelectorAll('button')).find(
        (b) => b.textContent?.trim() === 'Reset filters',
      ) as HTMLButtonElement;
      reset.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(cardTitles().length).toBe(4);
      expect((page.querySelector('#search') as HTMLInputElement).value).toBe('');
      expect(fixture.componentInstance.selectedShelf()).toBeNull();
    });
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
