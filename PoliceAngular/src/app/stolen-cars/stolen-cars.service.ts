import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Car} from "../domain/car";
import {Observable} from "rxjs";
import {Owner} from "../domain/Owner";
import {Pol} from "../domain/pol";
import {environment} from "environments/environment";



@Injectable()
export class StolenCarService {
  private policeUrl = environment.policeUrl;
  private trackingUrl: String = environment.trackingUrl;


  constructor(private http: Http) {}


  getStolenCars(): Observable<Car[]> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(this.policeUrl + "/stolen_cars")
        .map(this.extractResponse)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getCurrentOwner(id:number): Observable<Owner> {
    return this.http.get(this.policeUrl + "/" + id + "/owner")
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getOwnerHistory(id:number): Observable<Owner[]> {
    return this.http.get(this.policeUrl + "/" + id + "/owner_history")
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCar(licensePlate:string): Observable<Car> {
    return this.http.get(this.policeUrl + "/license_plate/" + licensePlate)
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setStolen(carId:number, isStolen:boolean): Observable<Car>{
    return this.http.post(this.policeUrl + "/" + carId + "/" + isStolen, {headers: new Headers()})
      .map(this.extractDataResponseEntity)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLatestPollByLicenseplate(licenseplate: String): Observable<Pol> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(this.trackingUrl + "/last_poll?license_plate=" + licenseplate)
        .map(this.extractResponse)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')));
  }


  public getAllPollsByLicenseplate(licenseplate: String): Observable<Pol[]> {
    return this.http.get(this.trackingUrl + "/pols?license_plate=" + licenseplate)
      .map(this.extractResponse)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractResponse(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity;
  }

  private extractDataResponseEntity(res: Response) {
    let body = res.json();
    return body ;
  }
}
