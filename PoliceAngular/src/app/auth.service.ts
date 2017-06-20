import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from "environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  adminUrl: String = environment.adminUrl;

  constructor(private http: Http, private router: Router) {
  }

  isAuthorized(): boolean {
    let token = localStorage.getItem("auth");
    return token && token.length > 0;
  }

  login(username: string, password: string): Observable<any> {
    localStorage.setItem("auth", `${btoa(`${username}:${password}`)}`);

    return this.check();
  }

  logout() {
    localStorage.removeItem("auth");
    this.router.navigateByUrl('login');
  }

  
  check(): Observable<any>{
    return this.http.get(`${this.adminUrl}/account/loggedin`, { headers: this.setHeaders()})
      .map(res => res.status);
  }

  
  private setHeaders(): Headers {
    const headers: Headers = new Headers();
    let info = localStorage.getItem("auth");
    headers.append('Authorization', `Basic ${info}`);
    return headers;
  }
}