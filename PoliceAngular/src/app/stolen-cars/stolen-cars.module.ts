import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {AppComponent} from "../app.component";
import {DirectionsMapDirective} from "../directions-map.directive";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {CommonModule} from "@angular/common";
import {StolenCarService} from "./stolen-cars.service";
import {StolenCarsComponent} from "./stolen-cars.component";

@NgModule({
  declarations: [
    StolenCarsComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    HttpModule,
  ],
  providers: [StolenCarService],
})
export class StolenCarsModule { }
