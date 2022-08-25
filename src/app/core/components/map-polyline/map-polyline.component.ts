import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { LocationService } from '../../services/location.service'
import { MatOptgroup } from '@angular/material/core';
import { MapPointBasic } from 'app/core/models/mapPointBasic.model';

@Component({
  selector: 'app-map-polyline',
  templateUrl: './map-polyline.component.html',
  styleUrls: ['./map-polyline.component.sass']
})
export class MapPolylineComponent implements OnInit {
  @Input() coordenates: MapPointBasic[] = [];
  @Input() options: google.maps.MapOptions = null;
  @Input() width: string = '400px';
  @Input() height: string = '750px';
  @Input() viewCleanButton: boolean = true;
  @Input() drawingModes: google.maps.drawing.OverlayType[] = [];

  @Output() click = new EventEmitter<google.maps.MapMouseEvent>();
  @Output() getPolygon = new EventEmitter<MapPointBasic[]>();

  public map: google.maps.Map;
  public drawingManager: google.maps.drawing.DrawingManager;
  public points: MapPointBasic[] = [];

  public selectedPolygon: google.maps.Polygon = null;
  public basePolygon: google.maps.Polygon = null;

  private defaultOptions: google.maps.MapOptions = {
    center: { lat: -34.582007, lng: -58.425394 },
    zoom: 8
  };

  constructor() { }

  ngOnInit() {
    this.options = !this.options ? this.defaultOptions : this.options;
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['coordenates']) {
      if (this.coordenates.length > 0) {
        if (this.basePolygon != null) {
          this.basePolygon.setMap(null);
        }
        this.drawCoordenates();
      }
    }
  }

  drawCoordenates() {
      this.basePolygon = new google.maps.Polygon({
      paths: this.coordenates,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    this.basePolygon.setMap(this.map);
  }

  mapClick(event: google.maps.MapMouseEvent) {
    this.click.emit(event);
  }

  //(mapMousemove)="move($event)"
  // move(event: google.maps.MapMouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }

  initMap(map: google.maps.Map) {
    this.map = map;
    this.drawCoordenates();
    if(this.drawingModes.length > 0) {
      this.addDrawingControls(map);
      this.addCleanButton(map);
      this.addSaveButton(map);
    }
  }

  addCleanButton(map: google.maps.Map) {
      const _this = this;
      // Set CSS for the control border.
      const controlDiv = document.createElement("div");
      const controlUI = document.createElement("div");

      controlUI.style.backgroundColor = "#fff";
      controlUI.style.border = "2px solid #fff";
      controlUI.style.borderRadius = "3px";
      controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginTop = "8px";
      controlUI.style.marginBottom = "22px";
      controlUI.style.textAlign = "center";
      controlUI.title = "Click to recenter the map";
      controlDiv.appendChild(controlUI);
      const controlText = document.createElement("div");

      controlText.style.color = "rgb(25,25,25)";
      controlText.style.fontSize = "11px";
      controlText.style.lineHeight = "20px";
      controlText.style.paddingLeft = "5px";
      controlText.style.paddingRight = "5px";
      controlText.innerHTML = "Borrar";
      controlUI.appendChild(controlText);
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);

      controlUI.addEventListener("click", () => {
        _this.selectedPolygon.setMap(null);
      });
  }

  addSaveButton(map: google.maps.Map) {
    const _this = this;
    // Set CSS for the control border.
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");

    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginLeft = "5px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);
    const controlText = document.createElement("div");

    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontSize = "11px";
    controlText.style.lineHeight = "20px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Guardar";
    controlUI.appendChild(controlText);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);

    controlUI.addEventListener("click", () => {
      _this.getPolygon.emit(_this.points);
    });
}

  addDrawingControls(map: google.maps.Map) {
    const _this = this;

    const polyOptions = {
      strokeColor: '#0B5ED7',
      strokeWeight: 2,
      fillColor: '#CFE2FF',
      fillOpacity: 0.55,
      //map:this.map,
      editable: true,
    };

    const drawingOptions = {
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {

        position: google.maps.ControlPosition.TOP_CENTER,
        /*google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,*/
        drawingModes: this.drawingModes,
      },
      polygonOptions: polyOptions,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(drawingOptions);
    this.drawingManager.setMap(map);

    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
      _this.selectedPolygon = polygon;
      polygon.setEditable(true);
      polygon.setDraggable(true);
      polygon.getPaths().forEach(coord => {
        coord.forEach(coord => {
          const point: MapPointBasic = new MapPointBasic();
          point.lat = coord.lat();
          point.lng = coord.lng();
          _this.points.push(point);
        });
      });
    });


    google.maps.event.addListener(this.drawingManager, "polylinecomplete", (marker) => {
    });

    google.maps.event.addListener(this.drawingManager, "rectanglecomplete", (marker)  => {
    });

    google.maps.event.addListener(this.drawingManager, "circlecomplete", (marker)  => {
    });

    google.maps.event.addListener(this.drawingManager, "markercomplete", (marker)  => {
    });

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event)  => {
    });

    google.maps.event.addListener(this.drawingManager, 'drawingmode_changed', (event) => {
      _this.selectedPolygon.setMap(null);
    });
  }
}
