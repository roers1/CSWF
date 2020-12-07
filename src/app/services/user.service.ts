import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Timeslot } from '../models/timeslot';
import { User } from '../models/user';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getFreeEmployees(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API}user/open`);
  }

  register(user: User) {
    return this.http
      .post(`${environment.API}user/register`, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('registerUser')));
  }

  put(user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        id: user._id,
      }),
    };
    return this.http
      .put(`${environment.API}user`, { user }, httpOptionsUpdate)
      .pipe(catchError(this.handleError<User>('registerUser')));
  }

  getUsersFromLocation(location: Location) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
      }),
    };
    return this.http
      .get(`${environment.API}user/location/${location._id}`, httpOptionsUpdate)
      .pipe(
        map((data: any) => data.users),
        catchError(this.handleError<User>('registerUser'))
      );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
