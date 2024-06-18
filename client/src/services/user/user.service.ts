import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(obj:any) {
    return this.http.post('http://localhost:8080/app/user/createUser',obj);
  }
  
  loginUser(obj: any) {
    return this.http.post('http://localhost:8080/app/user/loginUser', obj);
  }
}
