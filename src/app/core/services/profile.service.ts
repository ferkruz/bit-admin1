import { Injectable } from '@angular/core';
import { IUnitOperativeItem } from '../interfaces/profile.interface';
import { Profile, RoleItem, UnitOperativeItem } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Profile = null;

  constructor() {
    if (this.profile == null) {
      this.loadData();
    }
  }

  private loadData() {
    this.profile = new Profile();
    //TODO: Cambiar
    this.profile.userID = '616579b1ce8a1345dc135e78';
    this.profile.firstName = 'Andres';
    this.profile.lastName = 'Denis';
    this.profile.email = 'adenis@belogit.com';
    this.profile.role.push(new RoleItem('5d67e311265bc65bbf6f577c', 'Usuario Administrador Plataforma'));
    this.profile.organizationID = '62a56902bfd7d92b1b1d8bab';
    this.profile.organizationName = 'Hubbing Latam';
    this.profile.unitOperative.push(new UnitOperativeItem('62a568ddbfd7d92b1b1d8baa', 'Hubbing AR', true));
    this.profile.selectedUnitOperative = this.unitOperativeByDefault();
  }

  public get() {
    return this.profile;
  }
  public set(profile: Profile) {
    profile = profile;
  }

  public unitOperativeByDefault() : IUnitOperativeItem {
    if(this.profile != null && this.profile.unitOperative.length > 0) {
      let existDefault: UnitOperativeItem = this.profile.unitOperative.find(i => i.isDefault);
      if (existDefault == null) {
        return this.profile.unitOperative[0];
      }
      return existDefault;
    }
    return null;
  }
}
