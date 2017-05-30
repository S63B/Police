/**
 * Created by arjan on 30-5-2017.
 */
export class Owner {
  constructor(public id: number,
              public username: string,
              public name: string,
              public address: string,
              public residence: string,
              public usesWebsite: boolean,
              public role: string,
              public canEditPrice: boolean,
              public invoices: object[],
              public ownedCars: object[]) {
  }
}
