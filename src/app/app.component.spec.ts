import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent, HeaderComponent],
    }).compileComponents();
  });

  it('renders the brand, navigation and the simulated-purchase disclaimer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('.navbar-brand')?.textContent).toContain('BlockBuster');
    expect(page.querySelector('nav')?.textContent).toContain('Shop');
    expect(page.querySelector('nav')?.textContent).toContain('Cart');
    expect(page.querySelector('footer')?.textContent).toContain('no payment is taken');
  });
});
