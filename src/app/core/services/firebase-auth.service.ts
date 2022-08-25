import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword,
         sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Observable } from 'rxjs';

import { ProfileManagementService } from './profile-mgr.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private authState: any = null;
  private auth = getAuth();

  constructor(private profile: ProfileManagementService) {
    const _this = this;

    this.auth.onAuthStateChanged(function (user) {
      _this.authState = user;
    });
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  get authenticated(): boolean {
    return this.authState != null;
  }

  get currentUser(): any {
    return this.authState;
  }

  getToken(): Promise<String> {
    return new Promise((resolve, reject) => {
      this.auth
        .currentUser.getIdToken(true)
        .then(token => {
          resolve(token);
        });
    });
  }

  getUserIdToken(): Observable<string> {
    return new Observable(observer => {
      this.auth
        .currentUser.getIdToken(true)
        .then(token => {
          observer.next(token);
          observer.complete();
        });
    });
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  recover(value: string) {
    return new Promise<any>((resolve, reject) => {
      let email = value.trim();
        sendPasswordResetEmail(this.auth, email)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      let email = value.email.trim();
      createUserWithEmailAndPassword(this.auth, email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      let email = value.email.trim();
      signInWithEmailAndPassword(this.auth, email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    const _this = this;
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then(
          () => {
            _this.profile.clearProfile().then(() => {
              resolve(true);
            });
          },
          ex => resolve(false)
        );
    });
  }
}
