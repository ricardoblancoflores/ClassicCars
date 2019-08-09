import { Injectable } from '@angular/core';
import { Product } from './product';
import { ProductDatasourceService } from './product-datasource.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {
private products: Product[] = [];
public categories : string[] = [];
public vendors : string[] = [];
public scales : string[] = [];
  constructor(private dataSourceService: ProductDatasourceService) {
    dataSourceService.getProducts().subscribe((res)=>{
      this.products = res['products'];
      this.categories = res['products'].map((p) => p.productLine)
      .filter((p, ind, arr)=> arr.indexOf(p) === ind).sort();
      this.vendors = res['products'].map((p) => p.productVendor)
      .filter((p, ind, arr)=> arr.indexOf(p) === ind).sort();
      this.scales = res['products'].map((p) => p.productScale) 
      .filter((p, ind, arr)=> arr.indexOf(p) === ind).sort();
    });
   };
   
   getCategories(): string[]{
     return this.categories;
   }

   getVendors(): string[]{
     return this.vendors;
   }

   getScales(): string[]{
    return this.scales;
  }

   getProducts(category:string = null, vendor:string = null, scale:string = null): Product[]{
     return this.products.filter((Product, i, a) => category === null || Product.productLine === category)
     .filter((Product, i, a) => vendor === null || Product.productVendor === vendor)
     .filter((Product, i, a) => scale === null || Product.productScale === scale);
   }

   getProduct(productCode: string): Product{
     return this.products.find((product) => productCode == product.productCode);
   }
}
