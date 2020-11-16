import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';

@Injectable()
export class UserService {
  private userRoute = 'http://localhost:3000/api/user';
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
    this.httpOptions.headers.set('jwt', localStorage.getItem('jwtToken'));
    console.log(this.httpOptions);
    return this.http.put(`${this.userRoute}/`, { user }, this.httpOptions);
  }
}
