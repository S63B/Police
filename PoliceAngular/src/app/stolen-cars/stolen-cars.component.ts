import {Car} from "../domain/car";
import {StolenCarService} from "./stolen-cars.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Pol} from "../domain/pol";

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
    this.selectedCar = car;
  }

  showInfoCar(car: Car) {
    this.infoCar = car;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.infoCar = null;
  }
}
