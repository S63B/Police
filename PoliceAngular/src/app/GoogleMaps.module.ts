import { NgModule  } from '@angular/core';
import {DirectionsMapDirective} from "./directions-map.directive";

@NgModule({
  declarations: [
    DirectionsMapDirective
  ],
  exports:[DirectionsMapDirective],
})
export class GoogleMapsModule { }
