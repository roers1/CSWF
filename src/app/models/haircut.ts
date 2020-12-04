import { Location } from './location';

export class Haircut {
  constructor(
    public _id: string,
    public name: string,
    public price: number,
    public location: Location
  ) {}
}
