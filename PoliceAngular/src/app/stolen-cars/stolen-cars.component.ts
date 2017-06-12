import {Car} from "../domain/car";
import {StolenCarService} from "./stolen-cars.service";
import {Component, OnInit,OnDestroy, ViewEncapsulation} from "@angular/core";
import {Pol} from "../domain/pol";
import {Owner} from "../domain/Owner";
import {forEach} from "@angular/router/src/utils/collection";
import {Tracker} from "../domain/Tracker";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stolen-cars',
  templateUrl: './stolen-cars.component.html',
  styleUrls: ['./stolen-cars.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StolenCarsComponent implements OnInit, OnDestroy {
  title = 'Stolen cars';
  selectedCar: Car;
  infoCar:Car;
  displayDialog: boolean = false;
  cars: Car[] = [];
  filterSearch:string = "";

  owner:Owner;
  ownerHistory:Owner[];

  searchLicense:string= "";
  searchCar:Car=null;

  isStolen:boolean;

  pollSubscription: Subscription = null;
  pols: Pol[] = [];
  oldPols: Pol[] = [];

  constructor(private stolenCarService: StolenCarService) { }

  ngOnInit() {
    this.getStolenCars();
  }
  ngOnDestroy(){
    this.pollSubscription.unsubscribe();
  }

  getStolenCars(){
    this.stolenCarService.getStolenCars().subscribe(
      res => {
        this.cars = <Car[]> res;
      },
      err => {
        console.log(err);
      });
  }

  isCountryDefined(val:any){
    return typeof val !== 'undefined' && val != null ;
  }

  selectCar(car: Car) {
    this.ownerHistory = null;
    this.selectedCar = car;
    this.getOwnerHistory(car);

    this.clearMapData();
    this.initData();
    this.updateData();
  }

  showInfoCar(car: Car) {
    this.infoCar = car;
    this.displayDialog = true;
    this.getCurrentOwner(car);
  }

  getCurrentOwner(car:Car){
    this.stolenCarService.getCurrentOwner(car.id).subscribe(
      res => {
        this.owner = <Owner>res;
      },
      err => {
        console.log(err);
      });
  }

  getOwnerHistory(car:Car){
    this.stolenCarService.getOwnerHistory(car.id).subscribe(
      res => {
        this.ownerHistory = <Owner[]>res;
      },
      err => {
        console.log(err);
      });
  }

  onDialogHide() {
    this.infoCar = null;
  }

  searchLicensePlate(){
    this.stolenCarService.getCar(this.searchLicense).subscribe(
      res => {
        console.log(res);
        this.searchCar = <Car>res;
      },
      err => {
        this.searchCar = null;
        console.log(err);
      });
  }

  setStolen(e) {
    this.searchCar.stolen = e.checked;
    this.stolenCarService.setStolen(this.searchCar.id, this.searchCar.stolen).subscribe(
      res => {
        console.log("Stolen changed: " + res.stolen);
      },
      err => {
        console.log(err);
      });
  }


  clearMapData() {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }

    this.oldPols = [];
    this.pols = [];
  }

  initData() {
    this.stolenCarService.getAllPollsByLicenseplate(this.selectedCar.licensePlate.license).subscribe(
      res => {
        this.oldPols = this.oldPols.concat(res);
        console.log("Old pols: " + this.oldPols.length);
      },
      error => {
        console.log(error);
      });
  }

  updateData() {
    this.pollSubscription = this.stolenCarService.getLatestPollByLicenseplate(this.selectedCar.licensePlate.license).subscribe(
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
