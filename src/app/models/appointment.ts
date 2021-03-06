import { Location } from './location';
import { Timeslot } from './timeslot';
import { Haircut } from './haircut';
import { User } from './user';

export class Appointment {
  public _id: string;
  constructor(
    public customer: User,
    public location: Location,
    public timeslot: Timeslot,
    public haircut: Haircut
  ) {}
}
