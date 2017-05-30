import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LivetrackingComponent}   from './livetracking/livetracking.component';
import {StolenCarsComponent} from "./stolen-cars/stolen-cars.component";

const routes: Routes = [
  { path: '', redirectTo: '/livetracking', pathMatch: 'full' },
  { path: 'livetracking',  component: LivetrackingComponent },
  { path: 'stolencars',  component: StolenCarsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
