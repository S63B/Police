import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {LivetrackingComponent} from "./livetracking.component";
import {liveTrackingService} from "./livetracking.service";
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "angular2-google-maps/core";
import {GoogleMapsModule} from "../GoogleMaps.module";

@NgModule({
  declarations: [
    LivetrackingComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAwaMgMpnH4_D_Gc5CbqNKLDn7-FFKE9Q'
    }),
    GoogleMapsModule
  ],
  providers: [liveTrackingService],
})
export class LiveTrackingModule { }
