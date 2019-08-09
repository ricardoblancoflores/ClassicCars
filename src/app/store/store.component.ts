import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../model/product-repository.service';
import { Product } from '../model/product';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private productRepServ: ProductRepositoryService, public cart: Cart) { }

  public selectedCat: string = null;
  public selectedVendor: string =null;
  public selectedScale: string = null;
  public productsPerPage = 12;
  public publicSelectedPage = 1;
  public currentProduct: Product = null;
  public currentName: string = "";
  public currentMSRP: number = 0;
  public currentQuantity: number = 1;
  ngOnInit() {
  }

  confirmAdd(p:Product){
    this.currentProduct = p;
    this.currentMSRP = p.MSRP;
    this.currentName = p.productName;
  }
  addQuantity(){
    this.currentQuantity++;
  }
  removeQuantity(){
    this.currentQuantity--;
  }
  addToCart(product: Product){
    this.cart.addLine(product, this.currentQuantity);
    this.currentQuantity=1;
  }
  get products(): Product[] {
  const pageIndex = (this.publicSelectedPage - 1) * this.productsPerPage;
    return this.productRepServ.getProducts(this.selectedCat, this.selectedVendor, this.selectedScale)
    .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.productRepServ.getCategories();
  }

  get vendors(): string[] {
    //return this.productRepServ.getVendors();
    return this.productRepServ.getProducts(this.selectedCat, null, this.selectedScale).map((p) => p.productVendor)
    .filter((p, ind, arr)=> arr.indexOf(p) === ind).sort();
  }

  get scales(): string[] {
    //return this.productRepServ.getScales();
    return this.productRepServ.getProducts(this.selectedCat, this.selectedVendor, this.selectedScale).map((p) => p.productScale) 
    .filter((p, ind, arr)=> arr.indexOf(p) === ind).sort();
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.productRepServ.getProducts(this.selectedCat, this.selectedVendor, this.selectedScale).length / this.productsPerPage))
    .fill(0).map((x, i)=> i+1);
  }

  changePage(newNumber: number) {
    this.publicSelectedPage = newNumber;
  }

  changePageSize(n: number){
    this.productsPerPage = n;
    this.changePage(1);
  }

  changeCategory(newCat: string){
    this.publicSelectedPage = 1;
    this.selectedCat = newCat;
  }
  changeVendor(newVendor: string){
    this.publicSelectedPage = 1;
    this.selectedVendor = newVendor === "All" ? null : newVendor;
    console.log(this.selectedVendor);
  }
  changeScale(newScale: string){
    this.publicSelectedPage = 1;
    this.selectedScale = newScale === "All" ? null : newScale;
    console.log(this.selectedScale);
  }
  stop(event: Event) {
    event.stopPropagation();
  }
}
