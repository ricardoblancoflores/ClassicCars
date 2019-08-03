import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(public cart: Cart, private router: Router) { }

  ngOnInit() {
  }

  goToCart(){
    this.router.navigateByUrl('/cart');
  }
}
