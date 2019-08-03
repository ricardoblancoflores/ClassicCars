import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ModelModule } from '../model/model.module';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { Cart } from '../model/cart';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StoreComponent, NavComponent, FooterComponent, CartSummaryComponent, CartComponent, CheckoutComponent, PageNotFoundComponent],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports:[
    StoreComponent
  ],
  providers : [
    ModelModule, Cart
  ]
})
export class StoreModule { }
