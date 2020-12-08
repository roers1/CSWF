import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
import { Timeslot } from '../models/timeslot';
import { User } from '../models/user';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointmentsByUser(user: User) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
      }),
    };
    return this.http
      .get(`${environment.API}appointment/${user._id}`, httpOptionsUpdate)
      .pipe(
        map((data: any) => data.Appointments),
        catchError(this.handleError<Appointment>('getAppointment'))
      );
  }

  getAppointmentsByLocation(location: Location) {
    let httpOptionsUpdate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
        locationid: location._id,
      }),
    };
    return this.http
      .get(`${environment.API}appointment/location`, httpOptionsUpdate)
      .pipe(catchError(this.handleError<Appointment>('getAppointment')));
  }

  postAppointment(appointment: Appointment) {
    let httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        jwtToken: localStorage.getItem('jwtToken'),
      }),
    };
    console.log(appointment);
    return this.http.post(
      `${environment.API}appointment`,
      appointment,
      httpOptionsPost
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
