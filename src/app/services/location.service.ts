import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '../../models/location';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  location: Location;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(location: Location, adminId: string) {
    let httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        id: adminId,
      }),
    };
    return this.http.post(
      `${environment.API}admin/location`,
      location,
      httpOptionsPost
    );
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.API}admin/location`);
  }

  update(location: Location) {}

  delete(location: Location) {}

  searchLocations(term: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${environment.API}admin/location/search/?name=${term}`)
      .pipe(
        map((data: any) => data.locations),
        catchError(this.handleError<Location[]>('searchLocations', []))
      );
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
