import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductRepositoryService } from 'src/app/model/product-repository.service';
import { Observable } from 'rxjs';
import { Cart, CartLine } from 'src/app/model/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private currentCode: string;
  public currentProduct: Product;
  public currentName: string = "";
  public currentMSRP: number = 0;
  public currentQuantity: number;
  public products: Product[];
  public inCart: CartLine;
  constructor(private router: Router,private route: ActivatedRoute,
    public datasource: ProductRepositoryService, private cart: Cart) {
    this.products = this.datasource.getProducts(null,null,null);
    this.currentCode = this.route.snapshot.paramMap.get('Code');
    this.currentProduct = this.datasource.getProduct(this.currentCode);
    if(this.currentProduct == undefined){
      this.router.navigate(["/store"]);
    }
    this.inCart = this.cart.getLine(this.currentProduct);
    if(this.inCart === undefined){
      this.currentQuantity = 1;
    }else{
      this.currentQuantity = this.inCart.quantity;
    }
  }
  
  ngOnInit() {
    console.log(this.currentQuantity);
  }
  addQuantity(){
    this.currentQuantity++;
  }
  removeQuantity(){
    this.currentQuantity--;
  }
  addToCart(){
    this.cart.updateLine(this.currentProduct, this.currentQuantity);
    this.currentQuantity=1;
  }
}
