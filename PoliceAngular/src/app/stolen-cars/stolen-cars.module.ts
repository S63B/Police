import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {CommonModule} from "@angular/common";
import {StolenCarService} from "./stolen-cars.service";
import {StolenCarsComponent} from "./stolen-cars.component";
import {SearchFilterPipe} from "./searchPipe";
import {AgmCoreModule} from "angular2-google-maps/core";
import {DirectionsMapDirective} from "../directions-map.directive";
import {GoogleMapsModule} from "../GoogleMaps.module";

@NgModule({
  declarations: [
    StolenCarsComponent,
    SearchFilterPipe,
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
  providers: [StolenCarService],
})
export class StolenCarsModule { }
