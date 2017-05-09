import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {LivetrackingComponent} from "./livetracking.component";
import {AppComponent} from "../app.component";
import {DirectionsMapDirective} from "../directions-map.directive";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {liveTrackingService} from "./livetracking.service";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LivetrackingComponent,
    DirectionsMapDirective
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNtmOxKdE2VfxAHO6wTdiqRZMoGN_20cc'
    })
  ],
  providers: [liveTrackingService],
})
export class LiveTrackingModule { }
