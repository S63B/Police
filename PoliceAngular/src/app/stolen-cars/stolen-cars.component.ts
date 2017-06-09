import {Car} from "../domain/car";
import {StolenCarService} from "./stolen-cars.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Pol} from "../domain/pol";
import {Owner} from "../domain/Owner";
import {forEach} from "@angular/router/src/utils/collection";
import {Tracker} from "../domain/Tracker";

@Component({
  selector: 'app-stolen-cars',
  templateUrl: './stolen-cars.component.html',
  styleUrls: ['./stolen-cars.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StolenCarsComponent implements OnInit {
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

  constructor(private stolenCarService: StolenCarService) { }

  ngOnInit() {
    this.getStolenCars();
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

  showHistoryCar(car: Car) {
    this.ownerHistory = null;
    this.selectedCar = car;
    this.getOwnerHistory(car);
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

}
