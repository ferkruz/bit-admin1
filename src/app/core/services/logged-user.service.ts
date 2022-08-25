import { Injectable } from '@angular/core';
import { Tower, TowerUser } from 'app/models/tower.model';
import { User } from 'app/models/user.model';
import { TowerService } from 'app/services/tower.service';
import { UserService } from 'app/services/user.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  public selectedTowerId = new BehaviorSubject<string>('');
  public towerId = this.selectedTowerId.asObservable();

  public changedUser = new BehaviorSubject<User>(null);
  public checkUser = new BehaviorSubject<boolean>(null);
  public loggedUserTowers = new BehaviorSubject<TowerUser[]>([]);

  public userFilters = new BehaviorSubject<TowerUser>(null);

  public towerUsers: TowerUser[] = [];
  private checkUserSubject;
  private userSubscribe;

  private _loggedUser: User;
  public profile(): User {
    return this._loggedUser;
  }
  public setLoggedUser(user: User) {
    this._loggedUser = user;
    this.changedUser.next(this._loggedUser);
  }

  constructor(
    private _cookieService: CookieService,
    private _layoutService: LayoutService,
    private _userService: UserService,
    private _towerService: TowerService) {
    /* this.loadUserLogged();
    this.checkUserSubject = this.checkUser.subscribe(s => {
      this.loadUserLogged();
    }); */
  }

  ngOnDestroy() {
    this.checkUserSubject.unsubscribe();
    this.userSubscribe.unsubscribe();
  }

  public getUserFilters(): Promise<TowerUser> {
    //this.selectedTowerId.getValue()
    //BsAs'62cda33cc06e4e9dec91e92b'
    return new Promise((resolve, reject) => {
      let userLoggedId = this._cookieService.get(environment.cookieUserId);
      this._userService.getByUserPlatformId(userLoggedId).subscribe(res => {
        if (res != null && res.body != null && res.body.result) {
          let towerUser: User = res.body.data.users[0];
          this._towerService.get('62cda33cc06e4e9dec91e92b').subscribe(res => {
            if (res != null && res.body != null) {
              if (res.body.result) {
                if (res.body.data && res.body.data.total > 0) {
                  let tower: Tower = res.body.data.towers[0];
                  tower.users.forEach(element => {
                   if(element.userId === towerUser.id) {
                      this.userFilters.next(element);
                      resolve(element);
                   }
                  });

                }
              }
            }
          });
        }
      });
    })
  }

  private loadUserLogged() {
    /* let userLoggedId = this._cookieService.get(environment.cookieUserId);
    this._userService.getByUserPlatformId(userLoggedId).subscribe(res => {
      if (res != null && res.body != null && res.body.result) {
        let usr: User = res.body.data.users[0];
        this.setLoggedUser(usr);
        this.userFilters();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Acceso incorrecto.',
          text: 'El usuario no esta asociado a la torre. Por favor contacte a su Gerente.',
          footer: '<a href="https://belogit.com/es/#Contact" target="_blank">¿Necesita ayuda?</a>'
        });

        //token expired
        setTimeout(() => {
          window.location.href = environment.apiPlatform;
        }, 2000); // Activate after 5 segs.
      }
    });*/
  }

  //public userFilters() {
  /* this.userSubscribe = this.changedUser.subscribe(user => {
    if (user !== null) {
      this._towerService.get('62cda33cc06e4e9dec91e92b').subscribe(res => {
        debugger;
        if (res != null && res.body != null) {
          if (res.body.result) {
            if (res.body.data && res.body.data.total > 0) {
              let towers = res.body.data.towers;
              towers.forEach(tower => {
                let index = tower.users.findIndex(t => t.userId === this.profile().id);
                if (index > -1) {
                  this.towerUsers.push(tower.users[index]);
                }
              });
              this.loggedUserTowers.next(this.towerUsers);
            }
          } else {
            this._layoutService.setException(res);
          }
        }
      }, err => {
        this._layoutService.setException(err);
      });
    }
  }); */
  //}
}
