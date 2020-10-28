import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInfo } from './ProductInfo';
import { User } from './User';
import { map } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = { 'Content-type': 'application/json' };
  private options = { headers: this.headers };

  constructor(private httpClient: HttpClient, public route: ActivatedRoute) { }

  selectedProduct: any;
  selectedUser: any;

  getProducts() {
    return this.httpClient.get<ProductInfo[]>('http://localhost:3000/products', this.options);
  }

  addProduct(product: ProductInfo) {
    return this.httpClient.post('http://localhost:3000/products', product, this.options);
  }

// change id to update for now

  updateProduct(product: ProductInfo) {
    return this.httpClient.put('http://localhost:3000/products/6/', product, this.options);
  }

  deleteProduct() {
    return this.httpClient.delete('http://localhost:3000/products/6/');
  }

  getUsers() {
    return this.httpClient.get<User[]>('http://localhost:3100/users', this.options);
  }

  addUser(user: User) {
    return this.httpClient.post('http://localhost:3100/users', user, this.options);
  }

  setSelectedProduct(product: ProductInfo) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  updateUser(user: User) {
    return this.httpClient.put('http://localhost:3100/users/1', user, this.options);
  }

  deleteUser() {
    return this.httpClient.delete('http://localhost:3100/users/1');
  }
}
