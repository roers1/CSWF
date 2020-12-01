import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Timeslot } from '../models/timeslot';
import { User } from '../models/user';

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

  addTimeSlot(timeslot: Timeslot, user) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        userid: user._id,
      }),
    };
    return this.http
      .post(`${environment.API}timeslot`, { timeslot }, httpOptionsUpdate)
      .pipe(catchError(this.handleError<Timeslot>('registerUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
