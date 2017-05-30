import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PrimengModule} from "../primeng.module";
import {CommonModule} from "@angular/common";
import {StolenCarService} from "./stolen-cars.service";
import {StolenCarsComponent} from "./stolen-cars.component";
import {SearchFilterPipe} from "./searchPipe";

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
  ],
  providers: [StolenCarService],
})
export class StolenCarsModule { }
