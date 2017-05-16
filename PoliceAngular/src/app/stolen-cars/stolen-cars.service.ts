import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {CARS} from "./mock-cars";
import {Car} from "../domain/car";



@Injectable()
export class StolenCarService {
  private apiUrl = 'http://localhost:8080/api/'; // URL to rest api

  constructor(private http: Http) {}

  getCars(): Promise<Car[]> {
    return Promise.resolve(CARS);
  }

  getStolenCars(): Promise<Car[]> {
      return this.getCars()
        .then(cars => cars.filter(car => car.stolen === true));
  }
}
