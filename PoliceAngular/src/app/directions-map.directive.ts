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
  @Input() initialized;
  interval: number;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawMap(this, this.oldPols, '#8B0000');
    setInterval(this.drawMap, 5000, this, this.pols, '#006400');
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  drawMap(scope: this, pols: Pol[], color: string) {
    console.log(pols);
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
        for (let i = 0; i < pols.length - 1; i++) {
          waypoints.push(new Waypoint(new google.maps.LatLng(pols[i].lat, pols[i].lng), true));
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
