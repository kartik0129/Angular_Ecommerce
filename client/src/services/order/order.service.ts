import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
}
  createOrder(obj:any) {
    return this.http.post('http://localhost:8080/app/order/createOrder', obj);
  }
  getOrders() {
    return this.http.get('http://localhost:8080/app/order/getOrders');
  }
}
