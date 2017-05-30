import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {LivetrackingComponent} from "./livetracking.component";
import {liveTrackingService} from "./livetracking.service";
import {CommonModule} from "@angular/common";
import {DirectionsMapDirective} from "../directions-map.directive";
import {AgmCoreModule} from "angular2-google-maps/core";

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
