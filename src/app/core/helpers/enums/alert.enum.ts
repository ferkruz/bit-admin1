export enum EnumAlertStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

export enum EnumAlertPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high'
}

export enum EnumAlertCode {
  TRACKING_NORMAL = 'normal',
  TRACKING_NONE = 'none',
  TRACKING_NO_SIGNAL = 'nosignal',
  TRACKING_NO_MOVEMENT = 'nomovement',
  TRACKING_SPEED_LIMIT = 'speedlimit',
  TRACKING_KM_LIMIT = 'kmlimit',
  TRACKING_TIME_TO_ARRIVAL = 'timetoarrival',
  DRIVER_MECHANICAL_BREAK = 'mechanical-break',
  DRIVER_DELAYED = 'delayed',
  DRIVER_DELAYED_LOADING = 'delayed-loading',
  DRIVER_DELAYED_UNLOADING = 'delayed-unloading',
  DRIVER_STRANDED_ON_ROAD = 'stranded-on-road',
  DRIVER_SOS = 'SOS'
}
