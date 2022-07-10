import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'https://ng-json-server.herokuapp.com/products';

  constructor(private http: HttpClient) {
  }

  postProduct(product: Omit<IProduct, 'id'>) {
    return this.http.post<IProduct>(this.baseURL, product);
  }

  getProducts() {
    return this.http.get<IProduct[]>(this.baseURL);
  }

  updateProduct({id, ...product}: IProduct) {
    return this.http.put<IProduct>(`${this.baseURL}/${id}`, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct>(`${this.baseURL}/${id}`)
  }
}

