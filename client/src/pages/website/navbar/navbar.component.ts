import { faCartShopping, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  faCartShopping = faCartShopping
  cartItems: any[] = [];
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems() {
    const items = localStorage.getItem('CartItems') ?? '';
    if (items != '') {
      const parsedItems = JSON.parse(items);
      this.cartItems = parsedItems;
    }

  }

}
