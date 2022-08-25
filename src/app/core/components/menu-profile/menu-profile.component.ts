import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from 'app/core/services/logged-user.service';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.sass']
})
export class MenuProfileComponent implements OnInit {

  public user: User = new User();

  constructor(private _cookieService: CookieService,
    private _userService: UserService,
    private _loggedUser: LoggedUserService) { }

  ngOnInit(): void {
    this.loadUserLogged();
  }

  private loadUserLogged() {
    let userLoggedId = this._cookieService.get(environment.cookieUserId);
    this._userService.getByUserPlatformId(userLoggedId).subscribe(res => {
      if (res != null && res.body != null && res.body.result) {
        let usr: User = res.body.data.users[0];
        this._loggedUser.setLoggedUser(usr);
        this.user = usr;
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
    });
  }

}
