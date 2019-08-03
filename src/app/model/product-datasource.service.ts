import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PROTOCOL = 'http';
const PORT = '8080';
@Injectable({
  providedIn: 'root'
})
export class ProductDatasourceService {
  private baseURL: string;

  constructor(private httpClient: HttpClient) { 
    this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}/ecommerce/api`;
  };
  getProducts(): any{
    return this.httpClient.get(this.baseURL + '/products');
  }
}
