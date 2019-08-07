import { Component, OnInit } from '@angular/core';
import { Cart, CartLine } from 'src/app/model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private currentIndex: number;
  constructor(private cart: Cart) { }

  ngOnInit() {
  }

  get cartItems(): CartLine[] {
    return this.cart.getLines();
  }

  addQuantity(line: CartLine){
    this.cart.addQuantity(line);
    this.cart.recalculate()
  }

  subtractQuantity(line: CartLine){
    this.cart.subtractQuantity(line);
    this.cart.recalculate()
  }

  deleteItem(){
    this.cart.deleteCartLine(this.currentIndex);
    this.cart.recalculate();
  }
}