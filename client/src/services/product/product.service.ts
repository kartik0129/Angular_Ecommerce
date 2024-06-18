import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getCategory() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
  }
  saveProduct(obj: any) {
    return this.http.post('http://localhost:8080/app/admin/createProduct',obj)
  }
  getProducts() {
    return this.http.get('http://localhost:8080/app/admin/getProducts')
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:8080/app/admin/deleteProduct/${id}`)
  }
  editProduct(id: string,obj:any) {
    return this.http.put(`http://localhost:8080/app/admin/editProduct/${id}`,obj)
  }
}
