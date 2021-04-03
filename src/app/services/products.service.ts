import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<any>('https://fakestoreapi.com/products');
  }

  deleteProduct(id) {
    return this.httpClient.delete<any>(
      'https://fakestoreapi.com/products/' + id
    );
  }

  updateProduct(id, item) {
    return this.httpClient.put<any>(
      `https://fakestoreapi.com/products/{id}`,
      item
    );
  }

  addProduct(item) {
    return this.httpClient.post<any>(
      'https://fakestoreapi.com/products/',
      item
    );
  }
}
