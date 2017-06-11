import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {Pol} from "../domain/pol";


@Injectable()
export class liveTrackingService {

  baseUrl: String = 'http://192.168.24.120:8080';

  constructor(private http: Http) {
    console.log("service created");
  }

  public getLatestPollByLicenseplate(licenseplate: String): Observable<Pol> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(this.baseUrl + "/last_poll?license_plate=" + licenseplate)
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')));
  }


  public getAllPollsByLicenseplate(licenseplate: String): Observable<Pol[]> {
    return this.http.get(this.baseUrl + "/pols?license_plate=" + licenseplate)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  private extractData(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity;
  }
}
