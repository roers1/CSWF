import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  loggedIn = false;
  admin = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(
        `${environment.API}login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        map((res) => {
          if (res) {
            this.user = res.user;
            console.log(this.user);
            this.admin = this.user.employee;
            localStorage.setItem('jwtToken', res.token);
            this.loggedIn = true;
          }

          return res;
        }),
        catchError(this.handleError<string>('login', email))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  logout() {
    // remove user from local storage to log user out
    this.loggedIn = false;
    localStorage.removeItem('jwtToken');
    this.user = null;
  }
}
