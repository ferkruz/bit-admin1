import { IProfile, IRoleItem, IUnitOperativeItem } from "../interfaces/profile.interface";

export class Profile implements IProfile{
  public userID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: RoleItem[] = [];
  public organizationID: string;
  public organizationName: string;
  public unitOperative: UnitOperativeItem[] = [];
  public selectedUnitOperative: UnitOperativeItem;
}

export class UnitOperativeItem implements IUnitOperativeItem {
  public UID: string;
  public unitOperativeName: string;
  public isDefault: boolean;

  constructor(UID: string, unitOperativeName: string, isDefault: boolean = false){
    this.UID = UID;
    this.unitOperativeName = unitOperativeName;
    this.isDefault = isDefault;
  }
}

export class RoleItem implements IRoleItem {
  public Id: string;
  public name: string;

  constructor(Id: string, name: string){
    this.Id = Id;
    this.name = name;
  }
}
