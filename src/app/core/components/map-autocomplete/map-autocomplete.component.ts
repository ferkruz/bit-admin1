import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { LocationService } from '../../services/location.service'
import { MapPoint } from 'app/core/models/mapPoint.model';

@Component({
  selector: 'app-map-autocomplete',
  templateUrl: './map-autocomplete.component.html',
  styleUrls: ['./map-autocomplete.component.sass']
})

export class MapAutocompleteComponent implements OnInit {
  @Input() public initialTowerAddress: MapPoint = new MapPoint();
  @Output() selectedPoint = new EventEmitter<MapPoint>();

  @ViewChild('addressInput')
  addressInput: ElementRef;

  public location: MapPoint = new MapPoint();

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: { lat: -34.6083, lng: -58.3712 },
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false

  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  userLatLng: any = '';
  userCenter: any = '';

  addMarker(latLng) {
    this.markerPositions.push(latLng);
  }

  handleAddressChange(address: any) {
    this.location.address = address.formatted_address;
    this.location.lat = address.geometry.location.lat();
    this.location.lng = address.geometry.location.lng();
    this.location.extract(address.address_components);

    this.userLatLng = this.location.latlng();
    this.userCenter = this.location.latlng();
    this.selectedPoint.emit(this.location);
  }

  constructor(httpClient: HttpClient, locationService: LocationService) {
    // Use our locationservice!
    locationService.getPosition().then(pos => {
      this.options.center.lat = pos.lat;
      this.options.center.lng = pos.lng;
    });

/*  this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.gMapsApiKey}&libraries=places,drawing&language=es`, 'callback')
     .pipe(
         map(() => true),
         catchError(() => of(false)),
       ); */

    locationService.getPosition().then(pos => {
      this.options.center.lat = pos.lat;
      this.options.center.lng = pos.lng;
      let latLng =
      {
        lat: pos.lat,
        lng: pos.lng
      }
      this.addMarker(latLng);
    });
  }

  ngOnInit(): void {
    //Edit

  }

  ngOnChanges(change: SimpleChange) {
    if(change['initialTowerAddress'] != null) {
      if(this.initialTowerAddress != null && this.initialTowerAddress.address != '') {
        this.location = this.initialTowerAddress;
        if (this.addressInput != null) {
          if (this.addressInput != null && this.addressInput.nativeElement != null) {
            this.addressInput.nativeElement.value = this.initialTowerAddress.address;
          }
          this.userLatLng = { lat: this.location.lat, lng: this.location.lng};
          this.userCenter = { lat: this.location.lat, lng: this.location.lng};
        } else {
          this.location = new MapPoint();
          if (this.addressInput != null && this.addressInput.nativeElement != null) {
            this.addressInput.nativeElement.value = '';
          }
          this.userLatLng = { lat: -34.6083, lng: -58.3712 };
          this.userCenter = { lat: -34.6083, lng: -58.3712 };
        }
      }
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
