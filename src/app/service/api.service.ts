import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  postProduct(product: IProduct) {
    return this.http.post<IProduct>('http://localhost:3000/products', product);
  }

  getProducts() {
    return this.http.get<IProduct[]>('http://localhost:3000/products');
  }
}

