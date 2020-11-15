import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { AlertService } from '../services';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  private userRoute = 'http://localhost:3000/api/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private alertService: AlertService) {}

  register(user: User) {
    this.http.post(this.userRoute, user, this.httpOptions)
    .subscribe(
      res => { console.log(res)},
      error => { this.alertService.error(error.message) }
    )


    // return this.http.post<User>(this.userRoute, user, this.httpOptions).pipe(
    //   tap((newUser: User) => console.log(`added user w/ id=${newUser._id}`)),
    //   catchError(this.handleError<User>('registerUser'))
    // );
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
