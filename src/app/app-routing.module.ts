import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { StorefrontComponent } from './storefront/storefront.component';

export const routes: Routes = [
  { path: '', component: StorefrontComponent, title: 'BlockBuster | Shop' },
  { path: 'cart', component: CartComponent, title: 'BlockBuster | Cart' },
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
    title: 'BlockBuster | Order confirmation',
  },
  // Unknown URLs go back to the shop (must stay last: routes match in order).
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
