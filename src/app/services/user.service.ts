import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    return this.http.post(
      `${environment.API}user/register`,
      user,
      this.httpOptions
    );
  }

  put(user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        id: user._id,
      }),
    };
    return this.http.put(`${environment.API}user`, { user }, httpOptionsUpdate);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
