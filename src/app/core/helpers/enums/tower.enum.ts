export enum EnumTowerStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

export enum EnumGeofenceStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

export enum EnumPolylineStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

export enum EnumTowerUserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

export enum EnumTowerUserRole {
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
  OPERATOR = 'operator'
}

// TDC y WIZARD
export enum EnumTowerListStep {
  HOME = 10,
  WIZARD = 20
}

export enum EnumTowerWizardStep {
  HOME = 10,
  DETAILS = 20,
  GEOFENCE = 30,
  POLYLINE = 40,
  USERS = 50,
  RESUME = 60
}

// PLAN DE CONTINGENCIA Y STEPPER
export enum EnumTowerContingencyStep {
  HOME = 10,
  WIZARD = 20
}

export enum EnumTowerContingencyWizardStep {
  HOME = 10,
  DETAILS = 20,
  GEOFENCE = 30,
  POLYLINE = 40,
  USERS = 50,
  RESUME = 60
}
