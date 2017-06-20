import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {Pol} from "../domain/pol";
import {environment} from "environments/environment";


@Injectable()
export class liveTrackingService {

  trackingUrl: String = environment.trackingUrl;

  constructor(private http: Http) {
  }

  public getLatestPollByLicenseplate(licenseplate: String): Observable<Pol> {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(this.trackingUrl + "/last_poll?license_plate=" + licenseplate, { headers: this.setHeaders()})
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')));
  }


  public getAllPollsByLicenseplate(licenseplate: String): Observable<Pol[]> {
    return this.http.get(this.trackingUrl + "/pols?license_plate=" + licenseplate, { headers: this.setHeaders()})
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity;
  }

  private setHeaders(): Headers {
    const headers: Headers = new Headers();
    let info = localStorage.getItem("auth");
    headers.append('Authorization', `Basic ${info}`);
    return headers;
  }
}
