import { Component, OnInit, OnDestroy } from '@angular/core';
import {Pol} from "../domain/pol";
import {liveTrackingService} from "./livetracking.service";

@Component({
  selector: 'app-livetracking',
  templateUrl: './livetracking.component.html',
  styleUrls: ['./livetracking.component.css'],
  providers:[liveTrackingService]
})
export class LivetrackingComponent implements OnInit, OnDestroy{

  title = 'Police';
  intervalTimer : number;
  pols:Pol[] = [];
  licensePlate: string="";

  constructor(private liveTrackingService : liveTrackingService){
    console.log(this.liveTrackingService);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer);
  }

  ngOnInit() {
  }

  trackCar(){
   let scope = this;
   this.initData();
   this.intervalTimer = window.setInterval(this.updateData, 30000, scope);
  }

  initData(){
    this.liveTrackingService.getAllPollsByLicenseplate(this.licensePlate).subscribe(
      res =>{
        this.pols.concat(res);
      },
      error => {
        alert(error)
        console.log(error);
      });
  }


  updateData(scope:this){
    scope.liveTrackingService.getLatestPollByLicenseplate(scope.licensePlate).subscribe(
       res =>{
         let pol = new Pol(res.id, res.lat, res.lng ,res.timestampMillis);
         scope.pols.push(pol);
       },
       error => {
         alert(error)
         console.log(error);
       });
  }
}
