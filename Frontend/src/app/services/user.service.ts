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
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private alertService: AlertService) {}

  register(user: User) {
    user._id = undefined;
    const body = JSON.stringify(user);

    console.log(body);

    return this.http.post(this.userRoute, body, this.httpOptions);
  }
}
