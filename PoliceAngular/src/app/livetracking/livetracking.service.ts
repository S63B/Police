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
    return this.http.get(this.baseUrl + "/last_poll?license_plate=" + licenseplate)
      .map(this.extractDataPoll);
  }

  public getAllPollsByLicenseplate(licenseplate: String): Observable<Pol[]> {
    return this.http.get(this.baseUrl + "/pols?license_plate=" + licenseplate)
      .map(this.extractDataPolls);
  }

  private extractDataPolls(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity as Pol[];
  }
  private extractDataPoll(res: Response) {
    let body = res.text();
    return JSON.parse(body).entity as Pol;
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  //
  //
  // public getRidesBetween(id: String, startTime: number, endTime: number): Observable<Ride[]> {
  //   return this.httpService.get(`${API_URL}rides?license_plate=${id}&start_date=${startTime}&end_date=${endTime}`)
  //     .map(this.httpService.extractData);
  // }
  //
  // public get(id: String): Observable<Ride> {
  //   return this.httpService.get(`${API_URL}ride?id=${id}`)
  //     .map(response => response.json());
  // }
}
