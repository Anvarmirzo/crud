import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  postProduct(product: Omit<IProduct, 'id'>) {
    return this.http.post<IProduct>('http://localhost:3000/products', product);
  }

  getProducts() {
    return this.http.get<IProduct[]>('http://localhost:3000/products');
  }

  updateProduct({id, ...product}: IProduct) {
    return this.http.put<IProduct>(`http://localhost:3000/products/${id}`, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct>(`http://localhost:3000/products/${id}`)
  }
}

