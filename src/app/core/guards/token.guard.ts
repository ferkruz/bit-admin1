import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { LoggedUserService } from "../services/logged-user.service";

@Injectable()
export class CanTokenGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _loggedUserService: LoggedUserService,
    public auth: AngularFireAuth,
    private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.cookieService.get(environment.cookieTokenName);
    if(token != '') {
      localStorage.setItem('tknLocal', token);
    }
    const tokenLocal = localStorage.getItem('tknLocal');
    if (token != '' || tokenLocal != '') {
      let secureFlag: boolean = location.protocol == "https:";
      let domain = location.hostname != 'localhost' ? '.' + location.hostname.split('.')[1] + '.' + location.hostname.split('.')[2] : 'localhost';
      // this.cookieService.delete(environment.cookieTokenName, '/', domain, secureFlag, 'Lax');
      let token = this.cookieService.get(environment.cookieTokenName) || tokenLocal;
      // console.log('guard token: ' + token);
      // this._loggedUserService.checkUser.next(true);
      return true;
    } else {
      console.log('token: null');
      this._router.navigate([environment.apiPlatform]);
      return false;
    }
  }
}
