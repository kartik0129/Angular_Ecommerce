import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  productList: any[] = [];
  productCategoryMapping: any[] = [];
  cartItems: any[] = [];
  constructor(private productSrv: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      this.productList = res.products;
      this.productList.forEach((product: any) => {
        product.counter = 0;
      })
    })
  }
  updateCart(cartObj: any) {
    localStorage.setItem('CartItems', JSON.stringify(cartObj));
  }

  addToCart(product: any) {
    product.counter++;
    if(product.counter==1)
      this.cartItems.push(product);
    this.updateCart(this.cartItems);
  }

  decreaseCounter(product:any) {
    if(product.counter!=0)
    {
      product.counter--;
      if (product.counter == 0) {
        const index = this.cartItems.findIndex((item: any) => {
          return item.productName == product.productName
        })
        this.cartItems.splice(index, 1);
        this.updateCart(this.cartItems);
      }
    }
  }
  increaseCounter(product:any) {
    product.counter++;
    this.updateCart(this.cartItems);
  }
}
