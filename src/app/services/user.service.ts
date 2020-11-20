import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private userRoute = 'http://localhost:3000/api/user';
  private userRoute = 'https://hairdresserbackend.herokuapp.com/api/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.userRoute}/register`, user, this.httpOptions);
  }

  update(user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwt: localStorage.getItem('jwtToken'),
      }),
    };
    return this.http.put(`${this.userRoute}/`, { user }, httpOptionsUpdate);
  }
}
