import { Product } from "./product";
import { Injectable } from '@angular/core';

@Injectable()
export class Cart {
    private lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    addLine(product: Product, quantity: number = 1){
        const line = this.lines.find(line => line.product.productCode == product.productCode);
        if(line === undefined){
            this.lines.push(new CartLine(product, quantity));
        }else {
            line.quantity +=  quantity;
        }
        this.recalculate();
    }

    addQuantity(line: CartLine){
        line.quantity++;
    }

    subtractQuantity(line: CartLine){
        line.quantity--;
    }

    deleteCartLine(index: number){
        this.lines.splice(index, 1);
    }

    recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.MSRP);
        });
    }

    getLines(): CartLine[] {
        return this.lines;
    }
}

export class CartLine{
    constructor(public product: Product, public quantity: number){}

    get lineTotal(): number {
        return this.quantity * this.product.MSRP;
    }
}