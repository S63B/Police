import {Car} from "../domain/car";
import {StolenCarService} from "./stolen-cars.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Pol} from "../domain/pol";
import {Owner} from "../domain/Owner";

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
  search:string = "";
  owner:Owner;

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

  showHistoryCar(car: Car) {
    this.owner = null;
    this.selectedCar = car;
    this.getCurrentOwner(car);
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

  onDialogHide() {
    this.infoCar = null;
  }
}
