import { faCartShopping, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
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
  isAdmin: boolean = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.getCartItems();
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') ?? '');
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.router.navigateByUrl('');
    }
  }
  getCartItems() {
    const items = localStorage.getItem('CartItems') ?? '';
    if (items != '') {
      const parsedItems = JSON.parse(items);
      this.cartItems = parsedItems;
    }
  }

}
