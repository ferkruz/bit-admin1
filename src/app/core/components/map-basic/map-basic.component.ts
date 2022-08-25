import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { LayoutService } from 'app/core/services/layout.service';
import { LocationService } from 'app/core/services/location.service';
import { TripService } from 'app/services/trip.service';

const iconTruck: string = 'https://hubbingdoc.s3.us-west-1.amazonaws.com/tower/map-icons/1x/56px_marker_truck_left.png';

@Component({
  selector: 'app-map-basic',
  templateUrl: './map-basic.component.html',
  styleUrls: ['./map-basic.component.sass']
})
export class MapBasicComponent implements OnInit {
  @Input() tripId: string;
  @Input() alert: any;
  @Input() width: string = '400px';
  @Input() height: string = '750px';
  @Input() zoom: number = 4.6;
  @Input() options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    disableDoubleClickZoom: false
  };

  // @ViewChild(GoogleMap, { static: false }) map: GoogleMap

  public userLatLng: any = '';
  public userLatLngDest: any = '';
  public userLatLngTruck: any = '';
  public userCenter: any = '';
  public center: google.maps.LatLngLiteral;

  public tripUUID: string;
  public tripData: any;

  public map: google.maps.Map;
  public markers: any[] = [];
  public coords: any[] = [];

  constructor(
    private _tripService: TripService,
    private _layoutService: LayoutService) {
  }

  ngOnInit() { }

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  ngOnChanges(change: SimpleChange) {
    if (change['alert'] != null && change['alert'].currentValue != undefined) {
      this.loadAlertPosition();
    } else if (change['tripId'] != null && change['tripId'].currentValue !== undefined) {
      this.loadTrip();
    }
  }

  initMap(map: google.maps.Map) {
    this.map = map;
  }

  public loadTrip() {
    this._tripService.get(this.tripId).subscribe(res => {
      if (res !== null && res.body !== null) {
        if (res.body.result && res.body.data !== null) {
          this.tripData = res.body.data;
          // Origen
          let markData = {
            location: {
              lat: this.tripData.fromLocation[0],
              lng: this.tripData.fromLocation[1]
            },
            icon: '',
            title: 'Origen',
            label: {
              text: 'O',
              fontSize: "12px",
              fontWeight: "bold",
            }
          };
          this.addMarker(markData);
          // Destino
          let markData2 = {
            location: {
              lat: this.tripData.toLocation[0],
              lng: this.tripData.toLocation[1]
            },
            icon: '',
            title: 'Destino',
            label: {
              text: 'D',
              fontSize: "12px",
              fontWeight: "bold",
            }
          };
          this.addMarker(markData2);
          this.loadTracking();
          this.center = {
            lat: this.tripData.toLocation[0],
            lng: this.tripData.toLocation[1],
          }
        } else {
          this._layoutService.setException(res);
        }
      }
    }, err => {
      this._layoutService.setException(err);
    });
  }

  public loadTracking() {
    this._tripService.getOnCourse(this.tripId).subscribe(res => {
      if (res !== null && res.body !== null) {
        if (res.body.result && res.body.data !== null) {
          this.tripData = res.body.data.on_course_trips[0].tracking;
          let markData = {
            location: {
              lat: this.tripData.coordinates[0],
              lng: this.tripData.coordinates[1]
            },
            icon: iconTruck,
            title: 'Última posición',
            label: {
              text: this.tripData.tripUUID,
              fontSize: "12px",
              fontWeight: "bold",
            }
          };
          this.addMarker(markData);
          this.drawLineStartToTruck();
          this.drawLineTruckToEnd();
          this.center = {
            lat: this.tripData.coordinates[0],
            lng: this.tripData.coordinates[1],
          }
        } else {
          this._layoutService.setException(res);
        }
      }
    }, err => {
      this._layoutService.setException(err);
    });
  }

  private addMarker(data: any) {
    var marker = new google.maps.Marker({
      position: data.location,
      icon: data.icon,
      title: data.title,
      label: data.label,
      map: this.map
    });
    this.markers.push(marker);
    this.coords.push(data.location);
  }

  private drawLineStartToTruck() {
    let arr: any[] = [];
    for (let i = 0; i < this.coords.length; i++) {
      if (this.markers[i].title != 'Destino') {
        arr.push(this.coords[i]);
      }
    }
    var line = new google.maps.Polyline({
      path: arr,
      geodesic: true,
      strokeColor: '#0B5ED7',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    line.setMap(this.map);
  }

  private drawLineTruckToEnd() {
    let arr: any[] = [];
    for (let i = 1; i < this.coords.length; i++) {
      if (this.markers[i].title != 'Origen') {
        arr.push(this.coords[i]);
      }
    }
    var line = new google.maps.Polyline({
      path: arr,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    line.setMap(this.map);
  }

  private loadAlertPosition() {
    if (this.alert.warningId !== undefined) {
      this.loadWarning();
    } else if (this.alert.alertId !== undefined) {
      this.loadAlert();
    }
  }

  private loadAlert() {
    this._tripService.getTripAlerts(this.tripId).subscribe(res => {
    if (res !== null && res.body !== null) {
      if (res.body.result && res.body.data !== null) {
      } else {
        this._layoutService.setException(res);
      }
    }
  }, err => {
    this._layoutService.setException(err);
  });
}

  private loadWarning() {
    this._tripService.getTripWarning(this.tripId).subscribe(res => {
      if (res !== null && res.body !== null) {
        if (res.body.result && res.body.data !== null) {
        } else {
          this._layoutService.setException(res);
        }
      }
    }, err => {
      this._layoutService.setException(err);
    });
  }

}
