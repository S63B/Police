import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive, Input } from '@angular/core';
import { LatLng } from "angular2-google-maps/core";
import { Waypoint } from "app/waypoint";

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {

  @Input() pols;


  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    let scope = this;
    setInterval(this.update, 5000, scope);
  }

  update(scope:this){
    debugger;
    scope.gmapsApi.getNativeMap().then(map => {
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      let waypoints: Waypoint[] = [];

      for (var i = 1; i < scope.pols.length - 1; i++) {
        waypoints.push(new Waypoint(new google.maps.LatLng(scope.pols[i].lat, scope.pols[i].lng), true));
      }
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: { lat: scope.pols[0].lat, lng: scope.pols[0].lng },
        destination: { lat: scope.pols.slice(-1)[0].lat, lng: scope.pols.slice(-1)[0].lng },
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

}
