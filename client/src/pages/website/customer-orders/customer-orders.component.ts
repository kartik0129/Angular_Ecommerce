import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../../../services/order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent implements OnInit {

  orders: any[] = [];
  constructor(private orderSrv:OrderService) { }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderSrv.getOrders().subscribe((res: any) => {
      this.orders = res.orders;
    })
  }
  convertDateToId(createdAt: any){
    const date = new Date(createdAt);
    return date.getTime();
  }
}
