import {Component, OnInit, OnDestroy} from '@angular/core';
import {Pol} from "../domain/pol";
import {liveTrackingService} from "./livetracking.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-livetracking',
  templateUrl: './livetracking.component.html',
  styleUrls: ['./livetracking.component.css'],
  providers: [liveTrackingService]
})
export class LivetrackingComponent implements OnInit, OnDestroy {

  title = 'Police';
  pollSubscription: Subscription = null;
  pols: Pol[] = [];
  oldPols: Pol[] = [];
  licensePlate: string = "";
  initialized: boolean = false;

  constructor(private liveTrackingService: liveTrackingService) {
  }


  ngOnDestroy(): void {
    if(this.pollSubscription){
      this.pollSubscription.unsubscribe();
    }
  }

  ngOnInit() {
  }

  trackCar() {
    this.clearData();
    this.initData();
    this.updateData();
  }

  clearData() {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }

    this.oldPols = [];
    this.pols = [];
  }

  initData() {
    this.liveTrackingService.getAllPollsByLicenseplate(this.licensePlate).subscribe(
      res => {
        this.oldPols = this.oldPols.concat(res);
        console.log("Old pols: " + this.oldPols.length);
      },
      error => {
        console.log(error);
      });
  }

  updateData() {
    this.pollSubscription = this.liveTrackingService.getLatestPollByLicenseplate(this.licensePlate).subscribe(
      res => {
        let contains = false;
        for (let p of this.pols) {
          if (p.id == res.id) {
            contains = true;
          }
        }
        if (!contains) {
          if (<any>res != "No polls available") {
            this.pols.push(<Pol>res);
            console.log("New pols: " + this.pols.length);
          }
        }
      },
      error => {
        console.log(error);
      });
  }
}
