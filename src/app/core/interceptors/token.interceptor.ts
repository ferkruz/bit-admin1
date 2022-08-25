import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    let tokenCookie = this.cookieService.get(environment.cookieTokenName);
    const tokenLocal = localStorage.getItem('tknLocal');
    let tokenLocalForced: string = '';

    if (document.referrer === 'http://dashboard.hubbing.co/' || document.referrer === 'http://dashboard.hubbinglatam.com/') {
      if(window.location.href.includes('op=operator')) {
        const tokenLocalForced = localStorage.getItem('tknLocal');
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenLocalForced}`
          }
        });
      }
    }

    let token = tokenCookie || tokenLocal;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
