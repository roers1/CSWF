import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';
import * as _ from 'lodash';
import { User } from '../models/user';

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
    return this.http
      .post(`${environment.API}location`, location, httpOptionsPost)
      .pipe(catchError(this.handleError<Location>('registerLocation')));
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.API}location`).pipe(
      map((data: any) => data.locations),
      catchError(this.handleError<Location[]>('getLocations', []))
    );
  }

  addUser(locationid: string, userid: string) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        userid: userid,
        locationid: locationid,
      }),
    };

    console.log(`${environment.API}location/employee`);
    return this.http
      .put(`${environment.API}location/employee`, {}, httpOptionsUpdate)
      .pipe(catchError(this.handleError<string>('getLocation', userid)));
  }

  update(location: Location, user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        id: user._id,
      }),
    };
    console.log(location);

    return this.http
      .put(`${environment.API}location`, { location }, httpOptionsUpdate)
      .pipe(catchError(this.handleError<Location>('updateLocation', location)));
  }

  delete(location: Location, adminId: string): Observable<Location> {
    const id = location._id;
    const url = `${environment.API}location/${id}`;

    let httpOptionsDelete = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        id: adminId,
      }),
    };

    return this.http
      .delete<Location>(url, httpOptionsDelete)
      .pipe(catchError(this.handleError<Location>('deleteLocation')));
  }

  getLocation(id: string): Observable<Location> {
    return this.http.get<Location[]>(`${environment.API}location/${id}`).pipe(
      map((data: any) => data.location),
      catchError(this.handleError<string>('getLocation', id))
    );
  }

  searchLocations(term: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${environment.API}location/search/?name=${term}`)
      .pipe(
        map((data: any) => data.locations),
        catchError(this.handleError<Location[]>('searchLocations', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
