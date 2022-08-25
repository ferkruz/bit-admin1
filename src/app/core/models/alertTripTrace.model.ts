import { MapPointBasic } from "./mapPointBasic.model";

export class AlertTripTrace {
  id: number;
  tripId: string;
  status?: string;
  ts: Date;
  data: AlertTripData = new AlertTripData();
  warning?: any;
}

class AlertTripData {
  tripUUID?: string;
  tracking?: AlertTripTracking = new AlertTripTracking();
}

class AlertTripTracking {
  _id?: string;
  provider?: string;
  type?: string;
  coordinates?: MapPointBasic = new MapPointBasic();
  accuracy?: number;
  speed?: number;
  bearing?: number;
  altitude?: number;
  stats?: null;
}
