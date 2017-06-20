import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {PrimengModule} from "./primeng.module";
import {AppRoutingModule} from "./app-routing.module";
import {LiveTrackingModule} from "./livetracking/livetracking.module";
import {StolenCarsModule} from "./stolen-cars/stolen-cars.module";
import {DirectionsMapDirective} from "./directions-map.directive";
import { LoginComponent } from './login/login.component';
import {CanActivateAuthGuard} from "./can-active.authguard";
import {AuthService} from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PrimengModule,
    AppRoutingModule,
    LiveTrackingModule,
    StolenCarsModule,
  ],
  providers: [AuthService, CanActivateAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
