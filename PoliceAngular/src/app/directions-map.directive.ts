import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import {Directive, Input, OnInit} from '@angular/core';
import {Waypoint} from "./domain/waypoint";

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective implements OnInit {

  @Input() pols;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngOnInit() {
    let scope = this;
    this.init();
    setInterval(this.update, 5000, scope);
  }

  init() {
    this.gmapsApi.getNativeMap().then(map => {
      let directionsDisplay = new google.maps.DirectionsRenderer;
      console.log("init");
      map.setCenter({lat: 52.092876, lng: 5.104480});
      map.setZoom(8);
      // map.setOptions(new google.maps.MapOptions())


      let directionsService = new google.maps.DirectionsService;

      let waypoints: Waypoint[] = [];

      if (this.pols.length > 0) {
        for (let i = 0; i < this.pols.length - 1; i++) {
          waypoints.push(new Waypoint(new google.maps.LatLng(this.pols[i].lat, this.pols[i].lng), true));
        }
      }
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: this.pols[0].lat, lng: this.pols[0].lng},
        destination: {lat: this.pols.slice(-1)[0].lat, lng: this.pols.slice(-1)[0].lng},
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

  update(scope: this) {
    scope.gmapsApi.getNativeMap().then(map => {
      let directionsDisplay = new google.maps.DirectionsRenderer;
      let directionsService = new google.maps.DirectionsService;


      map.setOptions(new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "green"
        }
      }));

      let waypoints: Waypoint[] = [];

      if (scope.pols.length > 0) {
        for (let i = 0; i < scope.pols.length - 1; i++) {
          debugger;
          waypoints.push(new Waypoint(new google.maps.LatLng(scope.pols[i].lat, scope.pols[i].lng), true));
          debugger;
        }
      }
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: scope.pols[0].lat, lng: scope.pols[0].lng},
        destination: {lat: scope.pols.slice(-1)[0].lat, lng: scope.pols.slice(-1)[0].lng},
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
