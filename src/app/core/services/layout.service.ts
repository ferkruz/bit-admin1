import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { NavRoute } from '../models/navRoute.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private navRouteSource = new BehaviorSubject<NavRoute>(null);
  public pageNavRouteObs = this.navRouteSource.asObservable();

  constructor() {}

  setPageNavRoute(item: NavRoute) {
    this.navRouteSource.next(item)
  }

  setException(ex) {
    let message: String = '';

    if (ex.status != null && ex.status == 401) { // "Unauthorized"
      message = ex.statusText + ', Token expired';
    } else if(ex.body.errors) {
      ex.body.errors.forEach(element => {
        message += `[${element.code}] - ${element.error}`;
      });
      console.log(`Error: ${message}`);
    } else {
      message = ex.toString();
    }

    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error',
      text: message.toString(),
      footer: '<a href="https://belogit.com/es/#Contact" target="_blank">¿Necesita ayuda?</a>'
    });

    //token expired
    if (ex.status != null && ex.status == 401) {
    setTimeout(() => {
      window.location.href = environment.apiPlatform;
    }, 2000); // Activate after 5 segs.
    }
  }
}
