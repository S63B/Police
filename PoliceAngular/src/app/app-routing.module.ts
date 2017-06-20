import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LivetrackingComponent}   from './livetracking/livetracking.component';
import {StolenCarsComponent} from "./stolen-cars/stolen-cars.component";
import { LoginComponent } from "app/login/login.component";
import { CanActivateAuthGuard } from "app/can-active.authguard";

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/livetracking', 
    pathMatch: 'full',
    canActivate: [CanActivateAuthGuard] },
  { 
    path: 'livetracking',  
    component: LivetrackingComponent,
    canActivate: [CanActivateAuthGuard] },
  { 
    path: 'stolencars',  
    component: StolenCarsComponent,
    canActivate: [CanActivateAuthGuard] },
  { 
    path: 'login',  
    component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
