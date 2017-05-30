/**
 * Created by Nekkyou on 2-5-2017.
 */


export class Car {
  constructor(
    public id: number,
    public licensePlate: {
      expirationDate:Object
      id:number
      license:string
    },
    public energyLabel: string,
    public stolen: boolean
  ) {}
}
