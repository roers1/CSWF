import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Location } from '../../models/location';

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

  register(location: Location) {
    return this.http.post(
      `${environment.API}admin/location`,
      location,
      this.httpOptions
    );
  }

  // getLocations(): Observable<Location[]> {}

  update(location: Location) {}

  delete(location: Location) {}

  searchLocations(term: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${environment.API}admin/location/${term}`)
      .pipe(catchError(this.handleError<Location[]>('searchHeroes', [])));
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
