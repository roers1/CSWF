import { Haircut } from './haircut';
import { User } from './user';

export class Location {
  constructor(
    public _id: string,
    public name: string,
    public streetAddress: string,
    public postalCode: string,
    public city: string,
    public phoneNumber: number,
    public email: string,
    public createdOn: Date,
    public employee: User[],
    public haircut: Haircut[]
  ) {}
}
