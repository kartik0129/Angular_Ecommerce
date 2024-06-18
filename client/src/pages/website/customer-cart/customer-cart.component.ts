
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit {
  cartItems: any[] = [];
  subTotal = 0;
  cgst = 0;
  sgst = 0;
  constructor(private orderSrv:OrderService){}
 
  ngOnInit(): void {
    this.getCartItems();
    this.calculateCheckout();
  }
  getCartItems() {
    const items = localStorage.getItem('CartItems') ?? '';
    if (items != '') {
      const parsedItems = JSON.parse(items);
      this.cartItems = parsedItems;
    }
    console.log(this.cartItems)

  }

  calculateCheckout() {
    this.cartItems.forEach((item: any) => {
      this.subTotal += item.counter * item.productPrice;
    })
    this.cgst = (9 * this.subTotal) / 100;
    this.sgst = (9 * this.subTotal) / 100;
  }

  onPlaceOrder() {
    const order: any = {
      cartItems: this.cartItems,
      bill: {
        subTotal: this.subTotal,
        cgst: this.cgst,
        sgst:this.sgst
      }
    }

    this.orderSrv.createOrder(order).subscribe((res: any) => {
      if(res.success){
        alert('Order Placed Successfully')
        this.cartItems = [];
        localStorage.removeItem('CartItems')
        this.subTotal = 0;
        this.sgst = 0;
        this.cgst = 0;
      }
    })
   
  }
}
