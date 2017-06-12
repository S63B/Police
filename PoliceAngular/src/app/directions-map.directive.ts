import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import {Directive, Input, OnInit, OnDestroy} from '@angular/core';
import {Waypoint} from "./domain/waypoint";
import {Pol} from "./domain/pol";

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective implements OnInit,OnDestroy {

  @Input() pols;
  @Input() oldPols;
  initialized:boolean = false;
  interval: number;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawMap(this, this.oldPols, '#8B0000');
    this.interval = window.setInterval(this.drawMap, 5000, this, this.pols, '#006400');
  }

  ngOnDestroy() {
    console.log("google maps directive destroy");
    clearInterval(this.interval);
  }

  drawMap(scope: this, pols: Pol[], color: string) {
    console.log("draw map: " + pols);
    scope.gmapsApi.getNativeMap().then(map => {
      let directionsDisplay = new google.maps.DirectionsRenderer;
      let directionsService = new google.maps.DirectionsService;

      directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 6,
          strokeOpacity: 0.7,
          strokeColor: color
        }
      });

      if(!scope.initialized && pols[0]){
        map.setCenter({lat: pols[0].lat, lng: pols[0].lng});
        map.setZoom(13);
        scope.initialized = true;
      }

      directionsDisplay.setMap(map);
      directionsDisplay.setOptions({ preserveViewport: true });

      let waypoints: Waypoint[] = [];

      if (pols.length > 0) {
        let maxWayPoints = pols.length -1 -23;

        //draw 1 waypoint and the last 22 waypoints
        for (let i = pols.length - 1; i > 0; i--) {
          if(i > maxWayPoints || i == 0){
            waypoints.push(new Waypoint(new google.maps.LatLng(pols[i].lat, pols[i].lng), true));
          }
        }
        directionsService.route({
          origin: {lat: pols[0].lat, lng: pols[0].lng},
          destination: {lat: pols.slice(-1)[0].lat, lng: pols.slice(-1)[0].lng},
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        });
      }
    });
  }
}
