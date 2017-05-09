import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PrimengModule} from "./primeng.module";
import {AppRoutingModule} from "./app-routing.module";
import {LiveTrackingModule} from "./livetracking/livetracking.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PrimengModule,
    AppRoutingModule,
    LiveTrackingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
