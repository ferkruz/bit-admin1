export interface IProfile {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  role: IRoleItem[];
  organizationID: string;
  unitOperative: IUnitOperativeItem[];
  selectedUnitOperative: IUnitOperativeItem;
}

export interface IUnitOperativeItem {
  UID: string;
  unitOperativeName: string;
  isDefault: boolean;
}

export interface IRoleItem {
  Id: string;
  name: string;
}
