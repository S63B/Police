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


// private int id;
// private String username;
// private String password;
// private String salt;
// private String name;
// private String address;
// private String residence;
// private boolean usesWebsite;
// private String role;
// private boolean canEditPrice;
// private List<Invoice> invoices;
// private List<Car_Ownership> ownedCars;
