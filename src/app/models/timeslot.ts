import { Appointment } from './appointment';
import { User } from './user';

export class Timeslot {
  public barber: User;
  public appointment: Appointment;

  constructor(
    public _id: string,
    public startTime: Date,
    public endTime: Date
  ) {}
}
