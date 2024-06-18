import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPencil,faTrash } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;


  productObj: any = {
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "deliveryTimeSpan": "",
    "categoryName": '',
    "productImageUrl": ""
  }

  editProductObj: any = {
    productSku: '',
    productName: '',
    productPrice:0
  }
  categoryList: any[] = [];
  productList: any[] = [];
  editProduct: any = {};

  faPencil = faPencil
  faTrash = faTrash

  constructor(private productSrv: ProductService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getProducts();
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    })
  }
  getProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      this.productList = res.products;
    })
  }

  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
      if (res.success) {
        this.getProducts();
        alert('Product Created');
      }
      else alert(res.message)      
    })
  }

  onDelete(id:string) {
    this.productSrv.deleteProduct(id).subscribe((res: any) => {
      if (res.success) {
        this.getProducts();
        alert('Product deleted');
      }
      else alert(res.message)
    })
  }

  setEditId(product:any) {
    this.editProduct = {...product}
  }

  onEdit(id:string) {
    this.productSrv.editProduct(id, this.editProduct).subscribe((res: any) => {
      if (res.success) {
        this.getProducts();
        alert('Product updated');
      }
      else alert(res.message)
    })
  }
  
}
