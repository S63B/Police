import {Car} from "../domain/car";
import {StolenCarService} from "./stolen-cars.service";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-stolen-cars',
  templateUrl: './stolen-cars.component.html',
  styleUrls: ['./stolen-cars.component.css']
})
export class StolenCarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(private stolenCarService: StolenCarService) { }

  ngOnInit() {
    this.stolenCarService.getStolenCars()
      .then(cars => this.cars = cars);
  }

}
