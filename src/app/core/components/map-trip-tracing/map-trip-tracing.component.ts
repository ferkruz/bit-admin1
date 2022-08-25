import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { LayoutService } from 'app/core/services/layout.service';
import { LoggedUserService } from 'app/core/services/logged-user.service';
import { StoreMapModel } from 'app/models/map.store.model';
import { TowerUser } from 'app/models/tower.model';
import { MapService } from 'app/services/map.service';
import { TowerService } from 'app/services/tower.service';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-map-trip-tracing',
  templateUrl: './map-trip-tracing.component.html',
  styleUrls: ['./map-trip-tracing.component.sass']
})
export class MapTripTracingComponent implements OnInit {
  @Input() width: string = '100%';
  @Input() height: string = '';

  private listSubscribe;
  private newDataSubscribe;
  private removeDataSubscribe;
  private userFilterSubscribe;
  private filterMarkers: boolean = false;

  public map: google.maps.Map;
  public markers = [];

  public contentString: string = '';

  public infoWindow = new google.maps.InfoWindow();

  public zoom = 5.7;
  public center: { lat: -34.6083, lng: -58.3712 };
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false,
    disableDoubleClickZoom: false,
  };

  public filters: TowerUser = null;

  constructor(
    private _router: Router,
    private _layoutService: LayoutService,
    private _loggedUserService: LoggedUserService,
    private _towerService: TowerService,
    private _mapService: MapService,
    public auth: AngularFireAuth) { }

  ngOnInit(): void { }

  async ngAfterViewInit() {
    this.filters = await this._loggedUserService.getUserFilters();
    console.log('this._router.url: ' + this._router.url);
    console.log('window.location.href: ' + window.location.href);
    console.log('document.referrer: ' + document.referrer);
    if (document.referrer === 'http://dashboard.hubbing.co/' || document.referrer === 'http://dashboard.hubbinglatam.com/') {
      //wall
      if (!window.location.href.includes('op=operator')) {
        this.height = (globalThis.screen.availHeight - 448).toString() + 'px';
        console.log('WALL!!!!!!!!!');
        this.filterMarkers = false;
        this.forceAuthentication();
      } else {
        this.height = (globalThis.screen.availHeight - 300).toString() + 'px';
        console.log('Operator Grafana');
        this.filterMarkers = true;
        this.subscribeMarks(true);
      }
    } else {
      this.filterMarkers = true;
      this.subscribeMarks(true);
    }
  }

  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
    this.newDataSubscribe.unsubscribe();
    this.removeDataSubscribe.unsubscribe();
    this.userFilterSubscribe.unsubscribe();
  }

  initMap(map: google.maps.Map) {
    this.map = map;
  }

  private getContentInfo(marker) {
    const text =
    '<div class="card-content">' +
      '<h5 id="firstHeading" class="firstHeading" style="margin-left: 20px">' + marker.title + '</h5>' +
      '<label><span style="font-weight: bolder">Conductor:</span> ' +  marker.title + '</label>' +
      '<label style="display: flex"><span style="font-weight: bolder">Shipper: </span> '  + marker.title + '</label>' +
      '<label style="display: flex"><span style="font-weight: bolder">Origen: </span> '  +  marker.title + '</label>' +
      '<label style="display: flex"><span style="font-weight: bolder">Destino: </span> '  +  marker.title + '</label>' +
      '<a href=""><span style="margin-left: 20px; margin-top: 40px; font-weight: bolder">VER EN GRILLA</span></a>' +
    '</div>'

      // '<div id="content">' +
      // '<div id="siteNotice">' +
      // "</div>" +
      // '<h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' +
      // '<div id="bodyContent">' +
      // "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
      // "sandstone rock formation in the southern part of the " +
      // "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
      // "south west of the nearest large town, Alice Springs; 450&#160;km " +
      // "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
      // "features of the Uluru - Kata Tjuta National Park. Uluru is " +
      // "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
      // "Aboriginal people of the area. It has many springs, waterholes, " +
      // "rock caves and ancient paintings. Uluru is listed as a World " +
      // "Heritage Site.</p>" +
      // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      // "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      // "(last visited June 22, 2009).</p>" +
      // "</div>" +
      // "</div>";
    this.infoWindow.setContent(text);
  }

  public openInfo(marker: MapMarker) {
    this.getContentInfo(marker);

    const m = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      zIndex: -100
    });

    this.infoWindow.open({
      anchor: m,
      map: this.map,
      shouldFocus: false,
    });
  }

  private forceAuthentication() {
    this.auth.signInWithEmailAndPassword('andresdenispi@gmail.com', 'Fi@!doBim+4rIJebO?Ow')
      .then((userCredential) => {
        userCredential.user.getIdToken().then(token => {
          localStorage.setItem('tknLocalF', token);
          // Load marks
          this.subscribeMarks(true);
        })
      })
      .catch((error) => {
        console.log('error force auth');
        this._layoutService.setException(error);
      });
  }


  private checkUserFiltersMark(item: StoreMapModel): boolean {

    let filterCarrierCountries: boolean = true;
    let filterShippers: boolean = true;
    let filterIndustries: boolean = true;
    let filterLoadTypes: boolean = true;
    let filterOperationalScope: boolean = true;

    //this._loggedUserService.userFilters();
    let filters = this.filters;
    if (filters != null) {
      if (filters.carrierCountries.length > 0) {
        if (filters.carrierCountries.findIndex(i => i == item.carrierCountryId) > -1) {
          filterCarrierCountries = true;
        } else {
          filterCarrierCountries = false;
        }
      }
      if (filters.shippers.length > 0) {
        if (filters.shippers.findIndex(i => i == item.shipperId) > -1) {
          filterShippers = true;
        } else {
          filterShippers = false;
        }
      }
      if (filters.industries.length > 0) {
        if (filters.industries.findIndex(i => i == item.shipperIndustryId) > -1) {
          filterIndustries = true;
        } else {
          filterIndustries = false;
        }
      }
      if (filters.loadTypes.length > 0) {
        if (filters.loadTypes.findIndex(i => i == item.tripLoadTypeId) > -1) {
          filterLoadTypes = true;
        } else {
          filterLoadTypes = false;
        }
      }
      if (filters.operationalScope.length > 0) {
        if (filters.operationalScope.findIndex(i => i == item.operationalScope) > -1) {
          filterOperationalScope = true;
        } else {
          filterOperationalScope = false;
        }
      }
    }
    let valor = filterCarrierCountries && filterShippers && filterIndustries && filterLoadTypes && filterOperationalScope;
    return valor;
  }

  private subscribeMarks(firstTime: boolean) {
    if (firstTime) {
      this.userFilterSubscribe = this._loggedUserService.loggedUserTowers.subscribe(towers => {
        this.markers = [];
        this.listSubscribe = this._mapService._trackingListEvent.subscribe(list => {
          if (list.length > 0) {
            list.forEach(item => {
              if (this.filterMarkers) {
                if (this.checkUserFiltersMark(item)) {
                  debugger;
                  this.markers.push(item.marker);
                }
              } else {
                this.markers.push(item.marker);
              }
            });
          }
        });
        this.listSubscribe.unsubscribe();
      });
    }

    this.newDataSubscribe = this._mapService._trackingNewData.subscribe(item => {
      if (item !== null) {
        if (this.filterMarkers) {
          if (this.checkUserFiltersMark(item)) {
            debugger;
            this.markers.push(item.marker);
          }
        } else {
          this.markers.push(item.marker);
        }
      }
    });
    this.removeDataSubscribe = this._mapService._trackingRemoveData.subscribe(item => {
      if (item !== null) {
        let index = this.markers.findIndex(i => i.id == item.id);
        this.markers.splice(index, 1);
      }
    })
  }
}
