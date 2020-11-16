import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  private userRoute = 'http://localhost:3000/api/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(this.userRoute, { email, password }, this.httpOptions)
      .pipe(
        map((res) => {
          // login successful if there's a jwt token in the response
          if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('jwtToken', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }

          return res;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }
}
