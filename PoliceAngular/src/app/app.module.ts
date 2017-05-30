import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {PrimengModule} from "./primeng.module";
import {AppRoutingModule} from "./app-routing.module";
import {LiveTrackingModule} from "./livetracking/livetracking.module";
import {StolenCarsModule} from "./stolen-cars/stolen-cars.module";

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
