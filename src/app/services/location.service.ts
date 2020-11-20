import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  //private locationRoute = 'http://localhost:3000/api/admin/location';
  private locationRoute =
    'https://hairdresserbackend.herokuapp.com/api/admin/location';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(location: Location) {
    return this.http.post(`${this.locationRoute}`, location, this.httpOptions);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationRoute).pipe(
      map((data) => data),
      catchError(this.handleError<Location[]>('getLocations', []))
    );
  }

  update(location: Location) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwt: localStorage.getItem('jwtToken'),
      }),
    };
    return this.http.put(
      `${this.locationRoute}`,
      { location },
      httpOptionsUpdate
    );
  }

  delete(location: Location) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwt: localStorage.getItem('jwtToken'),
      }),
    };
    return this.http
      .delete(`${this.locationRoute}/${location._id}`, httpOptions)
      .pipe(catchError(this.handleError('deleteLocation')));
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
