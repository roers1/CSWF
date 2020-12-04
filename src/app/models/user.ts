﻿import { Appointment } from './appointment';
import { Location } from './location';
import { Timeslot } from './timeslot';

export class User {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public streetAddress: string,
    public postalCode: string,
    public city: string,
    public dateOfBirth: string,
    public phoneNumber: number,
    public email: string,
    public password: string,
    public employee: boolean,
    public location: Location,
    public timeslot: Timeslot[],
    public appointments: Appointment[]
  ) {}
}
