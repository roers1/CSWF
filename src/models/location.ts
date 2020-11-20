import { Haircut } from './haircut';
import { User } from './user';

export interface Location {
  _id: string;
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  phoneNumber: number;
  email: string;
  createdOn: Date;
  employee: User[];
  haircut: Haircut[];
}
