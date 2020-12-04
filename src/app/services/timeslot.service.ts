import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Timeslot } from '../models/timeslot';
import { User } from '../models/user';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class TimeslotService {
  constructor(private http: HttpClient) {}

  addTimeSlot(timeslot: Timeslot, user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        userid: user._id,
        locationid: user.location._id,
      }),
    };
    return this.http
      .post(`${environment.API}timeslot`, { timeslot }, httpOptionsUpdate)
      .pipe(catchError(this.handleError<Timeslot>('addTimeSlot')));
  }

  getFreeTimeslots(userid: string, locationid: string) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        userid: userid,
        locationid: locationid,
      }),
    };
    console.log(`${environment.API}timeslot/location/employee`);
    return this.http
      .get(`${environment.API}timeslot/location/employee`, httpOptionsUpdate)
      .pipe(
        map((data: any) => data.timeslots),
        catchError(this.handleError<Timeslot>('getFreeTimeslots'))
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
