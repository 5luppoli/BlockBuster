import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../models/product.model';
import { ProductCardComponent } from './product-card.component';

const product: Product = {
  id: 7,
  title: 'Apple Airpods',
  price: 129.99,
  thumbnail: 'https://cdn.dummyjson.com/airpods.webp',
  shelf: 'Records',
  sourceCategory: 'mobile-accessories',
};

describe('ProductCardComponent', () => {
  let fixture: ComponentFixture<ProductCardComponent>;
  let card: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    fixture.componentRef.setInput('product', product);
    fixture.detectChanges();
    card = fixture.nativeElement as HTMLElement;
  });

  it('shows the image, name, price, shelf and original category', () => {
    const image = card.querySelector('img');

    expect(image?.getAttribute('src')).toBe(product.thumbnail);
    expect(image?.getAttribute('alt')).toBe('Apple Airpods');
    expect(card.querySelector('h3')?.textContent).toContain('Apple Airpods');
    expect(card.textContent).toContain('$129.99');
    expect(card.textContent).toContain('Records');
    expect(card.textContent).toContain('DummyJSON: mobile-accessories');
  });

  it('emits the product when "Add to cart" is clicked', () => {
    let emitted: Product | undefined;
    fixture.componentInstance.addToCart.subscribe((p) => (emitted = p));

    card.querySelector('button')?.click();

    expect(emitted).toEqual(product);
  });
});
