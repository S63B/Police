import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Car} from "../domain/car";
import {Observable} from "rxjs";
import {Owner} from "../domain/Owner";



@Injectable()
export class StolenCarService {
  private apiUrl = 'http://localhost:8080/police'; // URL to rest api

  constructor(private http: Http) {}


  getStolenCars(): Observable<Car[]> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(this.apiUrl + "/stolen_cars")
        .map(this.extractResponse)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getCurrentOwner(id:number): Observable<Owner> {
    return this.http.get(this.apiUrl + "/" + id + "/owner")
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getOwnerHistory(id:number): Observable<Owner[]> {
    return this.http.get(this.apiUrl + "/" + id + "/owner_history")
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractResponse(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity || {};
  }

  private extractDataResponseEntity(res: Response) {
    let body = res.json();
    return body || { };
  }
}
