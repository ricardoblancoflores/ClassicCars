import { Component, OnInit } from '@angular/core';
import { Cart, CartLine } from 'src/app/model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: Cart) { }

  ngOnInit() {
  }

  get cartItems(): CartLine[] {
    return this.cart.getLines();
  }

  editQuantity(prod: CartLine, act: string){
    this.cart.editQuantity(prod, act);
    this.cart.recalculate()
  }

  deleteItem(index: number){
    this.cart.deleteCartLine(index);
    this.cart.recalculate();
  }
}