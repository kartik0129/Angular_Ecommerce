import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: ''
  }

  signupObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  confirmPassword: string = '';

  showSignup: boolean = false

  constructor(private router: Router, private userSrv: UserService) {

  }

  onLogin() {
    this.userSrv.loginUser(this.loginObj).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('isAdmin', JSON.stringify(res.isAdmin));
        const isAdmin = res.isAdmin;
        if (!isAdmin) this.router.navigateByUrl('/categoryProducts');
        else this.router.navigateByUrl('/products')
      }
    },
      error => {
        alert(error.error.message);
      })
  }

  onSignup() {
    this.userSrv.createUser(this.signupObj).subscribe((res: any) => {
      if (res.success) {
        this.showSignup = !this.showSignup
      }
    })
  }
  signinWithGoogle() {
   
  }
}
