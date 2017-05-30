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
  displayDialog: boolean;
  cars: Car[] = [];
  search:string = "";
  showTracking:boolean = false;
  intervalTimer : number;
  pols:Pol[] = [];

  constructor(private stolenCarService: StolenCarService) { }

  ngOnInit() {
    this.stolenCarService.getStolenCars()
      .then(cars => this.cars = cars);
  }

  selectCar(car: Car) {
    this.showTracking = true;
    alert(Car);
  }

  infoCar(car: Car) {
    this.selectedCar = car;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedCar = null;
  }
}
